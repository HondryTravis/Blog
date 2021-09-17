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

## 字符的最短距离

[LeetCode 821. 字符的最短距离](https://leetcode-cn.com/problems/shortest-distance-to-a-character/)

给你一个字符串 s 和一个字符 c ，且 c 是 s 中出现过的字符。

返回一个整数数组 answer ，其中 answer.length == s.length 且 answer[i] 是 s 中从下标 i 到离它 最近 的字符 c 的 距离 。

两个下标 i 和 j 之间的 距离 为 abs(i - j) ，其中 abs 是绝对值函数。

```txt
示例 1：

输入：s = "loveleetcode", c = "e"
输出：[3,2,1,0,1,0,0,1,2,2,1,0]
解释：字符 'e' 出现在下标 3、5、6 和 11 处（下标从 0 开始计数）。
距下标 0 最近的 'e' 出现在下标 3 ，所以距离为 abs(0 - 3) = 3 。
距下标 1 最近的 'e' 出现在下标 3 ，所以距离为 abs(1 - 3) = 2 。
对于下标 4 ，出现在下标 3 和下标 5 处的 'e' 都离它最近，但距离是一样的 abs(4 - 3) == abs(4 - 5) = 1 。
距下标 8 最近的 'e' 出现在下标 6 ，所以距离为 abs(8 - 6) = 2 。

示例 2：

输入：s = "aaab", c = "b"
输出：[3,2,1,0]
```

### 思路

1. 从当前下标找到的下标出发，分别向左、右两个方向去寻找目标字符 C
2. 只在一个方向找到的话，直接计算字符距离
3. 两个方向都找到的话，取两个距离的最小值(min)

### 代码

```js
var shortestToChar = function (S, C) {
    const result = []
    
    //  先找到前两个出现的位置
    for (let i = 0, l = S.indexOf(C), r = S.indexOf(C, l + 1); i < S.length; i++) {
        // 计算与左指针的距离
        result[i] = Math.abs(l - i)
        if (r === -1) continue

        // 如果右指针存在,取较小的距离
        result[i] = Math.min(result[i], r - i)

        // 走到右指针则左右指针往下一个
        if (i != r ) continue

        (result[i] = 0, l = r, r = S.indexOf(C, r + 1))
       
    }
    return result
};
```

### 复杂度

时间复杂度：O(n)
空间复杂度：O(n)

## 字符串解码

[LeetCode 394. 字符串解码](https://leetcode-cn.com/problems/decode-string/)

给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。

```txt
示例 1：
输入：s = "3[a]2[bc]"
输出："aaabcbc"

示例 2：
输入：s = "3[a2[c]]"
输出："accaccacc"

示例 3：
输入：s = "2[abc]3[cd]ef"
输出："abcabccdcdcdef"

示例 4：
输入：s = "abc3[cd]xyz"
输出："abccdcdcdxyz"
```
### 思路

使用双栈，碰到 `[` 数字和当前字符串入栈，碰到 `]` 数字和字符串出栈。

### 代码

```js
var decodeString = function(s) {
    const countStack = [], strStack = []  // 一个放倍数，一个放拼接的
    let num = 0, result = ''

    for (const ch of s) {
        if (!isNaN(ch)) num = num * 10 + Number(ch)
        else if (ch === '[') {
            strStack.push(result)
            result = ''        
            countStack.push(num) 
            num = 0               
        } else if (ch === ']') { 
            const count = countStack.pop()
            result = strStack.pop() + result.repeat(count)
        } else result += ch                  
            
    }
    return result
};
```

### 复杂度分析

时间复杂度: O(n)

空间复杂度: O(n)