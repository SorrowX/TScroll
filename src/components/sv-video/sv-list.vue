<template>
	<transition name="sv-fade">
		<div class="sv-main" ref="touchDom">
			<div v-show="pullUpData.length > 0">
				<t-scroll 
				    :pullUpData="pullUpData"
				    :renderDataList.sync="renderDataList"
				    @pullUpLoading="handlerPullUpLoading"
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
				<router-view></router-view>
			</div>
			<loading v-show="pullUpData.length === 0" :tip="loadTip"></loading>
	    </div>
	</transition>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'
    import Loading from '@/base-components/Loading.vue'
    import AlloyFinger from '@/common/js/lib/alloy_finger.js'
    import { initData, getData } from '@/common/js/api/sv.js'

    function mockData(ms) {
    	return getData(15)
    }

	export default {
		name: 'sv',
		components: { TScroll, Loading },
		data() {
			return {
				pullUpData: [],
				renderDataList: [],
				loadTip: 'loading'
			}
		},
		methods: {
			handlerPullUpLoading() {
				mockData().then((ret) => {
					// console.log(ret)
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
			handlerClick(data) {
				this.$router.push({
					path: `/sv-list/sv-video/${data.id}`, 
					query: { data: JSON.stringify(data) }
				})
			},
			initAlloyFinger() {
				let self = this
				new AlloyFinger(this.$refs.touchDom, {
	                swipe: function (evt) {
	                    if (evt.direction === 'Left') {
	                        self.$router.go(-1)
		                }
	                }
	            })
			},
		},
		created() {
			// console.log('created: ', this.$route.query)
			let data = JSON.parse(this.$route.query.data)
			this.loadTip = data.tag
			initData(data.id).then((ret) => {})
		},
		mounted() {
			this.handlerPullUpLoading()
			this.initAlloyFinger()
		}
	}
</script>

<style scoped>
    .sv-fade-enter-active, .sv-fade-leave-active {
		transition: all .3s;
	}
	.sv-fade-enter, .sv-fade-leave-to {
	    transform: translate3d(-100%, 0, 0);
	    opacity: 0;
	}

	.sv-main .wrapper {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.sv-main{
		width: 100%;
		height: 100%;
		max-width: 540px;
		position: fixed;
		z-index: 22;
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