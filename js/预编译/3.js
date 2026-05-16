function foo(a, b) {
  console.log(b);  //function b() {}
  c = 0
  var c
  console.log(a);  //1
  a = 3
  b = 2
  console.log(b);  //2
  function b() {}
  console.log(b);  //2
}
foo(1)

// AO：{
//     a:undefined,1,3
//     b:undefined,functionb() {}，2
//     c:undefined,0

// }
