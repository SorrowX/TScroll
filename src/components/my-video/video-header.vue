<template>
	<div class="my-video-header" ref="my-video-header-target">
		<t-scroll-x 
		    :simpleScroll="simpleScroll"
		    ref="scrollComp"
		>
		    <template>
		        <ul ref="tscroll-list-container">
		        	<li 
		        	    class="li-tag-class"
		        	    :class="{'cur-li-tag': (index + 1) === curTagIndex}"
		        	    v-for="(obj, index) in info"
		        	    :key="obj.id"
		        	    @click="handlerNav(obj, index + 1)"
		        	>
		        		{{ obj.tag }}
		        	</li>
		        </ul>
		    </template>
		</t-scroll-x>
	</div>
</template>

<script>
    import Transform from '@/common/js/lib/transform.js'
    import AlloyTouch from '@/common/js/lib/alloy_touch.css.js'
    import TScrollX from '@/base-components/TScrollX.vue'

	export default {
		name: 'video-header',
		components: { TScrollX },
		props: {
			info: {
				type: Array,
				defaylt: []
			}
		},
		data() {
			return {
				curTagIndex: 1,
				simpleScroll: ''
			}
		},
		watch: {
			info(val) {
			    if (val.length > 0) {
					this.$nextTick(() => {
						this.simpleScroll = 'translateX'
					})
			    }
			}
		},
		methods: {
			handlerNav(obj, index) {
				this.curTagIndex = index
				this.$emit('clickNav', obj, index)
			},
			scrollToDom(index) {
				this.curTagIndex = index
				this.$refs.scrollComp.scrollTo(index - 1)
			}
		}
	}
</script>

<style scoped>
	.my-video-header {
		position: relative;
		top: 0;
		background-color: #fff;
	}

	.my-video-header ul {
		white-space: nowrap;
		height: 0.586667rem;
	}

	.my-video-header ul li {
		position: absolute;
	}

	.li-tag-class {
		box-sizing: border-box;
		color: #666;
		font-size: 17px;
		line-height: 0.586667rem;
		padding: 0 0.173333rem 0 0.146667rem;
		/*width: 0.773333rem;*/
		/*width: 1.173333rem;*/
		width: auto;
		text-align: center;
		display: inline-block;
	}

	.cur-li-tag {
		font-weight: bold;
		color: #000;
		border-bottom: 0.026667rem solid #000;
	}
</style>