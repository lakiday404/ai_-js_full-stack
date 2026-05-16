GO : {
    //对象除非最后一个不打逗号，其他的都要打逗号 
    // a = undefined function a(){} ,
    // b = undefined

}

var a 
var b = 2
function a () {
  console.log(a);   //undifined
  var c = 3
  var a = b       //b函数体内没用定义，于是到外层去找，为2
  function c() {}
  console.log(c);      //3
}

//要执行a（）了，于是对a（）{}进行预编译
// //AO : {
    //   c : undefined  function c(){} 3,
    //   a : undefined 2,

// }
a()               
console.log(a);    