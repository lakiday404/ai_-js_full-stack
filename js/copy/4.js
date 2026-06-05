let obj = {
    age: 18,
    name: `nange`,
    like: {
        n: 'BangDream',
        m: 'MyGo',
        o: {
            a: 'Soyo'
        }
    }
}

function deepCopy(obj) {
    let res = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof (obj[key]) == 'object' && obj[key] != null) {
                res[key] = deepCopy(obj[key])
            } else {
                res[key] = obj[key]
            }
        }
    }

    return res
}
let oo = deepCopy(obj)
obj.like.o.a = 'anno'
console.log(oo)