// ==================== LeetCode 3161 物块放置查询 ====================
// 关键问题：能否在 [0, x] 内存放一个长度为 sz 的物块？
// => 等价于 [0, x] 内是否存在长度 >= sz 的障碍物空隙
//
// 核心解法：两个线段树
//   ObstacleTree -> 记录哪些位置有障碍物，支持"区间内最右/最左障碍物"查询
//   MaxSegTree   -> 维护空隙长度，按空隙的【右端点】存储
//                 （好处：查询 <=x 时自动排除右端点超过 x 的间隙）

class MaxSegTree {
    constructor(n) {
        this.n = n
        this.tree = new Array(2 * n).fill(0)
    }
    update(pos, val) {
        let i = pos + this.n
        this.tree[i] = val
        for (i >>= 1; i > 0; i >>= 1) {
            this.tree[i] = Math.max(this.tree[i * 2], this.tree[i * 2 + 1])
        }
    }
    query(l, r) {
        let maxVal = 0
        let a = l + this.n
        let b = r + this.n
        while (a <= b) {
            if (a & 1) maxVal = Math.max(maxVal, this.tree[a++])
            if (!(b & 1)) maxVal = Math.max(maxVal, this.tree[b--])
            a >>= 1
            b >>= 1
        }
        return maxVal
    }
}

class ObstacleTree {
    constructor(n) {
        this.n = n
        this.tree = new Array(4 * n).fill(0)
    }
    _update(node, l, r, pos) {
        if (l === r) {
            this.tree[node] = 1
            return
        }
        const mid = (l + r) >> 1
        if (pos <= mid) this._update(node * 2, l, mid, pos)
        else this._update(node * 2 + 1, mid + 1, r, pos)
        this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1]
    }
    add(pos) {
        this._update(1, 0, this.n - 1, pos)
    }
    rightmost(node, l, r, ql, qr) {
        if (l > qr || r < ql || this.tree[node] === 0) return -1
        if (l === r) return l
        const mid = (l + r) >> 1
        const rightVal = this.rightmost(node * 2 + 1, mid + 1, r, ql, qr)
        if (rightVal !== -1) return rightVal
        return this.rightmost(node * 2, l, mid, ql, qr)
    }
    leftmost(node, l, r, ql, qr) {
        if (l > qr || r < ql || this.tree[node] === 0) return -1
        if (l === r) return l
        const mid = (l + r) >> 1
        const leftVal = this.leftmost(node * 2, l, mid, ql, qr)
        if (leftVal !== -1) return leftVal
        return this.leftmost(node * 2 + 1, mid + 1, r, ql, qr)
    }
}

var getResults = function(queries) {
    let maxX = 0
    for (const q of queries) {
        if (q[1] > maxX) maxX = q[1]
    }
    const n = maxX + 1

    const gapTree = new MaxSegTree(n)
    const obsTree = new ObstacleTree(n)
    const results = []

    for (const q of queries) {
        if (q[0] === 1) {
            const x = q[1]
            const prev = obsTree.rightmost(1, 0, maxX, 0, x - 1)
            const next = obsTree.leftmost(1, 0, maxX, x + 1, maxX)

            if (next !== -1) {
                gapTree.update(next, 0)
            }
            const left = prev === -1 ? 0 : prev
            gapTree.update(x, x - left)
            if (next !== -1) {
                gapTree.update(next, next - x)
            }

            obsTree.add(x)
        } else {
            const x = q[1], sz = q[2]
            const rightmost = obsTree.rightmost(1, 0, maxX, 0, x)

            let maxGap
            if (rightmost === -1) {
                maxGap = x
            } else {
                maxGap = Math.max(gapTree.query(0, rightmost), x - rightmost)
            }
            results.push(maxGap >= sz)
        }
    }

    return results
}