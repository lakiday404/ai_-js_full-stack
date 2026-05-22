Grand.prototype.house = function(){
    console.log('big house');
    
}
function Grand(){
    this.card = 100000000
}

function Father() {
  this.lastName = '张'
}
Father.prototype = new Grand()

Child.prototype = new Father()

function Child() {
  this.age = 18
}

// new Object()得到的<---------------|
// p.__proto__ = Child.prototype----|
const p = new Child()  
// p.__proto__ = Child.prototype.__proto__ = Object.prototype.__proto__ = null
// 任何对象最终都继承自 Object.prototype(原型为 null)

console.log(p.lastName)
p.house()
