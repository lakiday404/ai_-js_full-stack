# 一文带你弄懂异步与同步，Promise()的部分源代码

## 异步、同步

不知道你记不记得，小学有这样一道题：小明七点钟起床，要在八点钟上课前完成妈妈布置的家务，并完成基本洗漱。任务是这些：

| 序号 | 家务 | 耗时 | 类型 |
|------|------|------|------|
| ① | 洗衣服 | 30 分钟 | 异步 — 丢进洗衣机就不管了 |
| ② | 煮粥 | 20 分钟 | 异步 — 按开始就不管了 |
| ③ | 扫地拖地 | 10 分钟 | 同步 — 必须亲手干 |
| ④ | 吃早餐 | 10 分钟 | 同步 |

显然你不会傻呆呆的看着洗衣机运作，等洗完了再去煮粥；煮粥的时候看着锅里，熟了才去扫地，最后吃早餐；你完全可以洗着衣服的时候去煮粥，煮粥的当子去扫地嘛。JavaScript 中也有类似的概念：

### 同步

1. 在同一时间线上，一步接一步执行

### 异步

1. 能按顺序从上往下一次执行
2. 在执行的过程中，如果碰到一个耗时的任务，就分出精力来执行另一个任务（**异步执行**）

那么异步在 `js` 中是怎样的？要了解这点，你要知道：

**`js`是默认单线程执行的**

这又涉及到线程，有线程就有进程：

1. **线程**: cpu 执行指令所需要的时间。本质是时间单位
2. **进程**: cpu 接到一个指令，等待上下文加载完毕所需要等待的时间。本质也是时间单位
3. 进程比线程要大，也可以说线程是进程的一部分

> 例如：在浏览器上打开一个 `tab` 网页，称之为开启一个新的进程。
>
> 这个进程中，网页需要加载数据、渲染页面等等，这些通力合作得到一个进程的任务叫线程
> 例如 HTTP 网络线程、页面渲染线程

* **用 node 来运行 js ，这可以称之为一个进程，但是 v8 默认只会开启一个线程来执行代码**

> 当然，在某些特殊情况下，v8 可以开启多线程，这里不作深入讨论

* v8 碰到一个耗时的任务，会将其**挂起**，然后先去执行不耗时的任务，最后找已经挂起的地方执行

> 挂起你可以理解为，把耗时的任务暂时"挂"在一边不管，CPU 先去干别的事，等耗时任务出结果，再继续执行

例如：

```js
let a = 1
setTimeout(() => {
    a = 2
}, 1000)
console.log(a) // 1
```

输出 1，这里的 `setTimeout()` 是一个定时器函数，1000 意思是设定 1s 后再触发箭头函数。这里异步任务被挂起，于是直接执行下面的输出语句。

### 回调

从一段代码入手。我们假设一个 a 是后端接口拿到的数据，拿到后就应当输出。

```js
let a = null
function a() {
    setTimeout(() => {
        a = 100
    }, 1000)
}
function b() {
    console.log(a)
}
a()
b()
```

如果像这样写，输出的将会是 `null`，这就是上面所说的**挂起**的问题，由于 `a()` 暂时被挂起，直接调用 `b()`，还没来得及接收后端数据。

也就是说，b 必须要等 a 执行完毕后再执行。那我直接把 b 函数的调用写进 a 函数里，不就行了？

```js
let a = null
function a() {
    setTimeout(() => {
        a = 100
        b()
    }, 1000)
}
function b() {
    console.log(a)
}
a()
```

这自然是可行的。这就叫所谓的**回调**：

- 当 B 函数需要依赖异步函数 A 的结果，我们将 B 函数的调用放在 A 里面
- 缺点:可维护性差，引起回调地狱

**回调地狱**: 当程序繁重，排查问题的难度大，可读性差。容易引起大规模崩盘。

不难理解，因为当一连串有先后关系的函数排队执行，其中一个函数更改了一些代码，就很容易出现其后续的一系列函数都没有输出值。

这实际上是把异步强行掰成了同步。为了避免回调地狱，我们使用 `Promise`。

## 回调的替代方案: Promise

Promise 也就是把回调引起的，把异步捋成同步的情况，纠正过来。

### 从嵌套到链式 — 两种写法的对比

假设我们有三个有严格先后关系的异步步骤：相亲成功 → 结婚 → 生子。如果用传统的嵌套方式写 `.then()`，会变成这样：

```js
xq().then(() => {
    marry().then(() => {
        baby()
    })
})
```

一层套一层，看起来还算能接受。但想象一下如果有五个、十个步骤——缩进会越来越深，括号越套越多，排查问题时眼睛都要花掉。这就是 Promise 的链式调用要解决的问题。

