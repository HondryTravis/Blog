# 队列

**问题**  js 用两个栈来实现一个队列，完成队列的Push和Pop操作。 队列中的元素为int类型

::: tip 思路

栈：先进后出

队列： 先进先出

先入栈，然后将栈中的数据全部倒入到辅助栈中，就会变成栈先插入的元素在辅助栈的最顶层，调用 pop 方法即可

:::

代码实现如下:

```js
function queue() {
    this.inStack = []
    this.outStack = []
}
queue.prototype = {
  push: function(v) {
    this.inStack.push(v)
  },
  pop: function() {
    if(!this.outStack.length) {
      while(this.inStack.length) {
        this.outStack.push(this.inStack.pop())
      }
    }
    return this.outStack.pop() || -1
  }
}
```
