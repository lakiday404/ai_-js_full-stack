// 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
// 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
// 注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
// 示例 1：

// 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
// 输出：[1,2,2,3,5,6]
// 解释：需要合并 [1,2,3] 和 [2,5,6] 。
// 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
// 示例 2：

// 输入：nums1 = [1], m = 1, nums2 = [], n = 0
// 输出：[1]
// 解释：需要合并 [1] 和 [] 。
// 合并结果是 [1] 。
// 示例 3：

// 输入：nums1 = [0], m = 0, nums2 = [1], n = 1
// 输出：[1]
// 解释：需要合并的数组是 [] 和 [1] 。
// 合并结果是 [1] 。
// 注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // 双指针：从后向前遍历
    // p1: nums1 有效元素的末尾指针
    // p2: nums2 的末尾指针
    // p: nums1 合并后的插入位置指针
    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;
    
    // 从后向前比较，将较大的元素放入 nums1 的末尾
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
    
    // 如果 nums2 还有剩余元素，全部复制到 nums1 的前面
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
};

// 测试示例
console.log("=== LeetCode 88 双指针法测试 ===");
console.log();

// 示例1
let nums1 = [1,2,3,0,0,0];
merge(nums1, 3, [2,5,6], 3);
console.log("示例1:", nums1);  // [1,2,2,3,5,6]

// 示例2
let nums2 = [1];
merge(nums2, 1, [], 0);
console.log("示例2:", nums2);  // [1]

// 示例3
let nums3 = [0];
merge(nums3, 0, [1], 1);
console.log("示例3:", nums3);  // [1]

// 额外测试：nums1 元素都大于 nums2
let nums4 = [4,5,6,0,0,0];
merge(nums4, 3, [1,2,3], 3);
console.log("额外测试:", nums4);  // [1,2,3,4,5,6]