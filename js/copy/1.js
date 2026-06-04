// 递归，计算  5!

// for 循环暴力解法，这就是 遍历、迭代
// function mul(n){
//     let res = 1
//     for(let i =n;i>0;i--){
//         res = res * i
//     }
//     return res
// }
// console.log(mul(5))


// 递归，可以联想盗梦空间的例子 
// 一个函数在其内部调用自己
// 使用条件：1. 有数学公式可依 2. 知道终止条件，什么时候是出口
// mul(5) == 5 * mul(4)
// mul(4) == 4 * mul(3)
// function mul(n){
//     if(n == 1) return 1
//     return n * mul(n-1)
// }
// console.log(mul(5))


// 斐波那契数列
// function feibo(n){
//     if(n == 1) return 1
//     if(n == 2) return 1
//     return n = feibo(n-2) + feibo(n-1)
// }
// console.log(feibo(1))