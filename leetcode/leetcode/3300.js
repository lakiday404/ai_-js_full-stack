// 3300. Minimum Element After Replacement With Digit Sum
// https://leetcode.com/problems/minimum-element-after-replacement-with-digit-sum/

// 给你一个整数数组 nums 。
// 请你将 nums 中每一个元素都替换为它的各个数位之和 。
// 请你返回替换所有元素以后 nums 中的最小元素。

function minElement(nums) {
    let min = Infinity
    for (const num of nums) {
        let sum = 0
        let n = num
        while (n > 0) {
            sum += n % 10
            n = Math.floor(n / 10)
        }
        if (sum < min) {
            min = sum
        }
    }
    return min
}