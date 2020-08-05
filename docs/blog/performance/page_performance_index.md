# 页面性能指标

::: tip 思考
如何精准定位页面那一块渲染问题？
:::

## 指标

为页面渲染各个阶段的标识符，可以通过计算得到

|<div style="min-width:100px">阶段(简写)</div>|描述|<div style="min-width:200px">阶段(全称)</div>|
|:-:|:-:|:-:|
|TTFP|首字节时间|Time TO Frist Byte|
|FP|首次绘制(第一个节点)|First Paint|
|FCP|首次有内容的绘制(骨架)|First Contentful Paint|
|FMP|首次有意义的绘制(包含所有元素/数据)|First Meaningful|
|TTI|达到可交互时间，推荐的响应时间是100ms以内否则有延迟|Time To Interactive|
|Long tasks|超过了 50ms 的任务||
|SSR&&CSR|服务端渲染和客户端渲染|Server-Side-Rendering / Client Side Rendering|
|Isomorphic|同构化||

### FP、FCP、FMP、TTI

![base_all_info](/performance/base_all_info.png)

### LongTask

![long_tasks](/performance/long_tasks.png)

## 新增指标

### LCP、FID、TBT、CLS

|<div style="min-width:100px">阶段(简写)</div>|描述|<div style="min-width:200px">阶段(全称)</div>|
|:-:|:-:|:-:|
|LCP|最⼤内容绘制，⽤于记录视窗内最⼤的元素绘制的时间，该时间会随着⻚⾯渲染变化⽽变化，因为⻚⾯中的最⼤元素渲染过程中可能会发⽣改变，另外该指标会在⽤户第⼀次交互后停⽌记录|LCP（Largest Contentful Paint）|
|FID|⾸次输⼊延迟，记录在 FCP 和 TTI 之间⽤户⾸次与⻚⾯交互时响应的延迟|FID（First Input Delay）|
|TBT|阻塞总时间，记录在 FCP 到 TTI 之间所有⻓任务的阻塞时间总和|TBT（Total Blocking Time）|
|CLS|累计位移偏移，记录了⻚⾯上⾮预期的位移波动。使⽤按钮动态添加了某个元素，导致⻚⾯上其他位置的代码发⽣了偏移，造成了⻚⾯|CLS（Cumulative Layout Shift）|

简单的指标标准

![fcp_time](/performance/fcp_time.png)
![lcp_time](/performance/lcp_time.png)
![fid_time](/performance/fid_time.png)
![cls_time](/performance/cls_time.png)

::: tip 总结
**LCP**: 代表了⻚⾯的速度指标， LCP 能体现的东⻄更多⼀些。⼀是指标
实时更新，数据更精确，⼆是代表着⻚⾯最⼤元素的渲染时间，最⼤元
素的快速载⼊能让⽤户感觉性能还挺好。

**FID**: 代表⻚⾯的交互体验指标，交互响应的快会让⽤户觉得⽹⻚流畅。

**CLS**: 代表了⻚⾯的稳定指标，尤其在⼿机上这个指标更为重要。因为⼿
机屏幕挺⼩，CLS 值⼀⼤的话会让⽤户觉得⻚⾯体验做的很差。
:::
