// console.log(String({a:1}));

// ToPrimitive({a:1},String)
// 1. 调用{a:1}.toString()
// 2. 如果得到一个 原始值 primitive value，则返回
// 3. 调用 {a:1}.valueOf()，如果得到一个 原始值，则返回
// 4. 否则报错


// console.log(String({a:1}));

// ToPrimitive({a:1})
// 1. {a:1}.toString()  // 发生了什么
// 2. function toString(){
    // ToObject.(this) // this 指向调用它的对象，即 {a:1}
// }
// 3. [object Object]


console.log(String([]))
// 1. [].toString()  // 不是对象的toString(),这里是数组本身自带的toString()，因此会直接返回 数组内的元素以逗号进行拼接形成的字符串
// 因此直接返回一个空字符串