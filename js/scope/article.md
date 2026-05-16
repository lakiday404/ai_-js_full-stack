# 🚀 JS 入门第一课：彻底搞懂 JavaScript 作用域

## 一、什么是 JS 引擎？

JavaScript 代码的执行离不开引擎，目前最主流的是 **V8 引擎**：

- **浏览器 V8 引擎**：谷歌浏览器内置的 JS 引擎，是目前最快的 JS 引擎之一
- **Node.js V8 引擎**：源自谷歌，用于服务端运行 JS

> 💡 **小贴士**：V8 并不是指 8 个引擎，而是版本代号。它采用即时编译（JIT）技术，能将 JS 代码直接编译成机器码执行。

---

## 二、JS 的执行过程

V8 引擎执行 JS 代码分为以下 4 个阶段：

### 1️⃣ 编译阶段
- **分词**（词法分析）：把代码拆分成一个个**词法单元**（如 `var`、`function`、变量名等）
- **解析**（语法分析）：将词法单元组织成 **抽象语法树（AST）**

### 2️⃣ 执行阶段
- 根据 AST 生成可执行代码并运行

> 🎯 **关键点**：JS 是**解释型语言**，但 V8 会先编译再执行，这也是为什么会有"声明提升"现象。

---

## 三、JS 声明提升（Hoisting）

**什么是声明提升？**  
JS 在编译阶段会将变量声明和函数声明提升到当前作用域的顶部，但赋值留在原地。

```javascript
console.log(a)  // undefined（不会报错）
var a = 10
```

**为什么不会报错？**  
因为编译后代码变成了这样：
```javascript
var a           // 声明提升
console.log(a)  // undefined（变量存在但未赋值）
a = 10          // 赋值留在原地
```

**注意**：如果直接输出一个从未声明的变量，才会报错 `ReferenceError`。

---

## 四、JS 作用域详解

**作用域**：变量的可访问范围。JS 中有三种作用域：

### 1️⃣ 全局作用域
- 代码最外层声明的变量，整个代码都能访问
- 在浏览器中，全局变量会挂载到 `window` 对象上

```javascript
var globalVar = '我是全局变量'

function test() {
    console.log(globalVar)  // ✅ 可以访问
}
test()  // 输出：我是全局变量
```

### 2️⃣ 函数作用域
- 在函数内部用 `var` 声明的变量，只在函数内部有效
- 函数的参数也是函数作用域的一部分

```javascript
function test() {
    var localVar = '我是局部变量'
    console.log(localVar)  // ✅ 可以访问
}
test()
console.log(localVar)       // ❌ 报错！访问不到
```

### 3️⃣ 块级作用域（ES6 新增）
- ES6 引入 `let` 和 `const`，使得 `{}` 代码块也能形成独立作用域
- 循环语句、条件语句中的 `let` 变量不会泄露到外部

```javascript
for (let i = 0; i < 3; i++) {
    // i 只在循环内部有效
}
console.log(i)  // ❌ 报错！i is not defined
```

---

## 五、作用域链

当 JS 查找变量时，会遵循**作用域链**规则：

1. **先在当前作用域找**
2. **找不到 → 往上一层找**
3. **直到全局作用域**
4. **还找不到 → 报错**

```javascript
var name = '全局'

function outer() {
    var name = '外层'
    
    function inner() {
        var name = '内层'
        console.log(name)  // 输出：内层（最近的）
    }
    
    function inner2() {
        console.log(name)  // 输出：外层（往上找）
    }
    
    inner()
    inner2()
}
outer()
console.log(name)  // 输出：全局（最外层）
```

---

## 六、var vs let vs const 对比

| 特性 | var | let | const |
|------|-----|-----|-------|
| 作用域 | 函数作用域 | 块级作用域 | 块级作用域 |
| 重复声明 | ✅ 允许 | ❌ 报错 | ❌ 报错 |
| 声明提升 | ✅ 有 | ❌ 暂时性死区 | ❌ 暂时性死区 |
| 重新赋值 | ✅ 允许 | ✅ 允许 | ❌ 不允许 |

### 📌 使用建议
- **var**：尽量避免使用，容易造成变量泄露
- **let**：用于需要重新赋值的变量
- **const**：用于不需要重新赋值的变量（推荐优先使用）

---

## 七、经典面试题：for 循环与 setTimeout

### 问题
```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i)
    }, 100)
}
// 输出：3, 3, 3（为什么？）
```

### 原因
- `var` 声明的 `i` 是函数作用域，只有一个
- `setTimeout` 是异步的，等它执行时，循环已经结束，`i` 变成了 `3`

### 解决方法（用 let）
```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i)
    }, 100)
}
// 输出：0, 1, 2（正确！）
```

**原因**：`let` 有块级作用域，每次循环都会创建一个独立的 `i`。

---

## 八、总结

1. **JS 引擎**：V8 引擎负责编译和执行 JS 代码
2. **执行过程**：编译（分词→解析）→ 执行
3. **声明提升**：变量/函数声明会提升到作用域顶部
4. **三种作用域**：全局作用域、函数作用域、块级作用域（ES6）
5. **作用域链**：查找变量时逐级向上查找
6. **声明方式**：优先使用 `const`，其次 `let`，避免 `var`

> 📚 **延伸阅读**：[ES6 入门教程 - 阮一峰](https://es6.ruanyifeng.com/#docs/intro)

---

如果觉得本文对你有帮助，欢迎点赞、收藏、关注！你的支持是我创作的动力 💪
