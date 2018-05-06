<template>
	<transition name="youliao-video-fade">
		<div class="yl-video-scroll">
			<div 
			    class="yl-scroll"
			    ref="touchDom"
			    :style="getYlScrollTranslateY"
			    @transitionend="scrollTransitionend"
			>
				<section 
				    class="yl-panel"
				    v-for="(obj, index) in allData"
				>
					<video
						class="yl-video-player"
						type="video/mp4"
						webkit-playsinline="true"
						playsinline="true"
						x5-video-player-type="h5"
						x5-video-player-fullscreen="portraint"
						:id="obj.key_id"
						:poster="obj.res_info.cover_url"
						src="http://video.7niu.n0808.com/14de1e94a3c6fa89c62bd1e13e405c5d8f636fd1?sign=2120570da1ac74ab89328add56dec626&t=5aef672e"
					>
					</video>
				</section>
			</div>
		</div>
	</transition>
</template>

<script>
    import { mapGetters } from 'vuex'
    import AlloyFinger from '@/common/js/lib/alloy_finger.js'

	export default {
		name: 'youliao-video',
		data() {
			return {
				ylScrollTranslateY: 0,
				curPlayKeyId: null,
				curPlayIndex: 0,
				allData: []
			}
		},
		computed: {
			getYlScrollTranslateY() {
                return {
                	transform: "translateY(" + this.ylScrollTranslateY + "%) translateZ(0)"
                }
			},
			...mapGetters([
				'getYlAllData'
			])
		},
		methods: {
			initAlloyFinger() {
				let self = this
				let length = this.$refs.touchDom.children.length
				new AlloyFinger(this.$refs.touchDom, {
	                swipe: function (evt) {
	                	let v = Math.abs(self.ylScrollTranslateY)
	                    let n = v / 100
	                    // if (!self._touchSign) {
	                    	self._touchSign = true
		                    if (evt.direction === 'Up') {
		                    	if (n < length - 1) {
		                    		self.pause(self.curPlayIndex)
	                                self.ylScrollTranslateY = (v + 100) * -1
	                                self.curPlayIndex += 1
	                                self.play(self.curPlayIndex)
		                    	}
		                    } else if (evt.direction === 'Down') {
		                    	if (n > 0) {
		                    		self.pause(self.curPlayIndex)
		                    		self.ylScrollTranslateY = (v - 100) * -1
		                    		self.curPlayIndex -= 1
		                    		self.play(self.curPlayIndex)
		                    	}
		                    }
	                    // }
	                    if (evt.direction === 'Right') {
	                        self.$router.go(-1)
		                }
	                }
	            })
			},
			handlerData(data, keyId) {
				data.forEach((obj) => {
                    this.allData.push(obj.leftData, obj.rightData)
				})
				let arr = this.allData,
				    len = arr.length,
				    i = 0
				for (; i < len; i++) {
					let item = arr[i]
					if (item.key_id === keyId) {
						this.curPlayIndex = i
						if (i >= 1) {
							this.ylScrollTranslateY = i * 100 * -1
						}
                        break
					}
				}
			},
			pause(index) {
				let curPlayInfo = this.allData[index]
				let videoDom = document.getElementById(curPlayInfo.key_id)
				videoDom && videoDom.pause()
			},
			play(index) {
				let curPlayInfo = this.allData[index]
				let videoDom = document.getElementById(curPlayInfo.key_id)
				videoDom && videoDom.play()
			},
			scrollTransitionend() {
				console.log('transitionend')
				this._touchSign = false
			}
		},
		created() {
			this._touchSign = false
		},
		mounted() {
			this.curPlayKeyId = this.$route.query.keyId
			console.log('当前数据id', this.curPlayKeyId, this.getYlAllData)

			this.handlerData(this.getYlAllData, this.curPlayKeyId)
			this.$nextTick(() => {
				this.initAlloyFinger()
			})
		}
	}
</script>

<style scoped>
    .youliao-video-fade-enter-active, .youliao-video-fade-leave-active {
		transition: all .3s;
	}
	.youliao-video-fade-enter, .youliao-video-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	    opacity: 0;
	}
	.yl-video-scroll {
		width: 100%;
		height: 100%;
		max-width: 540px;
		position: absolute;
		z-index: 999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: #eee;
	}

	.yl-scroll,
	.yl-panel {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.yl-scroll {
		transition: all .3s ease-in-out;
		transform: translate3d(0, 0, 0);
	}

	.yl-panel:nth-child(1) {
		background-color: #000000;
	}
	.yl-panel:nth-child(2) {
		background-color: #FFE7BA;
	}
	.yl-panel:nth-child(3) {
		background-color: #F2F2F2;
	}
	.yl-panel:nth-child(4) {
		background-color: #D1D1D1;
	}
	.yl-panel:nth-child(5) {
		background-color: #AEEEEE;
	}

	.yl-video-player {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>