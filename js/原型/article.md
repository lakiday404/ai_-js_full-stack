# 深入理解 JavaScript 原型与原型链

## 前言

原型是 JavaScript 中最核心的概念之一，理解原型机制对于掌握这门语言至关重要。本文将通过实际代码案例，带你从零开始彻底搞懂 JavaScript 的 prototype、__proto__ 以及原型链。所有的代码示例均来自我的学习笔记，建议大家动手敲一遍加深理解。

## 一、函数天生拥有 prototype

每个函数在创建时，天生就会拥有一个 `prototype` 属性，这个属性也是一个对象。我们可以将一些属性和方法挂载在原型上，这样所有实例对象都可以调用这些共用的属性和方法。

```javascript
// 1.js
Array.prototype.abc = function(){
    console.log('abc')
}

const arr = []    // new Array()
arr.unshift(1)
arr.abc()  // 输出: 'abc'

const num = 123   // new Number()
// num.unshift(0)    // Number.prototype 里没有这个方法，报错
```

在上面的例子中，我们给 `Array.prototype` 添加了一个 `abc` 方法，所有数组实例都可以调用它。这就是原型的魅力——**共用的属性和方法添加在原型上，可以减少构造函数在执行时的性能开销**。

## 二、new 的工作原理

当我们使用 `new` 关键字调用构造函数时，JavaScript 引擎做了以下四件事：

```javascript
// 3.js
Person.prototype.say = function(){
    console.log('I am cool')
}
function Person(){
    this.name = 'qiang'
}
const P = new Person() // p.__proto__ === Person.prototype

P.say()
console.log(P)
```

`new` 的工作原理：

1. **创建空对象**：凭空创建一个 `this` 对象
2. **执行构造函数**：执行函数中的代码
3. **建立原型链接**：让隐式原型等于显式原型 `this.__proto__ = 对象.prototype`
4. **返回对象**：返回这个对象 `return this`

## 三、显式原型与隐式原型

```javascript
// 2.js
Car.prototype.name = 'su7'
Car.prototype.lang = '4800'
Car.prototype.width = '1400'

function Car(color){
    this.color = color
}
Car.name = 'weilai'
const car = new Car('blue')
console.log(car)
console.log(car.__proto__);
```

这里涉及两个重要概念：

- **显式原型（prototype）**：构造函数天生拥有的属性，指向一个原型对象
- **隐式原型（__proto__）**：每个实例对象都拥有的属性，指向构造函数的 prototype

```javascript
car.__proto__ === Car.prototype  // true
```

**重要理解**：实例对象的显式原型和隐式原型实际上是同一个对象，因为 `this.__proto__ = 对象.prototype` 执行的是赋值语句，它们指向同一块内存。

## 四、constructor 构造器属性

每个原型对象天生拥有一个 `constructor` 属性，记录该实例对象是由哪个构造函数创建的：

```javascript
function Person() {}
console.log(Person.prototype.constructor === Person)  // true
```

## 五、原型链继承

原型链是 JavaScript 中最独特的继承方式。当访问对象的某个属性时：

```javascript
// 4.js
Grand.prototype.house = function(){
    console.log('big house');
}
function Grand(){
    this.card = 100000000
}

function Father() {
    this.lastName = '张'
}
Father.prototype = new Grand()

Child.prototype = new Father()

function Child() {
    this.age = 18
}

const p = new Child()
console.log(p.lastName)  // '张'
p.house()                 // 'big house'
```

### 原型链查找机制

当 v8 查找实例对象的某个属性值时：

1. 先在对象**自身**查找
2. 找不到就去**隐式原型**（`实例.__proto__`）上找，也就是构造函数的 `prototype`
3. 还找不到就继续往上找 `构造函数.prototype.__proto__`
4. 直到找到 `Object.prototype.__proto__` 为 `null`
5. 如果还找不到，返回 `undefined`

用代码表示：

```
p.__proto__ = Child.prototype
           = new Father() 的 __proto__ = Father.prototype
           = new Grand() 的 __proto__ = Grand.prototype
           = new Object() 的 __proto__ = Object.prototype
           = null
```

### 完整的原型链图

```
┌─────────────────────────────────────────────────────────────┐
│                         Object.prototype                     │
│                              │                               │
│                              │ __proto__                     │
│                              ▼                               │
│  实例p ──__proto__──▶ Father.prototype ──__proto__──▶ Grand.prototype │
│                              │                               │
│                              ▼                               │
│                         null (原型链终点)                     │
└─────────────────────────────────────────────────────────────┘
```

## 六、Object.prototype 的特殊性

**任何对象最终都继承自 Object.prototype（原型为 null）**

这是一个非常重要的结论：

```javascript
function Foo() {}
const f = new Foo()

// f → Foo.prototype → Object.prototype → null
```

同样，**Function 函数也比较特殊**：

```javascript
// function foo() -> Function() <-> Function()
// Function() 的显式原型是它自己
Function.__proto__ = Function.prototype  // true

// 最终找到 Function.prototype.__proto__ = Object.prototype
```

## 七、实例对象与原型属性的关系

```javascript
// 2.js 完整示例
Car.prototype.name = 'su7'
Car.prototype.lang = '4800'
Car.prototype.width = '1400'

function Car(color){
    this.color = color
}

const car = new Car('blue')
console.log(car.name)      // 'su7'（从原型上查找）
console.log(car.color)     // 'blue'（自身属性）
```

**关键点**：

- 实例对象中**显式拥有**的属性，来自于构造函数中定义的属性
- 实例对象中**隐式拥有**的属性，来自于构造函数的 `prototype`
- **实例对象无法修改原型上的属性值**（只会添加一个自身属性覆盖它）

## 八、总结

| 概念 | 说明 |
|------|------|
| `prototype` | 构造函数天生拥有，指向原型对象 |
| `__proto__` | 实例对象天生拥有，指向构造函数的 prototype |
| `constructor` | 原型对象天生拥有，指向构造函数 |
| 原型链 | 对象查找属性的链路，从自身到 Object.prototype |
| `new` | 创建实例对象时，建立 __proto__ 链接 |

理解原型与原型链，是深入 JavaScript 的必经之路。原型链的查找机制保证了对象可以继承父级的属性和方法，而将共用的方法放在原型上，也是前端面试中的高频考点。**纸上得来终觉浅，绝知此事要躬行**——建议大家根据文中的例子动手实践，彻底消化这些概念！
