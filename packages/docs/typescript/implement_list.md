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
    if (!accumulator) {
        accumulator = self[0]
        idx = 1
    }
    for (let i = idx; i < self.length; i ++) {
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
    var ctor = Array.prototype.shift.apply(args)
    o.__proto__ = ctor.prototype
    ctor.apply(o, args)
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

```ts
// 非立即执行版
export function debounce(callback: Function, wait: number = 400) {
    let timer: NodeJS.Timeout, context: Function;

    const internalTimeoutCallback = function (...args: any[]) {
        clearTimeout(timer);
        context = this
        timer = setTimeout(() => {
            callback.apply(context, args);
            context = null;
        }, wait);
    }

    internalTimeoutCallback.cancel = function () {
        clearTimeout(timer)
        context = timer = null;
    }

    return internalTimeoutCallback
}
console.log(callback())
console.log(callback.cancel())
```

## 实现节流 `throttle`

指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率

> 使用场景：滚动事件 等

```ts
export function throttle(callback: Function, wait: number = 400) {
    let timer: NodeJS.Timeout, context: Function;

    const internalTimeoutCallback = function (...args: any[]) {
        context = this
        if (timer) return false;
        timer = setTimeout(() => {
            callback.apply(context, args);
            clearTimeout(timer);
            context = timer = null;
        }, wait)
    }

    internalTimeoutCallback.cancel = function () {
        clearTimeout(timer)
        context = timer = null;
    }

    return internalTimeoutCallback
}

const callback = throttle(fn, 200)

console.log(callback())
console.log(callback.cancel())
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

### 看看完整版手写 promise

```js

const PROMISE_STATE = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}

class NativePromise {
    constructor(executor) {
        // 创建时
        this.state = undefined;
        this.value = undefined;
        this.reason = undefined;

        // 订阅执行器的任务
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        // 初始化
        this.initialized(executor);
    }

    initialized(executor) {
        this.state = PROMISE_STATE.PENDING
        const that = this

        const resolve = function resolve(value) {
            setTimeout(() => {
                if (that.state === PROMISE_STATE.PENDING) {
                    that.state = PROMISE_STATE.FULFILLED
                    that.value = value

                    that.onFulfilledCallbacks.forEach((cb) => {
                        cb(that.value)
                    });
                }
            })

        }

        const reject = function reject(reason) {
            setTimeout(() => {
                if (that.state === PROMISE_STATE.PENDING) {
                    that.state = PROMISE_STATE.REJECTED
                    that.reason = reason
                    that.onRejectedCallbacks.forEach((cb) => cb(that.reason));
                }
            })
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        console.trace()
        const that = this;
        if (typeof onFulfilled !== 'function') {
            onFulfilled = function onFulfilled(value) { return value }
        }

        if (typeof onRejected !== 'function') {
            onRejected = function onRejected(reason) { throw reason }
        }

        if (this.state === PROMISE_STATE.PENDING) {
            const pendingPromise = new NativePromise((resolve, reject) => {
                that.onFulfilledCallbacks.push((value) => {
                    try {
                        console.log('Fulfilled', onFulfilled)
                        let x = onFulfilled(value);
                        resolvePromise(pendingPromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                that.onRejectedCallbacks.push((reason) => {
                    try {
                        let x = onRejected(reason);
                        resolvePromise(pendingPromise, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            })

            return pendingPromise
        }

        if (this.state === PROMISE_STATE.FULFILLED) {
            const fulfilledPromise = new NativePromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(that.value)
                        resolvePromise(fulfilledPromise, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                })
            })
            return fulfilledPromise
        }

        if (this.state === PROMISE_STATE.REJECTED) {
            const rejectPromise = new NativePromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(that.reason)
                        resolvePromise(rejectPromise, x, resolve, reject);
                    } catch (err) {
                        reject(err)
                    }
                })
            })
            return rejectPromise
        }

    }

}

function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) throw reject(new TypeError("循环引用"));

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(
                    x,
                    (y) => {
                        if (called) return;
                        called = true;
                        resolvePromise(promise, y, resolve, reject);
                    },
                    (r) => {
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } else {
                resolve(x)
            }
        } catch (err) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x)
    }
}

window.$p1 = new NativePromise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 1000);

}).then(v => console.log(v), e => console.log(e)).then( v2 => console.log(v2))


```
