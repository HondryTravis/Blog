---
title: Webpack | 优化 & 插件
---

:::info 调优整合
webpack 5↓ 版本调整合集，不会算我输
:::

## 快速上手

webpack 是一款项目模块打包器

起步，快速上手移步至 [webpack 概念](https://www.webpackjs.com/concepts/)

## 思路

使用 [打包分析](#打包分析) 得出结果，

对 loader 慢处理 [缓存加速](#缓存加速)

对静态代码处理 [代码分析](#代码分析)

多线程加速压缩 [多核优化](#多核优化压缩)

对 html 处理 [html](#html)

对图片处理 [image](#图片)

...(忘了？往下看)

如果实在还是特别慢，嗯？😑 考虑集群编译吧，分模块打包，通过 jenkins 配置自动化，shell 脚本，通过免密登录 scp 到本地

:::note 提速↑
打包 4 秒 -> 1 秒不到的快感, 你能体会么？
:::

## 多核优化压缩

### javascript

1. 深度 treeShaking(注意过老版本)
    - [webpack-deep-scope-plugin](https://www.npmjs.com/package/webpack-deep-scope-plugin)
    - [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin)
    - [purifycss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin)

2. 开启多核压缩 [happypack](https://www.npmjs.com/package/happypack) 多线程编译 webpack 不⽀持的情况下使⽤ [thread-loader](https://www.npmjs.com/package/thread-loader) **慎用该插件**，JavaScript的多核压缩可以开启 [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin) (多核压缩 [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin) 官⽅维护 ⾮官⽅维护 [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin))

:::note webpack 5

> Webpack5 不间断进程（continuous processes）和缓存对于⼤型复杂项⽬应⽤，在开发阶段，开发者⼀般习惯使⽤ Webpack --watch 选项或者webpack devServer 启动⼀个不间断的进程（continuous processes）以达到最佳的构建速度和效率。Webpack --watch 选项和 webpack-dev-server 都会监听⽂件系统，进⽽在必要时，触发持续编译构建动作。

原理其实就是轮询判断⽂件的最后编辑时间是否变化，某个⽂件发⽣了变化，并不会⽴刻告诉监听者，⽽是先缓存起来，等待aggregateTimeout（Webpack 的 --watch 选项内置的类似 batching 的能⼒）<https://github.com/paulmillr/chokidar>
:::

```js
const TerserJSPlugin = require('terser-webpack-plugin');
      module.exports = {
      optimization: {
      minimizer: [new TerserJSPlugin({
      cache: true, // 是否缓存
      parallel: true, // 是否并⾏打包
      sourceMap: true
    })],
  }
}
```

### css

CSS的多核压缩 [optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin)

## 打包分析

### 速度分析

利用插件 [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)

### 打包进度条

利用插件 [progress-bar-webpack-plugin](https://www.npmjs.com/package/progress-bar-webpack-plugin)

### 文件分析面板

[webpack-dashboard](https://www.npmjs.com/package/webpack-dashboard) 增强了 webpack 的输出，包含依赖的⼤⼩、进度和其他细节。

[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) 打包结果分析

集成到CI 监控⽂件的⼤⼩ <https://github.com/siddharthkp/bundlesize>

```sh
webpack --profile --json > stats.json
```

备用：[webpack-chart](http://alexkuz.github.io/webpack-chart/)

备用：[analyse](http://webpack.github.io/analyse/)

## 缓存加速

### 整个工程开启缓存

有时候为了极致性能，可以使用该方法，强缓存，慎用

[hard-source-webpack-plugin](https://www.npmjs.com/package/hard-source-webpack-plugin)

### cache-loader

通过检测那个 loader 速度过慢使用

[cache-loader](https://www.npmjs.com/package/cache-loader)

loader的缓存 => 'babel-loader?cacheDirectory=true'

```js
exclude: /node_modules/, // 排除不处理的⽬录
include: path.resolve(__dirname, 'src') // 精确指定要处理的⽬录
```

## 资源处理

[html-inline-css-webpack-plugin](https://www.npmjs.com/package/html-inline-css-webpack-plugin) 把⼀些核⼼的CSS放到⻚⾯内部

[html-webpack-inline-source-plugin](https://www.npmjs.com/package/html-webpack-inline-source-plugin) 内部资源引⼊

## runtime

[inline-manifest-webpack-plugin](https://www.npmjs.com/package/inline-manifest-webpack-plugin) 把runtime放到html⾥

## 图片

压缩图⽚ [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)

## html

[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) html

```js
new HtmlWebpackPlugin({
  inlineSource: ".css$",
  template: path.join(__dirname, `src/${pageName}/index.html`),
  filename: `${pageName}.html`,
  chunks: ["vendors", pageName],
  inject: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    preserveLineBreaks: false,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false,
  },
});
```

## 代码分析

[prepack-webpack-plugin](https://www.npmjs.com/package/prepack-webpack-plugin) 代码求值，静态代码分析

[@babel/plugin-syntax-dynamic-import](https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import) 动态引⼊

## 错误提示处理

友好错误提示 [friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin)

社区维护(通知，本地 dev) [webpack-build-notifier](https://www.npmjs.com/package/webpack-build-notifier)

## 快速区分终端窗口

[set-iterm2-badge](https://www.npmjs.com/package/set-iterm2-badge) && [node-bash-title](https://www.npmjs.com/package/node-bash-title) 标题和窗⼝内容修改

错误退出(不需要插件)

```js
function() {
this.hooks.done.tap('done', (stats) => {
  if (stats.compilation.errors && stats.compilation.errors.length
    && process.argv.indexOf('--watch') == -1)
    {
    console.log('build error');
    process.exit(1);
    }
  })
}
```

## 代码拆分

externals 配置去掉不需要编译的，可以抛弃 dll

splitChunks 公⽤库的代码拆分 去除打包

```js
splitChunks: {
  chunks: 'async',
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  name: false,
  cacheGroups: {
    commons: {
      chunks: 'initial',
      minChunks: 2,
      maxInitialRequests: 5,
      minSize: 0,
      name: 'commons',
    },
  },
}
```

分离⻚⾯公⽤包 [html-webpack-externals-plugin](https://www.npmjs.com/package/html-webpack-externals-plugin)

## polyfill

js脚本直接引入，不编译

```html
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?feature=Map,Set"></script>
```

使⽤动态 polyfill, 它会根据你的浏览器 UA 头，判断你是否⽀持某些特性，从⽽返回给你⼀个合适的 polyfill

```html
<script type="module" src="main.js"></script>
<script nomodule src="main.es5.js"></script>
```

## 优秀配置库搜集

构建配置设计成⼀个库

hjs-webpack、Neutrino、webpack-blocks

抽成⼀个⼯具进⾏管理

create-react-app, kyt, nwb

更多的快速构建⼯具

lerna 、brunch、 rome 、snowpack （过往Browserify、Rollup.js、Gulp、Parcel、Microbundle）
