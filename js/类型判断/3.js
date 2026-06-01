// let s = 'hello',
// num = 123,
// f = true,
// u = undefined,
// n=null,
// sy=Symbol(1),
// big=12343242n,
// arr=[],
// obj={},
// fn=function(){}

// console.log(Object.prototype.toString.call(fn).slice(8,-1))
// //  输出的结果是 字符串  [object String]


// Object.prototype.toString = function(){
//     const O = ToObject(this)  // this == {}
//     const class = O.[[class]] // {[[class]]:Object}
//     return "[Object"+class+"]"
// }

Object.prototype.toString.call(123)