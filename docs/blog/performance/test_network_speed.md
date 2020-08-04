# 如何测试网络速度

## Navigator

通过 HTML 5 自带属性 `navigator` Api, 参考 [MDN Navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator)

```js

// 不是很准确
const speed = navigator.connection

console.log(speed)

```

## 资源请求

小 img 实现

在服务器放个 1KB 的图片，并请求，看返回Timer差分区间

bandwidth = speed/Timer

## 多普勒测速

分五次请求，计算公式 performance

`a <= <random number>`

1. <http://a-doppler.facebook.com/test_pixel?HTTP1.0&t=1&size=0k> T1
2. <http://a-doppler.facebook.com/test_pixel?HTTP1.1&t=2&size=0k> T2
3. <http://a-doppler.facebook.com/test_pixel?HTTP1.1&t=3&size=0k> T3
4. <http://a-doppler.facebook.com/test_pixel?HTTP1.1&t=4&size=10k> T4
5. <http://a-doppler.facebook.com/test_pixel?HTTP1.1&t=5&size=40k> T5

> <http://a-doppler.facebook.com/test_pixel> 地址可更换为 Api 地址

关于个 T(0, 3) 阶段查看 [navigation-timing 对应位置](/blog/performance/performance_base.md#navigation-timing)

T1 = DNS + New Connection(TCP) + RTT(一次传输)

T2 = New Connection(TCP) + RTT(一次传输)

T3 = RTT(一次传输)

**bandwidth(带宽)** = 10k/(t4-t3)

**bandwidth(带宽)** = (40k-10k)/(t5-t4)

如果网速慢 可以给用户出 一倍图,获取隐藏部分,只显示重要部分

window._WISE_INFO
