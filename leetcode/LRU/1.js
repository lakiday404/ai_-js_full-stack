var LRUCache = function(capacity) {
  this.data = {}  // 存储数据
  this.max = capacity  // 最大存量
  this.keyArr = []  // key 的使用情况
};

LRUCache.prototype.updateKey = function(key) {  // 更新 key 的地位
  // 找出 key 的下标
  const index = this.keyArr.indexOf(key)
  if (index !== -1) {
    this.keyArr.splice(index, 1)
    this.keyArr.push(key)  // 更新了位置
  }
}

LRUCache.prototype.get = function(key) {
  if (this.keyArr.includes(key)) {
    this.updateKey(key)
    return this.data[key]
  }
  return -1
};

LRUCache.prototype.put = function(key, value) {
  const idx = this.keyArr.indexOf(key)
  // this.max
  if (idx !== -1) {
    this.updateKey(key)  // [1, 2, 3]
  } else {
    this.keyArr.push(key)
  }

  if (this.keyArr.length > this.max) {
    this.keyArr.shift()
  }

  this.data[key] = value
};