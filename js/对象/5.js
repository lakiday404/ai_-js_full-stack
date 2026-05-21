// const str = 'hello'       // 创建了一个字符串字面量
// //   相当于 const str = new String('hello')
// // string 是原始类型，不能拥有属性和方法

// str.name = 'qiqi'       // str.name = 'qiqi' 

// //  在变量被拿去使用之前，依照原始类型不能添加属性和方法的原则，把 name 属性移除掉
// // V8会执行delete str.name

// console.log(str)   // 输出的是这个：str.[[PrimitiveValue]]
// console.log(str.name)   // undefined
//============================================================================

var str = 'abc'     // const strObj = new String('abc')
str.length = 4       // strObj.length = '4'   delete strObj.length
console.log(str.length)

strObj = {
    // str.length = 4 被删除，找不到
}
// __proto__:String.prototype   本身自带的一定有的，但不会写出来