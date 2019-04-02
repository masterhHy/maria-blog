---
layout: post
title:  "如何实现label长度固定，文字分散分布的效果"
date:   2019-02-21 11:16
categories: css
type: 技术
permalink: /archivers/css/dispersed
---



我们经常会看到表单填写时前面的label,都是左右对齐的，即使字数不一样。就像下面的效果：


![fensan][01]

**``解析``**

这种效果主要通过text-align-last属性来实现。

* text-align-last：规定如何对齐文本的最后一行

在菜鸟教程上对于这个属性有这样的描述：

> text-align-last 属性只有在 text-align 属性设置为 "justify" 时才起作用。

但我尝试了一下，当文本只有一行的时候，text-align属性不设置，text-align-last也是有用的。当然这只是针对非IE和Safiri而言。

text-align属性对多行文本的最后一行文本无效。


```javascript
/*css*/
.label {
      width: 200px;
      text-align-last: justify; 
}
/*html*/
<div class="label">产 品</div>
```

这样的写法，对IE浏览器和safari浏览器就不起作用了。因为text-align-last不支持这两个浏览器。

针对这个问题，我们可以用伪类来解决。

```javascript
/*css*/
.label {
      width: 200px;
      height: 30px; /*高度需要添加，不然文字下面会多出一些空隙*/
      text-align: justify; 
}
 .label:after{
        content: '';
        display: inline-block;
        width: 100%;
      }
/*html*/
<div class="label">产 品</div>
```

有三点需要注意：

1. 因为加了伪类之后，相当于在标签的文本后又加了一行，所以text-align-last就不起作用了，需要加上text-align

2. 因为加了伪类之后，文本后面会多出一行，即使给伪类设置高度为0也不行。所以必须给.label属性加上一个高度。区别如下：

![height][02]

3. 加了伪类之后，标签的**文字之间必须要存在一个空格（一个就行，不用太多）**，否则的话，没有效果。


[01]:/image/fensan.png "分散"
[02]:/image/height.png "高度"


``两种方案对比``

第二种方法相对于第一种方法来说，兼容性更好，我在多个浏览器测试了一下，都没有问题。

第一种方案更简洁，但是不支持ie和safari，所以建议大家还是用第二种方案更省心。
