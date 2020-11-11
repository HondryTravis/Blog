---
title: Jenkins
---

Jenkins是一个开源软件项目，是基于Java开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。

## 功能

Jenkins功能包括

1. 持续的软件版本发布/测试项目。
2. 监控外部调用执行的工作。

## 安装

访问官网 [如何安装](https://www.jenkins.io/zh/doc/book/installing/)

### 前置条件

- jdk 8 +，[Centos java 安装](java/java.md#安装)
- 通过官方地址 [获取安装包](https://pkg.jenkins.io/debian-stable/)
- 256MB内存，建议大于512MB
- 10GB的硬盘空间（用于存放Jenkins镜像）
- 需要可以访问公网
- 关闭防火墙(可选)
- 连接公网

### 解压安装

```sh
# 我是放到了 /opt 目录下
[root@localhost opt]# ls
jdk-14.0.1_linux-x64_bin.rpm  jenkins-2.235.2-1.1.noarch.rpm  sonarqube-8.4.0.35506  sonarqube-8.4.0.35506.zip
# 安装使用 rpm 安装
[root@localhost opt]# rpm -ivh jenkins-2.235.2-1.1.noarch.rpm
# Congratulations! 恭喜安装完成🎉
```
<!-- cd /var/lib/jenkins/updates -->

### 修改用户名 & 端口

先得到配置文件地址

```sh
[root@localhost opt]# find / -name jenkins
/etc/sysconfig/jenkins # 为配置文件地址
/etc/logrotate.d/jenkins
/etc/rc.d/init.d/jenkins
/usr/lib/jenkins
/var/log/jenkins
/var/lib/jenkins
/var/cache/jenkins
/run/lock/subsys/jenkins
[root@localhost opt]# vim /etc/sysconfig/jenkins
# 修改 JENKINS_USER = "root"  防止权限问题
# 修改 JENKINS_PORT = "8080"  防止端口冲突
:wq 退出
```

### 启动

使用命令 `service jenkins` 进行启动管理

可能的名称参数: `{start|stop|status|try-restart|restart|force-reload|reload|probe}`

```sh
[root@localhost opt]# service jenkins start
Starting jenkins (via systemctl):                          [  OK  ]
```

:::warning 注意

如果在启动过程中发现状态栏显示成功，但是本机访问浏览器端口无法访问

请查看 **启动状态:** `service jenkins status`

可能是 jdk 版本过高导致的，请安装指定默认范围内的 jdk, [查看支持的 jdk](https://pkg.jenkins.io/redhat-stable/)

:::

访问本机： <你的服务器外网地址>:8088(你刚才配置的端口)

首先根据相关提示，拿到登录密码

![启动](/images/engineering/jenkins_start.png)

插件安装，选推荐就完事了，后边可以卸载在更改

> 这里如果遇到过慢的问题，查看 [过慢解决方案](engineering/jenkins.md#替换插件源，首次安装过慢)

![安装插件](/images/engineering/jenkins_install_plugin.png)

更改结束设置以后，刷新浏览器，重新走到这一步，恢复安装即可

![恢复安装](/images/engineering/jenkins_reinstall_plugin.png)

耐心等待安装插件

![安装插件](/images/engineering/jenkins_success.png)

创建用户：登录用户

![创建用户](/images/engineering/jenkins_create_user.png)

配置实例地址，一般默认就好，我的打马赛克了，如果一般前边配置了端口号，这里会有默认地址

![配置实例地址](/images/engineering/jenkins_instance_url.png)

别急，耐心点，还有一步

![启动成功](/images/engineering/jenkins_sucess_start.png)

别忘记再次在这里替换插件更新源：系统管理 > 插件管理 > 高级 #升级站点 替换掉源 [地址](engineering/jenkins.md#替换插件源，首次安装过慢)

![替换源](/images/engineering/jenkins_replace_plugin_url.png)

并且提交，点击立即获取

**Congratulations!** 恭喜启动完成🎉，可以开始项目配置了

## 卸载

### rpm 卸载 jenkins

- `rpm -qa jenkins` 查看

- `rpm -e jenkins` 卸载

- `rpm -ql jenkins` 检查是否卸载成功

彻底删除残留文件

`find / -iname jenkins | xargs -n 1000 rm -rf`

## 替换插件源，首次安装过慢

清华源替换地址 <https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json>

1.进入jenkins插件更新目录 `cd /var/lib/jenkins/updates`

```sh
[root@localhost updates]# sed -i 's/http:\/\/updates.jenkins-ci.org\/download/https:\/\/mirrors.tuna.tsinghua.edu.cn\/jenkins/g' default.json && sed -i 's/http:\/\/www.google.com/https:\/\/www.baidu.com/g' default.json
```

:::note 注意
如果首次进入发现没有 updates 文件夹，请先在本机浏览器走到<自定义插件>部分，然后停止掉 jenkins 服务，进行替换
:::
