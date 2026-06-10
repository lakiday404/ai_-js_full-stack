// {
//     val:1,  // 值域
//     next :{  // 指针域
//         val:2
//         next{
//             ...
//         }
//     }
// }

// const list = {
//     val:1,  // 值域
//     next :{  // 指针域
//         val:2,
//     }
// }
// // 第一个节点
// list.val
// // 第二个节点
// list.next.val

// // 第三个节点
// list.next.next.val

function ListNode(val){
    this.val = val ? val : null
    this.next = null
}

const node1 = new ListNode(1)
const node2 = new ListNode(2)
node1.next = node2

const node3 = new ListNode(3)
node1.next = node3
node3.next = node2

console.log(node1)