// 3093. Longest Common Suffix Queries
// https://leetcode.com/problems/longest-common-suffix-queries/

// 给你两个字符串数组 wordsContainer 和 wordsQuery 。
// 对于每个 wordsQuery[i] ，你需要从 wordsContainer 中找到一个与 wordsQuery[i] 有 最长公共后缀 的字符串。
// 如果 wordsContainer 中有两个或者更多字符串有最长公共后缀，那么答案为长度最短的。
// 如果有超过两个字符串有相同最短长度，那么答案为它们在 wordsContainer 中出现更早的一个。
// 请你返回一个整数数组 ans ，其中 ans[i]是 wordsContainer中与 wordsQuery[i] 有最长公共后缀字符串的下标。

// 解法：反转字符串 + Trie（字典树）
// 后缀问题反转后变成前缀问题，用 Trie 高效解决

function stringIndices(wordsContainer, wordsQuery) {
    const root = { children: {}, best: -1 }

    for (let i = 0; i < wordsContainer.length; i++) {
        const word = wordsContainer[i]
        let node = root

        updateBest(node, i, wordsContainer)

        for (let j = word.length - 1; j >= 0; j--) {
            const ch = word[j]
            if (!node.children[ch]) {
                node.children[ch] = { children: {}, best: -1 }
            }
            node = node.children[ch]
            updateBest(node, i, wordsContainer)
        }
    }

    function updateBest(node, index, container) {
        if (node.best === -1) {
            node.best = index
        } else {
            const currLen = container[index].length
            const bestLen = container[node.best].length
            if (currLen < bestLen || (currLen === bestLen && index < node.best)) {
                node.best = index
            }
        }
    }

    const ans = []
    for (const query of wordsQuery) {
        let node = root
        for (let j = query.length - 1; j >= 0; j--) {
            const ch = query[j]
            if (!node.children[ch]) {
                break
            }
            node = node.children[ch]
        }
        ans.push(node.best)
    }

    return ans
}
