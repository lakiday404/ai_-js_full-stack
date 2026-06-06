// 接口地址 https://mock.mengxuegu.com/mock/6767738f98077b17fe6792e2/question-naire#
// 1. 向后端发请求
// 2. 展示数据

// 全局变量，当前页面的值
let current_Num = 1

// 全局变量，存放用户的答案
let userAnswer = []
// 用户当前选到的答案
let selectedId = null
// 提前存好数据库发来的数据
let questionList = []
//  全局变量，计算分数
let score = 0

getData().then((res) => {
    const data = res.questions
    questionList = data
    console.log(data)
    setHead(data)
    setQuestion(data)
})

//===========================getData 拿数据========================================
function getData() {
    return new Promise((resolve, reject) => {
        // xhr 请求
        const xhr = new XMLHttpRequest()
        // 打开网址，get数据
        xhr.open('GET', 'https://mock.mengxuegu.com/mock/6767738f98077b17fe6792e2/question-naire#', true)
        // 发送请求
        xhr.send()
        // 监听请求状态，是否成功
        xhr.onreadystatechange = function () {
            // 0准备中 1正在发送 2后端接到了请求 3后端相应，但前端还没接收 4前端接收到相应
            // status 200 意思是成功
            if (xhr.readyState === 4 && xhr.status === 200) {
                // 从后端请求到的是字符串类型，转成 json 对象
                // console.log(xhr.responseText);
                // console.log(JSON.parse(xhr.responseText))
                // resolve 出的数据会被 .then 接收到
                resolve(JSON.parse(xhr.responseText))
            }
        }
    })
}

// 把数据展示在页面上

//==========================================设置页面 head 数据==================
function setHead(arr) {
    // 获取总题数 totalNum ，如果不是 class 而是 id，则把 '.' 换成'#'
    const totalNum = document.querySelector('.totalNum')
    totalNum.innerText = arr.length

    // 第几题，应当用一个变量表示，将来点击下一题，该变量要累加   
    // 因此写到全局中(用闭包也行，这里结构简单就用全局偷偷懒)
    const currentNum = document.querySelector('.currentNum')
    currentNum.innerText = current_Num

    // 控制进度条的宽度
    const rangeProgress = document.querySelector('.rang-progress')
    rangeProgress.style.width = (current_Num / arr.length) * 100 + '%'
}
//=====================设置页面 body 数据=============================================
function setQuestion(arr) {
    // 拿到Q1 序号
    const num = document.getElementById('num')
    num.innerText = current_Num
    // 修改问题
    const question_title = document.querySelector('.question-title')
    question_title.innerText = arr[current_Num - 1].topic_name

    // 批量生产选项
    const topic_answer = arr[current_Num - 1].topic_answer

    // 循环创建 li
    let lis = ''
    for (let i = 0; i < topic_answer.length; i++) {
        // 在 li 上绑定点击事件
        const li = `<li class="item" onClick=selectItem(${topic_answer[i].topic_answer_id})>
              <input type="radio" name="item" id="item${i}">
              <label for="item${i}">${topic_answer[i].answer_name}</label>
            </li>`
        lis += li
    }

    // 往 ul 中添加 lis
    const list = document.querySelector('.list')
    // 不能用 appendChild()，因为这里是字符串 
    list.innerHTML = lis
}

//===================选中一个答案===================================================
function selectItem(id) {
    selectedId = id
}

//===================点下一题======================================================
const next = document.querySelector('.next')
const submit = document.querySelector('.submit')
next.addEventListener('click', () => {
    if (selectedId == null) {
        alert('选个答案desuwa')
        return
    }
    // 保存答案
    userAnswer.push(selectedId)
    selectedId = null
    current_Num++
    // 更新页面,头部、question
    setHead(questionList)
    setQuestion(questionList)

    // 最后一题时，不再是下一题，而是改成 提交 按钮
    if (current_Num == questionList.length) {
        next.classList.add('hide')
        submit.classList.remove('hide')

    }
})

//======================提交=====================================================
submit.addEventListener('click', () => {
    // 计算分数
    // 跳转页面并携带数据
    if (selectedId == null) {
        alert('选个答案desuwa')
        return
    }
    // 记录最后一题的答案
    userAnswer.push(selectedId)
    // 统计分数
    clacScore()

    // 跳转页面
    location.href="./result.html?score=${score}"

})

function clacScore() {
    for (let i = 0; i < questionList.length; i++) {
        const questionItem = questionList[i]
        for (let j = 0; j < questionItem.topic_answer.length; j++) {
            const answerItem = questionItem.topic_answer[j]
            if (answerItem.topic_answer_id == userAnswer[i] && answerItem.is_standard_answer) {
                score += (100 / questionList.length)
            }
        }
    }
    // console.log(score)
}
