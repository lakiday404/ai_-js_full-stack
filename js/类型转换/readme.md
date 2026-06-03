# JavaScript 类型转换


## 从 == 与 === 开始
`==`在判断相等的过程中，会发生**隐式类型转换**

## 类型转换
1. 显示类型转换
主要是原始类型的转换
- String(x)  -> ToString(x)
- Number(x)  -> ToNumber(x)
- Boolean(x) -> ToBoolean(x)


2. 隐式类型转换



显示类型转换：
 1.js
原始值转换表 

http://es5.github.io/#x15.5.1.1
15.5.1.1 官方讲String

> 对于String，官方原文 Returns a String value (not a String object) computed by ToString(value). If value is not supplied, the empty String "" is returned. 官方写死了，ToString() 不是我们的那个，而是官方底层的，不可调用的 
> 对于Number，官方原文 Returns a Number value (not a Number object) computed by ToNumber(value) if value was supplied, else returns +0.



##  显示类型转换

### toString()
x 是个 obj{}
- String(x) -> ToString(x) -> ToPrimitive(x,String)
1. {}.toString()   // 返回 "[object Object]"
2. [].toString()   // 返回数组内部的元素以逗号拼接得到的字符串
3. xx.toString // 返回 "xx"


console.log(String({a:1}));
ToPrimitive({a:1},String)
1. 调用{a:1}.toString()
2. 如果得到一个 原始值 primitive value，则返回
3. 调用 {a:1}.valueOf()，如果得到一个 原始值，则返回
4. 否则报错



### toNumber()
toNumber()解决不了，则 ToPrimitive({},String):
1. 调用 {}.valueOf()，如果得到原始值则 ToNumber，如果不能:
2. 调用 {}.toString()，如果得到原始值，再调用 ToNumber
3. 否则报错

> valueOf() 只能讲包装类的对象转为原始值


与 String 的关键区别 ： String() 先调 toString() ， Number() 先调 valueOf() 。

以 Number({}) 为例：

1. {}.valueOf() → 返回 {} 自己（ 不是原始值 ）
2. {}.toString() → "[object Object]" （是原始值）
3. Number("[object Object]") → NaN
数组同理， Number([]) :

1. [].valueOf() → [] 自己（不是原始值）
2. [].toString() → "" （是原始值）
3. Number("") → 0
所以 Number([]) 等于 0 ，但 Number({}) 等于 NaN 。


### toBoolean()
所有引用类型转换为布尔类型都是 true


## 隐式类型转换
发生的场合:
- 四则运算  + - * / %
任何东西 + 字符串 都会视为 拼接为字符串， 其他符号则要依情况讨论

- 判断语句 if while == === > < >= <= !=

* 大多数隐式类型转换都是要转成数字

- `+` 可以作为一元运算符
例如 console.log('1')    console.log(+'1')
- `+` 作为二元运算符
例如 lval + rval 
1. 令 lprim 为 ToPrimitive(lval)
2. 令 rprim 为 ToPrimitive(rprim)
3. 现在等同于 lprim + rprim
4. 如果 lprim rprim 中至少有一个是字符串，则把另一个丢给 ToString() 也变成字符串进行拼接，最终返回字符串
5. 两个都不是字符串，则全部 ToNumber()，最终进行数学运算

 面试题
 [] == ![]
 [] == !true
 [] == false
 [] == 0
 '' == 0
 0 == 0

// 最后判断输出为 true