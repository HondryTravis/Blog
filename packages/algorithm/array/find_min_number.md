---
title: 把数组排成最小的数
---

**问题**：输入一个正整数数组，把数组里所有数字拼接起来获得的数字中，取得最小的一个

:::note 思路
快速排序：

- 先将数字进行排序
- 对排序的的数字进行交叉比较，因为会出现 [3, 32]，如果只进行简单的排序组合会得到 332 明显不是我们要得到的，323 才是正确结果
:::

代码实现:

```js
const findMinNumber = function (nums) {
  nums.sort( (a, b) => {
    const compare_s = a + '' + b
    const compare_e = b + '' + a
    if(compare_s > compare_e) return 1
    if(compare_s < compare_e) return -1
    return 0
  })
  return nums.join('')
}
```

> 时间复杂度是 O(NlogN), 空间复杂度是 O(1)
