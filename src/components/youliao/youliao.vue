<template>
	<transition name="youliao-fade">
		<div class="youliao-main">   
			<div class="header">
				<span>关注</span>
				<span>推荐</span>
				<span>最新</span>
			</div>
			<t-scroll 
			    :pullUpData="pullUpData"
			    v-bind="tScrollOptions"
			    :renderDataList.sync="renderDataList"
			    @pullUpLoading="handlerPullUpLoading"
			>
				<template>
					<div ref="tscroll-list-container" class="list">
						<div 
						    class="list-item"
						    v-for="(item, index) in renderDataList"
						    :key="item.data.key"
						>
							<div class="list-item-left" @click="handlerClick(item.data.leftData)">
								<div class="left-img-content">
									<img :src="item.data.leftData.res_info.dynamic_url1">
								</div>
							</div>
							<div class="list-item-right" @click="handlerClick(item.data.rightData)">
								<div class="right-img-content">
									<img :src="item.data.rightData.res_info.dynamic_url1">
								</div>
							</div>
						</div>
					</div>
					<div ref="tscroll-pull-up" class="pull-up">
						<img src="../../common/images/common/loading.gif">
						<span> 正在加载中...</span>
					</div>
				</template>
			</t-scroll>

			<router-view></router-view>

			<div class="footer">
				有料短视频 底部
			</div>
			
	    </div>
	</transition>
</template>

<script>
    import { mapActions } from 'vuex'
    import TScroll from '@/base-components/TScroll.vue'
    import getRandomData from '@/common/js/api/youliao.js'
    

    function mockData(ms) {
    	return new Promise((resolve, reject) => {
    		setTimeout(() => {
    			return resolve(getRandomData())
    		}, ms || 2000)
    	})
    }

	export default {
		components: { TScroll },
		data() {
			return {
				pullUpData: [],
				renderDataList: [],
				tScrollOptions: {
					scrollBarOption: {
						show: true,
						fade: false
					},
					scrollOption: {
						excrMin: 40 + 40,
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
					this.setYlAllData(ret)
				})
			},
			handlerClick(data) {
				console.log(111, data.key_id)
				this.$router.push({ 
					path: `/youliao/video/${data.key_id}`, 
					query: { keyId: data.key_id }
				})
			},
			...mapActions([
				'setYlAllData'
			])
		},
		mounted() {
			mockData(100).then((ret) => {
				this.pullUpData = ret
				this.setYlAllData(ret)
			})
		}
	}
</script>

<style scoped>
    .youliao-fade-enter-active, .youliao-fade-leave-active {
		transition: all .3s;
	}
	.youliao-fade-enter, .youliao-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	    opacity: 0;
	}

	.youliao-main {
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
		background-color: #eee;
		display: flex;
		flex-direction: column;
	}

	.youliao-main .header {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        height: 0.533333rem;
        font-size: 18px;
        z-index: 10;
        background-color: #fff;
	}
	.youliao-main .header span {
        padding: 0 0.133333rem;
	}

	.youliao-main .footer {
        display: flex;
        justify-content: center;
        align-items: center;
		height: 0.533333rem;
        flex: none;
        font-size: 18px;
        z-index: 10;
        background-color: #fff;
	}

	.youliao-main .wrapper {
		flex: 1;
		position: relative;
		z-index: 8;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.youliao-main .list-item {
		display: flex;
		position: absolute;
		flex-direction: row;
		flex-wrap: nowrap;
		width: 100%;
	}
	.list-item .list-item-left {
		position: relative;
        padding-right: 0.006667rem;
        padding-bottom: 0.013333rem;
	}
	.list-item .list-item-right {
		position: relative;
		padding-left: 0.006667rem;
        padding-bottom: 0.013333rem;
	}
	.youliao-main .left-img-content {
        flex: 1;
        position: relative;
        height: 0;
        overflow: hidden;
        width: 2.5rem;
        padding-top: 177.777%;
	}
	.youliao-main .right-img-content {
        flex: 1;
        position: relative;
        height: 0;
        overflow: hidden;
        width: 2.5rem;
        padding-top: 177.777%;
	}
	.youliao-main .list-item img {
		width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        top: 0; 
	}

	.youliao-main .pull-up {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 0.533333rem;
		background-color: #FFFAF0;
	}
	.youliao-main .pull-up img {
		width: 0.266667rem;
		height: 0.266667rem;
	}
</style>