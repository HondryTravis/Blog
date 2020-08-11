# CSS 分层

## 为什么要分层

- CSS有语义化的命名约定和CSS层的分离，将有助于它的可扩展性，性能的提⾼和代码的组织管理。
- ⼤量的样式，覆盖、权重和很多!important，分好层可以让团队命名统⼀规范，⽅便维护。
- 有责任感地去命名你的选择器。

关于命名规范，目前主流的：SMACSS，BEM，SUIT，ACSS，ITCSS

## SMACSS

[SMACSS](https://smacss.com/) (Scalable and Modular Architecture for CSS 可扩展的模块化架构的CSS)像OOCSS⼀样以减少重复样式为基础

然⽽SMACSS使⽤⼀套五个层次来划分CSS给项⽬带来更结构化的⽅法：

- Base -设定标签元素的预设值 PS:`html {} input[type=text] {}`
- Layout -整个⽹站的「⼤架构」的外观 PS:`#header { margin: 30px 0; }`
- Module -应⽤在不同⻚⾯公共模块 PS:`.button{}`
- State -定义元素不同的状态 PS:`.nav--main { .active {} }`
- Theme - 画⾯上所有「主视觉」的定义 PS: `border-color、background-image`

修饰符使⽤的是--，⼦模块使⽤__符号。

```html
<div class="container">
  <div class="container-header">
    <div class="container-header__title">
      <h1 class="container-header__title--home"></h1>
    </div>
  </div>
</div>
```

## BEM

[BEM](https://en.bem.info/) 和 SMACCS ⾮常类似，主要⽤来如何给项⽬命名。⼀个简单命名更容易让别⼈⼀起⼯作。⽐如选项卡导航是⼀个块(Block)，这个块⾥的元素的是其中标签之⼀(Element)，⽽当前选项卡是⼀个修饰状态(Modifier)

- `block` -代表了更⾼级别的抽象或组件
- `block__element` -代表 `.block` 的后代，⽤于形成⼀个完整的.block的整体。
- `.block--modifier` -代表 `.block` 的不同状态或不同版本。
- 修饰符使⽤的是`_`，⼦模块使⽤ `__` 符号。(不⽤⼀个-的原因是因是CSS单词连接)

```html
<ul class="menu">
  <li class="menu__item"></li>
  <li class="menu__item_state_current"></li>
  <li class="menu__item"></li>
</ul>
```

## SUIT

[SUIT](https://suitcss.github.io/) 起源于BEM，但是它对组件名使⽤驼峰式和连字号把组件从他们的修饰和⼦孙后代中区分出来

- 修饰符使⽤的是 `—` ，⼦模块使⽤ `__` 符号。(不⽤⼀个-的原因是CSS单词连接)

如果你不想使⽤如此严格或者复杂的命名规则，给每⼀个选择器加前缀同样可以达到这样的效果。

```css
.s-product-details {}
.t-product-details {}
.js-product-details {}
```

结构属性将会被应⽤到`s-product-details`选择器中。主题属性将应⽤于`t-product-details`选择器

## ACSS

[ACSS](http://patternlab.io/) 考虑如何设计⼀个系统的接⼝。原⼦(Atoms)是创建⼀个区块的最基本的特质，⽐如说表单按钮。分⼦(Molecules)是很多个原⼦(Atoms)的组合，⽐如说⼀个表单中包括了⼀个标签，输⼊框和按钮。⽣物(Organisms)是众多分⼦(Molecules)的组合物，⽐如⼀个⽹站的顶部区域，他包括了⽹站的标题、导航等。⽽模板(Templates)⼜是众多⽣物(Organisms)的结合体。⽐如⼀个⽹站⻚⾯的布局。⽽最后的⻚⾯就是特殊的模板。

|![acss](/css/acss.png)|![acss_code](/css/acss_code.png)|
|:-:|:-:|

## ITCSS

[ITCSS](http://csswizardry.net/talks/2014/11/itcss-dafed.pdf)

- Settings—全局可⽤配置，设置开关。`$color-ui: #BADA55; $spacing-unit:10px`
- Tools—通⽤⼯具函数。`@mixin font-color() {font-color: $color-ui;}`
- Generic—通⽤基础样式。`Normalize, resets, box-sizing: border-box;`
- Base—未归类的HTML元素。`ul {list-style: square outside;}`
- Objects—设计部分开始使⽤专⽤类。`.ui-list__item {padding: $spacing-unit;}`
- Components—设计符合你们的组件。`.products-list {@include font-brand();border-top: 1px solid $color-ui;}`
- Trumps—重写，只影响⼀块的DOM。(通常带上我们的!important)
