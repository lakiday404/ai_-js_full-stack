# 回文
正着念和倒着念一样的字符串

## 字符串
字符串天生有 索引，可以访问其 length 属性

字符串拥有:
splice()❌ slice()✔
slice() 不会影响原字符串

### 字符串有split()
split() 将字符串转为数组
split('1') 传什么进去就由什么为基准，切成左右两边；什么都不传就是一个一个拆出来 

### 数组转为字符串
toString() 可以变为字符串，但是会有逗号 
join() 将数组变成字符串,也有逗号，但是可以传参数，用什么拼接，例如
join('') 参数为空字符，则用空字符拼接，逗号就没了

### Object 和 Array toString() 区别
Object.prototype.toString() 会返回 '[Object:' + 'xxx' + ']'
Array.prototype.toString() 会返回 'x,x,x,x'
> 很多函数里都有自己的 toString()



> 路径应当使用 D:/workspace/dome/index.js  ，和 windows 里的不一样，windows 是用的另一个方向的 \ ,这样的有缺陷。


### 数组的 reverse
arr.reverse() 既会更改原数组，又会给一个返回值
因此 ES6 版本增加一个方法:
arr.toReversed() 只会给返回值，不改原数组

# 正则
/123/ 这就是正则。用于校验其他的字符串中是否存在 正则表达式中的值，这里是检测是否存在'123' 

正则就是 new RegExp() 得到的 
s.replace(/[^a-zA-Z0-9]/g, '')

这个 g 代表 global ，等价于 s.replaceall(/[^a-zA-Z0-9]/g,'')