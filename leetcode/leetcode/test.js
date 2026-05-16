// 测试944.js的功能

// 直接实现测试，避免模块导入问题
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

console.log("=== LeetCode 944 测试 ===");
console.log();

console.log("示例1: strs = [\"cba\", \"daf\", \"ghi\"]");
console.log("预期输出: 1");
console.log("实际输出:", minDeletionSize(["cba", "daf", "ghi"]));
console.log();

console.log("示例2: strs = [\"a\", \"b\"]");
console.log("预期输出: 0");
console.log("实际输出:", minDeletionSize(["a", "b"]));
console.log();

console.log("示例3: strs = [\"zyx\", \"wvu\", \"tsr\"]");
console.log("预期输出: 3");
console.log("实际输出:", minDeletionSize(["zyx", "wvu", "tsr"]));
console.log();

console.log("示例4: strs = [\"abc\", \"bce\", \"cae\"]");
console.log("预期输出: 1");
console.log("实际输出:", minDeletionSize(["abc", "bce", "cae"]));
console.log();
