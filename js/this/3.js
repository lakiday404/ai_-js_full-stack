// 用 `var` 声明的变量，默认等同于添加到全局里面，var a = 1 === window: { a : 1}
var a = 1
function foo(){
    console.log(this.a)
} 
function bar(){
    var a = 2
    foo()
}
bar()

// function fo() { console.log(this) }
// var test = {
//     a: 1,
//     fo: fo      // ✅ 属性名 fo，值为外部函数 fo
// }

// test.fo()       // 非独立调用，this = test
// fo()            // 独立调用，this = window (严格模式为 undefined)