var findThePrefixCommonArray = function (A, B) {
    const n = A.length
    const freq = new Array(n + 1).fill(0)
    const res = new Array(n).fill(0)
    let count = 0
    for (let i = 0; i < n; i++) {
        freq[A[i]]++
        if (freq[A[i]] === 2) count++
        freq[B[i]]++
        if (freq[B[i]] === 2) count++
        res[i] = count
    }
    return res
}
