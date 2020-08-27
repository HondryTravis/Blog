# Vue2 | 源码解析

## 整体架构

```txt
<!-- 整理大致目录结构 -->
.
├── compiler 目录是编译模版
├── core ⽬录是 Vue.js 的核⼼
├── platforms ⽬录是针对核⼼模块的 ‘平台’ 模块，（web, weex）
├── server 服务端渲染
├── sfc ⽬录处理单⽂件 .vue
└── shared ⽬录提供全局⽤到的⼯具函数

<!-- 核心代码 -->

Vue.js 的⽬标是通过尽可能简单的API 实现响应的数据绑定和组合的视图组件。

/core
├── components 模板编译的代码
├── config.js 配置文件.js
├── global-api 全局的一些 api 接口
├── index.js 默认入口.js
├── instance ⽣命周期->init.js
├── observer 观察者模式实现原理(订阅发布模式[数据收集与订阅])
├── util 常⽤⼯具⽅法类
└── vdom 虚拟 dom

<!-- 双向绑定实现原理 -->
/core/observer
├── array.js 处理数组相关
├── dep.js 订阅收集器，目标类
├── index.js Observer入口对外暴露
├── scheduler.js 调度实现
├── traverse.js 深度遍历实现
└── watcher.js watcher 实现地方
```

## 双向数据绑定的原理

## vue的整体流程

## vue运行时的优化
