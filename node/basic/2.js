// 石头剪刀布


function game(playerAction) {
    const playerAction = process.argv[process.argv.length - 1]
    const arr = ['rock', 'scissor', 'paper']
    const index = Math.floor(Math.random() * 3)
    const computerAction = arr[index]
    if (playerAction == computerAction) {
        console.log('平局');
    } else if (
        (playerAction == 'rock' && computerAction == 'scissor') ||
        (playerAction == 'scissor' && computerAction == 'paper') ||
        (playerAction == 'paper' && computerAction == 'rock')
    ) {
        console.log('你赢了');
    } else {
        console.log('你输了');
    }
}
