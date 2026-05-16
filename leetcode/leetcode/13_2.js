function romanToInt(s) {
    // 将特殊组合替换为对应的数值字符串
    const replacements = {
        'IV': '+4',
        'IX': '+9',
        'XL': '+40',
        'XC': '+90',
        'CD': '+400',
        'CM': '+900',
        'I': '+1',
        'V': '+5',
        'X': '+10',
        'L': '+50',
        'C': '+100',
        'D': '+500',
        'M': '+1000'
    };
    
    // 依次替换所有字符
    let expr = s;
    for (const [roman, value] of Object.entries(replacements)) {
        expr = expr.split(roman).join(value);
    }
    
    // 使用 eval 计算表达式
    return eval(expr);
}