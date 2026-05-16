var merge = function (nums1, m, nums2, n) {
let i = m - 1, j = n - 1, k = m + n - 1

while (k >= 0) {
    // 情况1：nums1 还有元素，并且（nums2 没有元素 或 nums1[i] 更大）
    if (i >= 0 && (j < 0 || nums1[i] >= nums2[j])) {
    nums1[k] = nums1[i]
    i--
    } 
    // 情况2：nums2 还有元素
    else {
    nums1[k] = nums2[j]
    j--
    }
    k--
}
}