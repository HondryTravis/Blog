---
title: IndexedDB
---

是比较复杂的一个微型类似关系型数据库，它拥有一系列api

## API

- 数据库: IDBDatabase 对象
- 对象仓库: IDBObjectStore 对象、表
- 索引: IDBIndex 对象
- 事务: IDBTrnsaction 对象
- 操作请求: IDBRequest 对象
- 指针: IDBCursor 对象、游标(还未写到)
- 主键集合：IDBKeyRange 对象

## 特点

- **键值对储存**。 IndexedDB 内部采用对象仓库（object store）存放数据。所有类型的数据都可以直接存入，包括 JavaScript 对象。对象仓库中，数据以"键值对"的形式保存，每一个数据记录都有对应的主键，主键是独一无二的，不能有重复，否则会抛出一个错误。

- **异步**。 IndexedDB 操作时不会锁死浏览器，用户依然可以进行其他操作，这与 LocalStorage 形成对比，后者的操作是同步的。异步设计是为了防止大量数据的读写，拖慢网页的表现。

- **支持事务**。 IndexedDB 支持事务（transaction），这意味着一系列操作步骤之中，只要有一步失败，整个事务就都取消，数据库回滚到事务发生之前的状态，不存在只改写一部分数据的情况。

- **同源限制** IndexedDB 受到同源限制，每一个数据库对应创建它的域名。网页只能访问自身域名下的数据库，而不能访问跨域的数据库。

- **储存空间大** IndexedDB 的储存空间比 LocalStorage 大得多，一般来说不少于 250MB，甚至没有上限。

- **支持二进制储存**。 IndexedDB 不仅可以储存字符串，还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）。

## 实现

使用Promise 实现(所有方法异步)

- 核心实现 `Table Class` 和 `TinyDB Class`
- `Main` 导出
- `types` 类型申明

## 预览

```JavaScript

  // 数据库的基本方法
  const db = new TinyDB(option)
  // 查找所有数据
  db.selectAll()
  // 通过Index 索引查找
  db.select(tableName, {...})
  // 通过Id 查找
  db.selectId(id)
  // 增加Id
  db.insert(tableName, {...})
  // 删除数据
  db.delete(tableName, {...})
  // 修改数据
  db.update(tableName, {...})
  // 连接数据库
  db.connect().then((r)=>{...}).catch((r)=>{...})
  // 关闭数据库
  db.close()
  // 删除表(慎用) 版本号要比之前的高,做好版本控制
  db.deleteTable(tableName, version)
  // 创建表 版本号默认1
  export interface Database {
    databaseName: string
    tables: Array<DatabaseTable>
    version?: number
  }
  db.createTable(tables[]: DatabaseTable, version)
  // 创建索引 createIndex
  export interface RuleIndex{
    index: string
    relativeIndex: string
    unique: boolean
  }
  db.createIndex(tableName, RuleIndex)
```

PS: 切忌频繁删除表(数据过大的时候……)

## 更新

- `some(tableName,startIndex,endIndex)` 截取指定索引范围数据
- `someUptate(tableName,data)` 更新部分或几条数据
- 数据回滚机制,如果添加失败,回到添加之前的状态,失败的数据移至错误表
- 处理各种bug
