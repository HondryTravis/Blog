---
title: String | 字符串
---


## 最长公共前缀


[LeetCode 最长公共前缀](https://leetcode-cn.com/problems/longest-common-prefix/)


:::note 最长公共前缀
编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

```js
// 输入：strs = ["flower","flow","flight"]
// 输出："fl"
```
:::


:::note 思路
纵向比较

1. 使用横向扫描的方法
2. 对每个字符的当前列进行比较，如果相同就移动到下一列，如果当前列出现不同的字符串，表示不再是公共前缀了
:::


### Q & A

```ts
function longestCommonPrefix(strs: string[]): string {
  let prefix = ''
  let i = 0
  if(!strs.length) return ''
  outer: while(true) {
    if(i === strs[0].length) break
    const cur = strs[0].charAt(i)
    for(let item of strs) {
      const refer = item.charAt(i)
      if(refer !== cur) break outer
    }
    prefix += cur
    i ++
  }
  return prefix
};

longestCommonPrefix(["flower","fl1"])
```