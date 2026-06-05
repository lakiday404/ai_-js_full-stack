# JavaScript 拷贝 —— 从浅拷贝到深拷贝

## 前置知识

在进入今天的正题之前，请允许我为你分享一些关于**递归**的知识。递归是许多新手入门 JS 的一道难关：怎么写递归、怎么调递归。

同时，你还需要知道怎样遍历对象，避免拿到原型属性，这方便我们进行拷贝。

### 递归之阶乘

现在我有一个需求，我希望输入一个数字，你能返回其阶乘。当然，你可以用你最拿手的迭代法：

```js
function mul(n) {
    let res = 1
    for (let i = n; i > 0; i--) {
        res = res * i
    }
    return res
}
```

建立一个 for 循环，简单粗暴遍历，累乘解决，行云流水。但你感觉还不太优雅，我们不妨来拆分一下阶乘的表达：

```js
mul(5) == 5 * mul(4)
```

这显然成立。同理：

```js
mul(5) == 5 * mul(4)
mul(4) == 4 * mul(3)
mul(3) == 3 * mul(2)
mul(2) == 2 * mul(1)
mul(1) == 1
```

你发现了规律：mul() 可以拆分成 一个数 * mul()。这就是递归，思想已就位，接下来就是实现它：

```js
function mul(n) {
    if (n == 1) return 1
    return n * mul(n - 1)
}
```

多么优雅的递归。递归虽好，也有使用条件：

1. 要有数学公式可依，一个函数在其内部调用自己实现递归
2. 要知道终止条件，什么时候是出口，不然岂不是无穷无尽，直到爆栈

### 递归之斐波那契数列

斐波那契数列大家都很熟悉：

```
1, 1, 2, 3, 5, 8, ...
```

这是典型的递归题，斐波那契数列的第三个数开始，每个数等于前两个数的和。代码实现如下：

```js
function feibo(n) {
    if (n == 1) return 1
    if (n == 2) return 1
    return n = feibo(n - 2) + feibo(n - 1)
}
```

数学条件就是当前数等于前两个数的和；终止条件就是最终来到第一个数和第二个数的时候，显然没有再往前的必要了。

### `for...in` + `hasOwnProperty`

有时候我们需要遍历一个对象，这时就可以用到这个知识点。首先我们不妨创建一个对象：

```js
let obj = {
    age: 18,
    name: `annon`,
    like: ['BangDream', 'MyGo']
}
```

接着使用 `for...in`：

```js
for (let key in obj) {
    console.log(key, obj[key]);
}
```

这样我们就拿到了对象中对应的 `key` 与其 `value`：

```
age 18
name annon
like [ 'BangDream', 'MyGo' ]
```

但这样有个问题，`for...in` 不仅能拿到对象里的 `key` 与其 `value`，甚至还能拿到其原型上挂载的属性。

我们加上：

```js
Object.prototype.position = 'guitarist'
```

则输出：

```
age 18
name annon
like [ 'BangDream', 'MyGo' ]
position guitarist
```

解决方案就是加上一个 if 判断：

```js
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(key, obj[key])
    }
}
```

## 厘清概念：赋值、浅拷贝、深拷贝

当我们需要拷贝一个对象，就要分清什么是赋值、浅拷贝、深拷贝。

**赋值：**

```js
let obj = {
    age: 18
}
let oo = obj
obj.age = 19
console.log(oo.age)
```

输出：

```
19
```

这是赋值，本质上 `oo` 与 `obj` 是**同一个对象**，其引用地址完全没有改变！

我们想要实现的：

- **浅拷贝**：将原对象中的全部属性拷贝，遇到引用类型的时候保留其引用地址即可
- **深拷贝**：将原对象中所有子对象层层拷贝，引用地址都是全新的

### 浅拷贝（Shallow Copy）

- 原始值拷贝，引用类型则只拷贝地址

根据前置知识，我们不妨手搓一个简易的浅拷贝：

```js
let obj = {
    age: 18,
    name: `annon`,
    like: ['BangDream', 'MyGo']
}

function shallowCopy(obj) {
    let oo = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            oo[key] = obj[key]
        }
    }
    return oo
}

let oo = shallowCopy(obj)
obj.like[0] = 'Soyo'
console.log(oo)
```

输出：

```
{ age: 18, name: 'annon', like: [ 'Soyo', 'MyGo' ] }
```

因为 `like` 是个数组，我们在这个函数中拷贝的是其引用地址。所以给 `oo` 赋值语句之后，再更改 `obj` 里的属性也会改变，因为其引用地址被原原本本地塞进 `oo` 中了。

（截图：浅拷贝原理示意图）

> 这个写法兼顾了数组和对象两种引用类型。无法处理 `function(){}`

### 官方提供的浅拷贝

官方提供了浅拷贝的方法 `Object.assign({}, obj)`，表示将后面那个对象的属性塞进前面的空对象中，后面本身值不变。

