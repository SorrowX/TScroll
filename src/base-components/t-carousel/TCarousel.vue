<template>
    <div 
        class="carousel-container" 
        ref="carousel-container"
    >
        <div class="carousel">
            <div 
                class="carousel-scroller" 
                ref="carousel-scroller"
            >
                <div 
                    class="carousel-item" 
                    v-for="(item, index) in carouselData"
                >
                    <img 
                        :src="item.imgUrl" 
                        :alt="item.title"
                    >
                </div>
            </div>
            <div class="nav" v-show="carouselOption.showSpot">
                <span 
                    v-for="(item, index) in carouselData" 
                    :class="index === curIdx ? 'active' : ''"
                >
                </span>
            </div>
            <div :style="carouselOption.infoDivStyle">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import AlloyTouch from '@/common/js/lib/alloy_touch.js'
    import Transform from '@/common/js/lib/transform.js'

    const handlerImage = function(localImgSrc, errorImgSrc) {
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

    let props = {
        carouselData: {
    		type: Array,
    		default: [], // 轮播数据
            required: true
    	},
    	carouselOption: {
    		type: Object,
    		default: function() {
                return {  // 控制轮播的一些选项
                    ratio: 0.5625, // 高宽比 340/750
                    height: 0, // 如果指定高度则优先使用指定的高度
                    showSpot: true, // 是否显示索引点
                    infoDivStyle: {}, // 控制 div的样式
                    errorImg: '', // 图片加载失败的图片  
                    preViewImg: '', // 图片加载前的预显示图片(一般比要想要显示轮播的图片大小 小才能看出效果)
                }
            }
    	}
    }

	export default {
		name: 'TCarousel',
		props: props,
        data() {
            return {
                curIdx: 0
            }
        },
        methods: {
            init() {
                if (this.carouselData.length === 0) { return }
                if (!this._initCarousel) {
                    this._initCarousel = true
                    this.initOptions()
                    this.dynamicCalcScrollerWidth()
                    this.dynamicCalcImgHeight()
                    this.handlerImg()
                    this.initAt()
                }
            },
            initOptions() {
                if (!this._initOptions) {
                    this._initOptions = true
                    let carouselOption = props.carouselOption.default()
                    let arrKey = Object.keys(carouselOption)
                    arrKey.forEach((key) => {
                        if (!this.carouselOption.hasOwnProperty(key)) {
                            this.$set(this.carouselOption, key, carouselOption[key])
                        }
                    })
                }
            },
            getCarouselWidthAndHeight() { 
                let width = window.innerWidth
                let height = this.rem2px(this.carouselOption.height)
                height = height === 0 ? this.carouselOption.ratio * width : height
                if (height > 0) {
                    this.$refs['carousel-scroller'].style.height = height + 'px'
                }
                return { width, height }
            },
            dynamicCalcScrollerWidth() {
                this.carouselScrollerDom = this.carouselScrollerDom || this.$refs['carousel-scroller']
                this.carouselScrollerDom.style.width = this.carouselData.length * 100 + '%'
            },
            dynamicCalcImgHeight() {
                let { height } = this.getCarouselWidthAndHeight()
                this.allDiv = this.allDiv || this.carouselScrollerDom.children
                ;[...this.allDiv].forEach((li) => {
                    li.style.height = height + 'px'
                    li.style.width = (100 / this.carouselData.length) + '%'
                })
            },
            handlerImg() {
                this.allDiv = this.allDiv || this.carouselScrollerDom.children
                ;[...this.allDiv].forEach((div) => {
                    this.doImg.setSrc(div.children[0])
                })
            },
            getMin() {
                return (this.carouselData.length - 1) * window.innerWidth * -1
            },
            initAt() {
                if (this.at) { return }
                let self = this
                Transform(this.$refs['carousel-scroller'])
                this.at = new AlloyTouch({
                    touch: self.$refs['carousel-container'], // 反馈触摸的dom
                    vertical: false, // 不必需，默认是true代表监听竖直方向touch
                    target: self.$refs['carousel-scroller'], // 运动的对象
                    property: "translateX",  // 被运动的属性
                    min: self.getMin(), // 不必需,运动属性的最小值
                    max: 0, // 不必需,滚动属性的最大值
                    step: window.innerWidth,
                    spring: false, //不必需,是否有回弹效果。默认是true
                    inertia: true, //不必需,是否有惯性。默认是true
                    tap: function() {
                        self.awaiting = true
                        self.$emit('tap', self.carouselData[self.curIdx])
                    },
                    touchEnd: function (evt, v, index) {
                        if (self.awaiting) { return }
                        let setpVal = this.step * index * -1
                        let dx = v- setpVal
                        // console.log(v, index, setpVal, dx)
                        if (dx === 0) { return }
                        if (v < this.min) {
                            this.to(this.min)
                        } else if (v > this.max) {
                            this.to(this.max)
                        } else if (Math.abs(dx) < 30) {
                            this.to(setpVal)
                        } else if (dx > 0) { // 从左往右
                            self.curIdx -= 1
                            this.to(setpVal + this.step)
                        } else { // 从右往左
                            self.curIdx += 1
                            this.to(setpVal - this.step)
                        }
                        return false
                    },
                    animationEnd(evt , v) {
                        self.awaiting = false
                        self.$emit('animationEnd', {
                            curData: self.carouselData[this.currentPage],
                            data: self.carouselData,
                            curImgIdx: this.currentPage + 1,
                            imgNum: self.carouselData.length
                        })
                        self.curIdx = this.currentPage
                    }
                })
            },
            rem2px(num) {
                let htmlFontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size'])
                if (
                    typeof num === 'string' &&
                    num.match(/rem$/)
                ) {
                    num = htmlFontSize * parseFloat(num)
                } else if (
                    typeof num === 'string' &&
                    num.match(/px$/)
                ) {
                    num = parseFloat(num)
                }else if (
                    typeof num === 'string' &&
                    num.match(/%$/)
                ) {
                    num = (parseFloat(num) / 100) * window.innerHeight
                } else {
                    num = typeof num === 'number' ? num : 0
                }
                return num
            }
        },
        created() {
            this.awaiting = false
        },
        mounted() {
            this.doImg = handlerImage(
                this.carouselOption.preViewImg || require('./loading.gif'), 
                this.carouselOption.errorImg || require('./error.png')
            )
            this.init()
        }
	}
</script>

<style scoped>
    .carousel-container, 
    .carousel {
        position: relative;
    }

    .carousel {
        overflow: hidden;
    }

    .carousel-item {
        position: relative;
        display: inline-block;
    }
    .carousel-item > img {
        width: 100%;
        height: auto;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    .nav {
        position: absolute;
        bottom: 0.066667rem;
        left: 50%;
        transform: translateX(-50%);
    }

    .nav span {
        display: inline-block;
        width: 0.08rem;
        height: 0.08rem;
        background-color: white;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #808080;
        margin-right: 0.106667rem;
    }

    .nav span.active {
        background-color: #ffd800;
    }

    .info {
        position: absolute;
    }
</style>