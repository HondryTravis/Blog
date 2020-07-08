# Mysql 初探

开源免费的关系型数据库

## 安装

```bash
brew install mysql
```

`mysql` 密码

`123`

`mysql` 连接数据库

```bash
  mysql -u root -p 123
```

## 忘记密码

### 第一步

苹果->系统偏好设置->最下边点mysql 在弹出页面中 关闭mysql服务（点击stop mysql server）

### 第二步

进入终端输入: `cd /usr/local/mysql/bin/`
回车后 登录管理员权限 sudo su
回车后输入以下命令来禁止mysql验证功能 `./mysqld_safe --skip-grant-tables &`
回车后mysql会自动重启（偏好设置中mysql的状态会变成running）

### 第三步

输入命令 `./mysql`
回车后，输入命令 FLUSH PRIVILEGES;
回车后，输入命令 SET PASSWORD FOR 'root'@'localhost' = PASSWORD('你的新密码');

至此，密码修改完成，可以成功登陆。

常用database操作

创建一个名字为 `mydatabase` 数据库:  `create database mydatabase` ;
可以用以下地命令来查看创建的数据库是否成功: show databases ;
更改数据库名字: `alter databases  Hdatabase` ;
更改数据库 `mydatabase` 的字符集 :  `alter database mydatabase charset GBK` ;
进入数据库: `use mydatabase` ;

用下面的命令来查看该数据库中的表:  `show tables` ;

表操作
用下面的命令来创建表

```bash
  create table student (
    name varchar(10) ,
    gender varchar(10) ,
    sno    int    primary key(id)
  )charset utf8;
```

用下面的命令来检查表的创建是否成功:  `show tables`;
