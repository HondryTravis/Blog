---
title: 设计模式
---

设计模式为了解决构建大型应用的健壮性和可维护性。目前已知的高达 23 种。

## 单例模式

### 定义

单例模式，也叫单子模式，是一种常用的软件设计模式，属于创建型模式的一种 **保证一个类仅有一个实例，并提供一个访问它的全局访问点**。在应用这个模式时，单例对象的类必须保证只有一个实例存在。许多时候整个系统只需要拥有一个的全局对象，这样有利于我们协调系统整体的行为。比如在某个服务器程序中，该服务器的配置信息存放在一个文件中，这些配置数据由一个单例对象统一读取，然后服务进程中的其他对象再通过这个单例对象获取这些配置信息。这种方式简化了在复杂环境下的配置管理。

### 实现思路

一个类能返回对象一个引用(永远是同一个)和一个获得该实例的方法（必须是静态方法，通常使用getInstance这个名称）；当我们调用这个方法时，如果类持有的引用不为空就返回这个引用，如果类保持的引用为空就创建该类的实例并将实例的引用赋予该类保持的引用；同时我们还将该类的构造函数定义为私有方法，这样其他处的代码就无法通过调用该类的构造函数来实例化该类的对象，只有通过该类提供的静态方法来得到该类的唯一实例。

### 构建方式

- 懒汉方式。指全局的单例实例在第一次被使用时构建。
- 饿汉方式。指全局的单例实例在类装载时构建。

### TypeScript 实现

```ts
/* 懒汉模式 */
class Singleton {
  private static instance: Singleton = null;
  constructor() {}
  public static getInstance(): Singleton {
    if (this.instance == null) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
  public test() {
    console.log('单例');
  }
}
const xx = Singleton.getInstance();
const xx2 = Singleton.getInstance();
// xx.test();
console.log(xx == xx2);

/* 饿汉模式 */
class Singleton {
  private static instance: Singleton = new Singleton();
  constructor() {}
  public static getInstance(): Singleton {
    return this.instance;
  }
  public test() {
    console.log('单例');
  }
}
const xx = Singleton.getInstance();
const xx2 = Singleton.getInstance();
// xx.test();
console.log(xx == xx2);
```

## 工程模式

### 简述

在面向对象程序设计中，工厂通常是一个用来创建其他对象的对象。工厂是构造方法的抽象，用来实现不同的分配方案。

工厂对象通常包含一个或多个方法，用来创建这个工厂所能创建的各种类型的对象。这些方法可能接收参数，用来指定对象创建的方式，最后返回创建的对象。

有时，特定类型对象的控制过程比简单地创建一个对象更复杂。在这种情况下，工厂对象就派上用场了。工厂对象可能会动态地创建产品类的对象，或者从对象池中返回一个对象，或者对所创建的对象进行复杂的配置，或者应用其他的操作。

这些类型的对象很有用。几个不同的设计模式都应用了工厂的概念，并可以使用在很多语言中。例如，在《设计模式》一书中，像工厂方法模式、抽象工厂模式、生成器模式，甚至是单例模式都应用了工厂的概念。

### TypeScript 实现

简单来讲就是隐藏了 new 的过程

```ts
/* 工厂模式 */
abstract class Person {
    public abstract say(): void;
}

class Women extends Person {
    public say(): void {
        console.log('我是女的')
    }
}

class Man extends Person {
    public say(): void {
        console.log('我是男的')
    }
}

class God {
    public static TYPE_MAN: number = 1
    public static TYPE_WOMEN: number = 0
    public static TYPE_Animal: number = 3
    public static createPerson(type): Person {
        switch (type){
            case God.TYPE_MAN:
                return new Man();
            case God.TYPE_WOMEN:
                return new Women();
            // switch 穿透
            case God.TYPE_Animal:
            default:
                return new Man()
        }
    }
}

const man = God.createPerson(God.TYPE_MAN)
man.say()
```

## 代理模式

### 简述

代理模式（英语：Proxy Pattern）是程序设计中的一种设计模式。

所谓的代理者是指一个类别可以作为其它东西的接口。代理者可以作任何东西的接口：网络连接、存储器中的大对象、文件或其它昂贵或无法复制的资源。

