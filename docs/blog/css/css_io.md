# CSS 阻塞 I/O

::: tip 疑问？
css 会阻塞 js 加载么？
:::

## SCRIPT 脚本影响 DOM 渲染<Badge type="tip" text="会么?"/>

打脸代码

```html {12}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>脚本不影响解析，渲染依旧等待</h1>
    <script>
      prompt('等待');
    </script>
  </body>
</html>
```

::: tip 结论

script 内嵌脚本/src 放在 dom 底部会阻塞 dom 渲染，不会影响解析

DOM解析不影响 渲染依旧等待
:::

## CSS 影响 DOM 渲染<Badge type="tip" text="会么?"/>

打脸代码

```html {24}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      h1 {
        color: red !important;
      }
    </style>
    <script>
      function h() {
        console.log(document.querySelectorAll('h1'));
      }
      setTimeout(h, 0);
    </script>
    <link
      rel="stylesheet"
      href="https://cdn.staticfile.org/twitter-bootstrap/5.0.0-alpha1/css/bootstrap-utilities.min.css"
    />
  </head>
  <body>
    <h1>css link test</h1>
  </body>
</html>
```

::: tip 结论

需要弱网 调整 chrome 中 network 调试 custom 自定义网速 10kb

1.css 影响DOM渲染

2.css 不会影响DOM解析

:::

## CSS 阻塞 Scirpt 加载<Badge type="tip" text="会么?"/>

打脸代码

```html {20}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      h1 {
        color: red !important;
      }
    </style>
    <link
      rel="stylesheet"
      href="https://cdn.staticfile.org/twitter-bootstrap/5.0.0-alpha1/css/bootstrap-reboot.min.css"
    />
  </head>
  <body>
    <h1>css 阻塞 js 加载</h1>
    <script>
      console.log('test');
    </script>
  </body>
</html>

```

::: tip 结论

需要弱网环境

css 加载会阻塞后面JS脚本/语句

:::

## CSS 阻塞 DOMLoading<Badge type="tip" text="会么?"/>

打脸代码

```html {17}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script>
      document.addEventListener('DOMContentLoaded', function () {
        console.log('DOMContentLoaded');
      });
    </script>
    <link
      rel="stylesheet"
      href="https://cdn.staticfile.org/twitter-bootstrap/5.0.0-alpha1/css/bootstrap-reboot.min.css"
    />
    <script>
      console.log('test');
    </script>
  </head>
  <body>
    <h1>dom load</h1>
  </body>
</html>
```

::: tip 结论

会影响DOMLoading

弱网环境

test 不会执行，link 会影响后边的脚本执行

:::
