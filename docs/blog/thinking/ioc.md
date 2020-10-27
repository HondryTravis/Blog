# Ioc 控制反转

## 简述

控制反转（Inversion of Control，缩写为IoC），是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI），还有一种方式叫“依赖查找”（Dependency Lookup）。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象中。

具体细节跳转至 [控制反转IOC](/blog/thinking/aop.md#控制反转ioc)

## TypeScript 实现

```ts
interface INewAble<T> {
    new(...args: any[]): T
}

interface IContainer {
    callback(): {}
    singleton: boolean
    instance?: {}
}

class CreateIoc {
    private container: Map<PropertyKey, IContainer>
    constructor() {
        this.container = new Map<string, IContainer>()
    }
    bind<T>(key: string, newFn: INewAble<T>) {
        const callback = () => new newFn()
        this.container.set(key, {callback, singleton: false})
    }
    use<T>(namespace: string) {
        let item = this.container.get(namespace)
        if(item !== undefined) {
            if(item.singleton && !item.instance){
                item.instance = item.callback()
            }
        } else {
            throw new Error('not found this instance which in container');
        }
        return item.singleton ? <T>item.instance : (<T>item?.callback())
    }
    restore(key: string) {
        this.container.delete(key)
    }
}

interface IUserService {
    test(str: string): void
}
class UserService implements IUserService {
    constructor(){}
    public test(str: string){
        console.log('🍊', str)
    }
}

const ioc = new CreateIoc()
ioc.bind<IUserService>('userService', UserService)
const user = ioc.use<IUserService>('userService')
user.test('测试用户')
```
