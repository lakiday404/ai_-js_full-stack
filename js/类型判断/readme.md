# JavaScript 类型判断
## 前情提要，快速回忆一遍 js 类型
跳转上文：[万物皆对象？带你梳理JS原型及其查找链机制](https://juejin.cn/post/7642251240038842410) 带你快速回忆 js 类型
推荐阅读 https://es5.github.io/#x15.2.4.2
1. 引用类型: Array,function,object,date
2. 原始类型: number,bigint,string,symbol,boolean,undefined,null

## 从一段代码带你沉浸式体验`typeof()`
1.js

-  typeof()  
1. typeof 可以准确的判断除了  `null` 之外的所有原始类型
2. typeof 把所有的 引用类型 都看作 `object`，除了 `function()`

**`typeof`是通过将值转换为二进制的形式，来判断类型的，二进制的前三位是 0 的被统一认为是引用类型，在计算机中，所有的引用类型被转换为二进制的前三位都是 0 ，而`null` 被转换为二进制是一整串 0**

> `typeof` 在判断这个值的内容时，会先进行二进制转换，而所有的引用类型被转换为二进制时，前三位都是 0 ，function 除外，更特殊一些。
> `typeof` 被打造的时候没有考虑到 `null`，`null`的二进制是一大串 0  (多少个 0 取决于多少位操作系统)，因此依照上文所说被判定为 `object`
## instanceof
2.js
**`instanceof`只能判断引用类型,无法判断原始类型 **
判断原理:顺着原型继承链往上找，如果最终左右两边相等，则返回`true`


```
console.log(arr instanceof Array)
// arr.__proto__ == Array.prototype
// Array.prototype.__proto__===Object.prototype，顺着原型继承链查找，直到找到 null，等式还不成立则返回 false
```

`Object.prototype.__proto__ == null`

感觉可以了？我们不妨来手搓一份简易版源码，加深一下对typeof ()  工作原理:
instanceof.js

### instanceof 核心特性
1. 只能判断引用类型，无法判断原始类型
2. 通过隐式原型链查找 x 是否隶属于 x 这个类型



## Object.prototype.toString.call()
### Object.prototype.toString
3.js

### 为什么可以这么写
**官方写的 toString 有什么用**
15.2.4.2



Object.prototype.toString ( ) # Ⓣ Ⓔ Ⓡ
When the toString method is called, the following steps are taken:
1. If the this value is undefined, return "[object Undefined]".
2. If the this value is null, return "[object Null]".
3. Let O be the result of calling ToObject passing the this value as the argument.
4. Let class be the value of the [[Class]] internal property of O.
5. Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".

1. 如果 this 值为 undefined，则返回 "[object Undefined]"
2. 如果 为 null，则返回 "[object Null]"
3. 令 O 为调用 ToObject 并将 this 值作为参数传递所得到的结果
  // const O = ToObject(this)
  // O  永远都是 Object
  // O 要么是 String 对象，要么是 Number对象，要么是 Boolean 对象
4. 令 class 为 O 的 [[Class]]内部属性的值
  // const class = O.[[class]]
5. 返回将三个字符串 [object class ]
### Object.prototype.toString.call()

const obj ={

}

## Array.isArray()
数组天生构造了一个函数，专门判断是否为数组
`Array.isArray()` 挂在了自己这个函数上，因此其实例对象无法访问，仅仅它自己可以访问
例如:
```
const arr = []
arr.isArray // 就不行 
```