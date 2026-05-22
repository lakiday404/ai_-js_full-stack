Car.prototype.name = 'su7'
Car.prototype.lang = '4800'
Car.prototype.width = '1400'

function Car(color){
    // this{}
    this.color = color
    
    // this.name = 'su7'
    // this.height = 1400
    // this.width = 4800

    // this.__proto__ = this.prototype 
}
Car.name = 'weilai'
const car = new Car('blue')
console.log(car)
console.log(car.__proto__);

// 对象的属性和方法可以被更改，this. 不会被销毁

