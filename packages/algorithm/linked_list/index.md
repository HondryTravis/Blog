---
title: LinkedList | 链表
---

**问题**：输出该链表中倒数第 k 个节点

## 两次循环

:::note 思路

因为要求链表倒数第 k 个节点，也就是求正数第 length - k 个节点。

- 链表又是一个单链表，并且没有保存长度信息，所以需要循环一次记录 length
- 第二次循环找到低 length - k 个节点

:::

代码如下

```js
const getKthFromEnd = function(head, k) {
  let length = 0;
  let node = head;
  while (node){
    ++length;
    node = node.next
  }
  
  if (k > length) {
    return null;
  }
  node = head;
  let offset = length - k;
  for (let i = 0; i < offset; ++i) {
    node = node.next
  }
  return node
}
```

> 时间复杂度是 O(N), 需要两次循环

## 快慢(双)指针

:::note 思路

准备两个指针: left（慢）和 right（快）

- right 先向右移动 k 位，此时 index(right) - index(left) = k,left 和 right 一起向右移动，直到 right 抵达边界

由于 index(right) - index(left) = k 所以: index(left) = index(right) - k = length - k。

- 也就是 left 指针移动到了倒数第 k 个位置

:::

代码如下:

```js
const getKthFromEnd = function(head, k) {
  let right = head;
  for (let i = 0; j < k; ++i) {
    if (right === null) {
      // 链表长度小于 k
      return null
    }
    right = right.next
  }
  
  let left = head
  
  while (right) {
    left = left.next;
    right = right.next;
  }
  
  return left
}

```

> 时间复杂度为 O(N)，但仅需要遍历一次，空间复杂度为 O(1)


## 两两交换链表中的节点

[LeetCode 24. 两两交换链表中的节点](https://leetcode-cn.com/problems/swap-nodes-in-pairs/)

给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

**示例 1**

![链表](https://gitee.com/HondryTravis/images/raw/master/linkedlist-swap-nodes-in-pairs.jpg)

```txt
输入：head = [1,2,3,4]
输出：[2,1,4,3]

输入：head = []
输出：[]

输入：head = [1]
输出：[1]
```

### 思路

:::note 思路
1. 创建伪头节点，对伪头节的 next 指向 head
2. 先让 fake head 指向 head， 然后创建一个临时变量 temp 指向 fake head
3. 当存在 temp.next.next 时，表示可以满足被交换的条件
4. temp在一开始的时候需要修改指向，因为开始是 temp -> n1 -> n2 需要修改 为 temp -> n2 -> n1
5. 然后修正 n1 n2 的指向
6. 最后修改 temp 的指向
7. 最后返回 fake head 的 next 即可
:::

### 代码 Q & A

```js
var swapPairs = function (head) {
  if (head === null || head.next === null) return head

  // 建立伪头节点，让伪头节点的 next 指向当前的 head
  const p = new ListNode(-1, head)
  let temp = p

  // 当链表 +1 +2 的节点存在时
  while (temp.next && temp.next.next) {
    // 每次取 next1 和 next2 节点
    const [n1, n2] = [temp.next, temp.next.next]

    // 对临时节点的 next 指向做调整
    // t -> n2 -> n1
    temp.next = n2
    // 修改 next1 和 next2 的节点 next 做调整
    n1.next = n2.next
    n2.next = n1

    // 交换完成之后更新 temp 的位置,知道交换完成
    // before: t[cur] -> n2 -> n1
    // after: n2 -> t[n1]
    temp = n1
  }
  return p.next
};
```

### 复杂度分析

时间复杂度：O(n)，其中 n 是链表的节点数量。需要对每个节点进行更新指针的操作。

空间复杂度：O(1)。

## 旋转链表

[LeetCode 61. 旋转链表](https://leetcode-cn.com/problems/rotate-list/)

:::info
给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
:::

**示例 1**

![](https://gitee.com/HondryTravis/images/raw/master/linked-list-rotate-list1.jpg)
```txt
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
```

**示例 2**

![](https://gitee.com/HondryTravis/images/raw/master/linked-list-rotate-list2.jpg)
```txt
输入：head = [0,1,2], k = 4
输出：[2,0,1]
```

```txt
提示：
链表中节点的数目在范围 [0, 500] 内
-100 <= Node.val <= 100
0 <= k <= 2 * 109
```

### 思路

让链表形成环，然后找到对应位置断开

1. 优先遍历链表中的个数
2. 对移动距离求模就是剩下需要在移动的距离 distance
3. 如果恰好相等，返回原链表，否则就讲链表补充为环状开始计算，方便断开
4. 当最终移动距离 distance 为 0 时，最后断开

### 代码

```js
var rotateRight = function(head, k) {
    if (k === 0 || !head || !head.next)  return head

    // 优先遍历链表中的个数
    let count = 1, cur = head
    while (cur.next) (cur = cur.next, count ++)

    // 对移动距离求模就是剩下需要在移动的距离
    let distance = count - k % count

    // 如果恰好相等，返回原链表
    if (distance === count) return head

    // 将链表补充为环
    cur.next = head
    while (distance) (cur = cur.next, distance --)

    // 最后断开
    const ret = cur.next
    cur.next = null

    return ret
};
```

### 复杂度分析

时间复杂度: O(n)

空间复杂度: O(1)