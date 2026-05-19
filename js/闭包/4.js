// count = 0
function add(){
    let count = 0
    return function(){
        count++
        return count
    }
}
var bar = add()
for(let i=0;i<3;i++){
    console.log(bar())
}
// 这样写每次调用add（）都形成了一个新的闭包，把count换成全局变量即可
// for(let i = 0;i< 3;i++){
//     console.log(add()())
// }