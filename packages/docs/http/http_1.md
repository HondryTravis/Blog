---
title: HTTP 1.x
---

## HTTP 请求模型

![模型](/images/http/model.png)

http 之两个二:

* 客户端和服务端;

* 请求和响应:(request,response)

## 浏览器行为与HTTP协议

:::note 处理流程

1. 输入网址并回车
2. 解析域名
3. 浏览器发送HTTP请求
4. 服务器处理请求
5. 服务器返回HTML响应
6. 浏览器处理HTML页面
7. 继续请求其他资源

:::

![处理流程](/images/http/request_step.png)

## 什么是HTTP协议

* HTTP是超文本传输协议，从www浏览器传输到本地浏览器的一种传输协
议，网站是基于HTTP协议的，例如网站的图片、CSS、JS等都是基于
HTTP协议进行传输的。

* HTTP协议是由从客户机到服务器的请求(Request)和从服务器到客户机
的响应(response)进行约束和规范。

![版本历程](/images/http/version.png)

## 了解TCP/IP协议栈

![协议流程](/images/http/tcp.png)

左边是 **ISO/OSI标准协议**，右图是**事实协议**， **ISO/OSI 标准协议** 是对**事实协议**的一个补充，最初设计的不完整

更为详细流程，参考 [TCP 协议](./tcp)

**应用层**:

为用户提供所需要的各种服务，例如：HTTP、FTP、DNS、SMTP等

**传输层**:

为应用层实体提供端到端的通信功能，保证数据包的顺序传送及数
据的完整性。

该层定义了两个主要的协议：传输控制协议（TCP）和用户数据报协议（UDP).

**网络层**:

主要解决主机到主机的通信问题。IP协议是网际互联层最重要的协
议。

**网络接口层**:

负责监视数据在主机和网络之间的交换

## HTTP在TCP/IP协议栈中的位置

目前普遍应用版本HTTP 1.1, 正在逐步向HTTP 2迁移,HTTP默认端口号为80 ,HTTPS默认端口号为443。 如下图：

![http 位置](/images/http/http_position.png)

## HTTP的工作过程

一次HTTP操作称为一个事务，其工作过程可分为四步

1. 首先客户机与服务器需要建立连接。只要单击某个超级链接，HTTP的工作开始

2. 建立连接后，客户机发送一个请求给服务器，请求方式的格式为：统一资源标识符(URL)、协议版本号后边是MIME信息包括请求修饰符、客户机信息和可能的内容。

3. 服务器接到请求后，给予相应的响应信息，其格式为一个状态行，包括信息的协议版本号、一个成功或错误的代码，后边是MIME信息包括服务器信息、实体信息和可能的内容。

4. 客户端接收服务器所返回的信息通过浏览器显示在用户的显示屏上，然后客户机与服务器断开连接。

***如果在以上过程中的某一步出现错误，那么产生错误的信息将返回到客户端，有显示屏输出。对于用户来说，这些过程是由HTTP自己完成的，用户只要用鼠标点击，等待信息显示就可以了。***

## 请求与响应

HTTP请求组成：请求行、消息报头、请求正文

HTTP响应组成：状态行、消息报头、响应正文

请求行组成：以一个方法符号开头，后面跟着请求的URI和协议的版本

状态行组成：服务器HTTP协议的版本，服务器发回的响应状态代码和状
态代码的文本描述。

**请求**:
:::note request
![请求](/images/http/request_head_1.png)
:::

**响应**:
:::note response
![响应](/images/http/response_head_1.png)
:::

## 请求方法

:::note 概述
GET： 请求获取Request-URI所标识的资源

POST： 在Request-URI所标识的资源后附加新的数据

HEAD： 请求获取由Request-URI所标识的资源的响应消息报头

PUT： 请求服务器存储一个资源，并用Request-URI作为其标识

DELETE： 请求服务器删除Request-URI所标识的资源

TRACE： 请求服务器回送收到的请求信息，主要用于测试或诊断

CONNECT：HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器

OPTIONS： 请求查询服务器的性能，或者查询与资源相关的选项和需求
:::

## HTTP状态码

状态代码有三位数字组成，第一个数字定义了响应的类别，且有五种可能取值

