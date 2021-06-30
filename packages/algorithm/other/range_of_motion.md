---
title: 运动范围
---

[LeetCode 机器人的运动范围](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/)

**问题** 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？


```js
function bitSum(n) {
  let res = 0;
  while (n) {
    res = res + (n % 10);
    n = Math.floor(n / 10);
  }
  return res;
}
```

:::note 解法: 广度优先遍历BFS

1. 使用队列
2. 因为从左上角开始遍历，因此只需要遍历「右」和「下」这两个方向 
3. 每次判断当前坐标是否在范围内，然后使 step ++
4. 然后校验下一个坐标是否满足要求，满足就推入队列

:::

代码如下:

```js
/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */

const sum = (x) => {
  let ret = 0
  while (x) {
    ret += x % 10
    x = Math.floor(x / 10)
  }
  return ret
}
var movingCount = function (m, n, k) {
  let step = 0

  let directions = [
    [1, 0], // 向右
    [0, 1] // 向下
  ]

  const queue = [[0, 0]];

  // set 表示当前坐标是否访问过
  const visitedSet = new Set();
  visitedSet.add('0-0')

  while (queue.length) {
    const [x, y] = queue.shift();
    if (sum(x) + sum(y) > k) continue;
    step ++

    // 遍历每个方向上的坐标，并且打上标记，是否访问过
    for (const direction of directions) {
      // 每次移动一个新的格子
      const newx = direction[0] + x;
      const newy = direction[1] + y;

      const point = `${newx}-${newy}`
      
      if (!visitedSet.has(point)
      && newx >= 0
      && newy >= 0
      && newx < m
      && newy < n
      ) {
        queue.push([newx, newy]);
        visitedSet.add(point)
      }
    }
  }

  return step
};
```

> 时间复杂度是 O(N), 空间复杂度是 O(N)。