console.log('script start');
async function async1() {
    await async2()
    console.log('async1 end');
}
async function async2() {
    console.log('async2 end');
}
async1()

setTimeout(() => {
    console.log('setTimeout');
}, 0)

new Promise((resolve, reject) => {
    console.log('promise');
    resolve()
})
    .then(() => {
        console.log('then1');
    })
    .then(() => {
        console.log('then2');
    });

console.log('script end');

// scstart  promise scend  as2  as1 then1 then2 set 但是不对
// wei as2 as1 then1 then2
// hong set

// await 会把后续的代码全部放进 微任务队列中


// 官方浏览器对 await 进行了更新，将 await 升级为 同步代码，最终顺序为
// scstart as2 promise scend as1 then1 then2 set
// wei as1 then1 then2
// hong set