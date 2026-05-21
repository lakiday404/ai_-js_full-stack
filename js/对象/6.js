const obj = {}    //new Object()
obj.toString()

// V8在obj的原型上找toString，等同于构造函数的原型上找
// obj.__proto__ == Object.prototype