// 给你一个字符串 word。如果 word 中同时出现某个字母 c 的小写形式和大写形式，并且 每个 小写形式的 c 都出现在第一个大写形式的 c 之前，则称字母 c 是一个 特殊字母 。

// 返回 word 中 特殊字母 的数量。

 

// 示例 1:

// 输入：word = "aaAbcBC"

// 输出：3

// 解释：

// 特殊字母是 'a'、'b' 和 'c'。

// 示例 2:

// 输入：word = "abc"

// 输出：0

// 解释：

// word 中不存在特殊字母。

/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    const firstUpper = new Array(26).fill(Infinity);
    const lastLower = new Array(26).fill(-1);

    for (let i = 0; i < word.length; i++) {
        const ch = word[i];
        const code = ch.charCodeAt(0);

        if (code >= 97 && code <= 122) {
            lastLower[code - 97] = i;
        } else {
            const idx = code - 65;
            if (firstUpper[idx] === Infinity) {
                firstUpper[idx] = i;
            }
        }
    }

    let count = 0;
    for (let i = 0; i < 26; i++) {
        if (firstUpper[i] !== Infinity && lastLower[i] !== -1 && lastLower[i] < firstUpper[i]) {
            count++;
        }
    }

    return count;
};

// 示例 3:

// 输入：word = "AbBCab"

// 输出：0

// 解释：

// word 中不存在特殊字母。