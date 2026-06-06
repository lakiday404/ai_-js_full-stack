// 读取 URL 参数中的 score
const params = new URLSearchParams(location.search)
const score = Number(params.get('score'))

// 显示到页面上
document.querySelector('.score').innerText = score

// 根据分数区间给出评价
let comment = ''
if (score >= 100) {
    comment = '天才'
} else if (score >= 80) {
    comment = '学霸'
} else if (score >= 60) {
    comment = '小能手'
} else if (score >= 40) {
    comment = '普通人'
} else {
    comment = '小懒虫'
}
document.querySelector('.comment').innerText = comment

// 给按钮监听click，按了就返回最开始的页面
const btn = document.querySelector('.btn')
btn.addEventListener('click', () => {
    location.href = 'http://127.0.0.1:5500/html/questional/index.html'
})