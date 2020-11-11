---
title: 找到链表中倒数第 k 个节点
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
  while(node){
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
    if(right === null) {
      // 链表长度小于 k
      return null
    }
    right = right.next
  }
  
  let left = head
  
  while(right) {
    left = left.next;
    right = right.next;
  }
  
  return left
}

```

> 时间复杂度为 O(N)，但仅需要遍历一次，空间复杂度为 O(1)
