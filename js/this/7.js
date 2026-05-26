//  箭头函数 

// // 函数声明
// function foo(){
//     console.log(this);
// }
// foo()

// // 函数表达式
// var bar = function(){
// }
// bar()


// 和普通函数差不多
// var baz = () =>{

// }

// 和普通函数的区别 
// 箭头函数中没有`this`,所以写在里面也不是该函数的`this`,因此指向`window`
// var fn = () =>{
//     console.log(this.a);
// }
// var obj ={
//     a :1,
//     fn: fn
// }
// obj.fn()

// 箭头函数内的 `this`是其外部非箭头函数的`this`
function foo(){
    var fn = ()=>{
        this.a = 2

    }
    fn()
}
var obj ={
    a: 1,
    bar: foo
}
obj.bar()
console.log(obj);
