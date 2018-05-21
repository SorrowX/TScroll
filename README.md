# TScroll

> TScroll.vue 一个Vue组件(TouchScroll)
``` bash
1. 用来解决移动端列表的滚动
2. 使用姿势较为统一
3. 列表数据始终保持5屏左右的列表数据,所以当你滚动1w以上(其实随便多少条数据)的数据,父容器中的数据始终都是小于5屏左右的数据
4. 基于alloytouch.js和transform.js编写的一个Vue基础组件
```

## TScroll.vue 使用姿势

``` bash
<t-scroll 
    :pullUpData="pullUpData"
    :pullDownData="pullDownData"
    :renderDataList.sync="renderDataList"
    v-bind="tScrollOptions"
    ref="tScrollComp"
    @pullUpLoading="loadMore"
    @pullDownLoading="pullDownLoading"
    @pullDownEnd="pullDownEnd"
    @change="change"
>
	<template>
		<div ref="tscroll-pull-down" class="pulldown">释放加载</div>
		<ul ref="tscroll-list-container">
			<li
				:key="item.data.num"
			    v-for="(item, index) in renderDataList"
			>row {{JSON.stringify(item.data.num)}}</li>
		</ul>
		<div ref="tscroll-pull-up" class="loading">loading</div>
	</template>
</t-scroll>
```

## TScroll.vue props详细解释

``` bash
data() {
	return {
		simpleScroll: '' // 如果有该属性(以下属性可以全部忽略了, 目前只支持'translateX'和'translateY'),则认为是个简单的滚动,不含上拉下拉加载数据功能
		pullUpData: [], // 每次从服务器上拉获取的新数据
		pullDownData: [], // 每次从服务器下拉获取的新数据
		renderDataList: [], // 用于渲染列表的数据
		tScrollOptions: {
			scrollBarOption: { // 控制滚动条相关属性
				show: true, // 是否开启滚动条
				fade: false // true 表示当滚动停止的时候滚动条是否需要渐隐
			},
			scrollOption: {
				excrMin: 45 + 48, // 多余的高度(滚动容器如果和屏幕高度一样,则该值为0,如果页面如果有头部和底部,需要减掉头部和底部的高度,则该值为头部的高度+底部的高度)
				maxSpeed: 2, // 滚动最大速度
				sensitivity: 1, // 滚动的灵敏度
				pullDownDistance: 60, // 下拉距离(超过指定距离才触发下拉事件)
				preventDefault: false // 是否阻止默认事件
			}
		}
	}
}
```

## TScroll.vue 事件详细解释

``` bash
pullUpLoading 事件 暂无参数:
    用户从下往上拉 滚动列表时,加载完当前服务器给的数据且出现加载dom时会触发该事件

pullDownLoading 事件 暂无参数:
   用户从上往下拉 滚动列表时,当往下拉的距离大于pullDownDistance属性时,会触发该事件(注意: 该事件会多次触发)

pullDownEnd 事件 暂无参数:
   用户从上往下拉 释放列表时, 会触发该事件。列表会自动回弹到pullDownDistance高度,等下拉有新的数据时,会自动回弹到顶部

change 事件 参数(v 表示当前滚动的transformY值):
   当用户滚动列表时, 会不断的触发该事件

touchStart 事件 参数(evt, property):
   当用户触发列表容器时, 会触发该事件

touchMove 事件 参数(evt, property):
   当用户在列表容器上滑动时, 会触发该事件

touchEnd 事件 参数(evt, current):
   当用户在列表容器手指放开时, 会触发该事件

touchCancel 事件 参数(evt):
   当touch事件取消时, 会触发该事件

animationEnd 事件 参数(current):
   当用户在列表容器手指放开时且动画滚动结束时, 会触发该事件
```

## TScroll.vue 实例一些有用的方法

``` bash

scrollTo 方法: 滚动到指定的dom
    参数(i, ms)
        i: 如果指定Number类型的话, 会在指定ms毫秒内滚动到列表的第几个dom元素
           如果指定String类型的话(只支持'top', 'bottom'), 会在指定ms毫秒内滚动到列表的顶部或者底部
           如果指定HTMLLIElement类型的话, 会在指定ms毫秒内滚动到列表中该dom的位置
        ms: Number 毫秒
    返回值: undefined

getAllData 方法: 获取所有的数据,就是从服务器每次请求的数据都push到该数组,
                 数组中的元素为对象,对象属性如下{ data: 就是服务器给的数据, dom: dom元素, translateY: css属性, removed: 该dom是否被移除了 }
    无参数
    返回值: Array(对象数组或者空数组)

getListActualDom 方法: 获取列表容器中实际的dom元素(因为父容器始终会保持小于5屏左右的数据)
    无参数
    返回值: Array(dom数组或者空数组)

clearListContainerDom 方法: 清空当前列表容器所有的孩子
    参数(cb) 
        cb: Function 清空后的回掉(因为vue更新dom基本放到本次事件循环的末尾执行,所以提供个回掉)
    返回值: undefined
```

## TScroll.vue 更新日志
    
``` bash
    4月17日:
       1.修复 少传excrMin参数,滑动列表时,内容会被清空的的bug (大部分参数都是可选的,所以没传了话,应该有默认值)
       2.修复 下拉时滚动条高度不跟着变化的bug
       3.修复 有simpleScroll属性就是简单滚动的情况下,列表最后一个dom被隐藏的bug

    5月6日:
       1.excrMin属性支持rem单位,可以为Number|String类型,number类型则为px单位
         eg: excrMin: 44 和 excrMin: '44px' 效果一样; excrMin: '1.5rem'的话会根据当前的html的fontSize
             计算出px值
    5月7日:
       1.TScroll组件实例新增clearListContainerDom方法,用于清空当前列表容器所有的孩子,其他状态相应的置为初始状态
       2. demo详见 '视频'中的sv.vue组件使用姿势

    5月14日:
       1. 新增TScrollX.vue组件(主要是TScroll.vue组件的增强版)
       2. 增强simpleScroll属性的功能,以前只支持垂直滚动,不支持水平滚动
       3. 水平滚动只是简单的滚动,不含'像右滑动'或者'像左滑动'超过多少距离触发加载数据事件,事实上安卓和ios客户端也很少有这样的功能
       4. 水平滚动只是简单的左右滚动,同时scrollTo api同样可以用
       5. 该属性主要用于导航,等水平滚动功能使用。demo详见 '我的视频'中的video-header.vue组件使用姿势
       6. 注: TScroll.vue 组件不含水平滚动

    5月21日:
       1. simpleScroll demo中下拉刷新数据时,然后上拉会出现列表消失的bug
       2. 此为TScroll.vue组件的bug, 已修复
```

## demo
    
``` bash
    效果详见 https://sorrowx.github.io/TScroll/#/

    4月10日:
        新增首页和SimpleTscroll页面
    4月16日:
        新增迅雷直播首页
    4月27日:
        新增有料视频列表页和视频播放页(其视频接口已关闭,demo为同一个视频)
    5月6日:
        新增视频单页,和视频播放页(该demo主要用于自己本地视频播放娱乐的)
    5月13日:
        今天下午无聊重构了视频单页,改为"我的视频"
        该单页比'视频'单页多了左右滑动时切换到新的tag功能,容器内容数据没有清空,而是一个tag导航对应一个tscroll容器，
        分离了头部和视频内容组件,代码清晰多了

```
