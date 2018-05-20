<template>
	<div class="t-banner-container">
    	<div class="t-banner-inner">
    		<ul class="t-baner-list" ref="list">
    			<li v-for="(obj, index) in bannerData">
    				<img :src="obj.imgUrl" alt="obj.title">
    			</li>
    		</ul>
    	</div>
    	<div class="t-banner-index">
            <span 
                v-for="(item, i) in bannerData"
                :class="i === curIdx ? 'on' : ''"
            >
            </span>
        </div>
    </div>
</template>

<script>
    import AlloyFinger from '@/common/js/lib/alloy_finger.js'

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
        bannerData: {
    		type: Array,
    		default: [] // 轮播数据
    	},
    	bannerOption: {
    		type: Object,
    		default: function() {
                return {  // 控制轮播的一些选项
                    ratio: 0.453 // 高宽比 340/750
                }
            }
    	}
    }

	export default {
		name: 'TBanner',
		props: props,
        data() {
            return {
                curIdx: 0
            }
        },
        methods: {
            init() {
                if (this.bannerData.length === 0) { return }
                if (!this._initBanner) {
                    this._initBanner = true
                    this.initOptions()
                    this.dynamicCalcListWidth()
                    this.dynamicCalcListItemHeight()
                    this.handlerImg()
                    this.initAf()
                }
            },
            refresh() {
                this._initBanner = false
                this.init()
            },
            initOptions() {
                if (!this._initOptions) {
                    this._initOptions = true
                    let bannerOption = props.bannerOption.default()
                    let arrKey = Object.keys(bannerOption)
                    arrKey.forEach((key) => {
                        this.$set(this.bannerOption, key, bannerOption[key])
                    })
                }
            },
            getBannerWidthAndHeight() {
                let w = window.innerWidth
                let h = this.bannerOption.ratio * w
                return {
                    width: w,
                    height: h
                }
            },
            dynamicCalcListWidth() {
                this.listDom = this.listDom || this.$refs.list
                this.listDom.style.width = this.bannerData.length * 100 + '%'
            },
            dynamicCalcListItemHeight() {
                let { height } = this.getBannerWidthAndHeight()
                this.aLiDom = this.aLiDom || this.listDom.children
                ;[...this.aLiDom].forEach((li) => {
                    li.style.height = height + 'px'
                    li.style.width = (100 / this.bannerData.length) + '%'
                })
            },
            setDomTranslateX(dom, value) {
                dom.style.transform = 
                dom.style.msTransform = 
                dom.style.OTransform = 
                dom.style.MozTransform = 
                dom.style.webkitTransform = "translateX(" + value + "px) translateZ(0)"
            },
            handlerImg() {
                this.aLiDom = this.aLiDom || this.listDom.children
                ;[...this.aLiDom].forEach((li) => {
                    this.doImg.setSrc(li.children[0])
                })
            },
            initAf() {
                if (this.af) { return }
                let self = this
                this.af = new AlloyFinger(this.listDom, {
                    swipe(evt) {
                        if (evt.direction === 'Right') {
                            if (self.curIdx <= 0) {
                                self.doSwipe(self.curIdx = 0)
                                return
                            }
                            self.doSwipe(--self.curIdx)
                        }
                        if (evt.direction === 'Left') {
                            if (self.curIdx >= self.bannerData.length - 1) {
                                self.doSwipe(self.curIdx = self.bannerData.length - 1)
                                return
                            }
                            self.doSwipe(++self.curIdx)
                        }
                    }
                })
            },
            doSwipe(idx) {
                let { width } = this.getBannerWidthAndHeight()
                let w = width * idx * -1
                this.setDomTranslateX(this.listDom, w)
            }
        },
        mounted() {
            this.doImg = handlerImage(
                require('./loading.png'), 
                require('./error.png')
            )
            this.init()
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
		width: 300%; /* 需要动态计算*/
		transition: all .6s;
		transform: translate3d(0, 0, 0); /* 需要动态计算 */
	}

	.t-baner-list li {
		position: relative;
		width: 33.333%; /* 需要动态计算*/
		height: 170px; /* 需要动态计*/
		overflow: hidden;
		display: inline-block;
	}

	.t-baner-list > li > img {
		width: 100%;
	}

    .t-banner-index {
        line-height: 0;
        position: absolute;
        bottom: 0;
        padding: 0.106667rem 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .t-banner-index span {
        width: 0.08rem;
        height: 0.08rem;
        background-color: #D1EEEE;
        display: inline-block;
        border-radius: 50%;
        margin: 0 0.066667rem;
        box-sizing: border-box;
    }

    .t-banner-index span.on {
        background-color: #FF1493;
    }
</style>