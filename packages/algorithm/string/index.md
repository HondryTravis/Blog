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


## 翻转单词顺序

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。

[LeetCode 翻转单词顺序](https://leetcode-cn.com/problems/fan-zhuan-dan-ci-shun-xu-lcof/)


:::note 思路
1. 通过 空格 拆分成数组
2. 过滤掉所有空格
3. 对数组进行原生反转/双指针反转
4. 通过 join(' ') 进行连接
:::

### Q & A

1. 双指针反转

```ts
function reverseWords(s: string): string {
  return reverse(s.split(' ').filter( it => it !== '')).join(' ')
};

function reverse(arr: string[]) {
  let i = 0, j = arr.length - 1
  while(i < j) swap(arr, i++, j--)
  return arr
}

function swap(arr: string[], cur: number, prev: number) {
  [arr[cur], arr[prev]] = [arr[prev], arr[cur]]
}
```

2. 原生数组反转

```ts
function reverseWords(s: string): string {
  return s.split(' ').filter( it => it !== '').reverse().join(' ')
};
```