---
title: husky | 规范前端 git 操作
---

:::info 提示
本文中使用的 husk 是 v6 版本
:::


[husky](https://github.com/typicode/husky) 可以做什么，可以规范前端代码提交的规范，我们可以在 git 提交的时候做一些事情，比如代码 eslint 检查，使用 prettier 对代码格式修复。因为在多人开发项目的时候，仅仅只是开发可不够，还需要一些方便快捷的工具，强大的 husky 集成了 githook，更加方便的使用 githooks


类似的工具还有

- [yorkie 尤雨溪 vue项目中使用的](https://github.com/yyx990803/yorkie)


## 快速上手

```bash
yarn add -D husky @commitlint/cli @commitlint/config-conventional
```

为什么会有 `@commitlint/cli` 和 `@commitlint/config-conventional` ?
- 因为这两个可以对我们提交的 msg 进行检测，用处就不言而喻了吧，当然也可以使用 yorkie 中的特定验证配置


在项目脚本里追加 [prepare](https://docs.npmjs.com/cli/v7/using-npm/scripts)

为什么需要 [husky install](https://typicode.github.io/husky/#/?id=install)

```json
// package.json
"script": {
  "prepare": "husky install",
}
```

### 接下来配置 commitlint

详细参数参考: https://commitlint.js.org/

```js
// package.json 同层级 commitlint.config.js

module.exports = {
    "extends": ["@commitlint/config-conventional"],
    "rules": {
        "type-enum": [
            2,
            "always",
            [
                "build",
                "chore",
                "ci",
                "docs",
                "feat",
                "fix",
                "perf",
                "refactor",
                "revert",
                "style",
                "test",
                "record"
            ],
        ],
        "type-empty": [0],
        "type-case": [0],
        "scope-empty": [0],
        "header-max-length": [0, 'always', 72]
    },
};
```


### 初始化 husky

先初始化

```bash
yarn prepare
```

会得到这样一个目录结构，在项目根目录下
```txt
.husky/
  ├── _
  │   └── husky.sh
  └── .gitignore
```

我们只需要创建一个 sh 文件，**注意** 别加后缀 `.sh`

在 `.husky` 文件下建立一个无后缀文件 `commit-msg` (这个就是 [git hooks](https://www.git-scm.com/docs/githooks))

在其中追加如下代码，因为默认使用的 `yarn` 环境，所以这里使用的是 `yarn`

```bash
#!/bin/sh # 指定 shell 环境
. "$(dirname "$0")/_/husky.sh" # refer1

yarn commitlint --edit $1
```

:::note $0, $1 是什么
$0: 就是该 sh 文件名
$1: 值得是传递的第一个参数

所以上述 refer1 指的就是执行当前目录下的 `./_/husky.sh` 脚本文件

然后执行 `yarn commitlint --edit [传递的参数]`
:::

### okk

大功告成，🍺

测试一下
```bash
git commit -m 'xxxx'
```
不出意外的话，将会报如下错误，并且提交中断

```bash
⧗   input: xxxx
✖   subject may not be empty [subject-empty]

✖   found 1 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
```

然后将提交的内容修改正确便可以提交了

```bash
git commit -m 'feat: husky so cool~'
```

[可以查看 Demo 连接](https://github.com/HondryTravis/inkstone/tree/beta-cli@0.0.1)