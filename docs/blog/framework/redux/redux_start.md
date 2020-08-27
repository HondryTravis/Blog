# Redux | 实现原理

## Redux 介绍

Redux是一个用来管理管理数据状态和UI状态的JavaScript应用工具。随着JavaScript单页应用（SPA）开发日趋复杂，JavaScript需要管理比任何时候都要多的state（状态），Redux就是用来降低管理难度的。（Redux支持React，Vue、Angular、jQuery甚至纯JavaScript）

### 工作流

![redux 工作流](/framework/redux_flow.png)

举个🌰

借书者(Components)要去借书。那要先去找管理员(ActionCreator)借书，管理员先去图书馆柜台机上(Store) 用图书管理软件(Reducers)找,找到了就给这个借阅者(Components)告诉正确的位置，和图书的信息，没找到或者已经借阅出去了，给反馈信息，还书也是一样

## Redux 前身

Redux 就是 Flux 的升级版本，早期使用 React 都要配合 Flux 进行状态管理，但是在使用中，Flux 显露了很多弊端，比如多状态管理的复杂和易错。所以 Redux 就诞生了，还吸取了部分精华，现在已经完全取代了 Flux。

如果想了解查看 [flux](http://facebook.github.io/flux/)

## 前置储备知识

需要对[函数式编程](/blog/thinking/functional_programming.md)有一定的了解

## 思路分析

对应函数式编程中

1.store -> container(IOC 容器仓库)

2.currentState -> _value

3.action -> f 变形关系

4.reducer -> map

5.middleware -> IO functor (解决异步和脏操作)

## 具体实现流程

[Blog-example redux](https://github.com/HondryTravis/Blog-example/tree/master/packages/implements/redux)
