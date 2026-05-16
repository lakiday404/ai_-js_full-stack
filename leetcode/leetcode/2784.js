/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isGood = function(nums) {
    const n = Math.max(...nums);
    if (nums.length !== n + 1) {
        return false;
    }
    
    const count = new Array(n + 1).fill(0);
    for (const num of nums) {
        count[num]++;
    }
    
    for (let i = 1; i < n; i++) {
        if (count[i] !== 1) {
            return false;
        }
    }
    
    return count[n] === 2;
};