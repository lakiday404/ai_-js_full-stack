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

// 把一个对象变成 JASON 字符串
// const oo = JSON.stringify(obj)

// 把一个JASON字符串变回对象
const oo = JSON.parse(JASON.stringify(obj))
obj.like.o.a = 'anmo'  // 深拷贝不受影响
console.log(oo)

// 有个缺陷，无法读懂 bigint ，undefined NaN Infinity 会被转化为 null