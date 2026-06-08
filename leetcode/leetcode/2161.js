function pivotArray(nums, pivot) {
    const less = []
    const equal = []
    const greater = []

    for (const num of nums) {
        if (num < pivot) {
            less.push(num)
        } else if (num === pivot) {
            equal.push(num)
        } else {
            greater.push(num)
        }
    }

    return [...less, ...equal, ...greater]
}

// ========== 测试 ==========
console.log(pivotArray([9,12,5,10,14,3,10], 10)) // [9,5,3,10,10,12,14]
console.log(pivotArray([-3,4,3,2], 2))             // [-3,2,4,3]
