Array.prototype.abc = function(){
    console.log('abc')
}

const arr = []    // new Array()

arr.unshift(1)
arr.abc()


const num = 123   // new Number() 
// num.unshift(0)    // Number.prototype 里没有这个方法