著名的代理模式例子为引用计数（英语：reference counting）指针对象。

当一个复杂对象的多份副本须存在时，代理模式可以结合享元模式以减少存储器用量。典型作法是创建一个复杂对象及多个代理者，每个代理者会引用到原本的复杂对象。而作用在代理者的运算会转送到原本对象。一旦所有的代理者都不存在时，复杂对象会被移除。

简单来讲，为一个对象提供一个代用品或占位符，以便控制对它的访问。很多明星都有自己经纪人，比如开演唱会，经纪人会代替明星细节和谈好报酬乏后再跟明星签合同。即核心是当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象控制这个对象的访问，替身对家对请求最初一些处理之后再把请求转交给本体对象。

### TypeScript 实现

```ts
interface IDirector {
    save(): void;
}

class User implements IDirector {
    public save(): void {
        console.log('执行成功 congratulations！')
    }
}

class DirectorProxy implements IDirector {
    private target: IDirector
    constructor(target: IDirector) {
        this.target = target
    }
    save(): void {
        console.log('🐼 开始执行事务……')
        this.target.save()
        console.log('🍎 事务结束')
    }
}

const user: IDirector = new User();
const directorProxy: IDirector = new DirectorProxy(user)

directorProxy.save()
```

## 命令模式

### 简述

命令模式中的命令指的是一个执行某些特定事情的指令，有时候需要向某些特定事情的指令。常见的应用场景有时候需要向某些对家发送请求，但是并不知道请求的接受者是谁，也不知道被请求的操作是什么。假如我们去快餐店，可以点餐、取消、但是我们并不用关心厨师是谁底么做。

### TypeScript 实现

```ts
// 定义接受者
class Receiver {
    public action(): void {
        console.log('执行操作')
    }
}

// 抽象命令角色类
interface ICommand {
    exec(): void;
}

// 具体命令角色类
class ConcreteCommand implements ICommand {
    private receiver: Receiver = null!;
    constructor(receiver: Receiver){
        this.receiver = receiver
    }
    public exec(): void {
        this.receiver.action()
    }
}

// 角色类
class Invoker {
    private command: Command;
    constructor(command: Command){
        this.command = command
    }
    public action(): void {
        this.command.exec();
    }
}
const receiver: Receiver = new Receiver();
const command: Command = new ConcreteCommand(receiver);

const invoker: Invoker = new Invoker(command);
invoker.action();
```

## 观察者模式

在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。

这通常透过呼叫各观察者所提供的方法来实现。此种模式通常被用来实时事件处理系统

观察者模式有四个角色：抽象目标、具体目标、抽象观察者、具体观察者。

### 抽象目标

此抽象类别提供一个界面让观察者进行添附与解附作业。此类别内有个不公开的观察者串联，并透过下列函式(方法)进行作业

- 添附(Attach)：新增观察者到串联内，以追踪目标对象的变化。
- 解附(Detach)：将已经存在的观察者从串联中移除。
- 通知(Notify)：利用观察者所提供的更新函式来通知此目标已经产生变化。

添附函式包涵了一个观察者对象参数。也许是观察者类别的虚拟函式(即更新函式)，或是在非面向对象的设定中所使用的函式指标(更广泛来讲，函式子或是函式对象)

简单讲：观察者模式(又称为发布-订阅模式)，它定义对家间的一神一对多的依赖关系，当一个对象的状态发主改变时，所有依赖它的对象都将得到通和。现实主活中，如我们去售楼中心服务人员A接待我们，然后再有客户找到A，这个时候暂时没房，等到有房的时候不可能服务人员A挨个打电话通和而是订阅A的公共提醒服务。

### 具体目标

此类别提供了观察者欲追踪的状态。也利用其源类别(例如前述的抽象目标类别)所提供的方法,来通知所有的观察者其状态已经更新。此类别拥有以下函式

- 取得状态(GetState)：回传该目标对象的状态

### 抽象观察者

抽象观察者类别是一个必须被实做的抽象类别。这个类别定义了所有观察者都拥有的更新用界面，此界面是用来接收目标类别所发出的更新通知。此类别含有以下函式

