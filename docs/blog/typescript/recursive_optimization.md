# 递归优化

尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。怎么做可以减少调用栈呢？就是采用“循环”换掉“递归”。

## 常规递归

函数调用会在内存形成一个调用记录，称调用帧，保存调用位置和内部变量等信息。

每一次循环调用函数，外层函数就会记录内层函数的调用帧，所有调用帧形成了一个调用栈，如果调用帧太多，就会发生栈溢出。

```js
function fn(x) {
  if( x < 0) {
    return '结束'
  }
  console.log(x)
  return fn(x-1)
}
console.log(fn(100000))
// Uncaught RangeError: Maximum call stack size exceeded
```

## 利用循环优化后的递归

```js

function fn2(x) {
    while(true) {
        if(x < 0) {
            return '结束'
        }
        console.log(x)
        x = x-1

    }
}
console.log(fn2(100000))
```

## 利用蹦床函数优化

```js
function fn3(x) {
    if(x < 0) return '结束'
    console.log(x)
    return fn3.bind(null, x-1)
}

function trampoline(f) {
    while(f && f instanceof Function) {
        f = f()
    }
    return f
}
console.log(trampoline(fn3(100000)))
```

[尾调用优化](https://es6.ruanyifeng.com/#docs/function#尾调用优化)