```js
let obj = {
    age: 18,
    name: `annon`,
    like: ['BangDream', 'MyGo']
}

let oo = Object.assign({}, obj)
obj.like[0] = 'Soyo'
console.log(oo)
```

输出：

```
{ age: 18, name: 'annon', like: [ 'Soyo', 'MyGo' ] }
```

除此之外，数组还可以用 `slice(0)` 或展开运算符 `[...arr]` 实现浅拷贝。

## 深拷贝

有时候在对象中，属性又是一个对象。在特殊情况下，我们不要对象的对象的地址，而是想要这个值，就需要深拷贝了。

### 方案一：手写 deepCopy()

首先创建用于测试的对象，写个 deepCopy 函数。这一步我们判断要拷贝的是一个对象或数组，根据类型创建一个空对象或空数组。

```js
let obj = {
    age: 18,
    name: `nange`,
    like: {
        n: 'BangDream',
        m: 'MyGo',
        o: {
            a: 'Soyo'
        }
    }
}

function deepCopy(obj) {
    let res = Array.isArray(obj) ? [] : {}
    return res
}
```

接着思路很简单，我们写一个判断语句排除挂载在原型上的属性：

```js
function deepCopy(obj) {
    let res = Array.isArray(obj) ? [] : {}
    if (obj.hasOwnProperty(key)) {
    }
    return res
}
```

然后在内层判断其类型，如果是原始类型则原原本本地复制进去，如果是引用类型则进行递归。数学公式就是：

```js
res[key] = deepCopy(obj[key])
```

终止条件就是递归调用 `deepCopy` 拿到地址指向的具体数据为止，即原始类型。

怎样判断是不是引用类型？可以这样写：

```js
if (typeof (obj[key]) == 'object' && obj[key] != null) {
}
```

接下来我们把赋值语句也写进去，这个函数就完整了。完整代码丢你一份：

```js
let obj = {
    age: 18,
    name: `nange`,
    like: {
        n: 'BangDream',
        m: 'MyGo',
        o: {
            a: 'Soyo'
        }
    }
}

function deepCopy(obj) {
    let res = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof (obj[key]) == 'object' && obj[key] != null) {
                res[key] = deepCopy(obj[key])
            } else {
                res[key] = obj[key]
            }
        }
    }
    return res
}

let oo = deepCopy(obj)
obj.like.o.a = 'anno'
console.log(oo)
```

最终输出：

```
{
  age: 18,
  name: 'nange',
  like: { n: 'BangDream', m: 'MyGo', o: { a: 'Soyo' } }
}
```

### 方案二：JSON 序列化

最简单的深拷贝写法，一行搞定：

```js
const oo = JSON.parse(JSON.stringify(obj))
```

然而这个方案有致命缺陷——序列化过程中会丢失很多类型信息：

- `undefined`、`NaN`、`Infinity` → 变成 `null` 或直接丢失
- `BigInt` → 直接报错
- 函数、`Date`、`RegExp` → 无法正确处理
- 无法处理循环引用

**适合纯 JSON 数据（纯对象 + 数组 + 基本类型）的场景。**

### 方案三：structuredClone()

现代浏览器原生提供的深拷贝 API：

```js
const oo = structuredClone(obj)
```

优点：

- 可处理 `undefined`、`NaN`、`BigInt`、`Infinity`
- 支持 `Date`、`RegExp`、`Map`、`Set`、`ArrayBuffer` 等
- 自动处理循环引用

缺点：函数体无法克隆（会报错）。

## 总结

### 浅拷贝与深拷贝的使用场景

绝大多数时候，我们需要拷贝某个引用类型时，都是使用浅拷贝——因为大多数业务场景下，我们只需要拷贝第一层数据，嵌套引用对象并不需要独立。

但当你需要完全独立的一份数据、且内部有多层嵌套引用时，深拷贝就派上用场了：

- **表单数据的快照回滚**
- **Redux / Vuex 中的状态不可变更新**
- **复杂配置对象的模板克隆**

### 三方案对比

| 方案 | 函数 | BigInt | undefined | NaN | 循环引用 | Date | RegExp |
|------|------|--------|-----------|-----|----------|------|--------|
| 手写递归 | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| JSON 序列化 | ❌ | ❌ | ❌ | 转 null | ❌ | ❌ | ❌ |
| structuredClone | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### 一句话总结

> 浅拷贝用 `Object.assign` 或展开运算符；深拷贝优先 `structuredClone`，不兼容环境用 `JSON.parse(JSON.stringify())`，面试手写递归版——记住**递归公式**（`res[key] = deepCopy(obj[key])`）加**终止条件**（`typeof !== 'object' || obj === null`）。

---

> 概要：从递归与for...in前置讲起，厘清赋值/浅拷贝/深拷贝概念，手写shallowCopy与deepCopy，对比JSON序列化和structuredClone三种深拷贝方案。
