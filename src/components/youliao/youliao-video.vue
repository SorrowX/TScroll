<template>
	<transition name="youliao-video-fade">
		<div class="yl-video-scroll">
			<div 
			    class="yl-scroll"
			    :style="getYlScrollTranslateY"
			    ref="touchDom"
			>
				<section class="yl-panel">
					<video
						id="theVideo"
						class="yl-video-player"
						preload="auto"
						autoplay="autoplay"
						src="http://58.220.46.223/sl.video.xycdn.n0808.com/fe00ea35d48ce5030cc1757873d363c752faafbc?sign=75e7d567b387faf7cc0fb309b7a10183&t=5ae330f3&xsign=1524838643-f1db65b82bf3fa7479865f6af201063b"
						poster="http://sl.image.7niu.n0808.com/vf_f64842a07cc8140cc46bcb5c4e6ee3b2b07b2bc5.jpg"
						type="video/mp4"
						width="100%"
						webkit-playsinline="true"
						playsinline="true"
						x5-video-player-type="h5"
						x5-video-player-fullscreen="portraint"
					>
					</video>
				</section>
				<section class="yl-panel">2222</section>
				<section class="yl-panel">3333</section>
				<section class="yl-panel">4444</section>
				<section class="yl-panel">5555</section>
			</div>
		</div>
	</transition>
</template>

<script>
    import AlloyFinger from '@/common/js/lib/alloy_finger.js'

	export default {
		name: 'youliao-video',
		data() {
			return {
				ylScrollTranslateY: 0,
				curPlayInfo: null
			}
		},
		computed: {
			getYlScrollTranslateY() {
                return {
                	transform: "translateY(" + this.ylScrollTranslateY + "%) translateZ(0)"
                }
			}
		},
		methods: {
			initAlloyFinger() {
				let self = this
				let length = this.$refs.touchDom.children.length
				new AlloyFinger(this.$refs.touchDom, {
	                swipe: function (evt) {
	                	let v = Math.abs(self.ylScrollTranslateY)
	                    let n = v / 100
	                    if (evt.direction === 'Up') {
	                    	if (n < length - 1) {
                                self.ylScrollTranslateY = (v + 100) * -1
	                    	}
	                    } else if (evt.direction === 'Down') {
	                    	if (n > 0) {
	                    		self.ylScrollTranslateY = (v - 100) * -1
	                    	}
	                    } else if (evt.direction === 'Right') {
                            self.$router.go(-1)
	                    }
	                }
	            })
			}
		},
		mounted() {
			this.curPlayInfo = JSON.parse(this.$route.query.obj)
			console.log('1', this.curPlayInfo.res_info)
			this.initAlloyFinger()
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
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>