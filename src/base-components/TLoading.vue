<template>
	<div class="tloading-main">
    	<div class="t-loading">
    		<span></span>
    		<span></span>
    		<span></span>
    		<span></span>
    		<span></span>
    	</div>
    </div>
</template>

<script>
	export default {
		name: 'TLoading',
		props: {
	    	tip: {
				type: String,
				default: '拼命加载中拼命加载中'
	    	}
		},
        data() {
            return {
                bShow: true,
                opacityStyle: 1
            }
        },
        methods: {
            hide() {
                this.opacityStyle = 0
            },
            show() {
                this.opacityStyle = 1
            }
        }
	}
</script>

<style scoped>
	.tloading-main {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
        transition: all .3s;
	}
	.t-loading {
        width: 50px;
        height: 40px;
        position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
    }
    .t-loading span {
        display: inline-block;
        width: 6px;
        height: 100%;
        border-radius: 3px;
        background: lightgreen;
		animation: load 1s ease infinite;
    }
    @keyframes load {
        0%,100%{
            height: 40px;
            background: lightgreen;
        }
        50%{
            height: 70px;
            margin: -15px 0;
            background: lightblue;
        }
    }
    .t-loading span:nth-child(2) {
		animation-delay: 0.2s;
    }
    .t-loading span:nth-child(3) {
		animation-delay: 0.4s;
    }
    .t-loading span:nth-child(4) {
		animation-delay: 0.6s;
    }
    .t-loading span:nth-child(5) {
		animation-delay: 0.8s;
    }
</style>