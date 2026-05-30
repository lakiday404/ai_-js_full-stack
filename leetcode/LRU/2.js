// ============ LRU Cache 极致优化版：单 Map 解决 ============
// JS 的 Map 天然记住插入顺序，无需手写双向链表
// 思路：删掉再 set 回到队尾 = 标记为"最近使用"
//       Map 的第一个 key = 最久未使用，超出容量就删它

var LRUCache = function(capacity) {
    this.capacity = capacity
    this.cache = new Map()
};

LRUCache.prototype.get = function(key) {
    if (!this.cache.has(key)) return -1
    const value = this.cache.get(key)
    this.cache.delete(key)          // 先删
    this.cache.set(key, value)      // 再插回队尾（标记为最新）
    return value
};

LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key)      // 旧位置删掉
    }
    this.cache.set(key, value)      // 插到队尾（最新）
    if (this.cache.size > this.capacity) {
        const lruKey = this.cache.keys().next().value  // 队首 = 最久未用
        this.cache.delete(lruKey)
    }
};