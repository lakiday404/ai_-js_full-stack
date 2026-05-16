var merge = function (nums1, m, nums2, n) {
  // 两个指针分别指向两个数组的末尾的有效值
  // 取更大的值，从数组一的末尾往前填补
  let i = m - 1, j = n - 1, k = m + n - 1

  while (i >= 0 && j >= 0) {
    if (nums1[i] >= nums2[j]) {  // 大值数组一
      nums1[k] = nums1[i]
      i--
      k--
    } else { // 大值数组二
      nums1[k] = nums2[j]
      j--
      k--
    }
  }
  // 万一数组二还有剩余值
  while (j >= 0) {
    nums1[k] = nums2[j]
    j--
    k--
  }
  
};