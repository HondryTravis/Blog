# 数组统计

**问题**：数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字，你可以假设数组是非空数组，并且给定的数组是多数元素

## 哈希表统计计数

::: tip 思路
**分析**：数组非空，且一定存在存在多素的元素

- 借助哈希表统计，键是数字，出现的次数为值

- 遍历数组，统计数字和实现的次数

- 遍历哈希表，返回出现次数超过长度一半的数字

**注意**：使用 es6 的 Map 对象，不能使用 json 对象，因为 json 类型的对象的键存在隐式转换，所有的键都会被转换成字符串，从而导致不易排查的 bug
:::

代码实现如下:

```js
  var majorityElement = function(nums) {
    const map = new Map()
    const length = nums.length

    nums.forEach( num => {
      const times = map.get(num)
      if(times === undefined){
        map.set(num, 1)
      }else {
        map.set(num, times + 1)
      }
    })

    for (const key of map.keys()) {
      if(map.get(key) > length/2){
        return key
      }
    }
    return 0
  }
```

**结论**：遍历两次，时间复杂度是 O(N)，哈希表存储次数，空间复杂度O(N)

## 摩尔投票算法(推荐)

::: tip 思路
**分析**：只有一个数字出现的次数超过数组长度的一半，也就是说这个数字出现的次数比其数字出现的次数总和还要多

定义变量 result 和 times，第一次遍历的时候

- times = 0， 那么 result 等于当前元素，times 变为 1
- times != 0 且 result != 当前元素， times 减 1
- times != 0 且 result = 当前元素， times 加 1

遍历完成以后，result 就是出现次数最多的超过数组长度一半的数字了
:::

代码实现如下:

```js
var majorityElement = function(nums) {
    let times = 0
    let result = 0

    nums.forEach( number => {
      if (times === 0) {
        times = 1
        result = number
      } else if (number === result) {
        times += 1
      } else {
        // number !== result
        times -= 1
      }
    })

    return result
  }
```

**结论**：时间复杂度 O(N)。 空间复杂度 O(1)，比哈希那个更优。问题已经指出，假设一定存在多数元素，不需要二次遍历进行确定

> 拓展思考

如果问题没有假设数组中一定存在数目次数大于长度一半的元素，例如 `[1, 2, 3]`。此时还需要去遍历一次，去统计一下 result 出现的次数
