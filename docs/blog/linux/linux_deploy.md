# Linux 部署/配置

## 免密登录

### 免密登陆的原理

通过 ssh 协议，生成的 **非对称加密秘钥** 进行连接，同步公钥到服务端，每次请求的服务器时，服务器验证是否存在公钥，会使用公钥加密一段信息传输到客户端，客户端在使用配对的私钥解密进行验证，从而验证客户端登录。

详细流程：

- 在客户端使用ssh-keygen生成一对密钥：公钥+私钥
- 将客户端公钥追加到服务端的authorized_key文件中，完成公钥认证操作
- 认证完成后，客户端向服务端发起登录请求，并传递公钥到服务端
- 服务端检索authorized_key文件，确认该公钥是否存在
- 如果存在该公钥，则生成随机数R，并用公钥来进行加密，生成公钥加密字符串pubKey(R)
- 将公钥加密字符串传递给客户端
- 客户端使用私钥解密公钥加密字符串，得到R
- 服务端和客户端通信时会产生一个会话ID(sessionKey)，用MD5对R和SessionKey进行加密，生成摘要（即MD5加密字符串）
- 客户端将生成的MD5加密字符串传给服务端
- 服务端同样生成MD5(R,SessionKey)加密字符串
- 如果客户端传来的加密字符串等于服务端自身生成的加密字符串，则认证成功
- 此时不用输入密码，即完成建连，可以开始远程执行shell命令了

### 生成秘钥

ssh-genkey是生成密钥的工具，执行完成后生成公钥和密钥，这两个文件会默认保存在~/.ssh/路径下。常用的参数为：

- -t: 指定生成密钥类型（rsa、dsa）。默认为rsa
- -f: 指定存放私钥的文件，公钥文件名为私钥文件名加.pub后缀。默认为id_rsa
- -P: 指定passphrase（私钥的密码），用于确保私钥的安全。默认为空
- -C: 备注。默认为user@hostname

```bash
# 生成秘钥
ssh-keygen -t rsa -C "you_set_name" -f "you_set_name_rsa"
```

### 上传公钥

ssh-copy-id - 将你的公共密钥填充到一个远程机器上的authorized_keys文件中。

```bash
# 上传公钥
ssh-copy-id -i you_set_nae_rsa.pub root@服务器ip/域名(不要带协议)
```

**配置登录一定要设置公钥权限为 600**.

### 配置本地私钥

- 把第一步生成的私钥复制到你的home目录下的.ssh/ 路径下

**配置你的私钥文件访问权限为 600**.

```bash
chmod 600 你的私钥文件名
```

### 免密登陆功能的本地配置文件

- 编辑自己home目录的.ssh/ 路径下的config文件

(没有就自己生成一个,`touch config`)

**配置config文件的访问权限为 644**.

```bash
# 多主机配置
Host gateway-produce
HostName IP或绑定的域名
Port 22
Host node-produce
HostName IP或绑定的域名
Port 22
Host java-produce
HostName IP或绑定的域名
Port 22

# * 为通配符，匹配所有-produce 的服务器
Host *-produce
User root
IdentityFile ~/.ssh/produce_key_rsa
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO

#单主机配置
Host 别名
User 用户名
HostName IP或绑定的域名
IdentityFile ~/.ssh/私钥名字
Protocol 2
Compression yes
ServerAliveInterval 60
ServerAliveCountMax 20
LogLevel INFO
```
