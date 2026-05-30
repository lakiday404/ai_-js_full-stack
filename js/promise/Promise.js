// 官方源代码

function Promise(fn) {
    this.state = 'pending'  // 准备状态
    this.arr = [foo]

    const resolve = (res) => {
        this.state = 'resolved'  // 成功状态
        // foo(res)
    }
    const reject = () => { }

    fn(resolve, reject)
}

new Promise((resolve, reject) => {
    resolve()
})