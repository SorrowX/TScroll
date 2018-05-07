<template>
	<transition name="sv-fade">
		<div class="sv-main" ref="touchDom">
			<div>
				<div class="sv-header" ref="sv-header-target">
					<ul ref="sv-header-touch">
						<li 
						    class="li-tag-class"
						    :class="{'cur-li-tag': index === curTagIndex}"
						    v-for="(obj, index) in arrTag"
						    :key="obj.id"
						    @click="handlerNav(obj, index)"
						>
							{{ obj.tag }}
						</li>
					</ul>
				</div>
				<t-scroll
				    :pullUpData="pullUpData"
				    :renderDataList.sync="renderDataList"
				    v-bind="tScrollOptions"
				    @pullUpLoading="handlerPullUpLoading"
				    ref="tScrollComp"
				    v-show="renderDataList.length > 0"
				>
					<template>
						<div class="sv-list" ref="tscroll-list-container">
							<section 
							    class="sv-scroller" 
							    v-for="(item, index) in renderDataList"
								:key="item.data.id"
								@click="handlerClick(item.data)"
							>
			    				<div class="sv-item">
			    					<img class="sv-thumb" :src="item.data.thumbPath">
			    					<div class="sv-item-play"></div>
			    					<div class="sv-item-title">
			    						<h4>{{item.data.title}}</h4>
			    						<p>{{item.data.count}}</p>
			    					</div>
			    					<div class="sv-item-time">
			    						<span>{{item.data.time}}</span>
			    					</div>
			    				</div>
			    				<div class="sv-item-footer">
			    					<div class="sv-item-footer-left">
			    						<img :src="item.data.thumbPath">
			    						<span>{{item.data.title}}</span>
			    					</div>
			    					<div class="sv-item-footer-right">
			    						<div class="sv-item-comment"></div>
			    						<div class="sv-item-share"></div>
			    					</div>
			    				</div>
			    			</section>
						</div>
		    			<div ref="tscroll-pull-up" class="loading">{{ loadTip }}</div>
					</template>
				</t-scroll>
				<!-- <loading v-show="renderDataList.length === 0" id="sv-loading-style"></loading> -->
				<t-loading 
				    id="sv-loading-style"
				    ref="tLoadingComp"
				    v-show="renderDataList.length === 0"
				>
				</t-loading>
				<router-view></router-view>
			</div>
	    </div>
	</transition>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'
    import Loading from '@/base-components/Loading.vue'
    import TLoading from '@/base-components/TLoading.vue'
    import Transform from '@/common/js/lib/transform.js'
    import AlloyTouch from '@/common/js/lib/alloy_touch.css.js'
    import AlloyFinger from '@/common/js/lib/alloy_finger.js'
    import { initData, getData } from '@/common/js/api/sv.js'

	export default {
		name: 'sv',
		components: { TScroll, Loading, TLoading },
		data() {
			return {
				pullUpData: [],
				renderDataList: [],
				tScrollOptions: {
					scrollBarOption: {
						fade: true
					},
					scrollOption: {
						excrMin: '0.64rem'
					}
				},
				loadTip: 'loading',
				arrTag: [],
				curTagIndex: 0
			}
		},
		watch: {
		    '$route': function() {
		    	let self = this
		    	console.log('如果路由有变化, 会再次执行该方法', this.$route.query)
		    	let str = this.$route.query.navInfo
		    	let info = str && JSON.parse(str)
		        if (
		        	this.$route.path === '/sv' &&
		        	(info && info.hasOwnProperty('id')) &&
		        	this.preTagInfo !== str
		        ) {
		        	this.preTagInfo = str
        	    	this.$refs.tScrollComp.clearListContainerDom(() => {
        	    		;((async function() {
        	    			await initData(info.id)
        	    			let ret = await getData(15)
        	    			if (
        						Array.isArray(ret) &&
        						ret.length > 0
        					) {
        		                self.pullUpData = ret
        					} else if (ret.length === 0) {
        						self.loadTip = '人家是有底线的啦!'
        					}
        	    		})()).catch((e) => {
        	    			console.error('路由换数据异常')
        	    		})
        	    	})
		        }
		    }
		},
		methods: {
			initHeaderScroll() {
				let headerTarget = this.$refs['sv-header-target']
				let headerTouchTarget = this.$refs['sv-header-touch']
				let computedStyle = getComputedStyle(headerTouchTarget.children[0])
				let liWidth = parseFloat(computedStyle['width']) + 
				              parseFloat(computedStyle['padding-left']) + 
				              parseFloat(computedStyle['padding-right'])
				let width = (liWidth || 46) * (headerTouchTarget.children.length)
	            Transform(headerTouchTarget)
	            new AlloyTouch({
	                touch: headerTarget,//反馈触摸的dom
	                vertical: false, //不必需，默认是true代表监听竖直方向touch
	                target: headerTouchTarget, //运动的对象
	                property: "translateX",  //被滚动的属性
	                min: headerTarget.offsetWidth - width, //不必需,滚动属性的最小值
	                max: 0, //不必需,滚动属性的最大值
	                maxSpeed: 1.2,
	                preventDefault: false
	            })
			},
			handlerNav(obj, index) {
				// console.log(obj)
				// this.$router.go(0)

				this.curTagIndex = index
				this.$router.push({
					path: '/sv', 
					query: {navInfo: JSON.stringify(obj)}
				})

				/*// 跳转新的路由组件,这是一个错误的思路
				this.$router.push({
					path: `/sv-list`, 
					query: { data: JSON.stringify(obj) }
				})*/
			},
			handlerPullUpLoading() {
				getData(15).then((ret) => {
					if (
						Array.isArray(ret) &&
						ret.length > 0
					) {
		                this.pullUpData = ret
					} else if (ret.length === 0) {
						this.loadTip = '人家是有底线的啦!'
					}
				})
			},
			handlerClick(data) { // 跳转子路由
				this.$router.push({
					path: `/sv/sv-video/${data.id}`, 
					query: { data: JSON.stringify(data) }
				})
			},
			initAlloyFinger() {
				let self = this
				new AlloyFinger(this.$refs.touchDom, {
	                swipe: function (evt) {
	                    if (evt.direction === 'Right') {
	                        self.$router.push({
								path: `/`
							})
		                }
	                }
	            })
			}
		},
		created() {
			this.preTagInfo = ''
		},
		mounted() { // '1'表示第一个tag
			initData('1').then((ret) => {
				this.arrTag = ret
				this.$nextTick(() => {
					this.initHeaderScroll()
				})
			})
			this.handlerPullUpLoading()
		}
	}
