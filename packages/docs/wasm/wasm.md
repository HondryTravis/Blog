---
title: wasm 初探
---

本质就是二进制文件，编译好的字节码(非常接近机器码可以快速转换)

## 特点

- 高效
  - WebAssembly 有一套完整的语义，实际上 wasm 是体积小且加载快的二进制格式， 其目标就是充分发挥硬件能力以达到原生执行效率
- 安全
  - WebAssembly 运行在一个沙箱化的执行环境中，甚至可以在现有的 JavaScript 虚拟机中实现。在web环境中，WebAssembly将会严格遵守同源策略以及浏览器安全策略。
- 开发
  - WebAssembly 设计了一个非常规整的文本格式用来、调试、测试、实验、优化、学习、教学或者编写程序。可以以这种文本格式在web页面上查看wasm模块的源码
- 标准
  - WebAssembly 在 web 中被设计成无版本、特性可测试、向后兼容的。WebAssembly 可以被 JavaScript 调用，进入 JavaScript 上下文，也可以像 Web API 一样调用浏览器的功能。当然，WebAssembly 不仅可以运行在浏览器上，也可以运行在非web环境下

![wasm](/images/wasm/index1.png)

![wasm](/images/wasm/index2.png)

## 编译 wasm 的工具

- AssemblyScript：支持直接将 TypeScript 编译成 WebAssembly。这对于前端来说，入门的门槛很低的。

- Emscripten：可以说是 WebAssembly 的灵魂工具。将其他的高级语言，编译成WebAssembly。

- WABT：将 WebAssembly在字节码和文本格式相互转换的一个工具，方便开发者去理解这个 wasm 到底是在做什么事。

## 性能对比

WebAssembly版本和原生JavaScript版本的递归无优化的 (斐波那契数列)Fibonacci 函数，下图是这两个函数在值是45、48、50的时候的性能对比。

![wasm](/images/wasm/index3.png)

## JavaScript API

### 方法

- WebAssembly.compile()
- WebAssembly.instantiate()
- WebAssembly.validate()

### 类

- WebAssembly.Module
- WebAssembly.Instance
- WebAssembly.Memory
- WebAssembly.Table
- WebAssembly.CompileError
- WebAssembly.LinkError
- WebAssembly.RuntimeError

### 具体流程

```js
// WebAssembly.compile() 装载 wasm
Promise<WebAssembly.Module> WebAssembly.compile(bufferSource);

// WebAssembly.Module 转换为 module
var myModule = new WebAssembly.Module(bufferSource);

// WebAssembly.instantiate() 实例化
Promise<ResultObject> WebAssembly.instantiate(bufferSource, importObj) // ResultObject:{module, instance}


Promise<WebAssembly.Instance> WebAssembly.instantiate(module, importObject);

// WebAssembly.Instance
var myInstance = new WebAssembly.Instance(module, importObject);

// WebAssembly.validate() 验证

// WebAssembly.validate(bufferSource); // boolean

// WebAssembly.Memory 可用于 JavaScript 和 WebAssembly 的数据共享(不在 v8 中，自己的内存回收体系)
// 可以使用JS创建，传递给 WASM
// 可以在WASM里创建，使用JS获取

// WebAssembly.Table 可以用来在JS对象上存放WASM函数的引用

// 错误
// WebAssembly.CompileError
// WebAssembly.LinkError
// WebAssembly.RuntimeError
```

## 使用

`import module from 'test.wasm'` js 只能通过请求发起。webpack 5 支持导入

```js
const importObject = {
 func: {
    log: (num)=> document.write(num)
    }
}
fetch('test.wasm')
    .then( response => response.arrayBuffer())
    .then( types => WebAssembly.instantiate(bytes, importObject))
    .then(({instance}) => window.test = instance.exports.test)
```

### 执行流程

这个过程是这样的

JavaScript -> WebAssembly(test) -> JavaScript(document.write())

## 参考链接

构建wasm方式

[建议弃坑 使用WABT来编译S-表达式](https://github.com/WebAssembly/wabt)

[推荐编译工具 Emscripten](https://emscripten.org/docs/getting_started/downloads.html)

[在线方式 WasmFiddle](https://wasdk.github.io/WasmFiddle/)

[WebAssembly 中文网](http://webassembly.org.cn)

### Emscripten

使用 [emsdk](https://github.com/HondryTravis/emsdk) 构建 [参考文档](https://www.it610.com/article/1282220241333534720.htm)

```bash
# mac 平台直接执行可执行文件  window 自行百度 or ./emsdk.bat
./emsdk install latest
./emsdk activate latest
```

配置环境变量

```bash
# mac 平台， window 平台自行体会 emsdk_env.bat
source ./emsdk_env.sh
```

### 编译方式

1、可执行文件

```bash
gcc hello.c -o hello
# 执行
./hello
```

2、编译成wasm在nodejs中执行

```bash
emcc hello.c -o hello_node.js

# 生成两个文件
=> hello_node.wasm
=> hello_node.js

# 执行
node hello_node.js
```

3、编译成wasm在浏览器中执行

```bash
# 其中 -s WASM=1 是制定要wasm文件； -O3 优化选项 ，优化选项中优化度最低是O1，优化度最高是O3,最好推荐 O1，避免意外优化
emcc hello.c -s WASM=1 -O3 -o hello_html.html

# 生成三个文件
=> hello_html.wasm
=> hello_html.js
=> hello_html.html

# 执行
# 在浏览器中执行，注意，生成的文件要放在web服务器中然后通过 web 访问，不能直接从硬盘访问

```

Q & A

测试 Math.c 文件

[参考链接](https://www.cnblogs.com/y-y-y-y/p/9897154.html)

```bash
emcc math.c -Os -s WASM=1 -s SIDE_MODULE=1 -o math.wasm
```
