/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isGood = function(nums) {
    const n = Math.max(...nums);
    if (nums.length !== n + 1) {
        return false;
    }
    
    nums.sort((a, b) => a - b);
    
    for (let i = 0; i < n - 1; i++) {
        if (nums[i] !== i + 1) {
            return false;
        }
    }
    
    return nums[n - 1] === n && nums[n] === n;
};