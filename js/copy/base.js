// 遍历一个对象


// for in  这个方法，不仅把显式原型属性拿到，并且还会把隐式原型上的属性也拿到
Object.prototype.position = 'guitarist'
let obj = {
    age: 18,
    name: `annon`,
    like: ['BangDream', 'MyGo']
}

for (let key in obj) {
    // 可以判断 key 是不是 obj 显式拥有的
    if (obj.hasOwnProperty(key)) {
        // 如果不加 hasOwnProperty，还会输出 running
        console.log(key, obj[key]);

    }
}

// for (let key in arr) {
//     if (arr.hasOwnProperty(key)) {
//         console.log(key, arr[key]);

//     }
// }