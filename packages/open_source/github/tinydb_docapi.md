---
title: TinyDB 文档
---

[源码地址](https://github.com/HondryTravis/TinyDB)

## 快速开始

一般的我们只需要 `new TinyDB(config)` 就可以拿到这个数据表对象

```javascript
<script src="tinydb.js">
<script>
  const config = {...}
  const mydb = new TinyDB(config)
</script>  
```

## 配置指南

### 数据库配置项

创建数据库

| 名称 |      属性      |   类型   | 是否必须 |
|:----:| :------------: | :------: | :------: |
| 数据库名称 | `databaseName` | `String` |   Must   |
| 数据表 | `tables` | `Array<Object>` |   Must   |

**数据库名称**：创建的数据表名称

**数据表**：一个数据表集合包含属性，可能有多个表。

例子

```javascript
{
  databaseName: 'test'
  tables: [...{...}]
}
```

### 数据表配置项

创建数据库中的表，一个数据库可以有多个表，有一些表属性需要提前设定，虽然也可以动态创建表，但不建议这么做，尽量在一开始建立好

|名称|  属性  |   类型   | 是否必须 |
|:---:| :----: | :------: | :------: |
| 数据表名称 | `name` | `string` | Must |
| keyPath | `keyPath` | `string` | Must |
| 是否允许数据表自增(不重复) | `autoIncrement` | `Boolean` | Must |
| 索引列表 | `indexs` | `Array<Object>` | Must |

**数据表名称**：您要创建的数据表名称

**表主键**：默认为`id`，自增的一个变量，

**是否允许数据表自增**：默认`true`在插入一条新数据的时候，`keypath`自增1，可能的值： false

**索引列表**：创建一个对该表的快速查询的索引列表，默认id

### 索引配置项

|     名称     |      属性       |   类型    | 是否必须 |
| :----------: | :-------------: | :-------: | :------: |
|    index     |     `index`     | `string`  |   Must   |
| 相对索引名称 | `relativeIndex` | `string`  |   Must   |
| 是否允许重复 |    `unique`     | `Boolean` |   Must   |

**索引名称**：用来查询数据表中的数据的索引

**相对索引名称**：对应保存数据中的某个字段

**是否允许重复**：有些时候，我们需要有些数据是重复的，有些是不重复的，比如学号我们希望不是重复的，名字希望是重复的

例子:

```javascript
 const options = {
      databaseName: "test",
      tables: [
        {
          name: "table_student",
          keyPath: "id",
          autoIncrement: true,
          indexs: [
            {
              index: "id",
              relativeIndex: "id",
              unique: true
            },
            {
              index: "name",
              relativeIndex: "name",
              unique: false
            },
            {
              index: "school",
              relativeIndex: "school",
              unique: false
            }
          ]
        }
      ]
    };

```

## API 文档

### Method 方法

#### `createDateBase(databaseName<string>, version<number>):viod` 新建数据库

`@param databaseName`: 数据库名称

`@param version` 数据库版本号

#### `createTable(tables:Array<Object>, version):void` 创建表

`@param tables` 多个或一个表属性集合

`@param version` 数据库版本

#### `deleteTable(tableName:string, version:number):viod` 删除表

`@param tableName` 数据库表的名字

`@param version` 数据库版本号

#### `createIndex(table:IDBObjectStore, option<tableIndex>):void` 创建表索引

`@param table` 数据库表实例，也就是仓库

`@param option` 数据表索引集合

#### `connect(name?: string):Promise<IDBDatabase>`连接数据库，异步回调

`@param name` 可选，默认为空值，默认打开创建的单个数据库

#### `close():void` 关闭数据库

#### `insert(name: string, data: any): void`

`@param name` 数据库表名称

`@param data` 要保持的数据，可以使对象，可以使json string，可以是blob对象

#### `select(name: string, selecter: any): Promise` 查找数据库，通过匹配的selector对象来查找

`@param name` 数据表名称

`@param selecter` 查找的数据库对象，键值对，包含索引名称和值，example ：`{name: '李1'}

#### `selectId(name: string, id: number): Promise` 通过id查找数据，匹配id

`@param name` 数据表名称

`@param id` id

#### `some(name: string, index: any, startIndex: any, endIndex: any): Promise` 查找一定范围的数据

`@param name` 数据表名称

`@param index` 索引名称

`@param startIndex` 开始索引位置值，不是id

`@param endIndex` 结束索引位置值，不是id

```javascript

  const option = {...}
  const test = new TinyDB(option)
  test.some('test_table', 'uid', 100,200) // 查找uid 100-200的所有人

```

#### `update(name: string, data: any): Promise` 更新数据

`@param name` 数据表名称

`@param data` 更新或者添加的数据

```javascript

  const option = {...}
  const test = new TinyDB(option)
  test.update('test_table', {
    id: 1, // 如果id重复就修改，id不重复就添加
    name: '...',
    uids: [...]
  }) // 查找uid 100-200的所有人

```

#### `delete(name: string, data: any): Promise` 删除数据

`@param name` 数据表名称

`@param data` 删除的数据包含索引和索引值，键值对形式

```javascript

  const option = {...}
  const test = new TinyDB(option)
  test.delete('test_table', {name:'李四'}) // 删除name为李四的那一条数据

```

#### `selectAll(name: string): Promise` 查找所有值

`@param name` 数据表名称

```javascript
  const option = {...}
  const test = new TinyDB(option)
  test.selectAll('test_table') // 查询数据表中的所有数据
```

#### `clearTable(name:string):Promise` 删除某一张表数据

`@param name` 表名

```typescript
   test.clearTable('test_table').then( res => {
     console.log('success')
   }).catch( err => {
     return new Error(err)
   })
```
