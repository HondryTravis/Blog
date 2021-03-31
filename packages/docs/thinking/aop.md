---
title: 面向切面编程
---

## 编程思想逐步提升

面向对象 -> 工程模式 -> 面向切面

**面向对象** 传统方式，需要动态引入类

**工程模式** 业务层不需要具体关注实例到底怎么生成的

**面向切面** 不在写工具类，直接走 ioc 容器中创建好的实例中**取**

:::note 结论
oop 是静态的抽象

aop 是动态的抽象
:::

## SOLID设计原则

solid 为面向对象设计原则中的一种

程序设计领域， SOLID (单⼀功能、开闭原则、⾥⽒替换、接⼝隔离以及依赖反转)是由罗伯特·C·⻢丁在21世纪早期 引⼊的记忆术⾸字⺟缩略字，指代了⾯向对象编程和⾯向对象设计的五个基本原则。当这些原则被⼀起应⽤时，它们使得⼀个程序员开发⼀个容易进⾏软件维护和扩展的系统变得更加可能SOLID被典型的应⽤在测试驱动开发上，并且是敏捷开发以及⾃适应软件开发的基本原则的重要组成部分

主要分为：

1. [S] Single Responsibility Principle (单⼀功能原则)
2. [O] Open Close Principle （开闭原则）
3. [L] Liskov Substitution Principle（⾥⽒替换原则）
4. [I] Interface Segregation Principle（接⼝隔离原则）
5. [D] Dependency Inversion Principle (依赖倒置/反转原则)

### 单⼀功能原则 | S

单⼀功能原则(Single Responsibility Principle)：单⼀功能原则 认为对象应该仅具有⼀种单⼀功能的概念。换句话说就是 **让⼀个类只做⼀种类型责任** ，当这个类需要承担其他类型的责任的时候，就需要分解这个类。在所有的SOLID原则中，这是⼤多数开发⼈员感到最能完全理解的⼀条。严格来说，这也可能是违反最频繁的⼀条原则了。单⼀责任原则可以看作是低耦合、⾼内聚在⾯向对象原则上的引申，将责任定义为引起变化的原因，以提⾼内聚性来减少引起变化的原因。责任过多，可能引起它变化的原因就越多，这将导致责任依赖，相互之间就产⽣影响，从⽽极⼤的损伤其内聚性和耦合度。单⼀责任，通常意味着单⼀的功能，因此不要为⼀个模块实 现过多的功能点，以保证实体只有⼀个引起它变化的原因。

先看 C# 中标准写法，这种写法也适用于 js

```cs

namespace SOLID
{
    public class Users
    {
        /// <summary>
        /// 支付
        /// </summary>
        public void Pay(){}

        /// <summary>
        /// 数据库操作
        /// </summary>
        public void DataAccess(){}

        /// <summary>
        /// 日志操作
        /// </summary>
        public void Logger(){}
    }
}
//1.在这个用户类中有这三个功能：1.支付逻辑，2数据库逻辑，3.日志操作。
//2.如果将这三个功能结合在一个类中，可能会出现修改部分代码时会破坏其他的部分。
//3.多个功能也使这个用户类难以理解，降低了内聚性。所以最好就是将这个类分离为三个分离的类，每个类仅仅有一个功能。
namespace SOLID
{
    /// <summary>
    /// 数据库操作
    /// </summary>
    class DataAccess { }

    /// <summary>
    /// 日志
    /// </summary>
    class Logger { }

    /// <summary>
    /// 支付
    /// </summary>
    class Pay { }
}

```

在 js 中实现

```js

//Bad
class UserSettings {
    constructor(user) {
        this.user = user;
    }

    changeSettings(settings) {
        if (this.verifyCredentials()) {
            // ...
        }
    }

    verifyCredentials() {
        // ...
    }
}
//Good:
class UserAuth {
    constructor(user) {
        this.user = user;
    }
    verifyCredentials() {
        // ...
    }
}

class UserSetting {
    constructor(user) {
        this.user = user;
        this.auth = new UserAuth(this.user);
    }
    changeSettings(settings) {
        if (this.auth.verifyCredentials()) {
            // ...
        }
    }
}
}

```