**正确写法**是把嵌套"拉平"：

```js
xq()
    .then(() => {
        return marry()
    })
    .then(() => {
        baby()
    })
```

关键就在那个 **`return`**——它告诉后面的 `.then()`："我返回了一个 Promise，你等我 resolve 了再执行。" 如果不写 `return`，后面的 `.then` 不会等待，顺序就乱了。

### 用点外卖来完整演示

我躺在家里，肚子一饿，打开外卖软件点了顿外卖 `order()`，商家做完之后送达我家 `deliver()`，我美美饱餐一顿 `eat()`。这三者有明显的逻辑关系，我们该怎么实现呢？

```js
function order() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('ordered')
            resolve()
        }, 2000)
    })
}
function deliver() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('delivered')
            resolve()
        }, 1000)
    })
}
function eat() {
    console.log('ate');
}
order()
    .then(() => {
        return deliver()
    })
    .then(() => {
        eat()
    })
```

我们来逐步解析这段代码的执行过程：

1. `order()` 调用，`new` 一个 `Promise()`，这时状态 `state = pending`，并且 `setTimeout` 启动 2s 倒计时，暂且不执行 `.then` 的回调
2. 2s 到了，打印 `'ordered'`，调用 `resolve()`，状态变为 `resolved`，触发 `.then` 回调，执行 `return deliver()`
3. `deliver()` 调用，又 `new` 一个新的 `Promise()`，状态为 `pending`，倒计时 1s，暂挂。1s 后打印 `'delivered'`，调用 `resolve()`，触发下一个 `.then`，执行 `eat()`
4. 打印 `'ate'`

最终输出：

```
ordered     ← 2秒后
delivered   ← 再过1秒
ate         ← 立刻
```

可以发现，每个 `.then` 等上一个 `return` 的 Promise `resolve` 后才执行，形成**异步任务串行链**。

### reject — 失败处理也不可少

现实中外卖可能会被取消、配送可能会超时——异步任务也有失败的时候。Promise 提供了 `reject` 来处理这种场景：

```js
function xq() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('fail')
            reject('a')              // 调用 reject，状态变为 rejected
        }, 2000)
    })
}

xq()
    .then(() => {
        console.log('success')       // 这行不会执行
    })
    .catch((err) => {
        console.log(err, 'pity')     // 输出: a pity
    })
```

| 调用 | 状态变化 | 接收方 | 典型场景 |
|------|----------|--------|----------|
| `resolve()` | pending → resolved | `.then()` | 请求成功、读取完成 |
| `reject()` | pending → rejected | `.catch()` | 网络超时、服务器报错、数据格式不对 |

`resolve` 走 then，`reject` 走 catch，Promise 的状态一旦改变就**不可逆转**，只会走其中一条路。

### Promise 的部分结构

官方的 Promise 是怎样实现这样的功能的？这里给一段简化版源码以供理解：

```js
function Promise(fn) {
    this.state = 'pending'
    this.arr = [foo]

    const resolve = (res) => {
        this.state = 'resolved'
        // foo(res)        // 状态变了之后，执行 arr 里存起来的回调
    }
    const reject = () => { }

    fn(resolve, reject)
}

new Promise((resolve, reject) => {
    resolve()
})
```

有三个关键点：

| 机制 | 说明 |
| --- | --- |
| `state` | Promise 的状态，初始为 `pending`，一旦改变就不可逆 |
| `arr` | `.then()` 的回调存进里面，等到 `resolve()` 后再执行 |
| `fn(resolve, reject)` | 你传入的函数立刻执行，`resolve` 和 `reject` 由 Promise 提供给你调用 |

## 总结

| 概念 | 一句话 |
|------|--------|
| 同步 | 一步接一步，前面的不完后面的不动 |
| 异步 | 碰到耗时任务就挂起，先去干别的，回头收摊 |
| 回调 | B 依赖 A 的结果，就把 B 塞进 A 里面 |
| 回调地狱 | 回调一层套一层，代码像金字塔，维护噩梦 |
| Promise | 把回调套回调的嵌套结构，拉平成 `.then().then()` 的链式结构 |
| resolve / reject | 成功走 then，失败走 catch，状态一旦变了就不会回头 |
| `return` Promise | 链式调用的灵魂——不写 `return`，后面的 `.then` 就不会等你 |

异步不是让代码跑得更快，而是让代码在等的时候不闲着。

> 从回调到 Promise，从嵌套到链式，JavaScript 异步编程的演进之路。用一个外卖订单的例子，吃透 resolve 与 reject。