- 更新(Update)：会被实做的一个抽象(虚拟)函式

### 观察者

这个类别含有指向目标类别的参考(reference)，以接收来自目标类别的更新状态。此类别含有以下函式

- 更新(Update)：是前述抽象函式的实做。当这个函式被目标对象呼叫时，观察者对象将会呼叫目标对象的取得状态函式，来其所拥有的更新目标对象资讯。

每个观察者类别都要实做它自己的更新函式，以应对状态更新的情形。

当目标对象改变时，会通过呼叫它自己的通知函式来将通知送给每一个观察者对象，这个通知函式则会去呼叫已经添附在串联内的观察者更新函式。通知与更新函式可能会有一些参数，好指明是目前目标对象内的何种改变。这么作将可增进观察者的效率(只更新那些改变部分的状态)

### 用途

- 当抽象个体有两个互相依赖的层面时。封装这些层面在单独的对象内将可允许程序员单独地去变更与重复使用这些对象，而不会产生两者之间交互的问题。
- 当其中一个对象的变更会影响其他对象，却又不知道多少对象必须被同时变更时。
- 当对象应该有能力通知其他对象，又不应该知道其他对象的实做细节时。

### C# 实现

```cs
// observe.cs
using System;
using System.Collections.Generic;

namespace observe
{
    public abstract class IObserver
    {
        public abstract void Update();
    }
    public abstract class ISubject
    {
        private List<IObserver> observers = new List<IObserver>();

        public void Add(IObserver observer) => observers.Add(observer);

        public void Remove(IObserver observer) => observers.Remove(observer);

        public void Notify()
        {
            Console.WriteLine("通知所有更新");
            foreach (var o in observers) {
                o.Update();
            }
        }
    }
    public class Subject : ISubject
    {
        public string State { get; set; }
    }
    public class Observer : IObserver
    {
        private string _name;
        private string _state;
        private Subject subject;
        public Observer(Subject sub, string name)
        {
            subject = sub;
            _name = name;
        }
        public override void Update()
        {
            _state = subject.State;
        }
    }
}

// Program.cs
using System;

namespace observe
{
    class Program
    {
        static void Main(string[] args)
        {
            var subject = new Subject();
            subject.Add(new Observer(subject, "1"));
            subject.Add(new Observer(subject, "2"));

            subject.State = "changed";
            subject.Notify();
        }
    }
}
```

### TypeScript 实现

杂志订阅服务

```ts
interface IObservable {
    update(version: number): void
}

interface ISubscribe {
    add(key: string, obj: IObservable): void
    delete(key: string): void
    notify(): void
}

class MagazineSubscribe implements ISubscribe {
    private observers: Map<string, IObservable> = new Map<string, IObservable>()
    private version: number = 0
    public add(key: string, obj: IObservable): void{
        this.observers.set(key, obj)
    }
    public delete(key: string): void{
        if(this.observers.has(key)) {
            this.observers.delete(key)
        }else {
            throw new Error('key not found')
        }
    }
    public notify(): void{
        for(const [key, instance] of this.observers) {
            const o: IObservable = instance
            instance.update(this.version)
        }
    }
    public publish():void {
        this.version ++
        this.notify()
    }
}

class CustomObservable implements IObservable {
    private name: string
    private version: number
    constructor(name){
        this.name = name
    }
    public update(version: number):void {
        this.version = version
        console.log('该杂志出新版了，需要购买？')
        this.buy()
    }
    public buy():void {
        console.log(`${this.name}购买了${this.version}期杂志`)
    }
}


const magzaine = new MagazineSubscribe()

const k = new CustomObservable('小 K')
const j = new CustomObservable('小 J')

magzaine.add('k',k)
magzaine.add('j',j)
magzaine.publish()
magzaine.publish()

```

## 职责链模式

### 简述

使多个对象都有机会处理请求，从而避免请求的发送者和接受者乏间的耦合关系，将这些关系连成一条链，并沿着这条链传递该请求，直到一个对象处理它为止。现实生活中如我们座公交午人太多，我们把公交卡交给售票员，让前面的人不停的往前递直到售票员刷卡结束

### TypeScript 实现

看一个请假的小例子

