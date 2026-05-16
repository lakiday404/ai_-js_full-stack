/**
 * @param {number[]} nums
 * @return {number[]}
 */
var separateDigits = function(nums) {
    const s = nums.join('');
    const res = new Array(s.length);
    for (let i = 0; i < s.length; i++) {
        res[i] = s.charCodeAt(i) & 15;
    }
    return res;
};