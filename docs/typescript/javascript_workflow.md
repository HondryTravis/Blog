---
title: JS | 执行调度过程
---

当Javascript代码执⾏的时候会将不同的变量存于内存中的不同位置：堆（heap）和栈（stack）中来加以区分。其中，堆⾥存放着⼀些对象。⽽栈中则存放着⼀些基础类型变量以及对象的指针

js 在执⾏可执⾏的脚本时，⾸先会创建⼀个全局可执⾏上下⽂ globalContext，每当执⾏到⼀个函数调⽤时都会创建⼀个可执⾏上下⽂（execution context）EC。当然可执⾏程序可能会存在很多函数调⽤，那么就会创建很多EC，所以 JavaScript 引擎创建了执⾏上下⽂栈（Execution context stack，ECS）来管理执⾏上下⽂。当函数调⽤完成，js会退出这个执⾏环境并把这个执⾏环境销毁，回到上⼀个⽅法的执⾏环境... 这个过程反复进⾏，直到执⾏栈中的代码全部执⾏完毕，如下是以上的⼏个关键词，了解一下。

## 关键词

- 执⾏栈（Execution Context Stack）
- 全局对象（GO Global Context）(因为垃圾回收叫 GC,所以简单成为 GO)
- 活动对象（Activation Object）
- 变量对象（Variable Object）
- 全局上下⽂(GC global execution context )
- 执⾏上下⽂（EC execution context）
- 函数调⽤栈（Callee Stack)
- 执⾏上下⽂栈（ECS execution context Stack )
- 垃圾回收（GC Garbage Collection ）

- 新版本ES5+
  - 词法环境（LexicalEnvironment）
  - 变量环境（VariableEnvironment）
  - 环境记录（Environment record）

## 执⾏栈

![javascript_workfolw](/images/typescript/javascript_workflow.jpeg)

执行栈，在其他编程语言中也被称为调用栈，它是一种LIFO（后进先出）的结构，被用于在代码执行阶段存储所有创建过的执行环境。

当Javascript引擎首次运行到你的脚本时，它会创建一个全局执行环境，并把它推入到当前的执行栈中。每当引擎运行到其函数调用时，就会为这个函数创建一个新的执行环境(栈帧)，并把它推入到堆栈的顶部。

```js
ECStack = [
  ...
  globalContext
];
```

引擎会执行其执行环境位于堆栈顶部的函数。当函数执行完毕时，当前执行栈会从堆栈中弹出去，并且控件将会到达其在当前堆栈下面的那个执行环境中。如果函数内再调⽤其他函数，相同的步骤将会再次发⽣：创建⼀个新的 EC 之后把 EC 推⼊执⾏栈。⼀旦⼀个 EC 执⾏完成，变回从执⾏栈中推出（pop）。ESP指针负责EC出栈指向。

浏览器解释器执⾏ js 是单线程的过程，这就意味着同⼀时间，只能有⼀个事情在进⾏。其他的活动和事件只能排队等候，⽣成出⼀个等候队列执⾏栈（Execution Stack）。

第一种方法

通过抛出异常

```js
function fun3() {
  console.log('fun3')
  throw 'env'
}
function fun2() {
  var test = 0
  fun3();
  console.log(test)
}
function fun1() {
  fun2();
}
fun1();
```

我们可以简单的查看到当前函数的执行调度过程

第二种方法

我们可以做个小测试，直接追加 `debugger`

```js
function fun3() {
  console.log('fun3') 
}
function fun2() {
  fun3();
}
function fun1() {
  debugger
  fun2();
}

fun1();

//执⾏fun1 结果如下
ECStack = [
  fun1,
  globalContext
];
```

可以方便的在浏览器测试 ![js01](/images/typescript/js02.png)

我们按住 command + ; 继续向下走，会依次 fun2 --> fun3 --> fun2 ---> fun1 --> anonymous(globalContext)

分别依次可以在上边的 Scope 选项中查看到当前执行栈的 this 指向 Local, 所以可以方便维护当前的执行上下文

![js01](/images/typescript/js03.png)

**函数的执行栈是有大小的**.

```js
function foo1(){
  foo1()
}
foo1()
// Uncaught RangeError: Maximum call stack size exceeded

let m = 0
function foo(){
  if(m++ > 1000) {
    debugger;
  }
  foo()
}
foo()
// 就会发现调用栈中存在 1000 个调用 EC(栈帧)
```

![js04](/images/typescript/js04.png)

## 全局对象

Javascript引擎首次运行到你的脚本时，它会创建一个全局执行环境, 这个环节就是 GO(Global Context)

