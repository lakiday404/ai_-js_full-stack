// 这么写不行，会执行超时。时间复杂度过高
// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number[]}
//  */
// var maxSlidingWindow = function(nums, k) {
//     let i = 0,j= k -1
//     const len = nums.length
//     let res = []

//     while(j <= len - 1){
//         const max = calcMax(nums,i,j)
//         res.push(max)
//         i++
//         j++
//     }
//     return res

// };

// function calcMax(nums,i,j){
//     let max = -Infinity
//     for(let m = i;m<=j;m++){
//         if(nums[m]>=max){
//             max = nums[m]
//         }
//     }
//     return max
// }

var maxSlidingWindow = function(nums, k) {
  const len = nums.length
  const res = []
  const deque = []  // 递减的双端队列
  for (let i = 0; i < len; i++) {
    // 维护递减的双端队列
    // nums[i] > nums[deque.length - 1]
    while(deque.length && nums[i] > nums[deque[deque.length - 1]]) {
      deque.pop()
    }

    deque.push(i)

    // 上一次的最大值已经下车
    if (deque[0] <= i - k) {
      deque.shift()
    }


    if (i >= k - 1) {
      res.push(nums[deque[0]])
    }


  }
  return res
}