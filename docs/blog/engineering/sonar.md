# Sonar & SonarScanner

## Sonar

Sonar (SonarQube)是一个开源平台，用于管理源代码的质量。Sonar 不只是一个质量数据报告工具，更是代码质量管理平台。支持的语言包括：Java、PHP、C#、C、Cobol、PL/SQL、Flex 等.

### 特点

- 代码覆盖：通过单元测试，将会显示哪行代码被选中

- 改善编码规则

- 搜寻编码规则：按照名字，插件，激活级别和类别进行查询

- 项目搜寻：按照项目的名字进行查询

- 对比数据：比较同一张表中的任何测量的趋势

### 前置条件 Java JDK

项目运行环境依赖 Java

可以通过 [Java JDK 安装](/blog/java/java.md#安装)

### 安装

首先通过 [官网 SonarQube](https://www.sonarqube.org/) 获得下载地址

通过 [linux 命令 scp](/blog/linux/linux.md#scp) 命令远程发送至远程 linux 平台(mac)

#### Sonarqube 运行条件

必须是非 root 用户运行

如何创建用户，[新建用户](/blog/linux/linux_centos.md#新建用户)，例：我用户名为 sonar

#### 添加权限

```bash
# root 用户登录 cd /etc/
[root@localhost etc]#chmod u+w sudoers
[root@localhost etc]#vim sudoers
# 在 root 后追加 sonar
sonar  ALL=(ALL)   ALL
# 保存退出 :wq
# 复原权限
[root@localhost etc]#chmod u-w sudoers
```

#### 解压

远程端

```bash
# 上传到 linux root/opt 下
# 通过 unzip sonarqube-8.4.0.35506.zip
# 在当前目录下得到 sonarqube-8.4.0.35506
# 如果不想看见后缀 mv sonarqube-8.4.0.35506 sonarqube 即可
[root@localhost opt]# ls
jdk-14.0.1_linux-x64_bin.rpm  rh  sonarqube  sonarqube-8.4.0.35506.zip
```

#### 更改用户所有者 & 权限

```bash
# 更改用户组
[root@localhost opt]#chown -R sonar:sonar sonarqube
# 切换用户
[root@localhost opt]#su sonar
# 更改文件权限
# 如果在操作 sonarqube 提示权限不足
[sonar@localhost opt]#chmod 777 sonarqube
```

#### 首次运行

```bash
# 是什么系统选择对应的版本
[sonar@localhost opt]#cd /sonarqube/bin/linux-x86-64
# linux
# 首次需要使用 console 参数启动， 可能的参数: start | stop | restart | status
[sonar@localhost linux-x86-64]#./sonar.sh console
# 第二次
[sonar@localhost linux-x86-64]# ./sonar.sh start
Starting SonarQube...
Started SonarQube.
```

默认监听 9000 端口，访问远程服务器 <远程地址:9000>

本地

在本地浏览器访问 <远程地址:9000>

**Congratulations!** 恭喜启动完成

### 登录

默认登录名: admin

默认密码: admin

### 汉化

在本地浏览器访问 <远程地址:9000> **注意：是你本机 不是服务端**

![汉化流程](/engineering/sonar.png)

## SonarScanner

是 sonar 本地开发机管理的命令行终端工具

通过以下流程 安装

### 先使用 sonar 浏览器端创建项目

![创建](/engineering/sonar_create.png)

### 配置项目名称

![创建名称](/engineering/project_name.png)

### 配置项目token

![创建token](/engineering/create_token.png)

### 配置开发机

![配置开发机](/engineering/download_sonar_scanner.png)

### 下载SonarScanner

可能后边会更换: [飞机票地址](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/)

![下载](/engineering/unzip_sonar_scanner.png)

### 配置本地环境变量(mac)

编辑本地的shell 环境变量 `.zshrc` 或者 `.bash_profile`

```shell
# sonar-scanner 追加bin

# export SCANNER_HOME="你下载的sonar-scanner地址"
export SCANNER_HOME="/Users/hondry/opt/sonar-scanner"
export PATH=$PATH:$SCANNER_HOME/bin
# 然后退出编辑 source  .bash_profile 或者 zsh .zshrc 使更改生效 例：zsh shell 下
zsh .zshrc
# 然后在 shell 中 校验是否安装完成
sonar-scanner -v
```

**Congratulations!** 恭喜本地命令配置完成

好了，接下来挑选一个项目吧

### 配置SonarScanner

配置开发目录文件 `sonar-project.properties`，没有就新建

我选中的 github 上的 quill

![选定的项目](/engineering/selected_project.png)

然后将 [配置开发机](/blog/engineering/sonar.md#配置开发机)

第五步内容拷贝至 `sonar-project.properties` 文件下

![粘贴配置](/engineering/paste_shell.png)

更改你要扫描测试的目录，比如 `core`

![更改目录](/engineering/changed_source.png)

好了，使用终端 shell(zsh/bash) 执行你的这个 `sonar-project.properties` 文件

```bash
# zsh 下 耐心等待终端结果
zsh sonar-project.properties
```

![成功](/engineering/success.png)

接下来刷新你的本地浏览器

![成功](/engineering/refresh_browser.png)

**Congratulations!** 恭喜配置完成🎉
