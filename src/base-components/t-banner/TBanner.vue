<template>
	<div class="t-banner-container">
    	<div class="t-banner-inner">
    		<ul class="t-baner-list">
    			<li v-for="(obj, index) in bannerData">
    				<img :src="obj.imgUrl" alt="obj.title">
    			</li>
    		</ul>
    	</div>
    	<div class="t-banner-index"></div>
    </div>
</template>

<script>

    const handlerImage = function(localImgSrc, errorImgSrc) {
    	localImgSrc = localImgSrc || './loading.gif'
    	errorImgSrc = errorImgSrc || './error.png'

    	return {
    		setSrc(imgNode, src) {
    			let img = new Image
    			img.onload = function() {
    				imgNode.src = this.src
    			}
    			img.onerror = function() {
    				imgNode.src = errorImgSrc
    			}
    			img.src = src || imgNode.getAttribute('src')
    			imgNode.src = localImgSrc
    		}
    	}
    }
    let doImg = handlerImage()

    let props = {
        bannerData: {
    		type: Array,
    		default: [] // 轮播数据
    	},
    	bannerOption: {
    		type: Object,
    		default: {  // 控制轮播的一些选项
                ratio: 0.453 // 高宽比 340/750
    		}
    	}
    }

	export default {
		name: 'TBanner',
		props: props,
        data() {
            return {
                
            }
        },
        watch: {
        	bannerData() {
                
        	}
        },
        methods: {
            
        }
	}
</script>

<style scoped>
	.t-banner-container {
		width: 100%;
		position: relative;
	}
	
	.t-banner-inner {
		overflow: hidden;
	}

	.t-baner-list {
		overflow: hidden;
		white-space: nowrap;
		line-height: 0;
		padding: 0;
		width: 300%; /* 需要动态计算 */
		transition: all .6s;
		transform: translate3d(0, 0, 0); /* 需要动态计算 */
	}

	.t-baner-list li {
		position: relative;
		width: 33.333%; /* 需要动态计算 */
		height: 170px; /* 需要传入 */
		overflow: hidden;
		display: inline-block;
	}

	.t-baner-list > li > img {
		width: 100%;
	}
</style>