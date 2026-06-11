// const arr=[1,4,7,2,5,3]
// function bubbleSort(arr){
//     let temp=0
//     for(let i=0;i<=arr.length;i++){
//         for(let j=i+1;j<=arr.length;j++){
//             if(arr[i]>arr[j]){
//                 temp =arr[i]
//                 arr[i]=arr[j]
//                 arr[j] =temp
//             }
//         }
//     }
//     return arr
// }
// console.log(bubbleSort(arr));

// // concat() 合并俩数组
// const arr2=[].concat(arr)
// console.log(arr2);

// 解构
// const arr=[1,'a',{age:18}];
// const[x,y,z] = arr
// console.log(x,y,z);

// `...` rest 剩余的，表示用y来承接数组剩余的所有东西
// const [x,...y] =arr
// console.log([x,y])

// 
// [arr[1],arr[0]] = [arr[0],arr[1]]
// console.log()

// const arr = [1, 4, 7, 2, 5, 3]
// function bubbleSort(arr) {
//     for (let i = 0; i <= arr.length; i++) {
//         for (let j = i + 1; j <= arr.length; j++) {
//             if (arr[i] > arr[j]) {
//                 [arr[j], arr[i]] = [arr[i], arr[j]]
//             }
//         }
//     }
//     return arr
// }
// console.log(bubbleSort(arr));

const arr=[1,4,7,2,5,3]
function bubbleSort(arr){
    for(let i=0;i<=arr.length;i++){
        let flag =false
        for(let j=0;j<=arr.length-i-1;j++){
            if(arr[j]>arr[j+1]){
                [arr[j+1],arr[j]]=[arr[j],arr[j+1]]
                flag=true
            }
        }
        if(flag===false) return arr
    }
    return arr
}
console.log(arr);