</script>

<style scoped>
    .sv-fade-enter-active, .sv-fade-leave-active {
		transition: all .3s;
	}
	.sv-fade-enter, .sv-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	    opacity: 0;
	}

	.sv-header {
		position: relative;
		top: 0;
		background-color: #fff;
	}

	.sv-header ul {
		white-space: nowrap;
		height: 0.586667rem;
	}

	.li-tag-class {
		color: #666;
		font-size: 17px;
		line-height: 0.586667rem;
		padding: 0 0.173333rem 0 0.146667rem;
		display: inline-block;
	}

	.cur-li-tag {
		font-weight: bold;
		color: #000;
		border-bottom: 0.026667rem solid #000;
	}

	#sv-loading-style {
		top: 0.64rem;
		transition: all .3s;
	}

	.sv-main .wrapper {
		position: absolute;
		top: 0.64rem;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		transition: all .3s;
	}

	.sv-main{
		width: 100%;
		height: 100%;
		max-width: 540px;
		position: fixed;
		z-index: 20;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.sv-main .sv-scroller {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
	}

	.sv-main .sv-item {
        position: relative;
        height: 0;
        overflow: hidden;
        padding-top: 56%;
	}

	.sv-main .sv-item .sv-thumb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
	}

	.sv-item-title {
		position: absolute;
		top: 0;
		left: 0
	}

	.sv-item-title > h4 {
        font-size: 18px;
        color: #fff;
        margin: 0.173333rem 0.226667rem 0;
        line-height: 0.333333rem;
        font-weight: 400;
	}

	.sv-item-title > p {
		margin: 0.053333rem 0.226667rem 0;
		color: rgba(255, 255, 255, .6);
		font-size: 12px;
		line-height: 0.16rem;
	}

	.sv-item-time {
        position: absolute;
        bottom: 0.053333rem;
        right: 0.133333rem;
        background-color: rgba(0, 0, 0, .4);
        border-radius: 0.373333rem;
        padding: 0 0.133333rem;
	}

	.sv-item-time > span {
		color: #fff;
		font-size: 10px;
		padding: 0;
		margin: 0;
	}

	.sv-item-play {
		background-image: url('../../common/images/common/play.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.64rem;
		width: 0.64rem;
		height: 0.64rem;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.sv-item-footer {
		height: 0.586667rem;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.sv-item-footer-left {
        flex: 2;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0.226667rem;
	}

	.sv-item-footer-left img {
		width: 0.293333rem;
		height: 0.293333rem;
		border-radius: 50%;
	}

	.sv-item-footer-left span {
		margin-left: 0.106667rem;
		font-size: 13px;
		color: #000;
		width: 2.666667rem;
		white-space: nowrap;  /*强制span不换行*/
	    display: inline-block;  /*将span当做块级元素对待*/
	    overflow: hidden;  /*超出宽度部分隐藏*/
	    text-overflow: ellipsis;  /*超出部分以点号代替*/
	}

	.sv-item-footer-right {
		flex: 1;
		position: relative;
		display: flex;
        justify-content: flex-start;
        align-items: center;
	}

	.sv-item-footer-right .sv-item-comment {
		background-image: url('../../common/images/common/comment.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.24rem;
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.5rem;
	}

	.sv-item-footer-right .sv-item-share {
		background-image: url('../../common/images/common/share.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.24rem;
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.4rem;
	}

	.sv-main .loading {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FCFCFC;
	}
</style>