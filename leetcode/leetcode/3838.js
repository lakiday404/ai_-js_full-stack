var mapWordWeights = function(words, weights) {
    let result = '';

    for (const word of words) {
        let sum = 0;
        for (let i = 0; i < word.length; i++) {
            sum += weights[word.charCodeAt(i) - 97];
        }
        const mod = sum % 26;
        result += String.fromCharCode(122 - mod);
    }

    return result;
}

// ========== 测试 ==========
console.log(mapWordWeights(["abcd", "def", "xyz"], [5, 3, 12, 14, 1, 2, 3, 2, 10, 6, 6, 9, 7, 8, 7, 10, 8, 9, 6, 9, 9, 8, 3, 7, 7, 2])); // "rij"
console.log(mapWordWeights(["a", "b", "c"], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]));     // "yyy"
console.log(mapWordWeights(["abcd"], [7, 5, 3, 4, 3, 5, 4, 9, 4, 2, 2, 7, 10, 2, 5, 10, 6, 1, 2, 2, 4, 1, 3, 4, 4, 5]));           // "g"
