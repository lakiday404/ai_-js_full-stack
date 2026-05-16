# JavaScript 预编译深度解析

---

## 一、V8 引擎工作流程

JavaScript 代码执行前，V8 引擎会经历三个阶段：

1. **分词（Tokenization）**
   - 将源码分解为词法单元（如关键字、标识符、运算符等）
   - 例如：`var a = 1` → `['var', 'a', '=', '1']`

2. **语法分析（Parsing）**
   - 根据词法单元构建抽象语法树（AST）
   - 验证语法正确性，报错则终止执行

3. **代码生成（Code Generation）**
   - 将 AST 转换为机器码或字节码
   - 预编译过程发生在此阶段之前

---

## 二、核心概念：变量提升（Hoisting）

### 2.1 变量声明提升

`var` 声明的变量会提升到当前作用域顶部，但**赋值操作不会提升**：

```javascript
console.log(a); // undefined（声明提升，赋值未提升）
var a = 1;

// 等价于：
var a;
console.log(a);
a = 1;
```

### 2.2 函数声明提升

函数声明会完整提升（包括函数体）：

```javascript
fn(); // "Hello"
function fn() {
  console.log("Hello");
}
```

### 2.3 优先级规则

| 提升类型 | 优先级 | 说明 |
|---------|--------|------|
| 函数声明 | 最高 | 会覆盖同名变量声明 |
| 变量声明 | 中等 | 仅声明被提升 |
| 赋值操作 | 最低 | 执行阶段才生效 |

---

## 三、执行上下文

### 3.1 函数体内的预编译（AO 对象）

**AO（Activation Object）：活动对象**

当 V8 引擎遇到函数调用时，会创建 AO 对象并执行以下步骤：

1. **创建 AO 对象**
   ```javascript
   AO = {}
   ```

2. **找形参和变量声明**
   - 将形参和变量名作为 AO 属性
   - 值初始化为 `undefined`

3. **形参和实参统一**
   - 将实参值赋给对应的形参

4. **找函数声明**
   - 将函数名作为 AO 属性
   - 函数体作为属性值（会覆盖同名变量）

**示例解析：**

```javascript
function fn(a) {
  console.log(a);      // function a() {}
  var a = 123;
  console.log(a);      // 123
  function a() {}
}
fn(1);

// AO 演变过程：
// 1. AO = {}
// 2. AO = {a: undefined}
// 3. AO = {a: 1}
// 4. AO = {a: function a(){}}
// 执行阶段：AO = {a: 123}
```

### 3.2 全局预编译（GO 对象）

**GO（Global Object）：全局对象**

页面加载时创建，遵循以下步骤：

1. **创建 GO 对象**
   ```javascript
   GO = {}
   ```

2. **找全局变量声明**
   - 将变量名作为 GO 属性，值为 `undefined`

3. **找全局函数声明**
   - 将函数名作为 GO 属性，函数体作为值

4. **执行全局代码**
   - 遇到函数调用时，创建对应的 AO 对象

**示例解析：**

```javascript
var a;
var b = 2;
function a() {
  console.log(a);   // undefined
  var c = 3;
  var a = b;
  function c() {}
  console.log(c);   // 3
}
a();

// GO 初始状态：
// GO = {a: function a(){}, b: undefined}
// 执行赋值后：GO = {a: function a(){}, b: 2}
```

---

## 四、作用域链与变量查找

### 4.1 作用域链规则

当访问一个变量时，JavaScript 引擎按以下顺序查找：

1. **当前 AO 对象** → 查找变量
2. **外层函数 AO 对象** → 逐层向上查找
3. **GO 对象** → 全局作用域
4. **未找到** → 抛出 `ReferenceError`

### 4.2 变量遮蔽（Shadowing）

内层变量会遮蔽同名外层变量：

