// call
function foo(x,y){
    // console.log(this.a)

    console.log(this.a,x + y) // foo.call(liu,1,2) 输出1 3

}

var liu ={
    a: 1
}
// foo() // 输出 `undefined` ,`this`指向全局的 `window`
// call可以
// foo.call // 也可以执行，Function()的原型里有

// foo.call(liu)

// foo.call(liu,1,2)
var jie ={
    a: 2
}
// `apply`接受参数方式不一样，要用数组传递
// foo.apply(jie,[2,3])

var fufu ={
    a: 3
}

const bar = foo.bind(fufu,1,4)
// `bind`执行完后一定会返回一个函数体 
bar()
// 也可以这样
// const bar = foo.bind(fu)
// bar(1,4)
// 也可以这样  一边接一个
// const bar = foo.bind(fufu,1) 
// bar(4)
