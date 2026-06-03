// + 作为一元运算符 朝着 number 转
// +[]
// 相当于 Number([]) ，最终得到 0


// lval + rval 
// 令 lprim 为 ToPrimitive(lval)
// 令 rprim 为 ToPrimitive(rprim)
// 现在等同于 lprim + rprim
// 如果 lprim rprim 中至少有一个是字符串，则把另一个丢给 ToString() 也变成字符串进行拼接，最终返回字符串
// 两个都不是字符串，则全部 ToNumber()，最终进行数学运算

// {} + []
// '[object Object]'


// 面试题
// [] == ![]
// [] == !true
// [] == false
// [] == 0
// '' == 0
// 0 == 0

// 最后判断输出为 true