```javascript
var global = 100;
function fn() {
  console.log(global);  // undefined（被局部变量遮蔽）
  global = 200;
  var global = 300;    // 声明局部变量
}
fn();

// AO = {global: undefined} → {global: 200} → {global: 300}
```

---

## 五、经典面试题深度解析

### 题目 1：变量提升与函数声明优先级

```javascript
var a = 1;
function fn() {
  console.log(a);  // undefined
  var a = 2;
  function a() {}
}
fn();
```

**解析：**
- `fn()` 执行前创建 AO：`{a: undefined}`
- 函数声明 `function a(){}` 覆盖：`{a: function a(){}}`
- `console.log(a)` 输出 `function a(){}`
- 赋值 `a = 2` 后：`{a: 2}`

### 题目 2：参数、变量与函数的关系

```javascript
function foo(a, b) {
  console.log(b);  // function b() {}
  c = 0;
  var c;
  console.log(a);  // 1
  a = 3;
  b = 2;
  console.log(b);  // 2
  function b() {}
  console.log(b);  // 2
}
foo(1);
```

**解析：**
- AO 初始：`{a: undefined, b: undefined, c: undefined}`
- 实参赋值：`{a: 1, b: undefined, c: undefined}`
- 函数声明覆盖：`{a: 1, b: function b(){}, c: undefined}`
- 执行 `c = 0`：`{a: 1, b: function b(){}, c: 0}`
- 执行 `b = 2`：`{a: 3, b: 2, c: 0}`

### 题目 3：全局与局部的交互

```javascript
var a;
function a() {
  console.log(a);   // undefined
  var c = 3;
  var a = b;       // b 来自外层 GO，值为 2
  function c() {}
  console.log(c);  // 3
}
var b = 2;
a();
console.log(a);    // function a(){}
```

**解析：**
- GO：`{a: function a(){}, b: undefined}` → `{a: function a(){}, b: 2}`
- AO（a 函数内）：`{c: undefined, a: undefined}`
- 函数声明覆盖：`{c: function c(){}, a: undefined}`
- 执行 `var a = b`：`{c: function c(){}, a: 2}`（b 从 GO 查找）
- 执行 `var c = 3`：`{c: 3, a: 2}`

---

## 六、预编译总结

### 核心要点

1. **预编译发生在执行之前**
2. **变量提升只提升声明，不提升赋值**
3. **函数声明完整提升，优先级高于变量**
4. **AO 管理函数内部，GO 管理全局**
5. **变量查找遵循作用域链**

### 记忆口诀

> **先声明，后赋值，函数优先**  
> **AO 管函数内，GO 管全局**  
> **执行时才赋值，预编译只提升**  
> **作用域链层层找，内层遮蔽外层**

---

## 七、ES6 中的变化

ES6 引入 `let` 和 `const` 后，变量提升规则有所变化：

- **暂时性死区（TDZ）**：`let/const` 声明的变量在声明前访问会报错
- **块级作用域**：`let/const` 声明的变量只在块级作用域内有效

```javascript
console.log(x); // ReferenceError（TDZ）
let x = 1;
```

---

## 八、执行上下文的完整结构

执行上下文（Execution Context）包含三个核心部分：

### 8.1 变量对象（Variable Object）

- **AO（Activation Object）**：函数执行时的变量对象
- **GO（Global Object）**：全局执行时的变量对象
- **包含内容**：变量声明、函数声明、函数参数

### 8.2 作用域链（Scope Chain）

- 当前执行上下文的变量对象 + 所有外层执行上下文的变量对象
- 决定了变量查找的顺序

### 8.3 this 绑定

- **全局上下文**：`this` 指向全局对象（浏览器中为 `window`）
- **函数上下文**：`this` 取决于调用方式

---

## 九、词法环境与变量环境

ES6 规范中引入了更精确的概念：

### 9.1 词法环境（Lexical Environment）

```javascript
{
  outer: 外层词法环境引用,
  environmentRecord: {
    // 存储变量和函数声明
  }
}
```

