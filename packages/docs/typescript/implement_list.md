---
title: JS | 手写系列
---

<!-- # 手写系列 -->

:::note 思考 🤔
只是会用可不行，如何实现？
:::

## 实现 `reduce`

揭开神秘面纱系列

```js
var _reduce = function(callback, accumulator) {
    const self = this
    let idx = null
    if(!accumulator) {
        accumulator = self[0]
        idx = 1
    }
    for(let i = idx; i < self.length; i ++) {
        accumulator = callback(accumulator, self[i], i, self)  
    }
    return accumulator
}


Array.prototype.reduce = _reduce

var a = [1,2,3,4,5]
a.reduce((acc, cur) => {
    console.log(cur)
    return acc + cur
})
```

## 实现 `new`

揭开神秘面纱系列

```js
var _new = function(...args) {
    var o = Object.create({})
    var _constructor = Array.prototype.shift.call(...args)
    o.__proto__ = _constructor.prototype
    _constructor.apply(o, args)
    return o
}


function humen(name, age) {
    this.name = name
    this.age = age
}
humen.prototype = {
    constructor: humen,
    say() {
       console.log(`my name's ${this.name}, my age's ${this.age}`)
    }
}

var test = _new(humen, '张三', 18)
console.log(test.say())
```

## 实现 `map`

揭开神秘面纱系列

```js
const _map = function(callback) {
    const _this = this
    const reslut = []
    for(let i = 0; i < _this.length; i ++) {
       reslut.push(callback(_this[i], i, _this))  
    }
    return reslut
}


Array.prototype.map = _map

var a = [1,2,3,4,5]
a.map((item) => {
    console.log(item)
    return item + 2
})
```

## 实现 `call`

揭开神秘面纱系列

```js
var _call = function(obj, ...args) {
  obj.fn = this;
  let res = obj.fn(...args);
  delete obj.fn;
  return res
}

Function.prototype.call = _call

var test1 = {
    name: '李四',
    age: 20
}

function test(name, age) {
    this.name = name
    this.age = age
}
test.call(test1, '老袁', 34)
console.log(test1)
```

## 实现 `bind`

揭开神秘面纱系列

```js
var _bind = function(obj, ...args) {
  obj.fn = this
  return function() {
    let arr = args.concat(arguments)
    let res = obj.fn(...arr)
    delete obj.fn
    return res
  }
}

Function.prototype.bind = _bind

var test = {
  name: '李四',
  age: 18,
  say() {
      console.log(this.name, this.age)
  }
}

var b = test.say
console.log(b())
```

## 实现 `apply`

揭开神秘面纱系列

```js
var _apply = function(obj, args) {
  let res;
  obj.fn = this;
  if (args && args.length) {
      res = obj.fn(...args);
  } else {
      res = obj.fn();
  }
  delete obj.fn;
  return res;
}

Function.prototype.apply = _apply


var test1 = {
    name: '李四',
    age: 20
}


function test(name, age) {
    this.name = name
    this.age = age
}
test.apply(test1, ['老袁', 34])
console.log(test1)
```

## 实现防抖 `debounce`

指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

> 使用场景：疯狂click刷页 等

```js
// 非立即执行版
const debounce = function(callback, wait) {
  let timer;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      callback.apply(context, args)
    }, wait)
  }
}
console.log(debounce(fn, 200)())
```

## 实现节流 `throttle`

指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率

> 使用场景：滚动事件 等

```js
const throttle = function (callback, wait) {
  let timeout;
  return function(...args) {
    const context = this;
    return timeout || (timeout = true) && setTimeout(() => {
          timeout = false;
          callback.apply(context, args)
      }, wait)
  }
}
console.log(throttle(fn, 200)())
```

## 实现 Promise

首先看看 Promise 语法

包裹内容中不存在异步
```js title="noasync.js"
const promise = new Promise((resolve, reject) => {
  resolve('resolved');
});
promise.then( res => {
  console.log(res) // resolved
})
```

包裹内容中存在异步
```js title="async.js"
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolved');
  }, 1000);
});
promise.then( res => {
  console.log(res) // resolved
})
```

返回一个Promise 被函数包裹的
```js title="beWrapped.js"
const getPromise = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolve');
    }, 1000);
  });
};

getPromise().then((res) => {
    console.log(res); // resolve
});
```

