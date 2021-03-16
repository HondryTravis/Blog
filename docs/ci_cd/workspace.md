---
title: Workspaces | Yarn 管理
---

Yarn 从 1.0 版开始支持 Workspace （工作区）。

Workspace 能更好的统一管理有多个项目的仓库，既可在每个项目下使用独立的 package.json 管理依赖，又可便利的享受一条 yarn 命令安装或者升级所有依赖等。更重要的是可以使多个项目共享同一个 node_modules 目录，提升开发效率和降低磁盘空间占用。好处不用多说了吧, 共用一个 node_modules.当然也有弊端，初次安装过于缓慢，跟随着项目的大小程度，可以采用 [lerna](https://github.com/lerna/lerna) (不做介绍，yarn 目前是最优选择，已踩坑，第三方依赖会存在冗余重复, yarn 更为清爽，感兴趣可以尝试) 构建。当然最好的方案还是结合使用，lerna 更新后也支持 workspace, 结合使用，效果更佳

## 根目录配置

- private 不作为根目录发，最好是 true
- workspaces  表示工作空间

```json
{
  "name": "@blog/example",
  "private": true,
  "version": "1.0.0",
  "workspaces": [
    "packages/*"
  ]
}
```

## 同一个 workspace 相互引用安装

最好指定版本, 注意 package_name 是 package.json 中的 name 不是文件夹目录名

### 安装 dependencies

```bash
yarn workspace [package_name] add [package_name]@[version]
```

### 安装 devDependencies

```bash
yarn workspace [package_name] add -D [package_name]@[version]
```

### 删除包

删除相关也是类似的，不用带指定版本

```bash
yarn workspace [package_name] remove [package_name]
```

### 查看信息

```bash
yarn workspaces info --json
```

### 其他

yarn 的命令大都可以直接使用

## Q & A 地址

[demo2](https://github.com/HondryTravis/Blog-example/tree/master/packages/demo2)

查看 demo2 并执行 `yarn test`;

```bash
# 控制台会打印如下结果
我是 demo！
```
