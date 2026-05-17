// 这里有一个非负整数数组 arr，你最开始位于该数组的起始下标 start 处。当你位于下标 i 处时，你可以跳到 i + arr[i] 或者 i - arr[i]。

// 请你判断自己是否能够跳到对应元素值为 0 的 任一 下标处。

// 注意，不管是什么情况下，你都无法跳到数组之外。

// 示例 1：

// 输入：arr = [4,2,3,0,3,1,2], start = 5
// 输出：true
// 解释：
// 到达值为 0 的下标 3 有以下可能方案： 
// 下标 5 -> 下标 4 -> 下标 1 -> 下标 3 
// 下标 5 -> 下标 6 -> 下标 4 -> 下标 1 -> 下标 3 
// 示例 2：

// 输入：arr = [4,2,3,0,3,1,2], start = 0
// 输出：true 
// 解释：
// 到达值为 0 的下标 3 有以下可能方案： 
// 下标 0 -> 下标 4 -> 下标 1 -> 下标 3
// 示例 3：

// 输入：arr = [3,0,2,1,2], start = 2
// 输出：false
// 解释：无法到达值为 0 的下标 1 处。 

// 提示：
// 1 <= arr.length <= 5 * 10^4
// 0 <= arr[i] < arr.length
// 0 <= start < arr.length

/**
 * @param {number[]} arr
 * @param {number} start
 * @return {boolean}
 */
var canReach = function(arr, start) {
    const n = arr.length;
    const visited = new Array(n).fill(false);
    const queue = [start];
    visited[start] = true;
    
    while (queue.length > 0) {
        const curr = queue.shift();
        
        // 如果当前位置值为 0，返回 true
        if (arr[curr] === 0) {
            return true;
        }
        
        // 计算两个跳跃方向
        const next1 = curr + arr[curr];
        const next2 = curr - arr[curr];
        
        // 检查第一个方向
        if (next1 < n && !visited[next1]) {
            visited[next1] = true;
            queue.push(next1);
        }
        
        // 检查第二个方向
        if (next2 >= 0 && !visited[next2]) {
            visited[next2] = true;
            queue.push(next2);
        }
    }
    
    // 遍历完所有位置都没找到 0
    return false;
};

// 测试示例
console.log("示例1:", canReach([4,2,3,0,3,1,2], 5));  // true
console.log("示例2:", canReach([4,2,3,0,3,1,2], 0));  // true
console.log("示例3:", canReach([3,0,2,1,2], 2));      // false