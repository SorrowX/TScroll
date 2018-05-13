<template>
	<t-scroll
	    :pullUpData="pullUpData"
	    :renderDataList.sync="renderDataList"
	    v-bind="tScrollOptions"
	    @pullUpLoading="$emit('loadMoreData')"
	>
		<template>
			<div class="my-video-list" ref="tscroll-list-container">
				<section 
				    class="my-video-scroller" 
				    v-for="(item, index) in renderDataList"
					:key="item.data.id"
					@click="$emit('handlerClickListItem', item.data)"
				>
    				<div class="my-video-item">
    					<img class="my-video-thumb" :src="item.data.thumbPath">
    					<div class="my-video-item-play"></div>
    					<div class="my-video-item-title">
    						<h4>{{item.data.title}}</h4>
    						<p>{{item.data.count}}</p>
    					</div>
    					<div class="my-video-item-time">
    						<span>{{item.data.time}}</span>
    					</div>
    				</div>
    				<div class="my-video-item-footer">
    					<div class="my-video-item-footer-left">
    						<img :src="item.data.thumbPath">
    						<span>{{item.data.title}}</span>
    					</div>
    					<div class="my-video-item-footer-right">
    						<div class="my-video-item-comment"></div>
    						<div class="my-video-item-share"></div>
    					</div>
    				</div>
    			</section>
			</div>
			<div ref="tscroll-pull-up" class="loading" v-show="renderDataList.length > 0">{{ loadTip }}</div>
		</template>
	</t-scroll>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'

	export default {
		name: 'video-content',
		components: { TScroll },
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
				loadTip: 'loading'
			}
		},
		methods: {
			loadingData(ret) {
				if (
					Array.isArray(ret) &&
					ret.length > 0
				) {
	                this.pullUpData = ret
				} else if (ret.length === 0) {
					this.loadTip = '人家是有底线的啦!'
				}
			}
		}
	}
</script>

<style scoped>
	.my-video-scroller {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
	}

	.my-video-main .my-video-item {
        position: relative;
        height: 0;
        overflow: hidden;
        padding-top: 56%;
	}

	.my-video-main .my-video-item .my-video-thumb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
	}

	.my-video-item-title {
		position: absolute;
		top: 0;
		left: 0
	}

	.my-video-item-title > h4 {
        font-size: 18px;
        color: #fff;
        margin: 0.173333rem 0.226667rem 0;
        line-height: 0.333333rem;
        font-weight: 400;
	}

	.my-video-item-title > p {
		margin: 0.053333rem 0.226667rem 0;
		color: rgba(255, 255, 255, .6);
		font-size: 12px;
		line-height: 0.16rem;
	}

	.my-video-item-time {
        position: absolute;
        bottom: 0.053333rem;
        right: 0.133333rem;
        background-color: rgba(0, 0, 0, .4);
        border-radius: 0.373333rem;
        padding: 0 0.133333rem;
	}

	.my-video-item-time > span {
		color: #fff;
		font-size: 10px;
		padding: 0;
		margin: 0;
	}

	.my-video-item-play {
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

	.my-video-item-footer {
		height: 0.586667rem;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.my-video-item-footer-left {
        flex: 2;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 0.226667rem;
	}

	.my-video-item-footer-left img {
		width: 0.293333rem;
		height: 0.293333rem;
		border-radius: 50%;
	}

	.my-video-item-footer-left span {
		margin-left: 0.106667rem;
		font-size: 13px;
		color: #000;
		width: 2.666667rem;
		white-space: nowrap;  /*强制span不换行*/
	    display: inline-block;  /*将span当做块级元素对待*/
	    overflow: hidden;  /*超出宽度部分隐藏*/
	    text-overflow: ellipsis;  /*超出部分以点号代替*/
	}

	.my-video-item-footer-right {
		flex: 1;
		position: relative;
		display: flex;
        justify-content: flex-start;
        align-items: center;
	}

	.my-video-item-footer-right .my-video-item-comment {
		background-image: url('../../common/images/common/comment.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.24rem;
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.5rem;
	}

	.my-video-item-footer-right .my-video-item-share {
		background-image: url('../../common/images/common/share.png');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 0.24rem;
		width: 0.24rem;
		height: 0.24rem;
		margin-left: 0.4rem;
	}

	.loading {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FCFCFC;
	}
</style>