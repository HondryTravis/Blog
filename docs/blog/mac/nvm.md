# nvm 安装以及使用

nvm 是你方便的 node 包管理工具

## 安装

mac 下安装 nvm

```bash
  brew install nvm
```

根据终端提示 配置你的环境变量 `.zshrc` or `.bash_profile`, 使用 `sh .zshrc or .bash_profile` 让他生效

如果终端没有提示： 请使用 `brew info nvm` 查看安装信息，配置环境变量

## 常用命令

### 查看当前版本

```bash
  nvm --version
```

### 查看远程已经存在的版本

可能会很慢，请耐心等待

```bash
  nvm ls-remote
```

### 下载指定版本nodejs

```bash
  nvm install v8.9.0 // vx.x.x
```

### 下载指定版本nodejs 系统版本

```bash
  nvm install v8.9.0 32 // vx.x.x [32/64]
```

### 查看当前使用版本

```bash
  nvm current
```

### 使用指定版本

```bash
  nvm use v8.9.1 // vx.x.x
```

### 查看已经安装的nodejs版本

```bash
  nvm list
```

### 设置默认版本

```bash
  nvm alias default v[版本号]
```

### 查看nodejs版本

```bash
   node --version
```
