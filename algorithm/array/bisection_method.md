---
title: 二分法
---

## 小案例

### 查找缺失的数字

**问题**：在一个长度为 n-1 递增排序数组中的所有数字都是唯一的，并且每个数字的范围都在 0 ~ n-1 之内。在范围 0 ~ n-1 内的 n 个数字中有且只有一个数字不在该数组中，请找出这个数字

:::note 思路
利用二分法查找

left 指向 0，right 指向最后一个元素，计算中间坐标 mid 值

- 如果 mid = nums[mid]， 说明[0, mid]范围内不缺失数字，left 更新为 mid + 1
- 如果 mid < nums[mid]， 说明[mid, right]范围内不缺失数字，right 更新为 mid - 1
- 检查 left 是否小于等于 mid，若成立返回第二步，否则，继续向下执行
- 返回 left 即可

**注意**：根据问题描述，可以知道 mid > nums[mid] 这种情况不存在
:::

代码实现如下:

```js
  var missingNumber = function (nums) {
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
      let mid = Math.floor( (left + right) / 2)
      if (mid === nums[mid]) {
        left = mid + 1
      } else if (mid < nums[mid]) {
        right = mid - 1
      }
    }
    return left
  }
```
