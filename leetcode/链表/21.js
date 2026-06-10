function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
var mergeTwoLists = function (list1, list2) {
    let head = new ListNode()
    let cur = head  // head的值一直被取代，因此先放进一个值里存起来
    let i = list1, j = list2

    while (i && j) {
        if (i.val <= j.val) {
            cur.next = i
            i = i.next
        } else {
            cur.next = j
            j = j.next
        }
        cur = cur.next
    }
    cur.next = i||j
    // head 是一个虚拟头节点，是 0，因此应该返回head.next
    return head.next
}
