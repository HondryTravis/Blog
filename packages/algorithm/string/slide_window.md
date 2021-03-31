---
title: 最长子字符串
---

**问题**：请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

> 在不考虑时间的情况下，直接暴力法对所有的子串进行检查。复杂度是0(n~3).

:::note 解法1:滑动窗口

准备2个指针 i、j，i 指向窗口左j指向右边。指针每次可以向前"滑动"一个位置，它们之间的区域就是"窗口"。

整体流程如下：

1. 准备哈希表 map。 key 是char, value 是 boolean ,代表字符 char 是否出现
 在滑动窗口内
2. i 和 j 初始化为 0, 结果 ans 初始化为 0
3. 检查 s[j] 是否出现过：
    - 没有出现过，扩大窗口:记录s[j]，指针j向右滑动一格。
    - 更新ans出现过，缩小窗口：指针i向右移动一格，map[s[i]] 更新为 false
4. 如果 i 和 j 没有越界，回到 step3，否则返回 ans

:::

代码实现如下:

```js

var lengthOfLongestSubstring = function(s) {
  const length = s.length;
  const map = {};// char => boolean 代表着char是否在目前的窗口内
  let i = 0,
  j = 0;
  let ans = 0;

  while (i < length && j < length) {
    if (!map[s[j]]) {
      ans = Math.max(j - i + 1, ans);
      map[s[j]] = true;
      ++j;
  } else {
    //如果char重复，那么缩小滑动窗口，并更新对应的map
    map[s[i]] = false;
    ++i;
  }
  }

  return ans;
};
```

> 由于整个过程就是"推着"滑动窗口从左到右，时间复杂度是 0(n)， 空间复杂度是 0(n)。

:::note 解法2:优化后的滑动窗口

在解法1的流程中的第3步，如果 s[j] 出现在滑动窗口内，采用的做法是左边逐步缩小滑动窗口。事实上，不需要逐步缩小。假设滑动窗口内和 s[j] 相同字符下标是 j，那么直接跳过 [i, j] 范围即可。

为了做到"跳动优化"，需要改造一下对哈希表map的用法：key 还是 char；value 变为 int，记录 char 对应的下标。

:::

代码实现如下:

```js

var lengthOfLongestSubstring = functlon(s) {
    const length = s.length;
    const map = new Map();
    let i = 0,
        j = 0;
    let ans = 0;
    while ( i  < length && j < length) {
    //容易理解：检查s[j]是否出现过，并且s[j]重复的字符是否在当前的滑动窗口中
      if (map.has(s[j]) && map.get(s[j]) >= i) {
        i = map.get(s[j]) + 1;
      }
      ans = Math.max(j - i + 1, ans);
      map.set(s[j], j);
      ++j;
    }

    return ans;
};
```

:::note 解法3: 还是滑动窗口的思路 直接替换

```js
var lengthOfLongestSubstring = function (s) {
    let map = new Map();
    let index = -1
    let last = 0
    for (let j = 0, n = s.length; j < n; j++) {
        if (map.has(s[j])) {
            index = Math.max(index, map.get(s[j]))
        }
        last = Math.max(last, j - index)
        map.set(s[j], j)
    }
    return last
};
```
