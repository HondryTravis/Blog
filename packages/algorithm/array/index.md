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