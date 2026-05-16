/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function(strs) {
    if (strs.length === 0) return 0;
    
    let deleteCount = 0;
    const cols = strs[0].length;
    const rows = strs.length;
    
    // 遍历每一列
    for (let col = 0; col < cols; col++) {
        // 检查当前列是否非严格递增
        for (let row = 1; row < rows; row++) {
            // 如果当前字符小于上一行的字符，说明这列需要删除
            if (strs[row][col] < strs[row - 1][col]) {
                deleteCount++;
                break; // 跳出当前列的检查
            }
        }
    }
    
    return deleteCount;
};

// 测试示例
console.log("示例1:", minDeletionSize(["cba", "daf", "ghi"])); // 1
console.log("示例2:", minDeletionSize(["a", "b"])); // 0
console.log("示例3:", minDeletionSize(["zyx", "wvu", "tsr"])); // 3
console.log("示例4:", minDeletionSize(["abc", "bce", "cae"])); // 1
