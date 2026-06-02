const arr = ['a','b','c','d']
// arr.splice(1,1)
// arr.splice(2,0,'h')

// slice 左闭右开
// arr.slice(1,3) // 不会影响原数组
const arr2 = arr.slice(1,3) // 这样得到修改后的数组，slice一定要有返回值，不然无意义

console.log(arr)


// 字符串同理 
const str = 'hello'
// 字符串只有 slice，没有splice
const ss = str.slice(2,4)
const sss = str.slice(-1,4)

console.log(str.slice(2,4))