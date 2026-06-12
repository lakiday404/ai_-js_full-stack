const http = require('http')
const fs = require('fs') //引入文件系统模块,用于操作文件

const server = http.createServer((req,res) =>{
    // 读取文件
    // fs.readFile('./homelander.png','',(err,data) =>{
    //     if(err){
    //         res.end('读取文件失败')
    //     }else{
    //         res.end(data)
    //     }
    // })
    // const data = fs.readFileSync('./test.txt','utf-8')//同步读取文件
    // res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'})
    // res.end(data)
    
    console.log(req.url);
    if(req.url === '/home'){
        const content = fs.readFileSync('./home.html','utf-8')
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
        res.end(content)
    }else if(req.url === './about'){
        const content2 = fs.readFileSync('./test.txt','utf-8')
        res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'})
        res.end(content2)
    }else{
        res.end('<h2>NOT FOUND</h2>')
    }
    

    
})

server.listen(3000)