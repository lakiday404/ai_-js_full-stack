// const stack = {}
// stack.push
// stack.pop



// 栈的标准输出，一定要把栈顶的元素取走才行，不能单纯遍历读取
const stack={}
while(stack.length >0){
    const val = stack.pop()
    console.log(val);
}