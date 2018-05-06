<template>
	<div class="bc-loading">
		<div class="bc-loading-content turn-round">
			<p class="turn-round-reverse">{{ tip }}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'loading',
		props: {
	    	tip: {
				type: String,
				default: '拼命加载中拼命加载中'
	    	}
		}
	}
</script>

<style scoped>
	.bc-loading {
		width: 100%;
		height: 100%;
		background-color: #fff;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
	}

	.bc-loading-content {
		width: 1.066667rem;
		height: 1.066667rem;
		background-color: transparent;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		border-radius: 50%;
		border: 0.04rem solid #C6E2FF;
		text-align: center;
		line-height: 1.066667rem;
	}

	.bc-loading-content > p {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bc-loading-content:after {
		content: "";
		width: 0.133333rem;
		height: 0.133333rem;
		background-color: #63B8FF;
		position: absolute;
		left: 0.053333rem;
		top: 0.1rem;
		border-radius: 50%;
	}

	.turn-round {
		animation: turnRound .6s linear infinite backwards;
	}

	.turn-round-reverse {
		animation: turnRoundReverse .6s linear infinite backwards;
	}

	@keyframes turnRound {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes turnRoundReverse {
		0% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(0deg);
		}
	}

</style>