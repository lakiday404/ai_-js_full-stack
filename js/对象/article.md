# JavaScript 对象从入门到原理解析

## 前言

在 JavaScript 中，有一句话广为流传——**"万物皆对象"**。原始类型（string、number、boolean、undefined、bigint、null、symbol）除外，其余一切都是对象。理解对象，是掌握 JavaScript 这门语言的基石。

本文将从**创建对象**、**new 原理**、**包装类**、**原型与原型链**四个维度，结合代码实例，逐步深入 JS 对象的内部机制。

---

## 一、创建对象的三种方式

### 1. 字面量创建

最常用、最直观的方式：

```js
const obj = {
    name: 'qiqi'
}
obj.age = 18

let hello = 'world'
obj[hello] = 123    // 等价于 obj['world'] = 123，用变量值作为属性名

delete obj[hello]   // 删除属性
console.log(obj)    // { name: 'qiqi', age: 18 }
```

这里有一个小技巧：`obj[hello]` 和 `obj.hello` 不同。`obj[hello]` 会把 `hello` 变量的值（`'world'`）作为属性名，而 `obj.hello` 则是直接以字符串 `'hello'` 作为属性名。

### 2. 使用 new Object()

```js
const obj = new Object()
obj.name = 'qiqi'
```

其实字面量 `{}` 本质上等价于 `new Object()`，只是写法更简洁。

### 3. 使用构造函数（new 一个自定义函数）

```js
function Person() {

}

const obj = new Person()
console.log(obj)    // Person{}
```

用 `new` 调用函数，一定会在函数内部凭空创建一个对象，并返回它。被 `new` 调用的函数，就叫做**构造函数**。

函数有二义性——可以普通调用，也可以 `new` 调用：

```js
function add(x, y) {
    return x + y
}

function User(name, age, apartment) {
    this.name = name
    this.age = age
    this.apartment = apartment
}

add(1, 2)           // 普通调用，返回 3
new User('zs', 18, 'xxx小区')  // new 调用，返回一个 User 实例对象
```

---

## 二、new 的工作原理

`new` 到底做了什么？以这段代码为例：

```js
function Car(color) {
    this.color = color
    this.name = 'su7'
    this.height = 1400
    this.lang = 4800
    this.weight = 1500
}

const zCar = new Car('red')
const yourCar = new Car('blue')
```

当我们执行 `new Car('red')` 时，V8 引擎内部悄悄完成了四件事：

```
1. 创建一个空对象  var this = {}

2. 将 this 指向这个空对象，并执行函数体中的代码
   this.color = color
   this.name = 'su7'
   ...

3. 将这个对象的隐式原型 __proto__ 指向 Car 的显式原型 prototype
   this.__proto__ = Car.prototype

4. 返回这个对象（默认 return this）
```

所以 `console.log(zCar)` 输出的是一个 `Car` 实例，包含了 `name`、`height`、`lang`、`weight` 等属性。

### 为什么两个相同属性的对象不相等？

```js
console.log(zCar === yourCar)   // false
```

即使修改 `yourCar` 的 `name` 属性：

```js
yourCar.name = 'laosilaisi'
console.log(zCar)        // { name: 'su7', ... }
console.log(yourCar)     // { name: 'laosilaisi', ... }
```

**引用类型比较的是内存地址。** 每次 `new` 都会创建一个全新的对象，分配不同的内存地址，所以即使属性完全相同，两个对象也不相等。JS 中不存在完全一样的两个对象。

---

## 三、包装类——原始类型为什么不能添加属性？

这是一个经典面试题：

```js
var str = 'abc'
str.length = 4
console.log(str.length)    // 输出 3，不是 4
```

为什么赋值了 `4`，读取时还是 `3`？

### 背后发生了什么

```js
var str = 'abc'          // 原始字符串
str.length = 4           // 想修改 length
console.log(str.length)  // 3
```

执行流程如下：

**第 2 行 `str.length = 4`：**

1. V8 将原始字符串 `'abc'` **自动装箱**（Auto-boxing），临时包装成一个 `String` 对象，等价于 `new String('abc')`
2. 在这个临时对象的 `length` 属性上尝试赋值为 `4`
3. 但 `String` 对象的 `length` 属性是**只读的**（`writable: false`），赋值静默失败
4. 临时对象被销毁

**第 3 行 `console.log(str.length)`：**

1. 再次对原始值 `'abc'` 访问 `length` 属性
2. V8 又**创建一个新的**临时 `String` 包装对象
3. 读取其 `length` 属性，返回 `3`（字符串真实的字符数）
4. 临时对象被销毁

用代码验证 `length` 的只读性：

