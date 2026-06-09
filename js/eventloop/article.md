# JavaScript 事件循环

> 当我们学到 `setTimeout()` 函数的时候，我们讲，由于 V8 引擎是单线程，遇到定时器会暂且不执行，而是将其挂起。那么，挂起的机制是怎样的？V8 在底层做出了怎样的规定？

## 前置知识

要了解今天的内容，你需要知道关于 JS 线程的相关知识。

### JS 线程

1. JS 默认只启用一个线程执行
2. V8 在执行代码时，将任务分为耗时任务和不耗时任务
3. 遇见耗时任务时，会将其暂时挂起

例如最经典的计时器函数：

```js
let a = 1

setTimeout(() => {
    a = 2
}, 1000)

console.log(a)
```

输出：

```
1
```

这是因为计时器函数是一个耗时任务，V8 执行代码时将其挂起，而 `console.log(a)` 并不耗时，是一个同步任务，所以 `a=2` 还没执行，就先输出了 `a=1`。

> **耗时任务**：V8 自己搞不定，需要外包给浏览器其他线程的任务，后续我们会细聊。

**为什么不设计成多线程？**

- JS 可以操作 **DOM** 结构（document），跟 HTML 深度合作，获取其容器并操作。**多线程可能会造成不安全的渲染**
- 如果要设置成多线程，就需要用到锁。这无疑增加了难度和设备的性能开销

> JavaScript 也不是只能单线程，`WebWorker` 可以强行开启多线程。

## 事件循环

要聊事件循环，我们先来详细讲讲任务。

### 任务

1. 耗时任务（异步任务）被存放在**队列**中，先执行不耗时任务（同步任务）

> 注意：耗时任务都是异步任务，而**异步任务不一定耗时**，有些异步任务是 V8 从底层规定为异步任务。

随着版本更新，"异步任务放在队列中"的说法逐渐被认为还不够细致，因此异步任务再次被拆分：

1. **宏任务**，例如：

```
setTimeout()
<script>
setInterval()
Ajax
I/O
UI-rendering
```

2. **微任务**，例如：

```
Promise.then()
process.nextTick()  ← 仅 Node.js 环境，浏览器没有
MutationObserver
```

### setTimeout()

- 每个 `setTimeout` 有独立的计时，但浏览器底层用同一个定时器线程管理它们。**计时时间短的先到点，其回调先被推入宏任务队列**。

> 定时器被创建后，浏览器会给定时器分配一个 id，这些 id 以耗时短优先的基准存入额外的队列中。

### 事件循环机制

先说结论：

1. V8 会按照同步任务 → 异步任务的顺序执行，遇到异步任务，则存入对应的队列中
2. 异步任务又细分为宏任务和微任务，执行时，先去微任务队列中查找微任务，并取出来执行
3. 去宏任务队列中查找宏任务，并将宏任务取出执行
4. 如果宏任务中又嵌套了其他逻辑，则按上述步骤循环

> V8 开始执行同步任务，这个行为本身我们视为同步任务。

我们从一段代码入手：

```js
console.log(1)
new Promise((resolve) => {
    console.log(2);
    resolve()
}).then(() => {
    console.log(3);
    setTimeout(() => {
        console.log(4);
    }, 0)
})
setTimeout(() => {
    console.log(5);
}, 1000)
console.log(6);
```

为方便讲解，我们将计时器函数从上到下记作 set1、set2。

梳理一下，哪些是同步任务？

```js
console.log(1)
```

输出 `1`。

```js
new Promise((resolve) => {
    console.log(2);
    resolve()
})
```

Promise 本身是个同步任务，执行输出 `2`，接着把 `.then()` 存入微任务队列，`.then()` 里面的内容也一并进去。

setTimeout() 显然是个宏任务，于是存入宏任务队列。

接着执行：

```js
console.log(6);
```

输出 `6`。

现在的队列情况是：

```
微任务: Promise.then
宏任务: set2
```

于是我们从微任务队列中取出 `.then()` 并执行，输出 `3`，这其中 set1 是个宏任务，计入宏任务队列。

> `.then()` 自己并不耗时，作为微任务是底层规定的。

```
宏任务: set2  set1
```

我们按照先进先出的顺序执行这个队列，但根据上文提到的，计时器函数是在另一个队列中，**按时间从小到大排列的，时间越短的越先出**。set2 需要 1s，set1 不需要，因此先输出 set1→`4`，再输出 set2→`5`。

因此最终输出：

```
1
2
6
3
4
5
```

## 浏览器的渲染线程

### JS 引擎线程 和 浏览器渲染线程

**JS 引擎线程和浏览器渲染线程是互斥的**！二者只能跑一个，这也是为了避免不安全的渲染。

