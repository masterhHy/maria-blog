---
layout: post
title:  "限制input输入小数只能到3位或者只能输入正整数(兼容ios)"
date:   2019-02-25 11:18
categories: html
type: 技术
permalink: /archivers/html/numberInput
---



我们在做表单输入时，有时候对于有些输入比较有限制，比如输入天数必须为正整数，再比如有些特殊需求需要输入保留小数点的后面n位。那么我们如何在输入环节就限制用户的输入情况呢？

我们可以用正则表达式来限制。

### 限制input输入数字只能输入正整数（包括0）

```javascript
<input type="number" class="weight-input" 
       oninput="this.value=this.value.replace(/\D/g,'');" 
       pattern="[0-9]*"> &nbsp; 天
```

**`解析`**

1. oninput事件在用户输入时触发，元素值发生变化时立即触发。
2. \D为非数字，this.value为input输入的值，当输入的值不为数字的时候，就替换成空字符串。
3. 加上pattern="[0-9]*"，是为了适应苹果ios系统。

### 限制input输入数字只能输入正整数（不包括0）

```javascript
<input type="number" class="weight-input"  min="1"
  oninput="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/,'')}else{this.value=this.value.replace(/\D/g,'')}"  pattern="[1-9][0-9]*"> &nbsp; 天
```

**`解析`**

1. min=1限制对于输入是没有用的，但是对于type="number"类型的上下点击选择还是有限制作用的，如果正则表达式写的完善的话，min=1也可以不加。

2. oninput是一个事件，所以事件里面是可以写js代码的。


### 限制input输入数字只能输入小数点最多到第三位的数字

```javascript
<input type="number" class="weight-input" min="0.000"  oninput="this.value=this.value.replace(/\D*(\d*)(\.?)(\d{0,3})\d*/,'$1$2$3')" pattern="[0-9]*\.?[0-9]{0,3}">
```

1. /\D*(\d*)(\.?)(\d{0,3})\d*/解析：加上括号即为分组，分组从左到右分别用$1,$2,$3来表示，每个括号为一组。只保留组里面的内容，输入的其他内容都给过滤掉。

2. pattern="[0-9]*\.?[0-9]{0,3}"是为了适应苹果ios系统