### 9.2 变量环境（Variable Environment）

- 与词法环境结构相同
- **区别**：仅存储 `var` 声明的变量
- `let/const` 声明的变量存储在词法环境中

---

## 十、函数表达式与函数声明

### 10.1 区别

| 特性 | 函数声明 | 函数表达式 |
|------|---------|-----------|
| 提升 | 完整提升 | 仅变量提升，函数体不提升 |
| 作用域 | 声明所在作用域 | 表达式所在作用域 |
| 名称 | 必须有名称 | 可匿名 |

### 10.2 示例

```javascript
// 函数声明 - 完整提升
fn1(); // "Function Declaration"
function fn1() {
  console.log("Function Declaration");
}

// 函数表达式 - 仅变量提升
fn2(); // TypeError: fn2 is not a function
var fn2 = function() {
  console.log("Function Expression");
};
```

---

## 十一、立即执行函数表达式（IIFE）

### 11.1 语法

```javascript
// 方式1：括号包裹
(function() {
  var x = 10;
  console.log(x);
})();

// 方式2：使用运算符
!function() {
  console.log("IIFE");
}();
```

### 11.2 作用

- 创建独立作用域，避免污染全局命名空间
- 模块化开发的基础（在 ES6 模块之前）

---

## 十二、闭包与预编译

### 12.1 闭包的形成

当内部函数引用了外部函数的变量时，就形成了闭包：

```javascript
function outer() {
  var x = 10;
  return function inner() {
    console.log(x); // 闭包：inner 引用了 outer 的 x
  };
}
var fn = outer();
fn(); // 10
```

### 12.2 闭包与 AO

- 外部函数执行完毕后，其 AO 不会被垃圾回收
- 因为内部函数仍然持有对它的引用

---

## 十三、严格模式下的预编译

### 13.1 变化

1. **禁止隐式全局变量**：未声明的变量赋值会报错
2. **禁止 `with` 语句**：影响作用域链
3. **`this` 绑定不同**：全局上下文中 `this` 为 `undefined`

### 13.2 示例

```javascript
"use strict";
x = 10; // ReferenceError: x is not defined
```

---

## 十四、高级面试题

### 题目 4：闭包与循环

```javascript
var arr = [];
for (var i = 0; i < 3; i++) {
  arr[i] = function() {
    console.log(i);
  };
}
arr[0](); // 3
arr[1](); // 3
arr[2](); // 3
```

**解析：**
- 三个函数共享同一个 AO（外层作用域）
- 循环结束时 `i = 3`
- 调用时都输出 3

**解决方案：**
```javascript
// 使用 IIFE
var arr = [];
for (var i = 0; i < 3; i++) {
  (function(j) {
    arr[j] = function() {
      console.log(j);
    };
  })(i);
}
arr[0](); // 0
arr[1](); // 1
arr[2](); // 2
```

### 题目 5：变量提升与闭包

```javascript
function fn() {
  var a = 1;
  return {
    getA: function() {
      return a;
    },
    setA: function(val) {
      a = val;
    }
  };
}
var obj = fn();
console.log(obj.getA()); // 1
obj.setA(2);
console.log(obj.getA()); // 2
```

**解析：**
- `getA` 和 `setA` 形成闭包，共享 `fn` 的 AO
- `a` 的值在闭包中被持久化

---

## 十五、性能优化建议

### 15.1 减少作用域链查找

```javascript
// 优化前：每次都要向上查找
function loop() {
  for (var i = 0; i < 10000; i++) {
    console.log(document.body);
  }
}

// 优化后：缓存到局部变量
function loop() {
  var body = document.body;
  for (var i = 0; i < 10000; i++) {
    console.log(body);
  }
}
```

### 15.2 合理使用闭包

- 避免不必要的闭包创建
- 注意内存泄漏风险

---

**作者：** 学习笔记  
**日期：** 2026年  
**来源：** JavaScript 预编译学习整理