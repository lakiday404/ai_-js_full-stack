export function game(playerAction) {
    const arr = ['rock', 'scissor', 'paper']
    const index = Math.floor(Math.random() * 3)
    const computerAction = arr[index]

    if (playerAction == computerAction) {
        console.log('平局');
        return 0
    } else if (
        (playerAction == 'rock' && computerAction == 'scissor') ||
        (playerAction == 'scissor' && computerAction == 'paper') ||
        (playerAction == 'paper' && computerAction == 'rock')
    ) {
        console.log('你赢了');
        return 1
    } else {
        console.log('你输了');
        return -1
    }
}