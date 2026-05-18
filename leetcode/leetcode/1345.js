/**
 * @param {number[]} arr
 * @return {number}
 */
var minJumps = function(arr) {
    const n = arr.length;
    if (n <= 1) return 0;

    const valToIndices = new Map();
    for (let i = 0; i < n; i++) {
        if (!valToIndices.has(arr[i])) {
            valToIndices.set(arr[i], []);
        }
        valToIndices.get(arr[i]).push(i);
    }

    const visited = new Array(n).fill(false);
    const queue = new Array(n);
    let head = 0, tail = 0;
    queue[tail++] = 0;
    visited[0] = true;
    let steps = 0;

    while (head < tail) {
        const size = tail - head;
        for (let i = 0; i < size; i++) {
            const curr = queue[head++];

            if (curr === n - 1) return steps;

            const next1 = curr + 1;
            if (next1 < n && !visited[next1]) {
                visited[next1] = true;
                queue[tail++] = next1;
            }

            const next2 = curr - 1;
            if (next2 >= 0 && !visited[next2]) {
                visited[next2] = true;
                queue[tail++] = next2;
            }

            const val = arr[curr];
            if (valToIndices.has(val)) {
                for (const j of valToIndices.get(val)) {
                    if (!visited[j]) {
                        visited[j] = true;
                        queue[tail++] = j;
                    }
                }
                valToIndices.delete(val);
            }
        }
        steps++;
    }

    return -1;
};

// 测试示例
console.log("示例1:", minJumps([100,-23,-23,404,100,23,23,23,3,404]));  // 3
console.log("示例2:", minJumps([7]));  // 0
console.log("示例3:", minJumps([7,6,9,6,9,6,9,7]));  // 1