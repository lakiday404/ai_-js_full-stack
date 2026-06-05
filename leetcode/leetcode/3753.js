function totalWaviness(num1, num2) {
    const melidroni = { num1, num2 };

    function count(limit) {
        if (limit < 100) return 0;

        const s = String(limit);
        const n = s.length;
        const memo = new Map();

        function dfs(pos, prev2, prev, tight, placed) {
            if (pos === n) return [1, 0];

            const key = `${pos},${prev2},${prev},${tight},${placed}`;
            if (memo.has(key)) return memo.get(key);

            const maxDigit = tight ? +s[pos] : 9;
            let totalCompletions = 0;
            let totalWaviness = 0;

            for (let d = 0; d <= maxDigit; d++) {
                const nextTight = tight && d === maxDigit;
                const nextPlaced = (placed === 0 && d === 0) ? 0 : placed + 1;

                let add = 0;
                if (placed >= 2) {
                    if (prev > prev2 && prev > d) add++;
                    if (prev < prev2 && prev < d) add++;
                }

                const [childCompletions, childWaviness] = dfs(pos + 1, prev, d, nextTight, nextPlaced);
                totalCompletions += childCompletions;
                totalWaviness += add * childCompletions + childWaviness;
            }

            memo.set(key, [totalCompletions, totalWaviness]);
            return [totalCompletions, totalWaviness];
        }

        return dfs(0, 0, 0, true, 0)[1];
    }

    return count(num2) - count(num1 - 1);
}