```ts
abstract class Handler {
  public sucesser: Handler;
  // 定义一个抽象的处理请求的方法
  public abstract handlerRequest(user: string, days: number): void;

  // 获取当前角色的下一个处理者角色
  public getNextHandler(): Handler {
    return this.sucesser;
  }
  // 设置当前角色的下一个处理者角色
  public setNextHandler(sucesser: Handler): void {
    this.sucesser = sucesser;
  }
}
// 班主任处理请假请求
class HeadTeacher extends Handler {
  public handlerRequest(user: string, days: number): string {
    if (days < 5) {
      console.log('班主任同意' + user + '同学的请假请求');
    } else {
      console.log('班主任无法处理' + user + '同学的请假请求');
    }
    // 如果下一个执行者不为空，由下一个执行者执行
    if (this.getNextHandler() != null) {
      const nextHandler = this.getNextHandler();
      nextHandler.handlerRequest(user, days);
      return;
      // return this.getNextHandler().handlerRequest(user, days);
    }
    return null;
  }
}
// 院系主任处理请假请求
class Department extends Handler {
  public handlerRequest(user: string, days: number): string {
    if (days < 30) {
      console.log('院系主任同意' + user + '同学的请假请求');
    } else {
      console.log('院系主任无法处理' + user + '同学的请假请求');
    }
    if (this.getNextHandler() != null) {
      const nextHandler = this.getNextHandler();
      nextHandler.handlerRequest(user, days);
      return;
    }
    return null;
  }
}
// 校级主任处理请假请求
class Leader extends Handler {
  public handlerRequest(user: string, days: number): string {
    if (days >= 30) {
      console.log('校级主任同意' + user + '同学的请假请求');
    } else if (this.getNextHandler() != null) {
      const nextHandler = this.getNextHandler();
      nextHandler.handlerRequest(user, days);
      return;
      // return getNextHandler().handlerRequest(user, days);
    }
    return null;
  }
}
class SimpleFactory {
  public static TYPE_HeadTeacher: number = 1;
  public static TYPE_Department: number = 2;
  public static TYPE_Leader: number = 3;

  public static createHandler(type: number): Handler {
    switch (type) {
      case SimpleFactory.TYPE_HeadTeacher:
        return new HeadTeacher();
      case SimpleFactory.TYPE_Department:
        return new Department();
      case SimpleFactory.TYPE_Leader:
      default:
        return new Leader();
    }
  }
}
// 获取三个不同的处理者对象
const h1: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_HeadTeacher);
const h2: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_Department);
const h3: Handler = SimpleFactory.createHandler(SimpleFactory.TYPE_Leader);
// 设置角色的处理层次
h1.setNextHandler(h2);
h2.setNextHandler(h3);

h1.handlerRequest('李四', 35);
// console.log("*************************");
// h2.handlerRequest("王五", 15);
// console.log("*************************");
// h2.handlerRequest("朱七", 30);
```

## 策略模式

### 简述

策略模式作为一种软件设计模式，指对象有某个行为，但是在不同的场景中，该行为有不同的实现算法。比如每个人都要“交个人所得税”，但是“在美国交个人所得税”和“在中国交个人所得税”就有不同的算税方法。

策略模式

- 定义了一族算法（业务规则）
- 封装了每个算法
- 这族的算法可互换代替（interchangeable）

### TypeScript 实现

```ts
interface IStrategy {
    execute(): void
}


class ConcreteStrategyA implements IStrategy{
    execute(): void {
        console.log('我是策略 A')
    }
}
class ConcreteStrategyB implements IStrategy{
    execute(): void {
        console.log('我是策略 B')
    }
}
class ConcreteStrategyC implements IStrategy{
    execute(): void {
        console.log('我是策略 C')
    }
}


class Context {
    private strategy: IStrategy
    constructor(strategy: IStrategy) {
        this.strategy = strategy
    }
    public execute() {
        this.strategy.execute()
    }
}

// 策略 A
const testA = new Context(new ConcreteStrategyA())
testA.execute()
const testB = new Context(new ConcreteStrategyB())
testB.execute()
const testC = new Context(new ConcreteStrategyC())
testC.execute()
```
