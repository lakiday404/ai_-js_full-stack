/**
 * @param {number[]} nums
 * @return {number[]}
 */
var separateDigits = function(nums) {
    const result = [];
    for (const num of nums) {
        const digits = num.toString().split('').map(Number);
        result.push(...digits);
    }
    return result;
};