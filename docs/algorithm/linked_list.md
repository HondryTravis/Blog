# 反转链表

**问题**：输入一个链表，反转链表后，输出新链表的表头

## 使用栈

::: tip 思路

借助栈后进先出的原则，将列表逆序。不过这不是原地反转

步骤：

- 重头到尾遍历链表，将节点 val 值依次放入栈
- 重栈中一次取出 val，并且重新构造链表
:::

实现代码如下：

```js
var reverseList = function(head) {
  if(!head){
    return null
  }
  const stack = []
  let node = head
  while(node) {
    stack.push(node.val)
    node = node.next
  }
  const newHead = {
    val: stack.pop(),
    next: null
  }
  node = newHead

  while(stack.length) {
    node.next = {
      val: stack.pop(),
      next: null
    }
    node = node.next
  }
  return newHead
}
```

> 时间复杂度 O(N) 空间复杂度 O(N)

## 原地反转

::: tip 思路
**原地反转** 思路简单，但是实现的细节需要做一些处理。链表类的原地操作，大部分是在细节上容易出问题，导致进入死循环，或者报错

准备当前节点 node，和 node 的前一个节点的 preNode。整体流程如下：

- 保留当前节点的下一个节点
- 将下一个节点的 next 指向前一个节点的 preNode
- 更新 preNode 为当前节点，更新当前节点为第一步保留的下一个节点
- 判断当前节点是否是最后一个节点，如果不是，返回第一步，如果是进入最后一步，将当前节点的 next 指向前一节点 preNode 节点
:::

实现代码如下：

```js
var reverselist = function(head) {
  if(!head) {
    return null
  }
  let node = head
  let preNode = null
  whlie(node.next){
    const nextNode = node.next
    node.next = preNode
    preNode = node
    node = nextNode
  }
  node.next = preNode
  return node
}
```

> 时间复杂度为 O(N)， 空间复杂度为 O(1)