## 变量对象

变量对象VO是与执⾏上下⽂相关的特殊对象,⽤来存储上下⽂的函数声明，函数形参和变量。

```js
// 变量对象VO存储上下⽂中声明的以下内容
{
  // 1-1 函数声明FD(如果在函数上下⽂中),—-不包含函数表达式
  // 1-2 函数形参function arguments,
  // 1-3 变量声明–注意b=10不是变量，但是var b = 10;是变量，有变量声明提升
  // alert(a); // undefined
  // alert(b); // “b” 没有声明
  // b = 10;
  // var a = 20;
}
var a = 10;

function test(x) {
  var b = 20;
};

test(30);

// 全局上下⽂的变量对象
VO(globalContext) = {
  a: 10,
  test: <reference to function>
};

// test函数上下⽂的变量对象
VO(test functionContext) = {
  x: 30,
  b: 20
};

//VO分为 全局上下⽂的变量对象VO，函数上下⽂的变量对象VO
VO(globalContext) === global;
```

## 活动对象

在函数上下⽂中，变量对象被表示为活动对象 AO, 当函数被调⽤后，这个特殊的活动对象就被创建了。它包含普通参数与特殊参数对象（具有索引属性的参数映射表）。活动对象在函数上下⽂中作为变量对象使⽤

```js
// 1. 在函数执⾏上下⽂中，VO是不能直接访问的，此时由活动对象扮演VO的⻆⾊。
// 2. Arguments对象它包括如下属性：callee 、length
// 3. 内部定义的函数
// 4. 以及绑定上对应的变量环境；
// 5. 内部定义的变量

VO(functionContext) === AO;
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function _e() {};
  (function x() {});
}
test(10); // call
// 当进⼊带有参数10的test函数上下⽂时，AO表现为如下：
// AO⾥并不包含函数“x”。这是因为“x” 是⼀个函数表达式(FunctionExpression, 缩写为 FE) ⽽不是
// 函数声明，函数表达式不会影响VO
AO(test) = {
  a: 10,
  b: undefined,
  c: undefined,
  d: <reference to FunctionDeclaration "d">,
  e: undefined
};
```

### 深度活动对象

```js
// Activation Object 分为创建阶段和执⾏阶段
function foo(i) {
  var a = 'hello';
  var b = function privateB() {};
  function c() {}
}

foo(22);

// 当我们执⾏foo(22)的时候，EC创建阶段会类似⽣成下⾯这样的对象：
fooExecutionContext = {
  scopeChain: { Scope },
  AO: {
    arguments: {
      0: 22,
      length: 1
    },
    i: 22,
    c: pointer to function c()
    a: undefined, 
    b: undefined
  },
  VO:{..}
  Scope: [AO, globalContext.VO],
}

// 在创建阶段，会发⽣属性名称的定义，但是并没有赋值(变量提升阶段)。
// ⼀旦创建阶段（creationstage）结束，变进⼊了激活 / 执⾏阶段，那么 fooExecutionContext 便会完成赋值，变成这样：
//【 运⾏函数内部的代码，对变量复制，代码⼀⾏⼀⾏的被解释执⾏ 】

fooExecutionContext = {
  scopeChain: { ... },
  AO: {
    arguments: {
      0: 22,
      length: 1
    },
    i: 22,
    c: pointer to function c()
    a: 'hello',
    b: pointer to function privateB()
  },
  VO:{..}
  Scope: [AO, globalContext.VO],
  this: //{ 运⾏时确认 }
}
```

### 补充活动对象

```js
var x = 10;
function foo() {
  var barFn = Function('alert(x); alert(y);');
  barFn(); // 10, "y" is not defined
}
foo();
// 1.通过函构造函数创建的函数的[[scope]]属性总是唯⼀的全局对象（LexicalEnvironment）。
// 2.Eval code - eval 函数包含的代码块也有同样的效果
```

```js
// 所以关于 fun 那个例子
// VO函数上下⽂的链接 AO是函数⾃身的
ECStack = [
  fun3
  fun2,
  fun1,
  globalContext
];
```

## 发生异步

上述都是在同步的情况下完成的，如果出现异步，或者 ajax 的情况下是如何呢

事件队列Task Queue

当js引擎遇到⼀个异步事件后，其实不会说⼀直等到异步事件的返回，⽽是先将异步事件进⾏挂起。等到异步事件执⾏完毕后，会被加⼊到事件队列中。（注意，此时只是异步事件执⾏完成，其中的回调函数并没有去执⾏。）当执⾏队列执⾏完毕，主线程处于闲置状态时，会去异步队列那抽取最先被推⼊队列中的异步事件，放⼊执⾏栈中，执⾏其中的回调同步代码。如此反复，这样就形成了⼀个⽆限的循环。这就是这个过程被称为 “事件循环（EventLoop）”的原因。

