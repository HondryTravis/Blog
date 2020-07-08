# PM2

PM2 是 node 进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等，而且使用非常简单。

[pm2 官网](https://pm2.io/)

## 创建进程的两种方式<Badge type="tip" text="了解即可"/>

1. fork
2. exec

## 例子

```js
// master
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log(numCPUs);
    for (var i = 0; i < numCPUs; i++) {
        var worker = cluster.fork();
    }
} else {
    require("./app.js");
}
// app.js
// worker
var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
}).listen(8000);
```
