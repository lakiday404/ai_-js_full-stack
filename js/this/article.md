# 五分钟带你深入了解 `this`

## 为什么要有 `this`

- `this` 是 js 中的一个**关键字**，它能做到**隐式地传递一个**对象的引用，可以让代码更高效、更简洁，易于复用。

## `this` 用在哪

- **有域的地方就可以用**

1. **全局**：`this === window`

> `this` 在 Node **模块顶层**指向 `module.exports`（初始为 `{}`）；在浏览器网页中，指向 `window`

```javascript
// 1.js
console.log(this)   // 浏览器端输出 window，Node 端输出 module.exports
```

2. **函数体内**

```javascript
// 1.js
function foo(){
   var a = 0
   console.log(this.a)
}
```

> 块级作用域内 `this` 无意义，因为 `this` 的绑定只发生在函数调用和全局作用域中

> `this` 用在不同的地方，代指的内容是不一样的

## `this` 的绑定规则

<!-- 此内容源自 《你不知道的JavaScript》 -->

### 1. 默认绑定

当函数**独立调用**时，`this` 指向 `window`（非严格模式）或 `undefined`（严格模式）。

**什么是独立调用**？

```javascript
// 4.js
function foo(){
    console.log(this)
}
foo()   // 独立调用，this = window（非严格模式）
```

像这样声明一个函数，然后没用什么前缀来调用，就是**独立调用**。

### 2. 隐式绑定规则

当一个函数被一个上下文对象所拥有，并被该对象调用，函数中的 `this` 指向该对象。

**什么是非独立调用**？

```javascript
// 4.js
function foo(){
    console.log(this)
}
var obj = {
    a: 1,
    foo: foo      // 前一个 `foo` 是 key，后一个 `foo` 是变量
}
obj.foo()   // 非独立调用，this = obj
```

调用点有 `.` 或 `[]`，就是**非独立调用**。

### 3. 隐式丢失

当一个函数被**赋值给变量**后**独立调用**时，原本的隐式绑定会丢失，退化为默认绑定（指向 `window` 或 `undefined`）。

```javascript
// 4.js
function foo(){
    console.log(this.a)
}
var obj = {
    a: 1,
    foo: foo
}
var oo = {
    a: 2,
    foo: obj      // 注意：oo.foo 指向的是 obj，不是 foo
}
oo.foo.foo()      // 独立调用，this = window（非严格模式）
```

### 4. 显式绑定

**显式绑定有三种类型**：

**① call — 立即执行，参数逐个传**

```javascript
// 5.js
function foo(x, y){
    console.log(this.a, x + y)   // this.a + (x+y)
}

var liu = { a: 1 }
foo.call(liu, 1, 2)              // 输出: 1 3
```

`call` 可以把函数的 `this` 强行绑定到指定对象上，并**立即执行**。

**② apply — 立即执行，参数用数组传**

```javascript
// 5.js
var jie = { a: 2 }
foo.apply(jie, [2, 3])           // 输出: 2 5
```

`apply` 和 `call` 大部分一样，区别在于传参方式——`apply` 用**数组**传递参数。

**③ bind — 返回新函数，永久绑定**

```javascript
// 5.js
var fufu = { a: 3 }
const bar = foo.bind(fufu, 1, 4)   // 返回一个新函数
bar()                               // 输出: 3 5

// 分步传参（柯里化）
const bar2 = foo.bind(fufu, 1)
bar2(4)                             // 输出: 3 5
```

`bind` 执行后**一定返回一个新函数**，不会立即执行，这是它与 call/apply 最大的区别。

### 5. `new` 绑定

使用 `new` 调用构造函数时，`this` 指向**实例对象**。

```javascript
// 6.js
function Person(){
    // new 做了四件事：
    // 1. 创建一个空对象 {}
    // 2. 让 this 指向这个空对象
    // 3. 执行构造函数中的代码
    // 4. 让对象的 __proto__ === Person.prototype
    this.name = 'jie'
}
const p = new Person()
```

`new` 的原理会导致函数的 `this` 指向实例对象。

## 箭头函数

- 箭头函数**没有自己的 `this`**，它会捕获定义时所在的外层非箭头函数的 `this`
- 箭头函数不能作为构造函数来使用，因为 `new` 的执行步骤中需要将 `this` 指向其 `prototype`，而箭头函数没有自己的 `this`

```javascript
const Person = () => {}
// new Person()   // TypeError: Person is not a constructor
```

## 总结

判断 `this` 是谁，就看**调用点**是怎么调用的：

| 调用方式 | 绑定规则 | this 指向 |
|----------|----------|-----------|
| `foo()` | 默认绑定 | `window` / `undefined` |
| `obj.foo()` | 隐式绑定 | `obj` |
| `foo.call(obj)` | 显式绑定 | `obj` |
| `new Person()` | new 绑定 | 实例对象 |
| `() => {}` | 箭头函数 | 外层函数的 this |

**这个 `this` 是谁的？—— 这个 `this` 代指的是谁，取决于怎么调用的。**
