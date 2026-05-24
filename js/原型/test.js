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

const p = new Child()
console.log(p.lastName)  // '张'
p.house()                 // 'big house'