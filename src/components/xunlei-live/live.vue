<template>
	<transition name="xunlei-fade">
		<div class="xunlei-main">   
			<t-scroll 
			    :pullUpData="pullUpData"
			    :renderDataList.sync="renderDataList"
			    v-bind="tScrollOptions"
			    @pullUpLoading="handlerPullUpLoading"
			>
				<template>
					<div ref="tscroll-list-container" class="list-show">
			    		<div 
			    		    class="openurl" 
						    v-for="(item, index) in renderDataList"
			    		    :key="item.data.id"
			    		>
			    			<div class="player-info">
			    				<div class="player">
			    					<div class="avatar">
			    						<img :src="item.data.image" alt="item.data.nickname">
			    					</div>
		    						<P>{{ item.data.nickname }}</P>
			    				</div>
			    				<div class="see">
			    					<p>
			    						<span>{{ item.data.onlineNum }}</span>
			    						人 在看
			    					</p>
			    				</div>
			    			</div>
			    			<div class="entry-wp">
			    				<div class="vedio-pic">
			    					<img :src="item.data.image">
			    				</div>
			    				<p class="tip">直播</p>
			    			</div>
			    			<div class="des-show" v-show="item.data.title">
			    				<p>{{ item.data.title }}</p>
			    			</div>
                            <div class="delimiter"></div>
			    		</div>
			    	</div>
			    	<div ref="tscroll-pull-up" class="loading">loading</div>
				</template>
			</t-scroll>
	    </div>
	</transition>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'
    import getRandomData from '@/common/js/api/xunlei-live.js'

    function mockData(ms) {
    	return new Promise((resolve, reject) => {
    		setTimeout(() => {
    			return resolve(getRandomData())
    		}, ms || 2000)
    	})
    }

    // 主角就该如此简单 tScrollOptions配置可省略哦
	export default {
		components: { TScroll },
		data() {
			return {
				pullUpData: [],
				renderDataList: [],
                tScrollOptions: {
					scrollBarOption: {
						show: true,
						fade: true
					},
					scrollOption: {
						maxSpeed: 1.4,
						sensitivity: 1,
						pullDownDistance: 0,
						preventDefault: false
					}
				}
			}
		},
		methods: {
			handlerPullUpLoading() {
				mockData(1500).then((ret) => {
					this.pullUpData = ret
				})
			}
		},
        mounted() {
        	mockData(100).then((ret) => {
        		this.pullUpData = ret
        	})
        }
	}
</script>

<style scoped>
    .xunlei-fade-enter-active, .xunlei-fade-leave-active {
		transition: all .3s;
	}
	.xunlei-fade-enter, .xunlei-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
        opacity: 0;
	}

	.xunlei-main {
		width: 100%;
		height: 100%;
        max-width: 540px;
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
        bottom: 0;
        margin: auto;
		background-color: #efefef;
	}

	.xunlei-main .wrapper { }

	.xunlei-main .scroller {  }

    .xunlei-main .list-show {
        background-color: #efefef;
    }

	.openurl {
		background-color: #fff;
		position: absolute;
		width: 100%;
	}

	.openurl .player-info {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		height: 0.533333rem;
		padding: 0.12rem 0.133333rem;
	}
	.openurl .player {
        display: flex;
        flex: row nowrap;
        align-items: center;
	}
	.openurl .avatar img {
		width: 0.533333rem;
		height: 0.533333rem;
		border-radius: 50%;
	}
	.openurl .player p {
        padding-left: 0.133333rem;
        color: #2d2d2d;
        font-size: 14px;
	}
	.see p span {
        color: red;
	}

	.entry-wp {
        position: relative;
	}
	.entry-wp .vedio-pic{
        position: relative;
        overflow: hidden;
        padding-top: 80%;
        height: 0;

	}
	.entry-wp img {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0; 
	}
	.entry-wp .tip {
		position: absolute;
		left: 0;
		top: 0.12rem;
		height: 0.266667rem;
		padding: 0 0.133333rem;
		background-color: #000;
		color: #fff;
	}

	.openurl .des-show {
		height: 0.4rem;
		display: flex;
		flex: row nowrap;
		align-items: center;
		padding: 0 0.133333rem;
	}
	.openurl .des-show p {
		font-size: 15px;
	}

    .openurl .delimiter {
        height: 0.12rem;
        background-color: #efefef;
    }

	.xunlei-main .loading {
		height: 0.533333rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFAF0;
		position: absolute;
	}
</style>