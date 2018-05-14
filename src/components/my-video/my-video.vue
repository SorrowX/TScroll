<template>
	<transition name="my-video-fade">
		<div class="my-video-main">
			<div class="my-video-main-content">
				<video-header 
				    :info="arrTag" 
				    ref="headerComp"
				    @clickNav="handlerClickNav"
				>
				</video-header>
				<div 
				    class="my-video-container"
				    ref="touchDom"
				    :style="[getTranslateX, getTotalWidths]"
				>
					<div 
					    class="container-item" 
					    :style="[videoContainerStyle, getContainerItemWidths]"
					    v-for="(item, index) in videoContentList"
					>
						<video-content
						    ref="arrVideoComp"
						    :key="index"
						    @loadMoreData="loadData"
						    @handlerClickListItem="handlerClickListItem"
						>
						</video-content>
					</div>
				</div>
				<t-loading
				    id="my-video-loading-style"
				    v-show="loading"
				>
				</t-loading>
				<router-view></router-view>
			</div>
	    </div>
	</transition>
</template>

<script>
    import AlloyTouch from '@/common/js/lib/alloy_touch.css.js'
    import AlloyFinger from '@/common/js/lib/alloy_finger.js'
    import Transform from '@/common/js/lib/transform.js'
    import VideoContent from '@/components/my-video/video-content.vue'
    import VideoHeader from '@/components/my-video/video-header.vue'
    import TLoading from '@/base-components/TLoading.vue'
    import { getHeaderInfo, initData, getData } from '@/common/js/api/my-video.js'
    window.innerWidth = Math.min(window.innerWidth, 540)

	export default {
		name: 'my-video',
		components: { TLoading, VideoContent, VideoHeader },
		data() {
			return {
				loading: true,
				arrTag: [],
				curTagIndex: 1,
				wrapperDomOpacity: 0,
				videoContentList: [],
				containerTranslateX: 0,
				containerWidth: 100,
				containerItemWidth: 100,
				videoContainerStyle: {
					opacity: 0
				}
			}
		},
		watch: {
			loading(newVal) {
		    	this.videoContainerStyle.opacity = newVal === true ? 0 : 1
		    }
		},
		computed: {
			getTranslateX() {
                return {
                	transform: "translateX(" + this.containerTranslateX + "px) translateZ(0)"
                }
			},
            getTotalWidths() {
            	return {
            		width: this.containerWidth + "px"
            	}
            },
            getContainerItemWidths() {
            	return {
            		width: this.containerItemWidth + "px"
            	}
            }
		},
		methods: {
			loadData() { // 数据载入
				getData(this.curTagIndex, 15).then((ret) => {
					this.$refs.arrVideoComp[this.curTagIndex - 1].loadingData(ret)
					this.loading = false
				})
			},
			handlerClickNav(navInfo, index) { // 处理导航点击
                console.log(navInfo, index)
                this.containerTranslateX = -window.innerWidth * (index - 1)
                this.curTagIndex = index
                if (this.isInitContainerData(String(index))) {
                	this.initContainerDataByTagId(String(index))
                }
			},
			handlerClickListItem(data) { // 处理跳转子路由
				this.$router.push({
					path: `/my-video/${this.$route.params.id}/my-video-details`, 
					query: { data: JSON.stringify(data) }
				})
			},
			initSlide() {
				let self = this
				let length = this.videoContentList.length
				new AlloyFinger(this.$refs.touchDom, {
	                swipe: function (evt) {
	                	let v = Math.abs(self.containerTranslateX)
	                    let n = v / window.innerWidth
	                    if (evt.direction === 'Right') {
	                    	if (n > 0) {
	                    		self.containerTranslateX += window.innerWidth
	                    		self.curTagIndex === 0 ? 1 : (--self.curTagIndex)
	                    		self.$refs.headerComp.scrollToDom(self.curTagIndex)
                                if (self.isInitContainerData(self.curTagIndex)) {
                                	self.initContainerDataByTagId(String(self.curTagIndex))
                                }
	                    	}
		                } else if (evt.direction === 'Left') {
	                    	if (n < length - 1) {
                                self.containerTranslateX -= window.innerWidth
                                self.curTagIndex === 0 ? (self.curTagIndex += 2) : (++self.curTagIndex)
	                    		self.$refs.headerComp.scrollToDom(self.curTagIndex)
                                if (self.isInitContainerData(self.curTagIndex)) {
                                	self.initContainerDataByTagId(String(self.curTagIndex))
                                }
	                    	}
		                }
	                }
	            })
			},
			initContainerDataByTagId(tagId) { // tagId: String
				this.loading = true
				let self = this
				initData(tagId).then((ret) => {
					getData(tagId, 15).then((ret) => {
						self.$refs.arrVideoComp[Number(tagId) - 1].loadingData(ret)
						self.loading = false
					})
				})
			},
			isInitContainerData(tagId) {
				let comp = this.$refs.arrVideoComp[Number(tagId) - 1]
				if (comp.$refs['tscroll-list-container']['children']['length'] > 0) {
					return false
				} else {
					return true
				}
			}
		},
		created() {
			getHeaderInfo(this.$route.params.id).then((ret) => {
				this.arrTag = this.videoContentList = ret
				this.containerWidth = ret.length * window.innerWidth
				this.containerItemWidth = window.innerWidth
				this.loadData()
				this.$nextTick(() => {
				    this.initSlide()
				})
			})
		}
	}
</script>

<style scoped>
    .my-video-fade-enter-active, .my-video-fade-leave-active {
		transition: all .3s;
	}
	.my-video-fade-enter, .my-video-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	    opacity: 0;
	}

	#my-video-loading-style {
		top: 0.64rem;
		transition: all .3s;
	}

	.my-video-main {
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

	.my-video-main-content {
		height: 100%;
	}

	.my-video-container,
	.container-item{
		height: 100%;
		position: relative;
	}

	.my-video-container {
		transition: all .35s ease-in-out;
		transform: translate3d(0, 0, 0);
		-webkit-backface-visibility: hidden;
		top: 0.026667rem
	}

	.container-item {
		transition: all .3s;
		overflow: hidden;
		display: inline-block;
	}

	.my-video-main .wrapper {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		transition: all .35s;
	}
</style>