<template>
	<transition name="banner-fade">
		<div class="banner-main">
			<t-banner></t-banner>
	    </div>
	</transition>
</template>

<script>
    import TBanner from '@/base-components/t-banner/TBanner.vue'

	export default {
		name: 'Banner',
		components: { TBanner },
		data() {
			return {

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
		background-color: #fff;
	}
</style>