### 开闭原则 | O

开闭原则(ocp | Open Close Principle) 认为“软件体应该是对于扩展开放的，但是对于修改封闭的”的概念。软件实体应该是可扩展，⽽不可修改的。也就是说，**对扩展是开放的，⽽对修改是封闭的（“开”指的就是类、模块、函数都应该具有可扩展性，“闭”指的是它们不应该被修改。也就是说你可以新增功能但不能去修改源码。）**。这个原则是诸多⾯向对象编程原则中最抽象、最难理解的⼀个。

对扩展开放，意味着有新的需求或变化时，可以对现有代码进⾏扩展，以适应新的情况。对修改封闭，意味着类⼀旦设计完成，就可以独⽴完成其⼯作，⽽不要对类进⾏任何修改。可以使⽤变化和不变来说明：封装不变部分，开放变化部分，⼀般使⽤接⼝继承实现⽅式来实现“开放”应对变化，说⼤⽩话就是：你不是要变化吗？，那么我就让你继承实现⼀个对象，⽤⼀个接⼝来抽象你的职责，你变化越多，继承实现的⼦类就越多。

同样适用 C# 来作为展示

```cs
//abstract修饰的类，叫做抽象类，是不允许实例化的类，
//不能直接创建对象，必须要通过子类创建才能使用abstract类的方法。
abstract class DataAccess
{
    public abstract void OpenConnection();
    public abstract void CloseConnection();
    public abstract void ExecuteCommand();
}

/// <summary>
/// SQL
/// </summary>
class SqlDataAccess : DataAccess
{
    /// <summary>
    /// 打开SQL数据库
    /// </summary>
    public override void OpenConnection() { }
    /// <summary>
    /// 关闭Sql数据连接
    /// </summary>
    public override void CloseConnection() { }
    /// <summary>
    /// 执行Sql数据命令
    /// </summary>
    public override void ExecuteCommand() { }
}

/// <summary>
/// ORACLE
/// </summary>
class OracleDataAccess : DataAccess
{
    /// <summary>
    /// 打开Oracle数据连接
    /// </summary>
    public override void OpenConnection() { }
    /// <summary>
    /// 关闭Oracle数据连接
    /// </summary>
    public override void CloseConnection() { }
    /// <summary>
    /// 执行Oracle数据命令
    /// </summary>
    public override void ExecuteCommand() { }
}
```

在 js 中

```js
//Bad:
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    if (this.adapter.name === 'ajaxAdapter') {
      return makeAjaxCall(url).then((response) => {
        // 传递 response 并 return
      });
    } else if (this.adapter.name === 'httpNodeAdapter') {
      return makeHttpCall(url).then((response) => {
        // 传递 response 并 return
      });
    }
  }
}

function makeAjaxCall(url) {
  // 处理 request 并 return promise
}

function makeHttpCall(url) {
  // 处理 request 并 return promise
}
//Good:
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'ajaxAdapter';
  }

  request(url) {
    // 处理 request 并 return promise
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = 'nodeAdapter';
  }

  request(url) {
    // 处理 request 并 return promise
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    return this.adapter.request(url).then((response) => {
      // 传递 response 并 return
    });
  }
}
```

### ⾥⽒替换原则 | L

⾥⽒替换原则（Liskov Substitution Principle）：⾥⽒替换原则 认为“程序中的对象应该是可以在不改变程序正确性的前提下被它的⼦类所替换的”的概念。

