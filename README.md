# TScroll

> TScroll.vue 一个Vue组件
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
		simpleScroll: '' // 如果有该属性(以下属性可以全部忽略了),则认为是个简单的滚动,不含上拉下拉加载数据功能
		pullUpData: [], // 每次从服务器上拉获取的新数据
		pullDownData: [], // 每次从服务器下拉获取的新数据
		renderDataList: [], // 用于渲染列表的数据
		tScrollOptions: {
			scrollbar: { // 控制滚动条相关属性
				show: true, // 是否开启滚动条
				fade: false // true 表示当滚动停止的时候滚动条是否需要渐隐
			},
			scroll: {
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
```

## demo
    
``` bash
    目前只有一个首页,和一个滚动页面,后续会增加更多demo
```
