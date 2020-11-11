---
title: 扑克牌顺子
---
**问题**：从扑克牌中随机抽取 5 张牌，判断这是不是个顺字，即这五张牌是不是连续的，2 ~ 10 为数字本身，A 为 1， J 为 11，Q 为 12，K 为 13，而大小王可以被看成0，可以是任意数字。 A 不能被视为 14 。 10JQKA

:::note 思路
整体大致算法流程:

- 首先应对数组排序
- 排除数据中的大小王（0）
- 统计所有相邻之数之间的间隔
- 同时还需要排除对子情况，如果出现对子，肯定不是顺字，（0）除外
- 最后判断间隔值，如果小于等于 4，那么可以组成顺子

:::

代码实现如下:

```js
  var isStaraight = function(nums) {
    // 从小到大排序
    const minSort = nums.sort((a,b)=> a - b)
    // 记录每个数字之间大差值，反正不能大于 4
    let sum = 0

    for (let i = 0; i < 4; i ++) {
      // 忽略 0 也就是大小王
      if(minSort[i] == 0) {
        continue
      }
      else if(num[i] == num[i+1]){
        return false
      }else {
        // 差值记录
        sum = sum + nums[i+1] - nums[i]
      }
    }
    return sum < 5
  }

```
