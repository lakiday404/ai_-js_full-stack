//  插入排序，首先认定 只有一个元素的数组是有序的，所以可以认为当前数组的第一位就是有序的
// 从数组的第二位开始读取，考虑将该值插入到已经有序的数组的哪个位置
const arr = [1, 4, 7, 2, 5, 3,6]

// function insertSort(arr) {
//     let newArr = [arr[0]]
//     let len = arr.length
//     for (let i = 1; i <len; i++) {
//         let newArrlen = newArr.length
//         let inserted =false
//         for(let j=0;j<newArrlen;j++){
//             if(arr[i] < newArr[j]){
//                 newArr.splice(j,0,arr[i])
//                 inserted =true
//                 break
//             }
//         }
//         if(!inserted){
//             newArr.push(arr[i])
//         }

//     }
//     return newArr
// }





// function insertSort(arr) {
//     let newArr = [arr[0]]
//     let len = arr.length
//     for (let i = 1; i < len; i++) {
//         let newArrlen = newArr.length - 1
//         for (let j = newArrlen; j >= 0; j--) {
//             if (arr[i] < newArr[j]) {
//                 newArr[j + 1] = newArr[j]
//                 newArr[j] = arr[i]
//             } else {
//                 newArr[j + 1] = arr[i]
//                 break
//             }
//         }
//     }
//     return newArr
// }

// 插入排序
function insertSort(arr) {
    const len = arr.length
    for (let i = 1; i < len; i++) {
        let temp = arr[i]
        // temp 应该放在已经有序的区间的哪个位置
        let j = i
        while (arr[j - 1] > temp && j > 0) {
            arr[j] = arr[j - 1]
            j--
        }
        arr[j] = temp
    }
    return arr
}
console.log(insertSort(arr));
