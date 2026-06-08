// 挂起是怎样做到的
// let a = 1

// setTimeout(() => {
//     a = 2
// }, 1000)

// console.log(a)

// 宏任务 与 微任务
// 只有定时器，在队列中是 谁时间短谁先执行
// 定时器被创造之后 浏览器会给定时器都分配一个 id，这些 id 以耗时短为基准存入额外的一个队列中，时间短的先存进去
console.log(1) // 1st
new Promise((resolve) => {
    console.log(2); // 2ed
    resolve()
// .then 自己不耗时，但由于规定是异步任务 进入微任务队列
}).then(() => {
    console.log(3); // 4th
// 定时器 宏任务，接着进入 宏任务队列
    setTimeout(() => {
        console.log(4); // 5th
    }, 0) 
})

// 定时器，进入宏任务队列，第一个宏任务
setTimeout(() => {
    console.log(5); // 6th
}, 1000)

// 同步任务执行完毕，接着先做 微任务
console.log(6); // 3rd


