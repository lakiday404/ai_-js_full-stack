/**
 * @param {number[]} apple
 * @param {number[]} capacity
 * @return {number}
 *
 * 算法优化：进一步降低时间复杂度
 * 使用数学计算代替循环遍历
 */
var minimumBoxes = function(apple, capacity) {
    // 1. 计算苹果总数 - O(n)
    let totalApples = apple.reduce((sum, num) => sum + num, 0);

    // 2. 计数统计 - O(m)
    let count = new Array(51).fill(0);
    for (let cap of capacity) {
        count[cap]++;
    }

    // 3. 贪心选择：从小到大遍历容量，计算需要的箱子数 - O(k)
    let boxCount = 0;
    let usedCapacity = 0;

    for (let i = 50; i >= 1 && usedCapacity < totalApples; i--) {
        if (count[i] === 0) continue;

        // 计算还需要多少容量
        let remaining = totalApples - usedCapacity;

        // 计算需要多少个容量为i的箱子（向上取整）
        let need = Math.ceil(remaining / i);

        // 实际能用的箱子数（不能超过已有的）
        let use = Math.min(count[i], need);

        // 更新已用容量和箱子数
        usedCapacity += use * i;
        boxCount += use;
    }

    return boxCount;
};

// 测试示例
console.log("=== LeetCode 3074 测试（数学计算优化版）===");
console.log();

console.log("示例1: apple = [1,3,2], capacity = [4,3,1,5,2]");
console.log("预期输出: 2");
console.log("实际输出:", minimumBoxes([1,3,2], [4,3,1,5,2]));
console.log();

console.log("示例2: apple = [5,5,5], capacity = [2,4,2,7]");
console.log("预期输出: 4");
console.log("实际输出:", minimumBoxes([5,5,5], [2,4,2,7]));
console.log();
