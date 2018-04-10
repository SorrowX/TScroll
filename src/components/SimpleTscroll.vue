<template>
	<transition name="simple-tscroll-fade">
		<div class="simple-tscroll">
			<div class="header">TScroll</div>
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
			
			<div class="footer">
				<div class="scroll-to">
					<div class="scroll-to-btn" @click="handlerScrollTo">滚动</div>
				</div>
				<div class="info">
					<div class="info-btn">{{info}}</div>
				</div>
			</div>
	    </div>
	</transition>
</template>

<script>
    import TScroll from '@/base-components/TScroll.vue'

	export default {
		name: 'SimpleTscroll',
		components: { TScroll },
		data() {
			return {
				pullUpData: [],
				pullDownData: [],
				renderDataList: [],
				tScrollOptions: {
					scrollbar: {
						show: true,
						fade: false
					},
					scroll: {
						excrMin: 45 + 48,
						maxSpeed: 2,
						sensitivity: 1,
						pullDownDistance: 60,
						preventDefault: false
					}
				},
				info: null
			}
		},
		methods: {
			mockData() {
			    let dataList = [],
			        i = 0
			    for (; i < 100; i++) {
			        dataList.push({
			        	name: "row", 
			        	num: this.index++
			        })
			    }
			    return dataList
			},
			loadMore() {
				setTimeout(() => {
					console.log('上拉加载更多')
					this.pullUpData = this.mockData()
				}, 2000)
			},
			pullDownLoading() {
				console.log('下拉加载中')
			},
			pullDownEnd() {
				setTimeout(() => {
					console.log('下拉加载更多')
					this.pullDownData = this.mockData()
				}, 1000)
			},
			handlerScrollTo() {
                // this.$refs.tScrollComp.scrollTo('bottom')
                // this.$refs.tScrollComp.scrollTo('top')
                // this.$refs.tScrollComp.scrollTo(this.$refs.tScrollComp.getAllData()[20].dom)
                // this.$refs.tScrollComp.scrollTo('top')
                this.$refs.tScrollComp.scrollTo(50)
			},
			change() {
				this.info = `${this.$refs.tScrollComp.getListActualDom().length}/${this.$refs.tScrollComp.getAllData().length}`
			}
		},
		mounted() {
			this.index = 0
			this.pullUpData = this.mockData()
		}
	}
</script>

<style scroped>
    .simple-tscroll-fade-enter-active, .simple-tscroll-fade-leave-active {
		transition: all .3s;
	}
	.simple-tscroll-fade-enter, .simple-tscroll-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	}
	.simple-tscroll {
		background: #fff;
		z-index: 3;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
	}

	.simple-tscroll .updown {
		width: 100%;
		height: 60px;
		background: #f60;
		text-align: center;
		position: absolute;
		z-index: 1;
		top: 45px;
		left: 0;
	}

	.simple-tscroll .header {
	    position: absolute;
	    z-index: 2;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 45px;
	    line-height: 45px;
	    background: #B2DFEE;
	    padding: 0;
	    color: #eee;
	    font-size: 20px;
	    text-align: center;
	    font-weight: bold;
	}

	.simple-tscroll .footer {
	    position: absolute;
	    z-index: 2;
	    bottom: 0;
	    left: 0;
	    right: 0;
	    overflow: hidden;
	    width: 100%;
	    height: 48px;
	    background: #B0C4DE;
	    padding: 0;
	    display: flex;
	    flex-flow: row nowrap;
	}

	.simple-tscroll .wrapper {
	    position: absolute;
	    z-index: 1;
	    top: 45px;
	    bottom: 48px;
	    left: 0;
	    width: 100%;
	    background: #ccc;
	    overflow: hidden;
	}

	.simple-tscroll .scroller {
	    position: absolute;
	    z-index: 1;
	    -webkit-tap-highlight-color: rgba(0,0,0,0);
	    width: 100%;
	    -webkit-transform: translateZ(0);
	    -moz-transform: translateZ(0);
	    -ms-transform: translateZ(0);
	    -o-transform: translateZ(0);
	    transform: translateZ(0);
	    -webkit-touch-callout: none;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    -webkit-text-size-adjust: none;
	    -moz-text-size-adjust: none;
	    -ms-text-size-adjust: none;
	    -o-text-size-adjust: none;
	    text-size-adjust: none;
	}

	.simple-tscroll .scroller ul {
	    list-style: none;
	    padding: 0;
	    margin: 0;
	    width: 100%;
	    text-align: left;
	    display: block;
	}

	.simple-tscroll .scroller li {
	    padding: 0 10px;
	    height: 40px;
	    line-height: 40px;
	    border-bottom: 1px solid #ddd;
	    border-top: 1px solid #ddd;
	    background-color: #fff;
	    font-size: 14px;
	    position: absolute;
	    width: 100%;
	    top:0px;
	    left: 0px;
	}
	.simple-tscroll .loading {
	    text-align: center;
	    line-height: 40px;
	    height: 40px;
	    background: #eee;
	}
	.simple-tscroll .pulldown {
		text-align: center;
	    line-height: 60px;
	    height: 60px;
	    background: #eee;
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	}

	.simple-tscroll .scroll-to {
		flex: 1;
		display: flex;
		flex: row nowrap;
	}

	.simple-tscroll .scroll-to-btn {
        width: 50px;
        height: 100%;
        background: #D8BFD8;
        line-height: 48px;
        color: #fff;
        text-align: center;
	}

	.simple-tscroll .info {
		flex: 1;
		display: flex;
		flex-direction: row-reverse;
	}

	.simple-tscroll .info-btn {
		width: 50px;
        height: 100%;
        background: #D8BFD8;
        line-height: 48px;
        border-radius: 50%;
        color: #fff;
	}
</style>

