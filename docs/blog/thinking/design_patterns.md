# 设计模式

## 观察者模式

在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。

这通常透过呼叫各观察者所提供的方法来实现。此种模式通常被用来实时事件处理系统

观察者模式有四个角色：抽象目标、具体目标、抽象观察者、具体观察者。

### 抽象目标

此抽象类别提供一个界面让观察者进行添附与解附作业。此类别内有个不公开的观察者串炼，并透过下列函式(方法)进行作业

- 添附(Attach)：新增观察者到串炼内，以追踪目标对象的变化。
- 解附(Detach)：将已经存在的观察者从串炼中移除。
- 通知(Notify)：利用观察者所提供的更新函式来通知此目标已经产生变化。

添附函式包涵了一个观察者对象参数。也许是观察者类别的虚拟函式(即更新函式)，或是在非面向对象的设定中所使用的函式指标(更广泛来讲，函式子或是函式对象)

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

当目标对象改变时，会通过呼叫它自己的通知函式来将通知送给每一个观察者对象，这个通知函式则会去呼叫已经添附在串炼内的观察者更新函式。通知与更新函式可能会有一些参数，好指明是目前目标对象内的何种改变。这么作将可增进观察者的效率(只更新那些改变部分的状态)

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
