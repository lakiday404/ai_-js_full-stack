function order() {
    return new Promise((resolve, reject) => {   // reject 就是失败, 搭配 catch捕获错误
        setTimeout(() => {
            console.log('ordered')
            resolve()
        }, 2000)
    })
}
function deliver() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('delivered')
            resolve()
        }, 1000)
    })
}
function eat() {
    console.log('ate');
}
order().then(() => {
    return deliver()
}).then(() => {
    eat()
})