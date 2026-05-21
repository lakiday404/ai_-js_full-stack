/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var longestCommonPrefix = function(arr1, arr2) {
    const prefixSet = new Set()

    for (const num of arr1) {
        const s = num.toString()
        let prefix = ''
        for (const ch of s) {
            prefix += ch
            prefixSet.add(prefix)
        }
    }

    let maxLen = 0

    for (const num of arr2) {
        const s = num.toString()
        let prefix = ''
        for (const ch of s) {
            prefix += ch
            if (prefixSet.has(prefix)) {
                maxLen = Math.max(maxLen, prefix.length)
            }
        }
    }

    return maxLen
}
