var removeElement = function(nums, val) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
};

// ========== 测试 ==========
const test1 = [3, 2, 2, 3];
console.log(removeElement(test1, 3), test1); // 2, [2,2,2,3]

const test2 = [0, 1, 2, 2, 3, 0, 4, 2];
console.log(removeElement(test2, 2), test2); // 5
