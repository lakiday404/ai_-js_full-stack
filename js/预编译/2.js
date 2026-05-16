function fn(a) {
  console.log(a);  //function a() {}
  var a = 123
  console.log(a);  //123
  function a() {}

  var b = function() {}
  console.log(b);  //functionb() {}
  function c() {}
  var c = a
  console.log(c);//123
}
fn(1)

// AO{
// a : undefined,1,function a() {},123
// b : undefined,function(){},
// c : undefined,function c() {},123

// }

