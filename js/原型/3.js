Person.prototype.say =function(){
    console.log('I am cool')
}
function Person(){
    this.name = 'qiang'
}
const P = new Person() // p.__proto__ === Person.prototype

P.say()
console.log(P)