<template>
	<transition name="banner-fade">
		<div class="banner-main">
			<t-carousel
			    :carousel-data="carouselData"
			    v-bind="tCarouseOptions"
			    @animationEnd="handlerAnimationEnd"
			>
			    <template>
			    	<span class="banner-info">{{ info }}</span>
			    </template>
			</t-carousel>
		</div>
	</transition>
</template>

<script>
    import TCarousel from '@/base-components/t-carousel/TCarousel.vue'

	export default {
		name: 'Banner2',
		components: { TCarousel },
		data() {
			return {
				carouselData:[
				    {
				    	imgUrl: require('../../common/images/t-carousel/15.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/5.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/16.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/6.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/14.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/7.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/13.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/8.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/12.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/10.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/11.jpg')
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/9.jpg')
				    }
				],
				tCarouseOptions: {
					carouselOption: {
						ratio: 0.5625,
						height: '100%',
						showSpot: false,
						preViewImg: require('../../common/images/common/loading.gif'),
						infoDivStyle: {
							'position': 'absolute',
							'bottom': '0.333333rem',
							'right': '0.133333rem'
						}
					}
				},
				info: `1/10`
			}
		},
		methods: {
			handlerAnimationEnd(obj) {
				this.info = `${obj.curImgIdx}/${obj.imgNum}`
			}
		}
	}
</script>

<style scoped>
    .banner-fade-enter-active, .banner-fade-leave-active {
		transition: all .3s;
	}
	.banner-fade-enter, .banner-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
	    opacity: 0;
	}

	.banner-main {
		max-width: 540px;
		position: relative;
		z-index: 20;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background-color: #000;
	}

	.banner-info {
        font-size: 20px;
        color: white;
	}
</style>