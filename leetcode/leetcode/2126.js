// LeetCode 2126 - Asteroids Collision
// 贪心策略：按质量升序排序，依次尝试摧毁
// 理由：越小的越容易摧毁，先把能拿的分都拿了，再挑战大的
// 如果当前质量 < 当前小行星质量 → 无力摧毁，返回 false

var asteroidsDestroyed = function(mass, asteroids) {
    asteroids.sort((a, b) => a - b)
    for (const a of asteroids) {
        if (mass >= a) {
            mass += a
        } else {
            return false
        }
    }
    return true
};