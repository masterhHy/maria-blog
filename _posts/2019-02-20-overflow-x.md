---
layout: post
title:  "用vue实现水平滚动tab组件"
date:   2019-02-20 11:12
categories: 组件
type: 技术
permalink: /archivers/vue/overflow-x
---



在业务中有一个功能是做水平tab条，有些水平tab条因为tab数量过多需要进行滚动，我看有多处用到，于是便封装了一下。以下是对这个水平tab条的总结。

## 实现思路

具体效果如下：

![overflow][01]


### tab条展示

* 首先是tab条的制作，本来是可以采用一个ul包裹多个li的方式，但是考虑到vue里面进行数据绑定用表单元素比较方便，于是我采用了单选框的形式来进行展示。

```javascript
/*template*/
<div class="tab-box-list">
      <div v-for="(item, index) in tabList" :key="index" class="tab nav_item">
        <input type="radio" :id="index" :value="item.value"  name="group" v-model="bindData" />
        <label :for="index">{{item.label}}</label>
      </div>
</div>
/*script*/
props: {
      tabList: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
```

**`解析`：**

将需要展示的tab列表以参数的形式传进来，然后在div里面进行遍历，以单选框的形式来进行陈列。

这里注意**当表单元素是radio的时候，不要在里面添加click事件，否则的话会报错**。

### 隐藏radio按钮的圆圈选框

* radio按钮的圆圈选框隐藏之后，才会有tab条的效果出现。

下面是具体的代码：

```javascript
/*style*/
 .tab {
    height: 84%;
    position: relative;
  }
  .tab label{
    box-flex: 1;
    text-align: center;
    cursor: pointer;
    font-size: 15px;
    display: inline-block;
    height: 100%;
  }
  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0); /*剪裁绝对定位元素，将圆圈所在的位置剪裁掉*/
  }
  input[type="radio"]:checked+label {
    border-bottom: 3px solid #0096eb;
    color: #0096eb;
  }
```

### tab条水平滚动

* 当传进来的参数列表展示超过了屏幕总体宽度之后，就必须要进行滚动让tab条能够左右滚动。这个效果可以用css轻松做到。

下面是具体的代码：

```javascript
/*style*/
.tab-box-list{
    height: 2rem;
    border-bottom: 1px solid #e5e5e5;
    color: #666;
    display: flex; /*采用弹性布局，当tab数变化时自动更改宽度*/
    align-items: center; /*垂直居中*/
    flex-flow: row nowrap; /*水平排列，不换行*/
    line-height: 1.75rem;
    overflow-y: hidden; /*竖直滚动条隐藏*/
    overflow-x: auto; /*水平设置滚动*/
    position: relative;
    z-index: 2;
    margin-bottom: 0.5rem;
  }
  .tab-box-list::-webkit-scrollbar {/*隐藏滚轮*/
    display: none;
    width: 0;
    background: transparent;
  }
```

## 如何使用tab组件

```javascript
<template>
    <div>
      <tab-bar v-model="tabVal" :tabList="tabList"></tab-bar>
    </div>
</template>
<script>
    import tabBar from '@/components/tab-bar'
    export default {
        name: 'tab-test',
        components:{tabBar},
        data () {
          return {
            tabVal: 2,
            tabList:[{label: '全部', value: 1},
              {label: '文学', value: 2},
              {label: '历史', value: 3},
              {label: '政治', value: 4},
              {label: '地理', value: 5},
              {label: '体育', value: 6},
              {label: '科学', value: 7},
              {label: '语文', value: 8},
              {label: '其他', value: 9}]
          }
        }
    }
</script>
```
### 具体代码地址

具体代码可以看这里： [https://github.com/wuliya1994/myProject/blob/master/tab-bar.vue][02]

[01]:/image/overflow.gif "水平滚动效果"
[02]: https://github.com/wuliya1994/myProject/blob/master/tab-bar.vue "tabbar"

``总结``

要多优化，写组件时不要写一些无关于组件的东西，免得造成使用组件的人困扰。比如这里的tabList，开始我是直接在组件里面写死了，写了一个默认值，但是这个值实际上应该是从外界传进来的。
如何让用的方便，让看的人清楚，要学习的东西还有很多。
