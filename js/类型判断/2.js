let s = 'hello',
num = 123,
f = true,
u = undefined,
n=null,
sy=Symbol(1),
big=12343242n,
arr=[],
obj={},
fn=function(){}

// instanceof 用来判断是不是这种类型
console.log(arr instanceof Array)
// arr.__proto__ == Array.prototype
// Array.prototype.__proto__===Object.prototype，顺着原型继承链查找，直到找到 null，等式还不成立则返回 false


// console.log(n instanceof null) 报错，undefined 同理，官方打造的时候就没给他们 new 一个构造函数
console.log(s instanceof String)