# CSS 工作流

## CSS 预处理器

- 变量
- 混合(minin) Extend
- 嵌套规则
- 运算
- 函数
- Namespaces & Accessors
- scope
- 注释

## CSS 后处理器

- css压缩：clean-css
- 自动加前缀：Autoprefixer（基于postCss）
- css属性排序：CSScomb
- Rework，取代Stylus
- PostCSS

### PostCSS 值得收藏的插件

- postcss-custom-properties 运行时变量
- postcss-simple-vars 与 scss 一致的变量实现
- postcss-minins 实现类似 sass 的 @mixin 的功能
- postcss-extend 实现类似 sass 的继承功能
- postcss-import 实现类似 sass 的 import
- [cssnext](https://cssnext.github.io/) 已被postcss-preset-env取代
- [CSS Grace](https://github.com/cssdream/cssgrace) 面向未来

gulp 快速配置上手

```js
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssgrace = require('cssgrace');
var cssnext = require('cssnext');
gulp.task('css', function () {
  var processors = [
  autoprefixer({browsers: ['last 3 version'],
  cascade: false,
  remove: false
  }),
  cssnext(),
  cssgrace
  ];

  return gulp.src('./src/css/*.css')
  .pipe(postcss(processors))
  .pipe(gulp.dest('./dist'))
});
gulp.task('watch', function(){
  gulp.watch('./src/css/*.css', ['css']);
});
gulp.task('default', ['watch', 'css']);
```

## 预处理与后处理器的关系

后处理器的特性：CSS原生语法，学习成本低，支持预处理器，完善整个CSS工作流，把逻辑交给JS
