// new 绑定
function Person(){
    // var obj = {}      new创建一个空对象obj
    // Person.call(obj)  让Person()的this全部指向obj
    this.name = 'jie'
    // 执行代码
    // 让`obj`的隐式原型`obj.__proto__` == 构造函数的显示原型 `Person.prototype`
    // return obj
}
const p = new Person()
console.log(obj)