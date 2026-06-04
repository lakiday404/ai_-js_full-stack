let obj = {
    age: 18,
    name: `nange`,
    like: ['valorant', 'deltaforce']
}

// Object上挂载了一个方法 ，可以把后面那个对象的值塞进前面那个里，后面本身值不变
// let oo = Object.assign({},obj)
// obj.like[0] = 'Genshin'
//  会输出 Genshin，deltaforce 因为like是个数组，copy的时候是给了一个引用地址
// console.log(oo)


// 手搓一个浅拷贝
function shallowCopy(obj) {
    
    let oo =Array.isArray(obj) ? [] : {}  // 改进这个方法，考虑 对象 和 数组，这样两者都可以用来 copy 了
    for (let key in obj) {            // 对象 和 数组 都可以用 forin 遍历，所以可以直接这么写
        if (obj.hasOwnProperty(key)) {   
            oo[key] = obj[key]
            // console.log(key, obj[key]); 
        }
    }
    return oo
}
let oo = shallowCopy(obj)
obj.like[0] = 'Genshin'
console.log(oo)