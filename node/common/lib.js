// lib 放封装好的函数，lib 就是用来放一些工具类函数 
// function add(a,b){
//     return a+b
// }
// function minus(x,y){
//     return x-y
// }
// module.exports ={
//     // 如果 key 和 value 完全一样，就可以简写为 value
//     // fn:add,
//     add,
//     minus
// }

// 也可以单独传输，传过去的也是一个对象
// exports.minus = minus
// modul.exports 只传一个东西，这里传的是一个二函数体 
// module.exports = add


// ESMudle
function add(a,b){
    return a+b
}
// 默认抛出 函数体
// export default add
export { add }