**⼦类必须能够替换成它们的基类**。即：⼦类应该可以替换任何基类能够出现的地⽅，并且经过替换以后，代码还能正常⼯作。另外，不应该 在代码中出现if/else之类对⼦类类型进⾏判断的条件。⾥⽒替换原则LSP是使代码符合开闭原则的⼀个重要保证。正是由于⼦类型的可替换性才使得⽗类 型的模块在⽆需修改的情况下就可以扩展。在很多情况下，在设计初期我们类之间的关系不是很明确，LSP则给了我们⼀个判断和设计类之间关系的基准：需不需 要继承，以及怎样设计继承关系。

当⼀个⼦类的实例应该能够替换任何其超类的实例时，它们之间才具有is-A关系。继承对于OCP，就相当于多态性对于⾥⽒替换原则。⼦类可以代替基类，客户使⽤基类，他们不需要知道派⽣类所做的事情。这是⼀个针对⾏为职责可替代的原则，如果S是T的⼦类型，那么S对象就应该在不改变任何抽象属性情况下替换所有T对象。

C# 中

```cs
class Rectangle
{
    protected int width = 0;
    protected int height = 0;
    public virtual void SetWidth(int width)
    {
        this.width = width;
    }
    public virtual void SetHeight(int height)
    {
        this.height = height;
    }
    public virtual int GetArea()
    {
        return this.width * this.height;
    }
}
class Square : Rectangle
{
    public override void SetHeight(int height)
    {
        this.height = height;
        this.width = height;
    }
    public override void SetWidth(int width)
    {
        this.height = width;
        this.width = width;
    }
}
```

在 js 中

```js
//Bad:
// 长方形
class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

// 正方形
class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach((rectangle) => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea();
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
//===============================================================
//Good
class Shape {
  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(length) {
    super();
    this.length = length;
  }

  getArea() {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes) {
  shapes.forEach((shape) => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);
```

### 接⼝隔离原则 | I

接⼝隔离原则 ：接⼝隔离原则 认为“多个特定客户端接⼝要好于⼀个宽泛⽤途的接⼝”的概念。不能强迫⽤户去依赖那些他们不使⽤的接⼝。**换句话说，使⽤多个专⻔的接⼝⽐使⽤单⼀的总接⼝总要好(JavaScript ⼏乎没有接⼝的概念所以ts的重要性不言而喻)**。注意：在代码中应⽤ISP并不⼀定意味着服务就是绝对安全的。仍然需要采⽤良好的编码实践，以确保正确的验证与授权。

这个原则起源于施乐公司，他们需要建⽴了⼀个新的打印机系统，可以执⾏诸如装订的印刷品⼀套，传真多种任务。此系统软件创建从底层开始编制，并实现了这些 任务功能，但是不断增⻓的软件功能却使软件本身越来越难适应变化和维护。每⼀次改变，即使是最⼩的变化，有⼈可能需要近⼀个⼩时的重新编译和重新部署。这 是⼏乎不可能再继续发展，所以他们聘请罗伯特Robert帮助他们。他们⾸先设计了⼀个主要类Job,⼏乎能够⽤于实现所有任务功能。只要调⽤Job类的 ⼀个⽅法就可以实现⼀个功能，Job类就变动⾮常⼤，是⼀个胖模型啊，对于客户端如果只需要⼀个打印功能，但是其他⽆关打印的⽅法功能也和其耦合，ISP 原则建议在客户端和Job类之间增加⼀个接⼝层，对于不同功能有不同接⼝，⽐如打印功能就是Print接⼝，然后将⼤的Job类切分为继承不同接⼝的⼦ 类，这样有⼀个Print Job类，等等。

C# 中

