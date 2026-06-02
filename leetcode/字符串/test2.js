var validPalindrome = function (s) {
    const len = s.length
    let i = 0, j = len - 1
    while (i < j && s[i] == s[j]) {
        i++
        j--
    }

    // 要么左指针多跳一下，要么右指针多跳一下
    if (isPalindrome(s, i + 1, j)) {
        return true
    }
    else if (isPalindrome(s, i, j-1)) {
        return true
    } else console.log("不是回文数") 
    return false

};

function isPalindrome(s, i, j) {
    while(i<j){
        if (s[i] !== s[j]) {
        return false
    } 
    
    console.log(i - 1)
    i++
    j--
}return true
    }
    
console.log(validPalindrome('abca'))