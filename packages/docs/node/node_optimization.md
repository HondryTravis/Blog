---
title: NodeJS 性能调优
---

## 内存泄露

### 概述

程序的运行需要内存。只要程序提出要求，操作系统或者运行时（runtime）就必须供给内存。对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak)。

有些语言（比如C语言）必须手动释放内存，程序员负责内存管理。

### 具体表现

有内存泄露

![memory_leak_had](/images/node/memory_leak_had.png)

没有内存泄露

![memory_leak_nohad](/images/node/memory_leak_nohad.png)

成锯齿状（saw-tooth pattern）是由Scavenge创建的，而出现向下跳跃的则是由Mark-Sueep操作产生的。

随着内存泄漏的增长，V8对垃圾收集器越来越具有攻击性，这会使你的应用运行速度变慢。

内存泄露可能触发其他类型的失败。内存泄露的代码可能会持续的引用有限的资源。你可能会耗尽文件描述符;你还可能会突然不能建立新的数据库连接。

你的应用迟早会崩溃，并且在你的应用受到欢迎时肯定会发主。

浏览器端也会发主内存泄露，只不过浏览器只针对一端，会造成网页的卡顿。

## 如何得到程序的内存泄露信息

node自带的有 process.memoryUsage 返回一个对象包含了4个字段

- res 所有的内存占用
- heapTotal 堆占用的内存，用到的没用到的都有
- heapUsed 用到的堆的部分
- exter V8银枪内部的C++对象占用的内存

判断内存泄漏，以heapUsed为准。

### 第三方插件

**memwatch**（监听内存GC）

它是一个泄漏事件发射器，经过连续5次的GC，内存仍被持续分配没有得到释放，就能生成快照

**heapdump**（生成内存快照）

一个状态事件发射器

## 压力测试寻找内存泄露

PV:网站当日访问人数

UV:独立访问人数

PV每天几十万甚至上百万就需要考虑压力测试。

换算公式 QPS = PV/t

ps∶`1000000 / 10*60*60=27.7`（100万请求集中在10个小时，服务器每秒处理27.7个业务请求）

### 测试工具 wrk

