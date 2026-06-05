// 队列
const queue = []

queue.push('spirit')
queue.push('coke')
queue.push('icyredtea')

while(queue.length){
    const cur = queue.shift()
    console.log(cur)
}
