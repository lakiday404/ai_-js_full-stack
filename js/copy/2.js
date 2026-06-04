// let a = 1
// let b = a
// a = 2
// console.log(b)

let obj = {
    age: 18
}
let oo = obj
obj.age = 19
console.log(oo.age)
// 这样写实际上只有一个对象，不算是拷贝