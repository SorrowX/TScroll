<template>
	<div class="my-video-header" ref="my-video-header-target">
		<ul ref="my-video-header-touch">
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
	</div>
</template>

<script>
    import Transform from '@/common/js/lib/transform.js'
    import AlloyTouch from '@/common/js/lib/alloy_touch.css.js'

	export default {
		name: 'video-header',
		props: {
			info: {
				type: Array,
				defaylt: []
			}
		},
		data() {
			return {
				curTagIndex: 1
			}
		},
		methods: {
			initHeaderScroll() {
				let headerTarget = this.$refs['my-video-header-target']
				let headerTouchTarget = this.$refs['my-video-header-touch']
				let computedStyle = getComputedStyle(headerTouchTarget.children[0])
				let liWidth = this.liWidth = parseFloat(computedStyle['width']) + 
				              parseFloat(computedStyle['padding-left']) + 
				              parseFloat(computedStyle['padding-right'])
				let width = (liWidth || 46) * (headerTouchTarget.children.length)
	            Transform(headerTouchTarget)
	            this.at = new AlloyTouch({
	                touch: headerTarget,//反馈触摸的dom
	                vertical: false, //不必需，默认是true代表监听竖直方向touch
	                target: headerTouchTarget, //运动的对象
	                property: "translateX",  //被滚动的属性
	                min: headerTarget.offsetWidth - width, //不必需,滚动属性的最小值
	                max: 0, //不必需,滚动属性的最大值
	                maxSpeed: 1.2,
	                preventDefault: false
	            })
			},
			handlerNav(obj, index) {
				this.curTagIndex = index
				this.$emit('clickNav', obj, index)
			},
			scrollToDom(index) {
                this.curTagIndex = index
                let num = Math.floor(window.innerWidth / this.liWidth)
                if (index > num && index < this.info.length) {
                	let i = index - num
                	let v = this.liWidth * i
					this.at.to(-v)
                } else {
                	this.at.to(0)
                }
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

	.li-tag-class {
		color: #666;
		font-size: 17px;
		line-height: 0.586667rem;
		padding: 0 0.173333rem 0 0.146667rem;
		display: inline-block;
	}

	.cur-li-tag {
		font-weight: bold;
		color: #000;
		border-bottom: 0.026667rem solid #000;
	}
</style>