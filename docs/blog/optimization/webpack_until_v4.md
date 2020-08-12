# webpack优化与插件集合

## 快速上手

webpack 是一款项目模块打包器

起步，快速上手移步至 [webpack 概念](https://www.webpackjs.com/concepts/)

## 多核压缩

### javascript

1. 深度 treeShaking
    - [webpack-deep-scope-plugin](https://www.npmjs.com/package/webpack-deep-scope-plugin)
    - [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin)
    - [purifycss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin)

2. 开启多核压缩 [happypack](https://www.npmjs.com/package/happypack) 多线程编译 webpack 不⽀持的情况下使⽤ [thread-loader](https://www.npmjs.com/package/thread-loader)，JavaScript的多核压缩可以开启 [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin) (多核压缩 [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin) 官⽅维护 ⾮官⽅维护 [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin))

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

### 打包进度

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

[cache-loader](https://www.npmjs.com/package/cache-loader) loader的缓存 => 'babel-loader?cacheDirectory=true'

```js
exclude: /node_modules/, // 排除不处理的⽬录
include: path.resolve(__dirname, 'src') // 精确指定要处理的⽬录
```

## runtime

[inline-manifest-webpack-plugin](https://www.npmjs.com/package/inline-manifest-webpack-plugin) 把runtime放到html⾥

[html-inline-css-webpack-plugin](https://www.npmjs.com/package/html-inline-css-webpack-plugin) 把⼀些核⼼的CSS放到⻚⾯内部

[html-webpack-inline-source-plugin](https://www.npmjs.com/package/html-webpack-inline-source-plugin) 内部资源引⼊

## 图片

压缩图⽚ [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)

## html

[HtmlWebpackPlugins](https://www.npmjs.com/package/html-webpack-plugin) html

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

## 其他

[prepack-webpack-plugin](https://www.npmjs.com/package/prepack-webpack-plugin) 代码求值，静态代码分析

[@babel/plugin-syntax-dynamic-import](https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import) 动态引⼊

Webpack5 不间断进程（continuous processes）和缓存对于⼤型复杂项⽬应⽤，在开发阶段，开发者⼀般习惯使⽤ Webpack --watch 选项或者 webpack devServer 启动⼀个不间断的进程（continuous processes）以达到最佳的构建速度和效率。Webpack --watch 选项和 webpack-dev-server 都会监听⽂件系统，进⽽在必要时，触发持续编译构建动作。

原理其实就是轮询判断⽂件的最后编辑时间是否变化，某个⽂件发⽣了变化，并不会⽴刻告诉监听者，⽽是先缓存起来，等待aggregateTimeout（Webpack 的 --watch 选项内置的类似 batching 的能⼒）<https://github.com/paulmillr/chokidar>

## ⼯程配置

构建配置设计成⼀个库

hjs-webpack、Neutrino、webpack-blocks

抽成⼀个⼯具进⾏管理

create-react-app, kyt, nwb

更多的快速构建⼯具

lerna 、brunch、 rome 、snowpack （过往Browserify、Rollup.js、Gulp、Parcel、Microbundle）

更友好的提示错误

[friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin)

[webpack-build-notifier](https://www.npmjs.com/package/webpack-build-notifier)

[set-iterm2-badge](https://www.npmjs.com/package/set-iterm2-badge) && [node-bash-title](https://www.npmjs.com/package/node-bash-title) 标题和窗⼝内容修改

错误退出

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

## 拆分加速

splitChunks 公⽤库的代码拆分 去除打包

分离⻚⾯公⽤包 [html-webpack-externals-plugin](https://www.npmjs.com/package/html-webpack-externals-plugin)

## polyfill

使⽤动态 polyfill, 它会根据你的浏览器 UA 头，判断你是否⽀持某些特性，从⽽返回给你⼀个合适的 polyfill