```js
function test() {
  var result = []
    for (var i = 0; i < 10; i++) {
      result[i] = function() {
        return i
      }
    }
  return result
}

let r = test()
r.forEach(fn => {
  console.log('fn',fn())
})
// 1.函数test执⾏完出栈 留下AO(test)有个i的指向
// 2.函数在执⾏的时候，函数的执⾏环境才会⽣成。所以fn执⾏的时候⽣成作⽤域链条指向如下
// 3.AO(result[i]) --> AO(fn) --> VO(G) 加个闭包就⽴⻢创建了执⾏环境

<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
</ul>
var list_li = document.getElementsByTagName("li");
for (var i = 0; i < list_li.length; i++) {
  list_li[i].onclick = function () {
    console.log(i);
  }
}
```

那么其实⼀切也就迎刃⽽解了。闭包的原理是 Scope (堆空间中存储 closure(foo))，this 的原理是动态绑定，作⽤域链的原理是Scope: [AO, globalContext.VO], eval 不能回收的原理是推不进AO, 变量提升的原理是 AO 的准备阶段，异步队列的原理是 ECS

## 新版本 ES5+

```js
// this 值的决定，也被称为 This Binding。（即 this 绑定）
// LexicalEnvironment（词法环境）
// VariableEnvironment（变量环境）
ExecutionContext = {
  ThisBinding = <this value>,
  LexicalEnvironment = { ... },
  VariableEnvironment = { ... },
}

// 全局执⾏上下⽂
GlobalExectionContext = {
  // 词法环境
  LexicalEnvironment: {
    // 环境记录
    EnvironmentRecord: {
      Type: "Object", // 全局环境
      // ... 标识符绑定在这⾥
      outer: <null>, // 对外部环境的引⽤
    }
  }
}
// 函数执⾏上下⽂
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",// 函数环境
      // ... 标识符绑定在这⾥
      // 对全局环境或外部函数环境的引⽤
      outer: <Global or outer function environment reference>,
    }
  }
}
```

为了继续去适配早期的JS的var等，新的规范增加了变量环境（VariableEnvironment）。变量环境也是⼀个词法环境，其环境记录器包含了由变量声明语句

在ES6 中，词法环境组件和变量环境组件的区别在与前者⽤于存储函数声明和变量（ let 和 const ）绑定，⽽后者仅⽤与存储变量（ var ）绑定。

```js
let a = 20;
const b = 30;
var c;
function multiply(e, f){
  var g = 20;
  return e*f*g; 
}
c = multiply(20, 30);

// 全局执⾏上下⽂
GlobalExectionContext = {
  ThisBinding: < Global Object > ,
  // 词法环境
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定，let、const、函数声明
      a: < uninitialized > ,
      b: < uninitialized > ,
      multiply: < func >
    }
    outer: < null >
  },
  // 变量环境
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定，var 声明
      c: undefined,
    }
    outer: < null >
  }
}

// 函数执⾏上下⽂
FunctionExectionContext = {
  ThisBinding: < Global Object > ,
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符绑定
      Arguments: {
        0: 20,
        1: 30,
        length: 2
      },
    },
    outer: < GlobalLexicalEnvironment >
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这⾥绑定标识符
      g: undefined
    },
    outer: < GlobalLexicalEnvironment >
  }
}

```

以上 let 和 const 定义的变量并没有关联任何值 uninitialized(未初始化) ，但 var 定义的变量被初始化成 undefined 。这也就是造成 TDZ(临时性死区 Temporal Dead Zone) 的原因了。

接下来就是执⾏阶段，完成对所有变量的分配，最后执⾏代码。⽆论是 ES3 还是 ES5,上下⽂的⽣命周期包括三个阶段：创建阶段 -> 执⾏阶段 -> 回收阶段。

:::note 所以关于面试最多测试 this 指向问题
  指向当前执行栈 ECS(Execution Context Stack) 顶的执行上下文 EC(Execution Context)
:::

:::note js 作用域
  函数级词法作用域
:::

## 参考链接

[图解JS词法环境(Lexical environment)](https://blog.csdn.net/dhassa/article/details/70945016)

[variable-environment-vs-lexical-environment](https://stackoverflow.com/questions/23948198/variable-environment-vs-lexical-environment/54673945)

[ecma262](https://tc39.es/ecma262/#sec-environment-records)

## 感谢

感谢: 老袁