例如我新建一个 HTML 文件，在 `<body>` 标签中写：

```html
<script>
    let a = 1
    console.log(a);
    new Promise((resolve) => {
        a = 2
        console.log(a);
        resolve()
    }).then(() => {
        a = 3
        console.log(a);
    })

    setTimeout(() => {
        a = 4
        console.log(a);
    }, 1000)
</script>

<h2>hello</h2>
```

我们按照事件循环机制，同步执行先输出 `1 2`，接着往微任务队列中塞入 `.then`，往宏任务中塞入 set1。

按理应当顺序输出 `1234`，并且 `4` 延迟一秒输出。

那么，`<h2>` 标签里的 `hello` 什么时候输出？

- 事实上，网页会先执行同步任务，输出 `12`，接着执行微任务队列，输出 `3`，接着**渲染页面**，输出 `hello`，最后执行宏任务队列，输出 `4`。

也就是说，`<script>` 本质上是一个宏任务，由于 JS 引擎线程和渲染线程互斥，V8 会先执行同步代码、微任务队列，接着**渲染页面**，最后再执行宏任务队列代码。

**执行过程更新为：**

1. V8 会按照同步任务 → 异步任务的顺序执行，遇到异步任务，则存入对应的队列中
2. 异步任务又细分为宏任务和微任务，执行时，先去微任务队列中查找微任务，并取出来执行
3. **如果有需要，渲染页面**
4. 去宏任务队列中查找宏任务，并将宏任务取出执行
5. 如果宏任务中又嵌套了其他逻辑，则按上述步骤循环

### async/await

- **`async` 可以加在任意函数前面，效果等效于在该函数内部 `return` 了一个 `Promise`**
- **`await` 可以看作 `.then()` 的语法糖，其右边的内容当作同步代码执行，后续的代码被压入微任务队列排队**
- 如果 `await` 右边不是 Promise，JS 会自动用 `Promise.resolve()` 包装

```js
async function fn() {
    await A()
    B()
}
fn()

function A() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('a');
            resolve()
        }, 1000)
    })
}
function B() {
    console.log('b')
}
```

这样写，等效于：

```js
function A() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('a');
            resolve()
        }, 1000)
    })
}
function B() {
    console.log('b');
}
A().then(() => {
    B()
})
```

## 加深印象，巩固练习

我们来看一段代码：

```js
console.log('script start');
async function async1() {
    await async2()
    console.log('async1 end');
}
async function async2() {
    console.log('async2 end');
}
async1()

setTimeout(() => {
    console.log('setTimeout');
}, 0)

new Promise((resolve, reject) => {
    console.log('promise');
    resolve()
})
    .then(() => {
        console.log('then1');
    })
    .then(() => {
        console.log('then2');
    });

console.log('script end');
```

按照正常流程分析：

首先，执行同步代码：

```js
console.log('script start');
```

输出 `'script start'`。

接着，调用 `async1()`，其中 `await async2()` 被视为同步代码，于是直接执行 `async2` 的调用，输出 `'async2 end'`。`console.log('async1 end');` 进入微任务队列。

遇见计时器，存入宏任务队列。

接着同步代码 `Promise`，输出 `'promise'`，将 `.then()` 以及其中的嵌套，全部存入微任务队列。

执行同步代码：

```js
console.log('script end');
```

输出 `'script end'`。

接着执行微任务队列，依次输出 `async1 end`、`then1`、`then2`。

最后执行宏任务队列，输出 `setTimeout`。

最终顺序：

```
同步执行: script start、async2 end、promise、script end
微任务队列: async1 end、then1、then2
宏任务队列: setTimeout
```

## 总结

JavaScript 事件循环的本质，就是单线程下的一整套排队系统：

1. **同步代码**在当前执行栈中顺序执行
2. 遇到**异步任务**，V8 将其外包给浏览器其他线程（定时器线程、网络线程等），待结果就绪后，回调被推入对应的**任务队列**
3. 异步任务按优先级分为两层：
   - **微任务**（`Promise.then`、`MutationObserver`）：同步代码执行完毕后立即清空
   - **宏任务**（`setTimeout`、`<script>`、事件回调）：每次只取一个，执行完再清空一轮微任务
4. **JS 引擎线程和渲染线程互斥**，渲染发生在两轮宏任务之间，所以长时间同步代码会阻塞页面渲染
5. **`async/await`** 是 Promise + `.then()` 的语法糖，`await` 右侧同步执行，下方代码压入微任务队列

> 记忆口诀：**一宏一微一渲染，微任务清空才宏任务。**

---

> 概要：从单线程限制讲起，拆解同步/异步、宏任务/微任务、事件循环机制全流程，结合代码演示，附带渲染线程互斥与async/await的底层原理。
