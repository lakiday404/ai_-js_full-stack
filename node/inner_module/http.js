const http = require('http')
// console.log(http);


const data={
    name:'awei',
    age:18
}
// 一个服务 也是一个 对象
// 要运行一个程序，就是一个进程，就需要 运存，同时也必须要有 端口
// req request 向后端发请求，res response 响应
const server =http.createServer((req,res)=>{
    // console.log(req);
    // 向前端输出东西
    // res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'})
    // res.end(JSON.stringify(data))
    
    // 要传一个文件给前端的话，见fs.js
})

// 监听某个端口
server.listen(3000)