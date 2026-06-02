function isPalindrome(s){
    s = s.toLowerCase()
    let i = 0, j = s.length - 1

    while (i < j) {
        if (s[i] < 'a' || s[i] > 'z') {
            if (s[i] < '0' || s[i] > '9') {
                i++
                continue
            }
        }
        if (s[j] < 'a' || s[j] > 'z') {
            if (s[j] < '0' || s[j] > '9') {
                j--
                continue
            }
        }

        if (s[i] !== s[j]) {
            return false
        }
        i++
        j--
    }
    return true
}