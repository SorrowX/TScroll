<template>
	<div class="t-banner-container">
    	<div class="t-banner-inner">
    		<ul class="t-baner-list">
    			<li>
    				<img src="../../common/images/common/750x340.png" alt="">
    			</li>
    			<li>
    				<img src="../../common/images/common/750x340.png" alt="">
    			</li>
    			<li>
    				<img src="../../common/images/common/750x340.png" alt="">
    			</li>
    		</ul>
    	</div>
    	<div class="t-banner-index"></div>
    </div>
</template>

<script>
	export default {
		name: 'TBanner',
		props: {
	    	
		},
        data() {
            return {
                
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
		padding: 0;
	}

	.t-baner-list li {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 45.333333%; /* 需要动态计算 */
		overflow: hidden;
		display: inline-block;
	}

	.t-baner-list > li > img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
	}
</style>