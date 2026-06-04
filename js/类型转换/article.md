# JavaScript 类型转换

## 前言：`[] == ![]`

这是面试官问烂的一道题，判断一个空数组是否相等于这个数组取反。新手乍一看感到荒谬：这还用问吗？你都取反了，当然应当是 `false`。

我们试着在浏览器中运行 `[] == ![]`：

（截图：控制台输出 `true`）

结果令人大跌眼镜，居然输出了 `true`。也就是在浏览器 V8 引擎里，这两者是相等的。敏锐的你已经察觉，**`==` 在判断相等的过程中，一定发生了某种转换**。要搞懂发生了什么，就来到今天的主题：**JavaScript 类型转换**。

## 类型转换

先给结论：

1. **显式类型转换**
   主要是原始类型的转换：
   - `String(x)` → `ToString(x)`
   - `Number(x)` → `ToNumber(x)`
   - `Boolean(x)` → `ToBoolean(x)`

2. **隐式类型转换**

## 显式类型转换

就是明显的转换，例如 `String()`、`Number()`。

原始类型之间都可以互相转化，详情可以去[官方说明文档](http://es5.github.io/#x15.5.1.1)中查询。

### String()

`String(x)` 在执行时，V8 会调用抽象操作 `ToString(x)`。注意这是底层规范中的抽象操作，不是我们能直接调用的 JS 方法，和 `toString()` 不是一个东西。

对于原始类型，`ToString` 的规则如下（截图：ES5 规范表）：

| 输入 | 输出 |
|------|------|
| `undefined` | `"undefined"` |
| `null` | `"null"` |
| `true` | `"true"` |
| `false` | `"false"` |
| 字符串 | 原样返回 |
| 数字 | 见下方 |

数字转字符串需分情况讨论（截图：NumberToString 规则）：

```js
String(NaN)       // "NaN"
String(+0)        // "0"
String(-0)        // "0"
String(-1)        // "-1"
String(Infinity)  // "Infinity"
```

### Number()

同理，来看 `ToNumber()` 的规则（截图：ES5 ToNumber 表）：

| 输入 | 输出 |
|------|------|
| `undefined` | `NaN` |
| `null` | `0` |
| `true` | `1` |
| `false` | `0` |
| 字符串 | 纯数字字符串正常转，含非数字字符则 `NaN` |

```js
Number(undefined)  // NaN
Number(null)       // 0
Number(true)       // 1
Number(false)      // 0
Number('123')      // 123
Number('000123a')  // NaN
Number('')         // 0
```

> 注意：空字符串 `Number("")` 结果为 `0`，不是 NaN。

## 引用类型的显式转换

当要把引用类型转换为原始类型时，需要调用 `ToPrimitive()`。

### 引用类型 → String()

```js
let x = {}
String(x)
```

流程一览：

```
String(x) → ToString(x) → ToPrimitive(x, String)
```

1. `String(x)` 进行抽象操作 `ToString`，发现是对象处理不了，交给 `ToPrimitive(x, String)`
2. 调用 `x.toString()`，如果得到原始值（primitive value）则返回。这里 `{}.toString()` 返回 `"[object Object]"`，直接返回
3. 如果上一步没得到原始值，调用 `x.valueOf()`
4. 都得不到 → 报错 TypeError

> 你说："那反正都要走 `toString()`，我直接调 `x.toString()` 不就好了？" 区别在于：`String()` 可以安全处理所有值（包括 `null`、`undefined`），而 `null.toString()` 直接报错。

如果传进一个数组：

```js
let x = []
String(x)   // ""
```

同样走 `ToPrimitive(x, String)`，但 `[].toString()` 调用的是 `Array.prototype` 上的方法，将数组元素以逗号拼接，空数组因此得到空字符串 `""`。

小结：
- `String({})` → `"[object Object]"`
- `String([])` → `""`（空数组元素拼接）
- `String([1, 2])` → `"1,2"`

### 引用类型 → Number()

```js
let x = {}
Number(x)
```

流程上一样，细节上不同：

```
Number(x) → ToNumber(x) → ToPrimitive(x, Number)
```

1. `Number(x)` 交给 `ToPrimitive(x, Number)`，**hint 为 Number**
2. 区别来了：**先调 `x.valueOf()`**，如果得到原始值，再对该原始值进行 `ToNumber`
3. 如果不是原始值，调用 `x.toString()`，得到原始值后再 `ToNumber`
4. 都得不到 → 报错

`Number({})` 在第 3 步得到 `"[object Object]"`，`Number("[object Object]")` → `NaN`。

如果传进去一个数组：

```js
Number([])  // 0
```

```
Number([])
  → ToPrimitive([], Number)
  → [].valueOf()  → []          // 不是原始值
  → [].toString() → ""          // 是原始值
  → Number("")    → 0
```

非空数组同理：

```js
Number([6])       // 6   → toString → "6" → 6
Number([1, 2])    // NaN → toString → "1,2" → NaN
Number([[[1]]])   // 1   → toString → "1" → 1
```

> `Number([[[1]]])` 乍一看很唬人，但数组嵌套再多层，`toString()` 都会递归展平拼接，最终得到 `"1"`，然后 `Number("1")` → `1`。

### 与 String() 的关键区别

| | `String()` | `Number()` |
|---|---|---|
| ToPrimitive hint | `String` | `Number` |
| 先调用 | `toString()` | `valueOf()` |
| 后调用 | `valueOf()` | `toString()` |

### 补充：valueOf()

`valueOf()` 的本意是把对象转为原始值，但大多数对象做不到——`Object.prototype.valueOf()` 直接返回 `this`。

真正能用 `valueOf()` 拿到原始值的，只有**包装类**：

```js
new Number(42).valueOf()     // 42
new String("hi").valueOf()   // "hi"
new Boolean(true).valueOf()  // true
new Date().valueOf()         // 1700000000000 （时间戳）
```

**包装类**：将原始值临时包装成对象的内置构造函数 —— `String`、`Number`、`Boolean`。

### 引用类型 → Boolean()

**所有引用类型转换为布尔类型都是 `true`**。这一点非常关键。

```js
Boolean({})   // true
Boolean([])   // true
Boolean(null) // false （null 不是引用类型！）
```

## 隐式类型转换

### 发生的场合

- **四则运算**：`+`、`-`、`*`、`/`、`%`
- **判断语句**：`if`、`while`、`==`、`===`、`>`、`<`、`>=`、`<=`、`!=`

**大多数隐式类型转换最终都是往数字方向转。**

### 一元运算符 `+`

```js
console.log('1')   // '1'
console.log(+'1')  // 1   ← 相当于 Number('1')
```

对象同理：

```js
console.log(+{})  // NaN  ← 相当于 Number({})
console.log(+[])  // 0    ← 相当于 Number([])
```

### 二元运算符 `+`

```js
lval + rval
```

V8 执行流程：

1. 令 `lprim = ToPrimitive(lval)`
2. 令 `rprim = ToPrimitive(rval)`
3. 现在变成 `lprim + rprim`
4. 如果两者中至少有一个是字符串，则另一个也 `ToString()`，进行字符串拼接，返回字符串
5. 两个都不是字符串，则全部 `ToNumber()`，进行数学加法

经典例子：

```js
{} + []   // "[object Object]"   → {}.toString() + [].toString()
[] + {}   // "[object Object]"   → 同上
1 + "2"   // "12"                → 字符串拼接
1 + 2     // 3                   → 数学加法
```

## 回到开头：`[] == ![]`

>`==` 运算符在两边类型不同时，会将两边都转为数字再比较。

我们来逐步拆解：

```js
 [] == ![]
```

**第一步**：`![]` 先求值。`!` 运算符会先将操作数转为布尔：`Boolean([])` → `true`（所有引用类型都是 `true`），然后取反：

```js
[] == false
```

**第二步**：`==` 发现两边类型不同（对象 vs 布尔），统一往数字转。先转右边：

```js
[] == Number(false)
[] == 0
```

**第三步**：左边是对象，走 `Number([])`：

```
Number([]) → ToPrimitive([], Number)
  → [].valueOf()  → []       (不是原始值)
  → [].toString() → ""       (是原始值)
  → Number("")    → 0
```

```js
0 == 0   // true
```

最终 `true`。这简直像是魔法——但透过规范的表象，每一步都有章可循。

## 总结

JavaScript 类型转换的根基是三个抽象操作：

| 抽象操作 | 触发方式 | 核心规则 |
|----------|----------|----------|
| `ToString` | `String(x)`、字符串拼接 | 原始值直接转；对象 → `ToPrimitive(x, String)` → 先 `toString`，后 `valueOf` |
| `ToNumber` | `Number(x)`、四则运算、`==` | 原始值直接转；对象 → `ToPrimitive(x, Number)` → 先 `valueOf`，后 `toString` |
| `ToBoolean` | `Boolean(x)`、`!`、`if` | 引用类型一律 `true`；`0` `NaN` `""` `null` `undefined` 为 `false` |

**记忆口诀**：

1. **显式**用 `String()`/`Number()`/`Boolean()`
2. **隐式**发生在四则运算和判断语句中，大多数往数字方向转
3. 对象转原始值走 `ToPrimitive`，`String` hint 优先 `toString`，`Number` hint 优先 `valueOf`
4. `+` 运算符遇到字符串就拼接，否则做加法
5. `==` 两边类型不同时，统一 `ToNumber` 后再比

> `[] == ![]` 之所以为 `true`，是因为两边都被转成了 `0`。不是 bug，是规范。

---

> 概要：从 []==![] 切入，逐层拆解 JS 显式与隐式类型转换——ToString/ToNumber/ToPrimitive 的完整链路，附一元二元+运算符、== 比较全流程。
