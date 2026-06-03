// const str ="A man, a plan, a canal: Panama"

var isPalindrome = function(s){
    const newS = s.replace(/[^A-Za-z0-9]/g,'').toLowerCase()
    // const newS = s.replace(/\w/g,'').toLowerCase() // 不通过，有下划线
    return newS === newS.split('').reverse().join('')

    // let l =0,r = newS.length - 1
    // while(l<r){
    //     if(newS[l] !== newS[r]){
    //         return false
    //     }l++;
    //     r--;
    // }
    // return true
}