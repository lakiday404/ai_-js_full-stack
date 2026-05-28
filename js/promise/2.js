// a 假设是后端接口，拿到数据后应当输出
// let a = null
// function a(){
//     setTimeout(()=>{
//         a = 100
//     },1000)
// }
// function b(){
//     console.log(a)
// }
// a()
// b()
let a = null
function a() {
    setTimeout(() => {
        a = 100
        b()
    }, 1000)
}
function b() {
    console.log(a)
}
a()
