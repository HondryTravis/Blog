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