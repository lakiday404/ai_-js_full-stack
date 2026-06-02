# 一篇搞懂 JS 类型判断：typeof、instanceof、toString.call 全解析

## 前言

> 本文是 "万物皆对象？带你梳理 JS 原型及其查找链机制" 的姊妹篇，建议先阅读原型链机制再来看本文会更有收获 👉 [跳转上文](https://juejin.cn/post/7642251240038842410)

JavaScript 的类型判断看似简单，实则暗藏玄机：为什么 `typeof null` 返回 `"object"`？`instanceof` 为什么不能判断原始类型？`Object.prototype.toString.call()` 又为什么是最稳妥的方案？

本文将从底层原理出发，带你彻底搞清楚 JS 类型判断的三种主流方式。

---

## 一、快速回忆 JS 的类型体系

在深入类型判断之前，先快速过一遍 JS 的两大类类型：

- **原始类型**：`number`、`bigint`、`string`、`symbol`、`boolean`、`undefined`、`null`
- **引用类型**：`Array`、`Function`、`Object`、`Date`、`RegExp` 等

记住这个大前提是理解后续所有判断机制的基础。

---

## 二、typeof：最常用但暗藏陷阱

### 2.1 基本行为

先来看一段代码直观感受一下：

```js
let s = 'hello',
    num = 123,
    f = true,
    u = undefined,
    n = null,
    sy = Symbol(1),
    big = 12343242n,
    arr = [],
    obj = {},
    fn = function () {}

console.log(typeof s)    // "string"
console.log(typeof num)  // "number"
console.log(typeof f)    // "boolean"
console.log(typeof u)    // "undefined"
console.log(typeof n)    // "object"  ⚠️
console.log(typeof sy)   // "symbol"
console.log(typeof big)  // "bigint"
console.log(typeof arr)  // "object"  ⚠️
console.log(typeof obj)  // "object"
console.log(typeof fn)   // "function"
```

### 2.2 两条核心结论

1. `typeof` 可以准确判断**除了 `null` 之外的所有原始类型**
2. `typeof` 把所有引用类型都看作 `"object"`，**除了 `function`**

### 2.3 底层原理：二进制标记法

`typeof` 的设计思路相当"底层"——它通过将值转换为二进制形式来判断类型。在早期的 JS 引擎实现中：

- **二进制前三位是 `0`** 的被统一认为是引用类型
- 所有引用类型在转换为二进制时，前三位都是 `0`
- `function` 是特殊处理过的，不在此列

而 `null` 的二进制表示是一整串 `0`（多少个 `0` 取决于操作系统位数），所以它的前三位自然也是 `0`，于是：

> `typeof` 被设计出来的时候没有单独考虑 `null` 的情况，`null` 因此被误判为 `"object"`。

**这是 JS 诞生之初就存在的历史 Bug，typeof 的设计缺陷至今未被修复。**

---

## 三、instanceof：顺着原型链找真相

### 3.1 基本使用

```js
let s = 'hello',
    num = 123,
    f = true,
    u = undefined,
    n = null,
    sy = Symbol(1),
    big = 12343242n,
    arr = [],
    obj = {},
    fn = function () {}

// instanceof 用来判断引用类型
console.log(arr instanceof Array)  // true

// 原始类型不能用 instanceof
console.log(s instanceof String)   // false
console.log(n instanceof null)     // 报错！
```

### 3.2 判断原理

`instanceof` 的核心机制是**顺着原型继承链往上找**，直到等式成立或找到尽头：

```
arr instanceof Array

→ arr.__proto__ === Array.prototype？ ✅ true
```

如果当前 `__proto__` 不匹配，则继续往上：

```
Array.prototype.__proto__ === Object.prototype
→ 继续…… 直到找到 null
→ Object.prototype.__proto__ === null（原型链终点）
```

用伪代码来表示就是：

```
arr.__proto__ == Array.prototype
Array.prototype.__proto__ == Object.prototype
Object.prototype.__proto__ == null  ← 到头了，不等就返回 false
```

### 3.3 核心特性总结

1. **只能判断引用类型，无法判断原始类型**
2. 通过隐式原型链（`__proto__`）逐级查找

### 3.4 手搓简易版 instanceof

理解原理之后，不妨自己实现一个：

```js
function myinstanceof(fn, type) {
    if (typeof fn !== 'object' || fn == null) {
        return false
    }
    while (fn.__proto__ !== null) {
        if (fn.__proto__ === type.prototype) {
            return true
        }
        fn = fn.__proto__
    }
    return false
}
```

如果你去掉第 2-3 行的类型守卫，有趣的事情发生了——它居然能"判断"原始类型了。因为原始类型在访问 `__proto__` 时会被临时包装成对象（装箱），所以也能顺着原型链找到 `String.prototype` 等。但这本质上是 JS 的自动装箱机制在起作用，不是 `instanceof` 真正能识别原始类型。

---

## 四、Object.prototype.toString.call()：终极方案

### 4.1 为什么需要 `.call()`？

各种内置类型都重写了属于自己的 `toString` 方法：

```js
// 数组的 toString：拼接元素
[1, 2, 3].toString()   // "1,2,3"

// 数字的 toString：数字转字符串
(123).toString()       // "123"

// 普通对象的 toString：继承自 Object.prototype
({}).toString()        // "[object Object]"
```

如果直接调用某个值的 `.toString()`，拿到的根本不是类型信息。所以我们要**借用** `Object.prototype` 上最原始的那个 `toString`，并用 `.call()` 把 `this` 指向我们要检测的值。

### 4.2 实际效果

```js
console.log(Object.prototype.toString.call(123))          // "[object Number]"
console.log(Object.prototype.toString.call('hello'))      // "[object String]"
console.log(Object.prototype.toString.call(true))         // "[object Boolean]"
console.log(Object.prototype.toString.call(undefined))    // "[object Undefined]"
console.log(Object.prototype.toString.call(null))         // "[object Null]"
console.log(Object.prototype.toString.call([]))           // "[object Array]"
console.log(Object.prototype.toString.call({}))           // "[object Object]"
console.log(Object.prototype.toString.call(function () {})) // "[object Function]"
```

它能精确判断**所有类型**，包括 `typeof` 搞不定的 `null` 和 `instanceof` 搞不定的原始类型。

### 4.3 底层原理：ES5 规范 15.2.4.2

> 参考规范：[ES5 §15.2.4.2](https://es5.github.io/#x15.2.4.2)

当 `Object.prototype.toString()` 被调用时，引擎执行以下步骤：

| 步骤 | 操作 | 说明 |
|:---:|------|------|
| 1 | `this === undefined` → `"[object Undefined]"` | undefined 硬编码处理 |
| 2 | `this === null` → `"[object Null]"` | null 硬编码处理 |
| 3 | `O = ToObject(this)` | 原始值装箱（如 `"hello"` → `new String("hello")`） |
| 4 | `class = O.[[Class]]` | 读取内部属性 `[[Class]]`，这是引擎维护的类型标签 |
| 5 | 返回 `"[object " + class + "]"` | 拼接最终结果 |

用伪代码模拟这个过程：

```js
Object.prototype.toString = function () {
    const O = ToObject(this)       // this 指向被检测的值
    const class = O.[[Class]]       // 读取内部 [[Class]] 属性
    return "[object " + class + "]"
}

Object.prototype.toString.call(123)
// ToObject(123)  → new Number(123)
// new Number(123).[[Class]] → "Number"
// → "[object Number]"
```

**关键在第 4 步**：`[[Class]]` 是 JS 引擎的内部属性，用户代码无法修改，所以这个判断绝对可靠。

### 4.4 封装一个万能类型判断函数

```js
function getType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
    // 裁掉 "[object " 和 "]" → "Array" / "Number" / "Null" / ...
}

getType([])     // "Array"
getType(null)   // "Null"
getType(/abc/)  // "RegExp"
```

---

## 五、Array.isArray()：数组专属快车道

数组还有一个专门的判断方法：

```js
Array.isArray([])   // true
Array.isArray({})   // false
```

它是 ES5 新增的静态方法，直接挂在 `Array` 构造函数上，实例对象无法访问：

```js
const arr = []
arr.isArray()   // ❌ 报错！实例上不存在此方法
Array.isArray(arr)  // ✅ 正确用法
```

如果你需要判断的对象只有"是不是数组"这一种需求，`Array.isArray()` 是性能最优的选择。

---

## 六、三种方案全景对比

| 维度 | `typeof` | `instanceof` | `toString.call` |
|:---|:---|:---|:---|
| 能判断原始类型？ | ✅（除 null） | ❌ | ✅ |
| 能区分 null？ | ❌ → `"object"` | ❌ 报错 | ✅ → `"[object Null]"` |
| 能区分数组和对象？ | ❌ 都是 `"object"` | ✅ | ✅ |
| 能判断 function？ | ✅ | ✅ | ✅ |
| 原理 | 二进制标记位 | 原型链查找 | `[[Class]]` 内部属性 |
| 可靠性 | 有历史 Bug | 跨 iframe 可能失效 | **最高** |

---

## 七、总结

在 JS 中做类型判断时，推荐按以下优先级选择方案：

1. **日常开发**：直接用 `typeof`，仅需注意 `null` 和数组的边界情况
2. **判断数组**：用 `Array.isArray()`，简单高效
3. **判断引用类型的具体类型**：用 `instanceof`
4. **需要精确覆盖所有类型（写工具库 / 面试高频）**：用 `Object.prototype.toString.call()`，永远稳

理解了这三种方案各自的原理和边界条件，你就掌握了 JS 类型判断的全貌。记住——**没有银弹，每种方案都有适合它的战场**。

---

> 如果这篇文章帮到了你，欢迎点赞、收藏、评论，你的支持是我持续输出技术内容的动力 🚀