可以通过 [wrk](https://github.com/wg/wrk) 进行测试

| 项 目 | 名 称 | 说 明 |
|:-:|:-:|:-:|
|Avg|平均值|每次测试的平均值|
|Stdev|标准偏差|结果的离散程度，越高说明越不稳定|
|Max|最大值|最大的一次结果|
|+/- Stdev|正负一个标准差占比|结果的离散程度，越大越不稳定|

Latency: 可以理解为响应时间

Req/Sec: 每个线程每秒钟的完成的请求数，一般我们来说我们主要关注平均值和最大值. 标准差如果太大说明样本本身离散程度比较高. 有可能系统性能波动很大

Wrk 属性参数

- -t 需要模拟的线程数

- -c 需要模拟的连接数

- -timeout 超时的时间

- -d 测试的持续时间

执行完之后会返回信息，latency 响应时间，req/sec(qps) 每个线程每秒钟完成的请求数。

```bash
# 用12个线程模拟100个连接、30s内。一般线程数不宜过多. 核数的2到4倍足够
./wrk -t12 -c400 -d30s address
```

```js
//package.json
{
  "name": "nodedemo",
  "version": "1.0.0",
  "description": "",
  "main": "demo1.js",
  "scripts": {//使用make命令生成wrk文件
    "test": "./wrk -t12 -c200 -d 60s http://127.0.0.1:3000"
  },//t线程  用了3个核，每个四个线程
  "keywords": [],
  "author": "",
  "license": "ISC"
}

//js
const http = require('http');

let s = '';
for (let i = 0; i < 1024 * 10; i++) {
  s += 'a';
}

const str = s;
const buffStr = Buffer.from(s);//实验结果提升20%左右

const server = http.createServer((req, res) => {
  if (req.url == '/buffer') {
    res.end(buffStr);
  } else if (req.url == '/string') {
    res.end(str);
  }
});
server.listen(3002);
```

### 测试工具 jmeter

使用场景

1. 功能测试
2. 压力测试
3. 分布式压力测试
4. 纯java开发
5. 上手容易,高性能
6. 提供测试数据分析
7. 各种报表数据图形展示

[java jmeter 下载地址](https://jmeter.apache.org/download_jmeter.cgi)

## 引起内存泄漏的原因及编码规范

1. 内存膨胀和内存泄漏有一些差异，内存膨胀主要表现在程序员对内存管理的不科学，比如只需要50M内存就可以搞定的，有些程序员却花费了500M 内存。
2. 函数内的变量是可以随着函数执行被回收的，但是全局不行。如果实在业务需求应避免使用对象作为缓存，可移步到Redis等。

### memeye

memeye 是一个轻量级的 NodeJS 进程监控工具，它提供 进程内存、V8 堆空间内存、操作系统内存 三大维度的数据可视化展示

```js
const http = require('http');
const memeye = require('memeye');
memeye();
let leakArray = [];
// leakArray = null;
const server = http.createServer((req, res) => {
  if (req.url == '/') {
    // const wm = new WeakMap();
    leakArray.push(Math.random());
    // wm.set(leakArray, leakArray);
    // console.log(wm.get(leakArray));
    console.log(leakArray);
    // leakArray = null;
    res.end('hello world');
  }
});
server.listen(3000);
// 红线会居高不下 一直增长 无法被 gc
```

### node --expose-gc

```js
// test.js
global.gc();
//返回当前Node.js使用情况
console.log('第一次', process.memoryUsage());

let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
global.gc();
console.log('第二次', process.memoryUsage());

key = null;
console.log('第三次', process.memoryUsage());

map.delete(key);
key = null;
global.gc();
// console.log('第三次', process.memoryUsage());
console.log('第四次', process.memoryUsage());
```

```bash
node --expose-gc test.js

第一次 {
  rss: 19636224,
  heapTotal: 4644864,
  heapUsed: 1767296,
  external: 761096,
  arrayBuffers: 9382
}
第二次 {
  rss: 62472192,
  heapTotal: 49217536,
  heapUsed: 44176880,
  external: 918630,
  arrayBuffers: 9382
}
第三次 {
  rss: 62664704,
  heapTotal: 49217536,
  heapUsed: 44195880,
  external: 918630,
  arrayBuffers: 9382
}
第四次 {
  rss: 62787584,
  heapTotal: 11464704,
  heapUsed: 2234472,
  external: 918630,
  arrayBuffers: 9382
}

```

### 队列消费不及时

还有一种情况，当消费大于生产时没有问题。但是当生产大于消费时就会产生堆积，那么就会内存泄漏。

比如说，node发生错误，做了容错处理输出了日志，正常情况日这样。但是遇到大批量的访问，同时都触发了这个错误，那么日志在一条一条输出的时候不够及时，后方就产生了堆积。这样内存使用越来越大，那么就造成了内存泄漏。

这种情况怎么处理？log4js 的包是一种解决方案，但是最佳方案还是PM2，PM2可以console.log的时候把log的内容打到文件当中，速度非常的快。这样就不会产生消费不及时。

### 闭包

闭包一定会引发内存泄露

```js
function foo () {
  var tem_obj = {
    x: 1,
    y: 2,
    arr: new Array(20000)
  }
  //缓存x，用谁存谁，减少内存泄漏, 不要使用 temp_obj, 否则无法回收 tem_obj
  let closure = tem_obj.x
  return function () {
    console.log(closure)
  }
}
```

### 总结

没经过压力测试的Node代码基本只完成10%

准确计算 QPS 未雨绸缪

合理利用压力测试工具

缓存 队列内存泄露 耗时较长的代码

开发健壮的NodeJS应用

### 调试神器

<https://clinicjs.org/>

中文文档 <https://youjingyu.github.io/clinic-doc-zh/>
