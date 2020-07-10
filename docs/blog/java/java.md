# Java 初探

概述

Java是一门面向对象编程语言，不仅吸收了C++语言的各种优点，还摒弃了C++里难以理解的多继承、指针等概念，因此Java语言具有功能强大和简单易用两个特征。Java语言作为静态面向对象编程语言的代表，极好地实现了面向对象理论，允许程序员以优雅的思维方式进行复杂的编程

Java具有简单性、面向对象、分布式、健壮性、安全性、平台独立与可移植性、多线程、动态性等特点。Java可以编写桌面应用程序、Web应用程序、分布式系统和嵌入式系统应用程序等

## 安装

根据你的系统，可以通过 [Java 官网](https://www.oracle.com/cn/downloads/) 获得 **面向开发人员的 Java (JDK)**，不要使用 **面向消费者的 Java(JRE)**

### mascOS

直接通过 dmg 安装

### CentOS

下载 **Linux RPM Package**

通过命令行 [linux 命令 scp](/blog/linux/linux.md#scp) (mac)

```bash
# scp jdk-14.0.1_linux-x64_bin.rpm 主机登录用户@ip或者域名:文件路径
scp jdk-14.0.1_linux-x64_bin.rpm tx:/opt
```

其中 `tx` 是我创建的 linux [免密登录](/blog/linux/linux_deploy.md#免密登录) 中的别名

通过命令行 [linux 命令 rpm](/blog/linux/linux.md#rpm)

```bash
# 进入 opt 目录
cd /opt
# 通过 rpm 安装
rpm -ivh jdk-14.0.1_linux-x64_bin.rpm
```

**Congratulations!** 恭喜安装完成
