# 递归优化

常规尾递归会有爆栈的问题

## 常规递归

```js
function fn(x) {
  if( x < 0) {
    return '结束'
  }
  console.log(x)
  return fn(x-1)
}
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

```

## 测试

```js
  // 测试代码
  console.log(fn(100000)) // 爆栈
  console.log(fn2(100000))
  console.log(trampoline(fn3(100000)))
```
