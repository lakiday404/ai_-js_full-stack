let obj = {
    age: 18,
    name: `nange`,
    like:{
        n:'valorant',
        m:'deltaforce',
        o : {
            a:'xijiao'
        }
    }
}

const oo = structuredClone(obj)

console.log(oo)

// 缺点:函数体无法被克隆，但是可以处理 undefined NaN bigint Infinity