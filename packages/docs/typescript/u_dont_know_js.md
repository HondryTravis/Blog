---
title: JS | 你以为的JS
---

修改一下，如何使下列等式成立？ 🤔

```js
function usr(name, age){
    this.name = name 
    this.age = age 
}

console.log(new usr('李4', 20) + new usr('赵2', 40))
// new usr('李4', 20) 李4赵2

console.log(new usr('赵2', 40) / new usr('李4', 20))
// 2
```

## 原始值 toPrimitive

[Symbol.toPrimitive](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) 是一个内置的 Symbol 值，它是作为对象的函数值属性存在的，当一个对象转换为对应的原始值时，会调用此函数

在 Symbol.toPrimitive 属性(用作函数值)的帮助下，一个对象可被转换为原始值。该函数被调用时，会被传递一个字符串参数 hint ，表示要转换到的原始值的预期类型。 hint 参数的取值是 "number"、"string" 和 "default" 中的任意一个

所以这个问题可以改成

```js
function usr(name, age){
  this.name = name 
  this.age = age 
  this[Symbol.toPrimitive] = function(hint) {
    switch (hint) {
      case 'number': 
        return this.age
      default: 
        return this.name     
    }
  }
}
```

在看个例子, 如何使该等式成立

```js
var a;
// 修改一下
if(a === 1 && a === 2 & a === 3){
  // 需要执行这里
  console.log('dosomthing')
}
```

我们也可以这样做,当然我们也可以使用 valueOf/toString 的方式去修改

```js
var a = {
  i: 0,
  [Symbol.toPrimitive]:function(hint){
    return ++this.i
  }
}
if(a === 1 && a === 2 & a === 3){
  // 需要执行这里
  console.log('dosomthing')
}
```

## a 是什么

```js
function foo(){
  try{
    var a = 50
    throw ""
  }catch(e){
    console.log(a)
    var a = 250
  }
}
foo()
```

因为在执行函数 foo 的时候创建了一个单独的 EC 栈帧，在抛出异常的时候，栈帧内 Local 的 a 为 50.在抛出异常前， 所以 console.log 的结果是 50

## 逗号运算符

```js
const a = ('hellojs', 20)
console.log(a) // ??
```

逗号运算符是二元运算符，它能够先执行运算符左侧的操作数，然后再执行右侧的操作数，最后返回右侧操作数的值

所以 a 最后的结果是 20
