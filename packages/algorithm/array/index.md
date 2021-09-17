---
title: Array | 数组
---

## 数组的最大深度


:::note 问题
实现maxDeep()
```js
maxDeep([1,2,3,4,5]) // 1

maxDeep([1,[2,3],4,[5,6],[7]]) // 2

maxDeep([1,[2,[3],4],[5,6],[7]]) // 3
```
:::


### Q & A

1. 用全局变量记录当前最大深度
2. 每次遇到数组的时候进行递归，同时加上当前层级并且更新当前最大深度

```js
function maxDeep(nums) {
  let ret = 0
  
  function dfs(arr, level) {
     level +=1
     ret = Math.max(ret, level)
     for(const item of arr) {
       if(Array.isArray(item)) {
          dfs(item, level)
       }
     }
  }
  dfs(nums, 0)
  return ret
}

maxDeep([ 1, [2]]) // 2
maxDeep([ 1, [2, [3]]]) // 3
maxDeep([ 1, [2, [3, [4]]], [2, [3]], 7] ) //4
```


## 对数组进行排序

乱序数组，要求偶数基数在前， 偶数在后


:::note 思路
1. 使用双指针对数组进行排序
2. 如果前指针是偶数，后指针指向奇数，那么就交换
3. 否则就进行相应的指针移动
4. 当前后向指针索引小于前向指针时，停止排序
:::


```ts
function sort(arr: number[]): number[] {
  let i = 0, j = arr.length - 1
  const isOdd = (n: number) => Boolean(n % 2)
  while( i < j ) {
    if(!isOdd(arr[i]) && isOdd(arr[j])) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    while(isOdd(arr[i])) {
      i ++
    }

    while(isOdd(arr[j]) === false) {
      j --
    }
  }
  return arr
}


const a = [22,0,1,2,3,4,5,6,7,8]
sort(a)
console.log(sort(a))
```

## 数组形式的整数加法

[LeetCode 989. 数组形式的整数加法](https://leetcode-cn.com/problems/add-to-array-form-of-integer/)

对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。

给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。


```txt
示例 1：
输入：A = [1,2,0,0], K = 34
输出：[1,2,3,4]
解释：1200 + 34 = 1234

示例 2：
输入：A = [2,7,4], K = 181
输出：[4,5,5]
解释：274 + 181 = 455
```

### 思路

已知 k 不是 bigint 的情况下

1. 通过对 k 不断累加 nums 的低位来维护 k
2. 通过对 k 不断求模得到当前位，不断求商得到进位，维护 k 即可

### 代码 Q & A

```js
var addToArrayForm = function(num, k) {
  const { floor } = Math
  const n = num.length, ret = []

  let i = n - 1

  while (i >= 0 || k) {
      // 出现 undefined 就要进位默认值 0
      // num: [0], k = 23
      k += (num[i] || 0)
      ret.push(k % 10)
      k = floor(k / 10)
      i--
  }

  return ret.reverse()
};
```

### 复杂度

- 时间复杂度 O(n)
- 空间复杂度 O(n)