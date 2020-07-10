# CentOS 7

常用于服务端的 linux 发行版，基于其稳定的性能

## 添加/删除用户和用户组

### 新建用户

```bash
# -------------------------记得要在root用户下-------------------------
# 新建testuser 用户
adduser testuser
# 给testuser 用户设置密码
passwd testuser
```

### 建工作组

```bash
# 新建test工作组
groupadd testgroup
```

### 新建用户同时增加工作组

```bash
# 新建testuser用户并增加到testgroup工作组
useradd -g testgroup testuser

# 注：：-g 所属组 -d 家目录 -s 所用的SHELL
```

### 给已有的用户增加工作组

```bash
usermod -G groupname username
```

### 临时关闭

在/etc/shadow文件中属于该用户的行的第二个字段（密码）前面加上*就可以了。想恢复该用户，去掉*即可

```bash
# 或者使用如下命令关闭用户账号：
passwd testuser –l
# 重新释放：
passwd testuser –u
```

### 永久性删除用户账号

```bash
userdel testuser 不删除 home 目录
userdel -r testuser 删除 home 目录
groupdel testgroup
# 强制删除该用户的主目录和主目录下的所有文件和子目录
usermod –G testgroup testuser
```

### 显示用户信息

```bash
id user
cat /etc/passwd
```

### 补充:查看用户和用户组的方法

- 用户列表文件：`/etc/passwd`
- 用户组列表文件：`/etc/group`
- 查看系统中有哪些用户：`cut -d : -f 1 /etc/passwd`
- 查看可以登录系统的用户：`cat /etc/passwd | grep -v /sbin/nologin | cut -d : -f 1`
- 查看用户操作：`w命令(需要root权限)`
- 查看某一用户：`w 用户名`
- 查看登录用户：`who`
- 查看用户登录历史记录：`last`

## 修改主机名

### hostnamectl

永久生效

```bash
hostnamectl set-hostname 'you name'
```

查看主机名等信息

```bash
hostnamectl
```
