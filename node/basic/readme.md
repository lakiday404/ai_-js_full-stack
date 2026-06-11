# Node.js 基础语法

## nodeJS
1. 是一个 js 运行环境
2. 内部使用 c/c++ 封装了很多模块，这些模块可以跟操作系统交互，例如
3. `process`(进程模块)，`__dirname`(目录的绝对路径)，`__filename`(文件的绝对路径)

4. 模块化语法
 - 讲某一个js文件中的函数引入到另一个js文件中
 1. commonJS 规范，类似于http协议那种，是一种规范 (node 规定的，不作声明的情况下默认使用该规范；当然，node 也兼容官方的规范)
 - `module.exports + require('./lib.js')`
 2. ESMdule 规范 (JS 官方规定的)
 - `export default  +  import xx from './lib.js'`
 > npm 是 node 仓库的 **包管理工具**
 > 从node仓库里下载一个包，会在 package.jason 自动记录你下载的包名称以及版本
 > 给人家发个包，就可以把 node_modules 删掉，因为 package.jason 里记录了你的依赖，对方接收到 package.jason 之后只要`npm install`，不管有多少依赖都会直接装上