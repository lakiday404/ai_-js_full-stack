/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return "";
    if (strs.length === 1) return strs[0];

    strs.sort();

    const first = strs[0];
    const last = strs[strs.length - 1];

    let i = 0;
    while (i < first.length && first[i] === last[i]) {
        i++;
    }

    return first.substring(0, i);
};

// 测试示例
console.log("示例1:", longestCommonPrefix(["flower","flow","flight"]));  // "fl"
console.log("示例2:", longestCommonPrefix(["dog","racecar","car"]));     // ""
console.log("示例3:", longestCommonPrefix([""]));                        // ""
console.log("示例4:", longestCommonPrefix(["a"]));                       // "a"