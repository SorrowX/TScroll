<template>
	<transition name="sv-video-fade">
		<div class="sv-video-scroll" ref="touchDom">
			<div class="sv-video-mian">
				<section class="sv-video-mian-media" v-show="obj !== null">
					<video
					    controls="controls"
					    :src="obj.videoPath"
					    :poster="obj.thumbPath"
					></video>
				</section>
			</div>
		</div>
	</transition>
</template>

<script>
    import AlloyFinger from '@/common/js/lib/alloy_finger.js'

	export default {
		name: 'sv-video',
		data() {
			return {
				obj: {}
			}
		},
		methods: {
			initAlloyFinger() {
				let self = this
				new AlloyFinger(this.$refs.touchDom, {
	                swipe: function (evt) {
	                    if (evt.direction === 'Right') {
	                        self.$router.go(-1)
		                }
	                }
	            })
			}
		},
		mounted() {
			this.obj = JSON.parse(this.$route.query.data)
			this.$nextTick(() => {
				this.initAlloyFinger()
			})
		}
	}
</script>

<style scoped>
    .sv-video-fade-enter-active, .sv-video-fade-leave-active {
		transition: all .3s;
	}
	.sv-video-fade-enter, .sv-video-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	    opacity: 0;
	}
	.sv-video-scroll {
		width: 100%;
		height: 100%;
		max-width: 540px;
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: #000;
	}
	.sv-video-mian {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.sv-video-mian-media video {
		width: 100%;
		height: auto;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
	}
</style>