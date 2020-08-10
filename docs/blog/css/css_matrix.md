# CSS 矩阵

## 矩阵数学概念

在数学中，矩阵（Matrix）是⼀个按照⻓⽅阵列排列的复数或实数集合，最早来⾃于⽅程组的系数及常数所构成的⽅阵。

矩阵是⾼等代数学中的常⻅⼯具，也常⻅于统计分析等应⽤数学学科中。在物理学中，矩阵于电路学、⼒学、光学和量⼦物理中都有应⽤；计算机科学中，三维动画制作也需要⽤到矩阵。矩阵的运算是数值分析领域的重要问题。由 m × n 个数aij排成的m⾏n列的数表称为m⾏n列的矩阵，简称m × n矩阵。这m×n 个数称为矩阵A的元素，简称为元

## 计算规则

矩阵第m⾏与第n列交叉位置的那个值，等于第⼀个矩阵第m⾏与第⼆个矩阵第n列，对应位置的每个值的乘积之和。线性代数是向量计算的基础，很多重要的数学模型都要⽤到向量计算。矩阵的本质就是线性⽅程式，两者是⼀⼀对应关系。如果从线性⽅程式的⻆度，理解矩阵乘法就毫⽆难度

参考 [百度百科 矩阵](https://baike.baidu.com/item/矩阵)

## CSS 中矩阵的应用

matrix()和 matrix3d()

### 2D & 3D矩阵应⽤

前者是元素2D平⾯的移动变换(transform)，后者则是3D变换。2D变换矩阵为 `3*3`, 3D变换则是 `4*4` 的矩阵

### transform 原理

- skew
- scale
- rotate
- translate

`transform: matrix(a,b,c,d,e,f)`

⽆论是旋转还是拉伸什么的，本质上都是应⽤的matrix()⽅法实现的（修改matrix()⽅法固定⼏个值），只是类似于transform:rotate这种表现形式，我们更容易理解，记忆与上⼿

`transform-origin`

通过transform-origin属性进⾏设置的时候，矩阵相关计算也随之发⽣改变。实际图形效果上就是，旋转拉伸的中⼼点变了

::: tip 总结
少点套路，多点真诚，底层就是 matrix 实现的 transform，肯定 martrix 性能更好，可以对 transform 属性进行优化
:::

## 更多的应用场景

- SVG `transform="matrix(a b c d e f)"`
- Canvas `context.transform(2,0,0,2,150,150)`
- WebGL 投影，变化，视图变化
- CSS 3D `matrix3d`
