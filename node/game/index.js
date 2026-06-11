import { game } from './lib.js'
let count = 0
//  进程输入，监听 on
process.stdin.on('data',(e)=>{ // 监听进程的写入
    // 现在进程就会一直存在，不会每次调用都重新开启
    // console.log(e.toString());
    // node 增加了一只格式 buffer 来监听流式资源
    
    // 去掉字符串首尾空格
    const playerAction = e.toString().trim()
    const res =game(playerAction)
    if(res === 1){
        count++
    }else{
        count = 0
    }
    if(count>=3){
        console.log("u cheater,game is done");
        process.exit()
    }
})
