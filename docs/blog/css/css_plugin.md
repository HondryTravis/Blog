# CSS 有趣的插件

## bezier 动画

[bezier](https://cubic-bezier.com/) css 动画快速生成器

## CSS Doodle

[css-doodle](https://github.com/css-doodle/css-doodle) 是一个用来绘制css图案的WEB组件， 其基于Shadow DOM V1和Custom Elements V1来构建的。该组件可以帮助轻松的使用Custom Elements、Shadow DOM和css Grid创建任何你想要的图案（css 图案）。创建出来的图案你可以运用于Web页面中

该组件通过其内部的规则（纯css）会生成一系列的div构建的css Grid。你可以使用css轻松地操作这些div（单元格，每个div就是一个单元格）来生成图案。生成的图案既可以是静态的，也可以是动态的。而其限制仅限于css本身的限制。

Q & A

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      :root {
        --customUnit: 100%;
        --initBg: () => {
          console.log(123);
        }
      }
      @supports (display: flex) {
        html,
        body {
          display: flex;
          align-items: center;
          justify-self: center;
        }
      }
      html,
      body {
        width: var(--customUnit);
        height: var(--customUnit);
        background: #0a0c27;
      }
    </style>
    <script src="https://unpkg.com/css-doodle@0.8.5/css-doodle.min.js"></script>
  </head>
  <body>
    <css-doodle>
      :doodle{ @grid : 1 x 10 / 61.8vmax; } @place-cell:center; @size:calc(
      @index() * 10%); border-width:calc(@index() * 1vmin); border-style:
      dashed; border-radius: 50%; border-color: hsla(calc(20*@index()), 70%,
      68%, calc(3/@index()*.8)); --d:@rand(20s,40s); --rf:@rand(360deg);
      --rt:calc(var(--rf) + @pick(1turn,-1turn)); animation: spin var(--d)
      cubic-bezier(.13,.69,1,-0.01) infinite; @keyframes spin { from{ transform:
      rotate(var(--rf)); } to{ transform: rotate(var(--rt)); } }
    </css-doodle>
  </body>
</html>
```
