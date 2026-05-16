# JavaScript 基础语法

## 1. 变量声明

```js
var a = 1;          // 函数作用域，可重复声明（不推荐）
let b = 2;          // 块级作用域，不可重复声明
const c = 3;        // 块级作用域，常量，不可重新赋值
```

## 2. 数据类型

- **基本类型**：`number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`
- **引用类型**：`object`（包括 `Array`、`Function`、`Date`、`RegExp` 等）

```js
typeof 42            // 'number'
typeof 'hello'       // 'string'
typeof true          // 'boolean'
typeof undefined     // 'undefined'
typeof null          // 'object' (历史遗留问题)
typeof []            // 'object'
```

## 3. 类型转换

```js
// 转字符串
String(123)          // '123'
(123).toString()     // '123'

// 转数字
Number('123')        // 123
parseInt('123px')    // 123
parseFloat('3.14')   // 3.14

// 转布尔
Boolean(0)           // false
Boolean('')          // false
Boolean(null)        // false
Boolean(undefined)   // false
Boolean(NaN)         // false
Boolean([])          // true (空数组为 true)
```

## 4. 运算符

```js
// 算术运算符
+ - * / % **        // 加、减、乘、除、取余、幂

// 比较运算符
== === != !== > < >= <=
// === 严格相等（值和类型都相等）
// == 宽松相等（会做类型转换）

// 逻辑运算符
&& || !             // 与、或、非

// 三元运算符
condition ? expr1 : expr2
```

## 5. 字符串

```js
let str = 'hello'
let str2 = "world"
let str3 = `hello ${str2}`  // 模板字符串

str.length                  // 字符串长度
str[0]                      // 访问字符
str.charAt(0)               // 访问字符
str.indexOf('e')            // 查找索引
str.slice(0, 2)             // 截取 'he'
str.substring(0, 2)         // 截取 'he'
str.toUpperCase()           // 转大写
str.toLowerCase()           // 转小写
str.split('')               // 转数组 ['h','e','l','l','o']
str.replace('l', 'x')       // 替换
str.includes('ell')         // 是否包含
str.trim()                  // 去除首尾空格
```

## 6. 数组

```js
let arr = [1, 2, 3, 4, 5]

arr.length                  // 数组长度
arr[0]                      // 访问元素
arr.push(6)                 // 末尾添加
arr.pop()                   // 末尾删除
arr.unshift(0)              // 开头添加
arr.shift()                 // 开头删除
arr.indexOf(3)              // 查找索引
arr.includes(3)             // 是否包含
arr.slice(1, 3)             // 截取 [2, 3]
arr.splice(1, 2)            // 删除并返回 [2, 3]
arr.concat([6, 7])          // 合并数组
arr.join('-')               // 转字符串 '1-2-3-4-5'
arr.reverse()               // 反转
arr.sort()                  // 排序

// 遍历方法
arr.forEach((item, index) => {})
arr.map((item, index) => item * 2)       // 映射新数组
arr.filter(item => item > 2)             // 过滤
arr.reduce((acc, cur) => acc + cur, 0)   // 累加
arr.some(item => item > 3)               // 是否有满足条件的
arr.every(item => item > 0)              // 是否全部满足
arr.find(item => item > 3)               // 查找第一个满足条件的
arr.findIndex(item => item > 3)          // 查找索引
```

## 7. 对象

```js
let obj = {
  name: 'Alice',
  age: 25,
  greet() {
    console.log(`Hello, I'm ${this.name}`)
  }
}

obj.name                  // 访问属性
obj['name']               // 访问属性
obj.age = 26              // 修改属性
delete obj.age            // 删除属性
'name' in obj             // 检查属性是否存在
Object.keys(obj)          // 获取所有键
Object.values(obj)        // 获取所有值
Object.entries(obj)       // 获取所有键值对
```

## 8. 函数

```js
// 函数声明
function add(a, b) {
  return a + b
}

// 函数表达式
const add = function(a, b) {
  return a + b
}

// 箭头函数
const add = (a, b) => a + b
const square = x => x * x

// 默认参数
function greet(name = 'World') {
  return `Hello ${name}`
}

// 剩余参数
function sum(...nums) {
  return nums.reduce((a, b) => a + b)
}

// 立即执行函数 (IIFE)
;(function() {
  console.log('立即执行')
})()
```

## 9. 条件语句

```js
// if-else
if (condition) {
  // ...
} else if (condition2) {
  // ...
} else {
  // ...
}

// switch
switch (value) {
  case 1:
    break
  case 2:
    break
  default:
}

// 三元表达式
const result = condition ? value1 : value2
```

## 10. 循环

```js
// for
for (let i = 0; i < 5; i++) {}

// for...of (遍历可迭代对象)
for (const item of arr) {}

// for...in (遍历对象键)
for (const key in obj) {}

// while
while (condition) {}

// do...while
do {} while (condition)
```

## 11. 解构赋值

```js
// 数组解构
const [a, b, c] = [1, 2, 3]
const [first, ...rest] = [1, 2, 3, 4]

// 对象解构
const { name, age } = { name: 'Alice', age: 25 }
const { name: userName } = { name: 'Alice' }  // 重命名
```

## 12. 展开运算符

```js
// 数组展开
const arr1 = [1, 2, 3]
const arr2 = [...arr1, 4, 5]     // [1, 2, 3, 4, 5]

// 对象展开
const obj1 = { a: 1, b: 2 }
const obj2 = { ...obj1, c: 3 }   // { a: 1, b: 2, c: 3 }
```

## 13. 异步编程

```js
// Promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000)
})
promise.then(result => console.log(result))

// async/await
async function fetchData() {
  try {
    const result = await promise
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
```

## 14. 常用工具方法

```js
// 计时
console.time('label')
// ... 执行代码
console.timeEnd('label')

// 类型判断
Array.isArray([])              // true
isNaN(NaN)                     // true
Number.isFinite(Infinity)      // false

// JSON
JSON.stringify(obj)            // 对象转 JSON 字符串
JSON.parse(jsonStr)            // JSON 字符串转对象
```

## 15. 严格模式

```js
'use strict'
// 消除 JavaScript 语法不合理之处
// 变量必须声明后才能使用
// 禁止 this 指向全局对象
```