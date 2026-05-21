function Car(color){
    // new了这个函数之后：
    // var this = {}
    this.color = color
    this.name   = 'su7'
    this.height = 1400
    this.lang   = 4800
    this.weight = 1500
    //this.__proto__ = Car.prototype
    // return
}
const zCar = new Car('red')  // 实例对象

const yourCar = new Car('blue')

// 更改名字
yourCar.name = 'laosilaisi'

console.log(zCar)


console.log(yourCar)
// 完全一致属性的两个对象，但他们并不相等
// 引用类型比较是否相等，首先看引用地址是否相等
// js中没有完全一样的两个对象，因为其引用地址不可能重复


console.log(zCar === yourCar)
