const str = 'yessey'

// function isPalindrome(s){
//     const newS = s.split('').reverse().join('')
//     return s === newS
// }
// console.log(isPalindrome(str))


// // 栈的方法解决
// function isPalindrome(s) {
//   // 栈
//   const isOddNumber = s.length % 2 == 0 ? false : true 
//   if (isOddNumber) {
//     const middleIndex = Math.floor(s.length / 2)
//     s = s.slice(0, middleIndex) + s.slice(middleIndex + 1)
//   }

//   const stack = []
//   for (let i = 0; i < s.length; i++) {
//     if (i < s.length / 2) {  // 入栈
//       stack.push(s[i])
//     } else { // 取栈顶的元素出来对比
//       if (stack.pop() !== s[i]) {
//         return false
//       }
//     }
//   }
//   return true
// }

// 双指针解决
// function isPalindrome(s){
//     let i = 0, j = s.length-1
//     while(i<j){
//         if(s[i]!== s[j]){
//             return false
//         }
//             i++
//             j--
        
//     }
//     return true
// }
// console.log(isPalindrome(str))


// 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。

// 字母和数字都属于字母数字字符。

// 给你一个字符串 s，如果它是 回文串 ，返回 true ；否则，返回 false 。

// function isPalindrome(s){
//     s = s.toLowerCase()
//     let i = 0, j = s.length - 1

//     while (i < j) {
//         if (s[i] < 'a' || s[i] > 'z') {
//             if (s[i] < '0' || s[i] > '9') {
//                 i++
//                 continue
//             }
//         }
//         if (s[j] < 'a' || s[j] > 'z') {
//             if (s[j] < '0' || s[j] > '9') {
//                 j--
//                 continue
//             }
//         }

//         if (s[i] !== s[j]) {
//             return false
//         }
//         i++
//         j--
//     }
//     return true
// }
// console.log(isPalindrome(str))


// 正则 
function isPalindrome(s){
    s = s.toLocaleLowerCase()
    s = s.replace(/[^a-z0-9]/g, '')
    let i = 0, j = s.length - 1
    while (i < j) {
        if (s[i] !== s[j]) {
            return false
        }
        i++
        j--
    }
    return true
}
console.log(isPalindrome('A man, a plan, a canal: Panama'))  // true
console.log(isPalindrome('race a car'))                      // false