```cs
interface IDataAccess
    {
        void OpenConnection();
        void CloseConnection();
    }

    interface ISqlDataAccess : IDataAccess
    {
        void ExecuteSqlCommand();
    }
    interface IOracleDataAccess : IDataAccess
    {
        void ExecuteOracleCommand();
    }
    class SqlDataAccess : ISqlDataAccess
    {
        /// <summary>
        /// 执行Sql数据命令
        /// </summary>
        public void ExecuteSqlCommand(){}

        /// <summary>
        /// 打开Sql数据连接
        /// </summary>
        public void OpenConnection(){}

        /// <summary>
        /// 关闭Sql数据连接
        /// </summary>
        public void CloseConnection(){}
    }
    class OracleDataAccess : IOracleDataAccess
    {
        /// <summary>
        /// 执行Oracle数据命令
        /// </summary>
        public void ExecuteOracleCommand(){}

        /// <summary>
        /// 打开Oracle数据连接
        /// </summary>
        public void OpenConnection(){}

        /// <summary>
        /// 关闭Oracle数据连接
        /// </summary>
        public void CloseConnection(){}
    }
```

在 js 中

```js
//Bad:
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.animationModule.setup();
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  animationModule() {} // Most of the time, we won't need to animate when traversing.
  // ...
});
//Good:
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.options = settings.options;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.setupOptions();
  }

  setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName('body'),
  options: {
    animationModule() {}
  }
});
```

### 依赖倒置/反转原则 | D

依赖倒置原则(Dependency Inversion Principle，DIP)规定：代码应当取决于抽象概念，⽽不是具体实现。

**⾼层模块不应该依赖于低层模块，⼆者都应该依赖于抽象**.

**抽象不应该依赖于细节，细节应该依赖于抽象 (总结解耦)**.

类可能依赖于其他类来执⾏其⼯作。但是，它们不应当依赖于该类的特定具体实现，⽽应当是它的抽象。这个原则实在是太重要了，社会的分⼯化，标准化都 是这个设计原则的体现。显然，这⼀概念会⼤⼤提⾼系统的灵活性。如果类只关⼼它们⽤于⽀持特定契约⽽不是特定类型的组件，就可以快速⽽轻松地修改这些低级 服务的功能，同时最⼤限度地降低对系统其余部分的影响。

C# 实现

```cs
    interface IBankAccount
    {
        long BankNumber { get; set; } // 卡号
        decimal Balance { get; set; } // 余额
    }

    // 转账人
    interface ITransferSource : IBankAccount
    {
        void CutPayment(decimal value);
    }

    // 收款人
    interface ITransferDestination : IBankAccount
    {
        void AddMoney(decimal value);
    }

    class BankAccout : IBankAccount, ITransferSource, ITransferDestination
    {
        public long BankNumber { get; set; }
        public decimal Balance { get; set; }
        public void CutPayment(decimal value)
        {
            Balance -= value;
        }
        public void AddMoney(decimal value)
        {
            Balance += value;
        }
    }

    class TransferAmount
    {
        public decimal Amount { get; set; }
        public void Transfer(ITransferSource source, ITransferDestination dest)
        {
            source.CutPayment(Amount);
            dest.AddMoney(Amount);
        }
    }
```

js 实现

```js
//Bad
// 库存查询
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

// 库存跟踪
class InventoryTracker {
  constructor(items) {
    this.items = items;

    // 这里依赖一个特殊的请求类，其实我们只是需要一个请求方法。
    this.requester = new InventoryRequester();
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

const inventoryTracker = new InventoryTracker(['apples', 'bananas']);
inventoryTracker.requestItems();


//Good:
// 库存跟踪
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach((item) => {
      this.requester.requestItem(item);
    });
  }
}

// HTTP 请求
class InventoryRequesterHTTP {
  constructor() {
    this.REQ_METHODS = ['HTTP'];
  }

  requestItem(item) {
    // ...
  }
}

// webSocket 请求
class InventoryRequesterWS {
  constructor() {
    this.REQ_METHODS = ['WS'];
  }

  requestItem(item) {
    // ...
  }
}

// 通过依赖注入的方式将请求模块解耦，这样我们就可以很轻易的替换成 webSocket 请求。
const inventoryTracker = new InventoryTracker(['apples', 'bananas'], new InventoryRequesterHTTP());
inventoryTracker.requestItems();

```

