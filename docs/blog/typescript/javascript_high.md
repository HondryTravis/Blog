# 高阶方法 | js

## defineProperty

[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

> Object.defineProperty(obj, prop, descriptor)

**obj**: 要劫持的对象，或返回的对象

**prop**: 一般为对象的 key， Symbol 类型

**descriptor**: 属性描述符  共有四个配置项，两个方法

|名称|含义|默认值|
|:-:|:-:|:-:|
|enumerable|可枚举，就是可以遍历|false|
|configurable|可配置，就是对象的 key 可以被删除|
|value|结果值|undefined|
|writable|可写，可以赋值|false|
|get|在获取值时被调用|undefined|
|set|在设置值时被调用|undefined|
> descriptor 中同时有访问器(getter/setter) 与 value/writable 属性 会报错

简单创建一个劫持对象方法试试，🍺

```js
// 示例 创建 一个observer
function defineReactive(obj, key, val){
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function _get(){
            console.log(`get key: ${key}, vaule:${val}`);
            return val
        },
        set: function _set(newVal){
            console.log(`set key: ${key}, vaule:${newVal}`);
            val = newVal
        }
    })
}
function observer(obj){
    Object.keys(obj).forEach(function(key){
        defineReactive(obj, key, obj[key])
    })
}
```

### 劫持对象

```js
// 创建一个对象，我们来检测试试
var o = {
  a: 1
};
observer(o)
// 响应的
console.log(o.a) // get
o.a = 2 // set
o.c = 2 // 2 对新增的无法监听
```

### 劫持数组

可以监听已经存在的数组(下标)变化，但是无法监听新增的

```js
// 创建一个数组
var o = [1,2,3]
// 是响应式的 arr
console.log(o[2]) // get val
o[2] = 3 // set val
o.push(6) // 6 没有触发 set. 但是数据变了 1,2,3,4,5,6
// 下列情况异常
o.shift() // [2,3] 分别会触发 3 次 get，两次 set
o[2] = 4 // 4 数组原本长度为 3. 但是 2 是新增的内存地址
```

::: tip 结论🍺
也就是说，能改变数组下标的方法，改变原本的位置之后，都不会监听了
:::

数组的下列操作都会导致无法监听

- push
- pop
- shift
- unshift
- splice
- sort
- reverse

### 创建对象

```js
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
```
