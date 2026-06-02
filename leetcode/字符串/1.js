const str = 'juejin'

// function reverse(s){
//     let newStr = ''
//     for(let i = 0;i < s.length;i++){
//         // newStr = s[i] + newStr
//         newStr = `${s[i]}${newStr}`
//     }
//     return newStr
// }
// console.log(reverse(str))

// split(e) -> {`ju`,`jin`}



// 放空字符(没有空格)
const arr = str.split('').reverse

// const newStr = arr.toString() // 这个方法会有逗号 
//  这里的 .toString是数组Array显示原型里写的，如果没写就会找到Object的（这个返回三个字符串，[object：xxx]）

// join 让数组变成字符串
// 什么都不传就会加逗号
const newStr = arr.join('')
console.log(arr);


// 思路：先找自己有没有这个方法，再找是否别的结构有这个方法，再找是否可以转换为该结构，如果不行，是否可以转换为另一个可以转换为该结构的结构，最后不行再自己写函数
