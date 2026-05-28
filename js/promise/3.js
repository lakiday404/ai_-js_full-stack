function xq(){
    // Promise 内部拥有一个 状态 `state`，其初始值为 `state = pending`
    // 只要给 Promise 
    return new Promise((resolve,reject)=>{   // reject 就是失败, 搭配 catch捕获错误
        setTimeout(()=>{
        console.log('success')
        resolve()
    },2000)
    })
}
function marry(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('get married')
            resolve()
        },1000)
    })
}
function baby(){
    console.log('get a baby');
}
// 对象里的隐式原型，函数里的显式原型别忘了
// xq().then(()=>{
//     marry().then(()=>{
//         baby()
//     })
// })

// 链式调用
xq().then(()=>{
    return marry()
}).then(()=>{
    baby()
})
// 由于 xq().then() 最先执行
// 1. new Promise() 得到了一个状态为 pending 的对象
// 2. xq().then() 执行，then()其中的内容不触发，而是存在Promise() 中的一个数组中
// 3. 等待setTimeout()函数结束，state = pending 被更改为 resolved
// 4. 将 then 存起来的函数在 resolve() 里触发掉，


// function xq(){
//     // Promise 内部拥有一个 状态 `state`，其初始值为 `state = pending`
//     // 只要给 Promise 
//     return new Promise((resolve,reject)=>{   // reject 就是失败, 搭配 catch捕获错误
//         setTimeout(()=>{
//         console.log('fail');
//         reject('a')
//     },2000)
//     })
// }
// xq().then(()=>{
//     marry()
// })
// .catch((err)=>{
//     console.log(err,'pity')
// })
