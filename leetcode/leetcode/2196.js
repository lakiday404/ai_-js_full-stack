function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
function createBinaryTree(descriptions) {
    const nodes = new Map()
    const children = new Set()

    // 先创建所有节点
    for (const [parent, child] of descriptions) {
        if (!nodes.has(parent)) nodes.set(parent, new TreeNode(parent))
        if (!nodes.has(child)) nodes.set(child, new TreeNode(child))
        children.add(child)
    }

    // 连接父子关系
    for (const [parent, child, isLeft] of descriptions) {
        const p = nodes.get(parent)
        const c = nodes.get(child)
        if (isLeft === 1) {
            p.left = c
        } else {
            p.right = c
        }
    }

    // 找根：从未当过 child 的节点
    for (const [parent] of descriptions) {
        if (!children.has(parent)) {
            return nodes.get(parent)
        }
    }

    return null
}

// ========== 测试 ==========
// 示例1
const root1 = createBinaryTree([[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]])
console.log(root1.val) // 50

// 示例2
const root2 = createBinaryTree([[1,2,1],[2,3,0],[3,4,1]])
console.log(root2.val) // 1
 