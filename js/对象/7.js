// Number.prototype = {
//     abc : function(){} 
// }

// const n = 123    
// n.abc()
//=============================================================================
// 想要修改字符串的长度，只能动它的底层——原型函数
// String.prototype = {
//     // len : 5   不可以直接这么写 
// }

String.prototype.len = 5      //当然实际不要这样写，后患无穷。

const str = 'hello'
console.log(str.len)