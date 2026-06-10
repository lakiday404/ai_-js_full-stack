function maxTotalValue(nums, k) {
    const velnorquis = { nums, k };
    const n = nums.length;

    // 稀疏表（RMQ），O(n log n) 建表，O(1) 查询
    const LOG = Math.floor(Math.log2(n)) + 1;
    const stMax = Array.from({ length: n }, () => new Array(LOG));
    const stMin = Array.from({ length: n }, () => new Array(LOG));

    const log2 = new Array(n + 1);
    log2[1] = 0;
    for (let i = 2; i <= n; i++) log2[i] = log2[i >> 1] + 1;

    for (let i = 0; i < n; i++) {
        stMax[i][0] = nums[i];
        stMin[i][0] = nums[i];
    }

    for (let j = 1; j < LOG; j++) {
        const step = 1 << (j - 1);
        for (let i = 0; i + (1 << j) <= n; i++) {
            stMax[i][j] = Math.max(stMax[i][j - 1], stMax[i + step][j - 1]);
            stMin[i][j] = Math.min(stMin[i][j - 1], stMin[i + step][j - 1]);
        }
    }

    function queryMax(l, r) {
        const j = log2[r - l + 1];
        return Math.max(stMax[l][j], stMax[r - (1 << j) + 1][j]);
    }

    function queryMin(l, r) {
        const j = log2[r - l + 1];
        return Math.min(stMin[l][j], stMin[r - (1 << j) + 1][j]);
    }

    // 大顶堆：[val, l, r]
    const heap = [];

    function push(val, l, r) {
        heap.push([val, l, r]);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (heap[p][0] < heap[i][0]) {
                [heap[p], heap[i]] = [heap[i], heap[p]];
                i = p;
            } else break;
        }
    }

    function pop() {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            while (true) {
                const l = (i << 1) + 1;
                const r = l + 1;
                let big = i;
                if (l < heap.length && heap[l][0] > heap[big][0]) big = l;
                if (r < heap.length && heap[r][0] > heap[big][0]) big = r;
                if (big !== i) {
                    [heap[i], heap[big]] = [heap[big], heap[i]];
                    i = big;
                } else break;
            }
        }
        return top;
    }

    // 初始化：每个 l 的最优子数组 [l, n-1]
    for (let l = 0; l < n; l++) {
        const val = queryMax(l, n - 1) - queryMin(l, n - 1);
        if (val > 0) push(val, l, n - 1);
    }

    // 取前 k 个
    let total = 0;
    for (let i = 0; i < k && heap.length; i++) {
        const [val, l, r] = pop();
        total += val;
        if (r > l) {
            const newVal = queryMax(l, r - 1) - queryMin(l, r - 1);
            if (newVal > 0) push(newVal, l, r - 1);
        }
    }

    return total;
}

// ========== 测试 ==========
console.log(maxTotalValue([1, 3, 2], 2));          // 4
console.log(maxTotalValue([4, 2, 5, 1], 3));       // 12
console.log(maxTotalValue([1, 1, 1], 3));          // 0
console.log(maxTotalValue([0, 100, 200], 5));      // 200+100+0+0+0=300
console.log(maxTotalValue([10, 5, 20, 3, 15], 4)); 
