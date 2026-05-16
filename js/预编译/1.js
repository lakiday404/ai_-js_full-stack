// console.log(a)
// var a = 1

// 在编译时，会这样：
// var a
// console.log(a)
// a=1 
// 因此输出的不是报错，而是undefined
// 这就是声明提升，变量声明提升到当前作用域顶部，但是赋值操作不会提升
// GO : {
//   a:undefined
// }
var a = 1
function fn() {
  console.log(a);
  var a = 2
  function a() {}
}
// AO : {
//   a : undefined function a(){} 2,
// }
fn()