**1xx**：指示信息--表示请求已接收，继续处理

**2xx**：成功--表示请求已被成功接收、理解、接受

**3xx**：重定向--要完成请求必须进行更进一步的操作

**4xx**：客户端错误--请求有语法错误或请求无法实现

**5xx**：服务器端错误--服务器未能实现合法的请求

## 常用的请求报头

**Accept** 请求报头域用于指定客户端接受哪些类型的信息。eg：Accept：image/gif，Accept：text/

**htmlAccept-Charset** 请求报头域用于指定客户端接受的字符集。Accept-Encoding：Accept-Encoding请求报头域类似于Accept，但是它是用于指定可接受的内容编码。

**Accept-Language** 请求报头域类似于Accept，但是它是用于指定一种自然语言

**Authorization** 请求报头域主要用于证明客户端有权查看某个资源。当浏览器访问一个页面时，如果收到服务器的响应代码为401（未授权），可以发送一个包含Authorization请求报头域的请求，要求服务器对其进行验证。

**Host** 请求报头域主要用于指定被请求资源的Internet主机和端口号，它通常从HTTP URL中提取出来的，发
送请求时，该报头域是必需的。

**User-Agent** 请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器。

## 常用的响应报头

**Location** 响应报头域用于重定向接受者到一个新的位置。Location响应
报头域常用在更换域名的时候。

**Server** 响应报头域包含了服务器用来处理请求的软件信息。与UserAgent请求报头域是相对应的。

**WWW-Authenticate** 响应报头域必须被包含在401（未授权的）响应消息中，客户端收到401响应消息时候，并发送Authorization报头域请求服务器对其进行验证时，服务端响应报头就包含该报头域。

## 实体报头

**请求**和**响应**消息都可以传送一个实体。一个实体由实体报头域和实体正文组成，但并不是说实体报头域和实体正文要在一起发送，可以只发送实体报头域。实体报头定义了关于实体正文（eg：有无实体正文）和请求所标识的资源的元信息。

## 常用的实体报头

**Content-Encoding** 实体报头域被用作媒体类型的修饰符，它的值指示了已经被应用到实体正文的附加内容的编码，因而要获得Content-Type报头域中所引用的媒体类型，必须采用相应的解码机制。

**Content-Language** 实体报头域描述了资源所用的自然语言。

**Content-Length** 实体报头域用于指明实体正文的长度，以字节方式存储的十进制数字来表示。

**Content-Type** 实体报头域用语指明发送给接收者的实体正文的媒体类型。

**Last-Modified** 实体报头域用于指示资源的最后修改日期和时间。

**Expires** 实体报头域给出响应过期的日期和时间。

## cookies与session

* Cookies是保存在客户端的小段文本，随客户端点每一个请求发送该url下的所有cookies到服务器端。

* Session则保存在服务器端，通过唯一的值sessionID来区别每一个用户。SessionID随每个连接请求发送到服务器，服务器根据sessionID来识别客户端，再通过session 的key获取session值

## Cookie使用

与Cookie相关的HTTP扩展头

1. Cookie：客户端将服务器设置的Cookie返回到服务器
2. Set-Cookie：服务器向客户端设置Cookie

![cookies](/images/http/cookie_model.png)

服务器在响应消息中用Set-Cookie头将Cookie的内容回送给客户端，客户端在新的请求中将相同的内容携带在Cookie头中发送给服务器。从而实现会话的保持

## Session的使用

* 使用Cookie来实现

* 使用URL回显来实现

![session](/images/http/session_model.png)

## HTTP缓存机制

缓存会根据请求保存输出内容的副本，例如html页面，图片，文件，当下一个请求来到的时候：如果是相同的URL，缓存直接使用副本响应访问请求，而不是向源服务器再次发送请求。

缓存的优点：

1. 减少相应延迟

2. 减少网络带宽消耗

![http_cache](/images/http/http_cache.png)

## 浏览器缓存机制

### 没有缓存

![browser_cache](/images/http/browser_cache_1.png)

### 有缓存

![browser_cache](/images/http/browser_cache_2.png)

## 两种缓存策略

浏览器缓存主要有两类

* 强制缓存
* 协商缓存

