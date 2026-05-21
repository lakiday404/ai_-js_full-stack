// 2.构造函数创建对象
// const obj = new Object()     // js 中已经封装好了 Object() 函数
// obj.name = 'qiqi'
// console.log(obj)

//===============================================================================
// 3.new 一个函数来创建对象

function Person(){

}
// Person()

// 用new调用的这个函数，这样一定会得到一个返回值
// 会 return 输出 Person{} 
const obj = new Person()
console.log(obj)