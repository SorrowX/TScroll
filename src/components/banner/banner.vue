<template>
	<transition name="banner-fade">
		<div class="banner-main">
			<t-carousel
			    :carousel-data="carouselData"
			    v-bind="tCarouseOptions"
			></t-carousel>
		</div>
	</transition>
</template>

<script>
    import TCarousel from '@/base-components/t-carousel/TCarousel.vue'

	export default {
		name: 'Banner',
		components: { TCarousel },
		data() {
			return {
				bannerData:[
				    {
				    	imgUrl: require('../../common/images/common/750x340.png'),
				    	title: 'hi 1'
				    },
				    {
				    	imgUrl: require('../../common/images/common/750x340.png'),
				    	title: 'hi 2'
				    },
				    {
				    	imgUrl: require('../../common/images/common/750x340.png'),
				    	title: 'hi 3'
				    },
				    {
				    	imgUrl: require('../../common/images/common/750x340.png'),
				    	title: 'hi 4'
				    }
				],
				tBannerOptions: {
					bannerOption: {
						ratio: 0.453
					}
				},
				carouselData:[
				    {
				    	imgUrl: require('../../common/images/t-carousel/1.jpg'),
				    	title: 'hi 1'
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/2.jpg'),
				    	title: 'hi 2'
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/3.jpg'),
				    	title: 'hi 3'
				    },
				    {
				    	imgUrl: require('../../common/images/t-carousel/4.jpg'),
				    	title: 'hi 4'
				    }
				],
				tCarouseOptions: {
					carouselOption: {
						ratio: 0.5625
					}
				}
			}
		},
		methods: {
			
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
		background-color: #fff;
	}
</style>