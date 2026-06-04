// 遍历一个对象


// for in  这个方法，不仅把显式原型属性拿到，并且还会把隐式原型上的属性也拿到
Object.prototype.sports = 'running'
let obj = {
    age: 18,
    name:`nange`,
    like:['valorant','deltaforce']
}

// for(let key in obj){
//     if(obj.hasOwnProperty(key)){   // 可以判断 key 是不是 obj 显式拥有的
//     console.log(key,obj[key]); // 如果不加 hasOwnProperty，还会输出 running
    
//     }
// }

for(let key in arr){
    if(arr.hasOwnProperty(key)){
        console.log(key,arr[key]);
        
    }
}