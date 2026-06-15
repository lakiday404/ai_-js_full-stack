// 引入处理路径的模块
const { URL } = require('url')
// 导入mysql2模块
// 导入模块
const mysql = require('mysql2');




const http = require('http')
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域，前后端默认无法通讯

    // 拿到前端传过来的 username，password，并去连接数据库，判断账号密码是否合法，如果不合法，则返回账号密码不合法
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams
    // console.log(req.url)
    // 拿到后端的用户名和密码
    // console.log(query.get('username'),query.get('password'));
    if (req.url.startsWith('/login')) {
        // 创建连接池，设置连接池的参数
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'demo',
            password:'123456',
        });
        connection.query(`select * from user where username="${query.get('username')}" and password="${query.get('password')}"`,(err,results)=>{
            console.log(results);
            
        })
    }
})
server.listen(3000, () => {
    console.log('服务运行在3000端口');
})