HTTP 1.0: 基于Pragma & Expires的缓存实现

* Pragma
* Expire

这三者的优先级顺序为:Pragma -> Cache-Control -> Expires）

HTTP 1.1 Cache-Control:相对过期时间

强缓存

利用http头中的Expires和Cache-Control两个字段来控制的，用来表示资源的缓存时间

普通刷新会忽略它，但不会清除它，需要强制刷新。浏览器强制刷新，请求会带上Cache-Control:no-cache和Pragma:no-cache

* Expires （http 1.0）
* Cache-Control

协商缓存

协商缓存就是由服务器来确定缓存资源是否可用，所以客户端与服务器端要通过某种标识来进行通信，从而让服务器判断请求资源是否可以缓存访问。

* Etag 和 If-None-Match
* Last-Modify / If-Modify-Since

### 缓存优先级

**Cache-Control > Expires > Etag > Last-modify**.

Request/Response Headers

Web页面设计中，建少HTTP请求可以提高页面响应速度。浏览器在第一次访问页面时下载的资源会缓存起来，第二次访问时会判断在缓存中是否已有该资源并且有没有更新过，如果已有该资源且没有更新过，则去缓存去取，这样减少了下载资源的时间。原理上是通过HTTP Rquest Header中的 if-modified-since 和Response Headers中的last-modified来实现（还有一对组合If-None-Match和Etag，类似），HTTP请求把if-modified-sincede 时间传给服务端，服务端把last-modified时间与之对比，如果相同，则意味着文件没有改动，则返回304，浏览器则从缓存中获取资源，无需下载。

**协商缓存 `last-modified / if-modified-since`**

Response Headers

> last-modified: Wed, 16 May 2020 12:57:16 GMT

Request Headers

> if-modified-since: Wed, 16 May 2020 12:55:38 GMT

**原理：** 服务器端返回资源时，如果头部带上了 last-modified，那么资源下次请求时就会把值加⼊到请求头 if-modified-since中，服务器可以对⽐这个值，确定资源是否发⽣变化，如果没有发⽣变化，则返回 304

**协商缓存 `etag / if-none-match`**

Response Headers

> etag: "D5FC8B85A045FF720547BC36FC872550"

Request Headers

> if-none-match: "D5FC8B85A045FF720547BC36FC872550"

**原理：** 服务器端返回资源时，如果头部带上了 etag，那么资源下次请求时就会把值加⼊到请求头 if-none-match 中，服务器可以对⽐这个值，确定资源是否发⽣变化，如果没有发⽣变化，则返回 304

Response Headers

**强缓存 `Expires`**
> expires: Thu, 16 May 2020 03:05:59 GMT

**原理：** 在 http 头中设置⼀个过期时间，在这个过期时间之前，浏览器的请求都不会发出，⽽是⾃动从缓存中读取⽂件，除⾮缓存被清空，或者强制刷新。缺陷在于，服务器时间和⽤户端时间可能存在不⼀致，所以 HTTP/1.1 加⼊了 cache-control 头来改进这个问题

**强缓存 `cache-control`**

**原理：** 设置过期的时间⻓度（秒），在这个时间范围内，浏览器请求都会直接读缓存。当 expires 和 cache-control 都存在时，cache-control 的优先级更⾼

:::note 小结

expires也是需要在服务端配置（具体配置也根据服务器而定），expires添加的是该资源过期的日期，浏览器会根据该过期日期与客户端时间对比，如果过期时间还没到，则会去缓存中读取该资源，如果已经到期了，则浏览器判断为该资源已经不新鲜要重新从服务端获取。通过这种方式，可以实现直接从浏览器缓存中读取，而不需要去服务端判断是否已经缓存，避免了这次http请求。值得注意的是expires时间可能存在客户端时间跟服务端时间不一致的问题。所以，建议expires结合Cache-Control一起使用，大型网站中一起使用的情况比较多见

:::

参考链接

[HTTP强缓存和协商缓存](https://www.dazhuanlan.com/2019/12/17/5df8273d1d9aa/)

[彻底弄懂HTTP缓存机制及原理](https://www.cnblogs.com/chenqf/p/6386163.html)  
