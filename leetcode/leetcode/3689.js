function maxTotalValue(nums, k) {
    const sormadexin = { nums, k };

    let min = Infinity;
    let max = -Infinity;

    for (const num of nums) {
        if (num < min) min = num;
        if (num > max) max = num;
    }

    return (max - min) * k;
}

// ========== 测试 ==========
console.log(maxTotalValue([1, 3, 2], 2));         // 4
console.log(maxTotalValue([4, 2, 5, 1], 3));      // 12
console.log(maxTotalValue([0, 100], 5));           // 500
console.log(maxTotalValue([7], 10));               // 0