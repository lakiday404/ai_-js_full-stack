/**
 * @param {string} s
 * @return {boolean}
 */

let s = "()[]{}"
var isValid = function(s) {
    const match = {
        '(' : ')',
        '[' : ']',
        '{' : '}'
    }
    const stack = []
    for(let i = 0;i < s.length;i++){
        const cur = s[i]
        // 判断是左括号，就入栈；否则从栈顶pop一个出来，进行判断是否配对
        // 如果pop出来的配不上，则结束
        if(cur == '(' || cur == '[' || cur == '{'){
            stack.push(cur)
        }else{
    
            if(stack.length == 0||match[stack.pop()] != cur) {
                //match[key]访问的是刚才定义的变量，如果直接写match.key，会去找一个'key' 字符串
                return false
            } 
                        
        }
    }
    // if(stack.length == 0){
    //     return true
    // }else{
    //     false
    // }
    return !stack.length
    
};
