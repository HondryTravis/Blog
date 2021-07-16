---
title: Gulp | 流水线控制
---


一个工具，用自动化构建工具增强你的工作流程！让开发变的简单快的工具，**基于文件流的构建系统**

[关于 gulp API](https://gulpjs.com/docs/en/api/concepts), 常用的也就四个 `src, dest, series, parallel`

## 安装

```bash
# 全局安装
npm install --global gulp-cli
# 项目安装
yarn add -D gulp
```

`gulp` 启动需要指定 `gulpfile.js` 文件

## 走个 demo 起步

项目 IDE： VS Code

```bash
# 终端中 创建 gulp-example 项目
mkdir gulp-example

# 进入项目中
cd gulp-example

# 创建项目
yarn init -y

# 安装 gulp
yarn add -D gulp

# 创建 gulp 配置文件
touch gulpfile.js

# 创建一个用于测试的 入口文件
echo 'console.log("hello world")' > index.js

# code path vscode 终端快捷键
code .
```

文件的目录结构大概是这样

```txt
.
├── gulpfile.js
├── index.js
├── node_modules
├── package.json
└── yarn.lock
```
### 编写 `gulpfile.js`

小试身手，copy `index.js` 文件到 `dist` 目录下


```js title="gulpfile.js"
const { series, src, dest } = require('gulp')

function copyIndex() {
  return src('index.js')
  .pipe(dest('dist'))
}

// 注册任务
exports.copyIndex = series(copyIndex)
```

之后执行 `gulp copyIndex` 会得到这样的结果
 
```txt
.
├── dist
│   └── index.js
├── gulpfile.js
├── index.js
├── node_modules
├── package.json
└── yarn.lock
```

这样就完成了简单的 gulp 的一个流水线控制, 实际项目中可能需要用到很多的依赖，但都是在管道 `pipe` 中执行，根据自己的需求灵活调整插件，插件根据自己需求添加

## 看个实战项目配置

这是一个 ts 的项目，需要热更，同时可能会有一些样式文件

[项目连接](https://github.com/HondryTravis/TinyDB)

```js title="gulpfile.js"
const { series, parallel, src, dest } = require('gulp')

// 构建浏览器可以运行的环境
const browserify = require("browserify");
// 访问 typescript 编译器的能力， 是 Browserify 的插件，就像 gulp-typescript
const tsify = require("tsify");
// 调整 browserify 输出格式能被 gulp 流式访问
const source = require("vinyl-source-stream");

// 引入 watch 
const watch = require("gulp-watch");

// 压缩 js 使用
const uglify = require("gulp-uglify");
// 生成代码映射
const sourcemaps = require("gulp-sourcemaps");
// 生成 buffer
const buffer = require("vinyl-buffer");

// 观察 js 变化自动更新
const watchify = require("watchify");
// log
const fancy_log = require("fancy-log");

// 重命名
const rename = require("gulp-rename")

// 启动一个 http 服务
const browserSync = require("browser-sync").create()
const reload = browserSync.reload

const config = {
  entries: './src/core/index.ts',
  output_dir: 'example',
  output_name: 'tinydb.js',
  index_dir: './',
  skin: {
    entry: './src/skin/index.css',
    output_dir: 'example'
  }
}

// gulp 任务流程
const typescript = watchify(
  browserify({
    basedir: ".",
    debug: true,
    entries: [config.entries],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
  .transform('babelify', {
    presets: ["es2015"],
    extensions: [".ts"],
  })
)

typescript.on("update", bundle);
typescript.on("log", fancy_log);

function bundle() {
  return typescript
  .bundle()
  .on("error", fancy_log)
  .pipe(source(config.output_name))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write("./"))
  .pipe(dest(config.output_dir))
  .pipe(reload({stream:true}))
}


function build() {
  return src('./example/tinydb.js')
  .pipe(uglify())
  .pipe(rename({
    suffix:'.min'
  }))
  .pipe(dest('./example/'))
}

function devServer() {
  browserSync.init({
    server: {
      baseDir: config.index_dir,
      tunnel: true
    }
  })
}

function watch_file() {
  watch('./src/skin/**/*.css', () => {
    css()
    reload()
  })
  watch('./*.html', () => {
    reload()
  })
}

function css() {
  return src(config.skin.entry)
  .pipe(dest(config.skin.output_dir))
  .pipe(reload({stream:true}))
}

exports.default = parallel(bundle, css, devServer, watch_file)
exports.build = series(build)

```