## 依赖注⼊DI

依赖注⼊（Dependency Injection）为⼀个⽅法应该遵从“依赖于抽象⽽不是⼀个实例” 的概念。依赖注⼊是该原则的⼀种实现⽅式。

- **依赖注⼊**: 当某个⻆⾊要另⼀个⻆⾊协助时，通常由调⽤者来创建被调⽤者的实例。现在创建实例由容器来完成然后注⼊调⽤者。

- **注⼊过程**: 如果需要调⽤另⼀个对象协助时，⽆须在代码中创建被调⽤者，⽽是 **依赖** 于外部的 **注⼊**

- **两种⽅式**: 设值注⼊、构造注⼊

## 控制反转IOC

控制反转（Inversion of Control），IoC可以认为是⼀种全新的设计模式，但是理论和时间成熟相对较晚。

### 什么是控制反转

控制反转（Inversion of Control，缩写为IoC），是⾯向对象编程中的⼀种设计原则，可以⽤来减低计算机代码之间的耦合度。其中最常⻅的⽅式叫做依赖注⼊（Dependency Injection，简称DI），还有⼀种⽅式叫“依赖查找”（Dependency Lookup）。通过控制反转，对象在被创建的时候，由⼀个调控系统内所有对象的外界实体，将其所依赖的对象的引⽤传递给它。也可以说，依赖被注⼊到对象中。

|![no_use_ioc](/images/thinking/no_use_ioc.png)|![use_ioc](/images/thinking/use_ioc.png)|
|:-:|:-:|

### 控制反转方式

**依赖查找**：容器提供回调接口和上下文条件给组件

**依赖注入**：组件不做定位查询，只 提供普通的方法让容器去决定依赖关系。

C# 中

```cs
//IoC容器，它就是一个创建工厂，你要什么对象，它就给你什么对象，有了IoC容器，依赖关系就变了，
//原先的依赖关系就没了，它们都依赖IoC容器了，通过IoC容器来建立它们之间的关系。
//通过反射来创建，把具体的文件名写在配置文件里，这时候客户端代码也不用变了，只需要改配置文件就好了，稳定性又有了提高，如下：

public class MediaFile {
    public void PlayMedia() {
        IMediaFile _mtype = Assembly.Load(ConfigurationManager.AppSettings["AssemName"]).CreateInstance(ConfigurationManager.AppSettings["MediaName"]);
        IPlayer _player = Assembly.Load(ConfigurationManager.AppSettings["AssemName"]).CreateInstance(ConfigurationManager.AppSettings["PlayerName"]);
        _player.Play(_mtype);
    }
}
```

## ⾯向切⾯编程AOP

在软件业，AOP为Aspect Oriented Programming的缩写，意为：⾯向切⾯编程，通过预编译⽅式和运⾏期动态代理实现程序功能的统⼀维护的⼀种技术。AOP是OOP的延续，是软件开发中的⼀个热点，也是Spring框架中的⼀个重要内容，是函数式编程的⼀种衍⽣范型。利⽤AOP可以对业务逻辑的各个部分进⾏隔离，从⽽使得业务逻辑各部分之间的耦合度降低，提⾼程序的可重⽤性，同时提⾼了开发的效率

### 基本概念

AOP完善spring的依赖注⼊（DI）⾯向对象编程将程序分解成各个层次的对象，⾯向切⾯编程将程序运⾏过程分解成各个切⾯。

### Filter

Filter（过滤器）也是⼀种AOPA它利⽤⼀种称为"横切"的技术，剖解开封装的对象内部，并将那些影响了多个类的公共⾏为封装到⼀个可重⽤模块，并将其命名为"Aspect"，即切⾯。所谓"切⾯"

### 优点

AOP的好处就是你只需要⼲你的正事，其它事情别⼈帮你⼲。在你访问数据库之前，⾃动帮你开启事务，当你访问数据库结束之后，⾃动帮你提交/回滚事务！
