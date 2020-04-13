# 一些 mac 常用的命令

方便 mac 使用

## 常用命令

```bash
    # 查找filename文件路径
    find / -name [filename]
    # 查找pagename文件路径
    which [pagename]
    # 删除filename文件
    rm [filename]
    # 强制删除，有超级权限
    rm -rf [filename]
    # 新建文件夹
    mkdir [filename]
    # 新建文本
    touch [filename]
    # 打印环境变量
    echo $PATH
    # 显示当前文件路径
    pwd
    # 显示系统详细信息
    uname -a
    # 显示当前用户
    whoami
    # 显示环境变量
    env
    # 查看本机IP地址
    ifconfig
    # 精准匹配本机ip，显示本地wifi网线ip
    ifconfig | grep 'inet' | grep -v 'inet6'
    # 写入文件
    echo 'hello world' > xxx.txt
    # 查看文件
    cat [filename]
```
