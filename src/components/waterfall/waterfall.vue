<template>
	<transition name="waterfall-fade">
		<div class="waterfall-main">
			<t-waterfall 
			    :waterfall-data="waterfallData"
			    :gap="{paddingLeft: 0, padingBottom: 0}"
			    @load-data="handlerLoadData"
			    @click-waterfall="handlerClick"
			>
			</t-waterfall>
			<router-view></router-view>
		</div>
	</transition>
</template>

<script>
	import TWaterfall from '@/base-components/t-waterfall/TWaterfall.vue'
	import { getData } from '@/common/js/api/waterfall.js'

	let id = 0

	export default {
		components: { TWaterfall },
		data() {
			return {
	            waterfallData: []
			}
		},
		methods: {
			handlerLoadData() {
				setTimeout(() => {
					this.waterfallData = this.waterfallData.concat(this.getJson(30))
				}, 1000)
			},
			handlerClick(data) {
				console.log(data)
				this.$router.push({
					path: `/waterfall/waterfall-video/${++id}`, 
					query: { data: JSON.stringify(data) }
				})
			},
			getJson(num) {
				return this.allStaticData.splice(0, num)
			}
		},
		mounted() {
			getData().then((ret) => {
				this.allStaticData = ret.data.Body
				this.waterfallData = this.getJson(50)
				console.log(11, this.waterfallData)
			})
		}
	}

</script>

<style scoped>
    .waterfall-fade-enter-active, .waterfall-fade-leave-active {
		transition: all .3s;
	}
	.waterfall-fade-enter, .waterfall-fade-leave-to {
	    transform: translate3d(100%, 0, 0);
        opacity: 0;
	}

	.waterfall-main {
		position: relative;
		/*width: 100%;
		height: 100%;
        max-width: 540px;
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		right: 0;
        bottom: 0;
        margin: auto;
		background-color: #efefef;*/
	}
</style>