```js
const strObj = new String('abc')
Object.getOwnPropertyDescriptor(strObj, 'length')
// { value: 3, writable: false, enumerable: false, configurable: false }
```

### 包装类的原理

```js
const str = 'hello'
str.name = 'qiqi'
console.log(str.name)   // undefined
```

过程如下：

```
① 'hello' → 临时包装成 new String('hello')
② 给临时对象设置 name = 'qiqi'
③ 临时对象被销毁
④ 再次访问 str.name → 又创建一个新的临时对象 → 没有 name 属性 → undefined
```

**一句话总结：原始类型本身不能添加属性和方法。** 每次对原始类型进行属性读写，V8 都会临时创建一个包装对象，操作完成后立即销毁。

---

## 四、原型与原型链

### 什么是原型？

```js
// 所有的函数都天生拥有一个属性叫 prototype
// 所有的对象都天生拥有一个属性叫 __proto__
```

- **`prototype`**：函数的显式原型，只有函数才有
- **`__proto__`**：对象的隐式原型，每个对象都有

```js
const obj = {}    // 等价于 new Object()
obj.toString()

// V8 在 obj 的原型上找 toString
// 等同于在 Object.prototype 上找
// obj.__proto__ === Object.prototype
```

### 原型链查找机制

当访问一个对象的属性时，V8 的查找顺序如下：

```
对象自身 → 对象.__proto__ → ... → Object.prototype → null
```

任何对象最终都继承自 `Object.prototype`，而 `Object.prototype` 的原型是 `null`，查找到此结束。

```
实例对象
    ↓
实例.__proto__ → 构造函数.prototype
                        ↓
构造函数.prototype.__proto__ → Object.prototype
                                        ↓
Object.prototype.__proto__ → null（终点）
```

举个例子：

```js
const arr = []
arr.push(1)    // arr 自身没有 push
               // → arr.__proto__ → Array.prototype → 找到 push ✓

arr.toString() // arr 自身没有 toString
               // → arr.__proto__ → Array.prototype → 也没有 toString
               // → Array.prototype.__proto__ → Object.prototype → 找到 toString ✓
```

### 构造函数、实例、原型的关系

用 `new` 建立实例后，三者关系如下：

```js
function Car(color) {
    this.color = color
    this.name = 'su7'
}

const zCar = new Car('red')

// 关系验证
zCar.__proto__ === Car.prototype            // true
Car.prototype.constructor === Car           // true
zCar.__proto__.constructor === Car          // true
```

```
Car.prototype  ←───────────  zCar.__proto__
      │                            │
      │                            │
      ▼                            ▼
  { constructor: Car }    →  指向同一个对象
```

### 修改原型需要谨慎

```js
String.prototype.len = 5

const str = 'hello'
console.log(str.len)   // 5
```

这看似方便，但**后患无穷**：

**问题 1：全局污染**
所有字符串都会继承这个属性：

```js
String.prototype.len = 5

'abc'.len        // 5 —— 所有字符串都有了 len
'的任何字符串'.len // 5
```

**问题 2：命名冲突**
如果多个库都添加了同名的原型属性，后加载的会覆盖先加载的，引发难以排查的 bug。

**问题 3：破坏 for...in 遍历**

```js
String.prototype.len = 5

for (let key in 'hello') {
    console.log(key)   // 0, 1, 2, 3, 4, 'len'
}
```

**问题 4：完全替换 prototype 后果更严重**

```js
String.prototype = { len: 5 }

'hello'.indexOf('h')   // TypeError: 'hello'.indexOf is not a function
'hello'.slice(0, 2)    // TypeError: 'hello'.slice is not a function
```

所有内置方法（`indexOf`、`slice`、`toString` 等）全部丢失。

**正确的做法是使用独立函数：**

```js
function getLen(s) {
    return s.length
}
```

---

## 总结

| 知识点 | 核心要点 |
|--------|----------|
| **创建对象** | 字面量 `{}`、`new Object()`、`new 构造函数()` |
| **new 原理** | 创建空对象 → 绑定 this → 连接原型 → 返回对象 |
| **引用比较** | 比较的是内存地址，两个对象永远不相等 |
| **包装类** | 原始类型不能添加属性，临时包装对象用完即销毁 |
| **原型 prototype** | 函数独有的属性，存放共享方法和属性 |
| **隐式原型 `__proto__`** | 每个对象都有，指向构造函数的 prototype |
| **原型链** | 对象 → `__proto__` → ... → `Object.prototype` → `null` |
| **修改原型** | 不推荐修改内置对象的原型，会造成全局污染 |

理解对象、原型和原型链，是深入学习 JavaScript 的关键一步。希望这篇文章能帮你理清这些概念，在日常开发中少踩坑、多加分。
