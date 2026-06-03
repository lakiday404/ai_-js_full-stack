console.log(Number({}));
// 1. ToNumber({}) ，发现解决不了
// 2. ToPrimitive({},Number)

// ToPrimitive({}.Number) 干了这样的事:
// {}.valueOf() 如果能得到原始值，则返回
//  如果不能，就 {}.toString()  // "[object Object]"

console.log(Number([]))