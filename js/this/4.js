// 隐式绑定规则
// 非独立调用
// function foo(){
//     console.log(this)
// }
// var obj = {
//     a: 1,
//     // 前一个`foo`是`key`可以随便写，后面的`foo`被 V8 看作变量
//     foo:foo      // 引用 `foo`
// }
// // 非独立调用，这里的`this`指向`obj`这个对象
// obj.foo()
//========================================================================
// 非独立调用其二，例子
// function foo(){
//     console.log(this.a)
// }
// var obj ={
//     a: 1,
//     // foo: foo()  // foo()里没用`return`，没值，是`undefined`
//     foo: foo 
// }
// // obj.foo()
// var oo ={
//     a: 2,
//     foo: obj.foo
// }
// oo.foo() // `this.a = 2`

//=======================================================================
// 就近原则，隐式丢失
function foo(){
    console.log(this.a)
}
var obj ={
    a: 1,
    foo: foo 
}
var oo ={
    a: 2,
    foo: obj
}
oo.foo.foo() 