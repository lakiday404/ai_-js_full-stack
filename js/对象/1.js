// 1.字面量创建对象
const obj = {       // 对象字面量
    name : 'qiqi'

}
// obj.age = 18
let hello = 'world'
// obj.hello = 123        // 这样写，那么第6行写的就毫无意义了
obj[hello] = 123          // 这样写，把hello当作一个变量值来赋值为123


delete obj[hello]         // 删除hello属性 
console.log(obj)
