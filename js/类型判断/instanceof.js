function myinstanceof(fn,type){
    if(typeof(fn)!== Object()||fn == null && typeof(fn)!==Function){
       return false
}
     while(fn.__proto__!== null){
        if(fn.__proto__ !== type.prototype){
            return true
        }
        fn = fn.__proto__
    }
    }
    
// 这份代码如果去掉2、3行可以判断原始类型，因为 原始类型也是 new 了一个构造函数得到的，代码中写了读其  __proto__ ,所以会返回true

