// function A() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('a');
//             resolve()
//         }, 1000)
//     })

// }
// function B() {
//     console.log('b');
// }
// A().then(() => {
//     B()
// })


// async 是 Promise() 的语法糖，等同于
// return new Promise((resolve)=>{})
// await 可以视作包含了一个 .then() ，**但是await后边接的代码视作同步，剩下的代码存进微任务队列
// await 后面的函数内，必须要返回 promise ，实质上是优化了 .then 的写法，防止函数过多写一堆 .then()
async function fn() {
    await A()
    B()
}
fn()

function A() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('a');
            resolve()
        }, 1000)
    })

}
function B() {
    console.log('b')
}