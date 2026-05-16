var addTwoNumbers = function(l1,l2){
    const dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    while(l1||l2||carry){
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;

        const sum = val1 + val2 + carry;

        current.next = new ListNode(sum%10);
        carry = Math.floor(sum/10);
        
        current = current.next;
        if(l1)l1 = l1.next;
        if(l2)l2 = l2.next;
    }
    return dummy.next;
}