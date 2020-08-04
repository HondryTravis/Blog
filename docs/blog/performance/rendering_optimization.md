# 渲染中的性能优化

## 熟悉 Chrome 调试工具

![chrome_performance_test](/performance/chrome_performance_test.png)

查看测试代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* css in js */
      /* :root{
        --test:()=>{
          console.log(123);
        }
      } */
      .container {
        position: relative;
        min-height: 400px;
      }
      .ball {
        position: absolute;
        top: 0;
        left: 0;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.75);
      }
      .ball-running {
        animation: run-around 4s infinite;
      }
      @keyframes run-around {
        0% {
          /* top: 0;
          left: 0; */
          transform: translate(0, 0);
        }
        25% {
          /* top: 0;
          left: 200px; */
          transform: translate(200px, 0);
        }
        50% {
          /* top: 200px;
          left: 200px; */
          transform: translate(200px, 200px);
        }
        75% {
          /* top: 200px;
          left: 0; */
          transform: translate(0, 200px);
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="ball" id="ball"></div>
    </div>
    <script>
      var balls = document.getElementById('ball');
      balls.classList.add('ball');
      balls.classList.add('ball-running');
    </script>
  </body>
</html>

```

::: tip 小结
使用 top left 会发现不断的 重绘和重排

使用 transform 则没有

Paint flashing 将会显示绿色代表重绘(上图中使用 transform 所以没有，切换为 top left 可见)

Layout 重排
:::

## 浏览器渲染过程

### 网页整个渲染流程

1. Dom分层的

2. 对DOM元素节点计算样式结果 Recalculate Style 样式重计算

3. 为每个节点 生成图形位置 Layout 回流重排

4. 将每个节点绘制填充到图层位图中 Paint

5. 图层作为纹理上传GPU上去

6. Composite Layers 合成层 把符合图层生成到页面上

    1. Layout

    2. Paint

7. Composite Layers 做了什么？

    1. 图层的绘制列表 准备好 主线程 commit 合成线程

    2. 合成线程 viewport 划分图块 256*256

    3. 生成我们的位图的过程栅格化 raster

    4. 所有图块 合成生成 DarwQuad 提交给浏览器渲染进程

    5. viz组件 接收到 DarwQuad 绘制到我们的屏幕上

### 分层

会触发元素分层

> 根元素、position分层、transform、半透明、CSS滤镜、canvas、video、overflow

GPU参与进来(css gpu 加速)

> CSS3D、Video、webgl、transform、css滤镜、willl-change:transfrom

### 重绘和重排（盒子动了, 怪异盒模型）

offset、scroll、client、width 读

```js
// 尽量把读操作和写操作放到一起,或者在下一帧执行写操作:

const width = doucument.getElementbyid("xx").width;

requestAnimationFrame(function(){
  // react
  // 设置dom元素 读写分离
})
```

cpu主要负责操作系统和程序，gpu负责显式 数据处理 效率更高 gpu.js

[fastdom 控制读写分离的插件](https://www.npmjs.com/package/fastdom)

[csstriggers 可查看是否引起重排重绘](https://csstriggers.com/)
