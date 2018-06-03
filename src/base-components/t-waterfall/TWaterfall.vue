<template>
	<div 
	    class="waterfall-container" 
	    ref="waterfall-container" 
	    :style="waterfallContainerStyle" 
	>
	    <div
	        class="waterfall-box" 
	        v-for="(item, index) in renderData"
	        :style="item['waterfall']['waterfall-box-style']"
	        ref="waterfall-box"
	        @click="$emit('click-waterfall', item)"
	    >
	        <div 
	            class="waterfall-content"
	            ref="waterfall-content"
	            :style="item['waterfall']['waterfall-content-style']"
	        >
	            <img 
	                :src="item.imgUrl" 
	                ref="allImg"
	                :style="item['waterfall']['img-style']"
	            />
	        </div>
	    </div>

	    <div 
            :class="{ 'first-loading': isFirstLoading, 'loading': !isFirstLoading }" 
            v-show="showLoading"
        >
	        <div :class="{ 'loading-content': isFirstLoading }">
	            <div class="dot"></div>
	            <div class="dot"></div>
	            <div class="dot"></div>
	        </div>
	    </div>
	</div>
</template>

<script>
    import imgReady from './img-ready'
    /**
     * 获取图片尺寸 且处理图片的回调
     * @param data Object { imgUrl, imgNaturalHeight, imgNaturalWidth }
     * @param loadCb Function 图片载入成功的回调
     * @param errorCb Function 图片载入失败的回调
     */
    let getImgInfoAndHandlerCallback = function(data, loadCb, errorCb, timeout) {
        let { imgUrl, imgNaturalHeight, imgNaturalWidth } = data
        if (imgNaturalHeight && imgNaturalWidth) {
            return Promise.resolve({
                imgNaturalWidth,
                imgNaturalHeight,
                imgReady: true
            })
        }
        let tick = null
        return Promise.race([
            new Promise((resolve, reject) => {
                clearTimeout(tick)
                function readyCb() {
                    return resolve({
                        imgNaturalWidth: this.width,
                        imgNaturalHeight: this.height,
                        imgReady: true
                    })
                }
                function wrapperFn(f) {
                    return function() {
                        f(data)
                    }
                }
                imgReady(imgUrl, readyCb, wrapperFn(loadCb), wrapperFn(errorCb))
            }),
            new Promise((resolve) => {
                clearTimeout(tick)
                tick = setTimeout(() => {
                    return resolve({
                        imgNaturalWidth: 0,
                        imgNaturalHeight: 0,
                        imgReady: false
                    })
                }, timeout)
            })
        ])
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty
    let hasOwn = function (obj, key) {
        return hasOwnProperty.call(obj, key)
    }

    function getRandomArrayItem(arr) {
        return function() {
            return arr[Math.floor(Math.random() * arr.length)]
        }
    }

    const props = {
        waterfallData: { // 需要渲染的数据
        	type: Array,
        	default: function() {
        		return []
        	},
        	required: true
        },
        waterfallWidth: { // 每个瀑布流元素的总宽度,针对pc端 (移动端和pad会自动计算盒子宽度)
            type: Number,
            default: 180
        },
        gap: { // 图片间隔,其实就是 类为waterfall-box div的padding值 (单位/px)   
            type: [Object],
            default: function() {
                return {
                    paddingLeft: 8,
                    padingBottom: 10
                }
            }
        },
        contentStyle: { // 控制 类为waterfall-content div的样式
            type: Object,
            default: function() {
            	return {
                    padding: '6px',
                    border: '1px solid #eee',
                    'border-radius': '5px',
                    'box-shadow': '0 0 5px #eee'
                }
            }
        },
        maxCols: { // 最大的列数 (pc端默认 自动计算; 移动端默认2列; ipad mini 默认3列; ipad pro 默认4列)
            type: Number,
            default: 8
        },
        randomWaterfallHeight: { // 瀑布流的随机高度(当获取不到图片的宽高时,会自动使用一个随机的高度,里面的img元素为100%)
            type: Array,
            default: function() {
                return [240, 180, 160, 200, 175, 260]
            }
        },
        randomBackgroundColor: { // 图片的背景颜色(当图片未加载成功前显示的背景颜色)
            type: Array,
            default: function() {
                return ['#FFF5EE', '#FFE7BA', '#FFE4E1', '#F5FFFA', '#F5F5F5', '#F0FFF0', '#E0FFFF', '#C1CDC1', '#BBFFFF', '#98FB98']
            }
        },
        preloadingImgTimeout: { // 预加载图片的超时时间
            type: Number,
            default: 30
        },
        errorImg: {
            type: String,
            default: ''
        }
    }

    export default {
        name: 'TWaterfall',
    	props,
    	data() {
    		return {
    			isMobile: navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i),
                isPad: navigator.userAgent.match(/(iPad)/i),
                renderData: [],
                waterfallContainerStyle: {},
                isFirstLoading: true,
                isEmitLoadData: false
    		}
    	},
        watch: {
            waterfallData(val, oldVal) {
                if (val.length !== this._preValLength) {
                    this._preValLength = val.length
                    this.isFirstLoading = false // 第二次及以后的数据来时就不是第一次加载了
                    this.init()
                } else {
                    this.isEmitLoadData = false
                }
            }
        },
        computed: {
            // 是否显示loading ui
            showLoading() {
                return this.renderData.length == 0 || this.isEmitLoadData
            },
            // 瀑布流单个元素的总宽度
            getWaterfallWidth() {
                let winWidth = window.innerWidth
                return this.isMobile
                    ? winWidth / 2 
                    : this.isPad 
                        ? winWidth >= 800 
                            ? winWidth / 4 
                            : winWidth / 3 
                        : this.waterfallWidth
            },
            // 当前屏幕下瀑布流所显示的最大列数
            getMaxCols() {
                let cols = Math.floor(document.documentElement.clientWidth / this.getWaterfallWidth)
                return this.isMobile 
                    ? 2 
                    : this.isPad 
                        ? winWidth >= 800 
                            ? 4
                            : 3
                        : this.maxCols < cols
                            ? this.maxCols
                            : cols
            },
            // 获取 类为waterfall-box 的div的相关信息
            getContentDivInfo() {
                let paddingLeft, paddingRight, paddingTop, paddingBottom
                let borderLeftWidth, borderRightWidth, borderTopWidth, borderBottomWidth
                let paddingProp = this.contentStyle.padding.split(" ")
                let borderProp = this.contentStyle.border.split(" ")
                let borderWidth = 0
                if (paddingProp.length === 1) {
                    paddingLeft = paddingRight = paddingTop = paddingBottom = parseFloat(paddingProp[0])
                } else if (paddingProp.length === 2) {
                    paddingTop = paddingBottom = parseFloat(paddingProp[0])
                    paddingLeft = paddingRight = parseFloat(paddingProp[1])
                } else if (paddingProp.length === 3) {
                    paddingTop = parseFloat(paddingProp[0])
                    paddingRight = parseFloat(paddingProp[1])
                    paddingBottom = parseFloat(paddingProp[2])
                    paddingLeft = 0
                } else if (paddingProp.length === 4) {
                    paddingTop = parseFloat(paddingProp[0])
                    paddingRight = parseFloat(paddingProp[1])
                    paddingBottom = parseFloat(paddingProp[2])
                    paddingLeft = parseFloat(paddingProp[3])
                }
                borderProp.forEach((p) => {
                    if (!isNaN(parseFloat(p))) {
                        borderWidth = parseFloat(p)
                    }
                })
                borderLeftWidth = borderRightWidth = borderTopWidth = borderBottomWidth = borderWidth
                return {
                    paddingLeft, paddingRight, paddingTop, paddingBottom,
                    borderLeftWidth, borderRightWidth, borderTopWidth, borderBottomWidth,
                    x: paddingLeft + paddingRight + borderLeftWidth + borderRightWidth,
                    y: paddingTop + paddingBottom + borderTopWidth + borderBottomWidth
                }
            }
        },
    	methods: {
    		async init() {
                let ret = this.hasHandlerData(this.waterfallData)
                if (!ret.has) {
                    this.isEmitLoadData = false
                    return
                }

                let data = await this.normalizedWaterfallData()
                this.renderData = data.slice(0)
                await this.$nextTick(() => {})
                this.isEmitLoadData = false
    		},
            async normalizedWaterfallData() {
                let calcData = await this.processImgStyleAndWaterfallContentStyle()
                calcData = this.processImgStyleAndWaterfallBoxStyle(calcData)
                this.processWaterfallContainerStyle()
                return calcData
            },
            async processImgStyleAndWaterfallContentStyle() {
                let data = this.waterfallData,
                    len = data.length, 
                    i = 0
                for (; i < len; i++) {
                    if (!data[i]['alreadyCalculate']) {
                        let waterfall = this.setWaterfallPropForDataItem(data[i], i)
                        let imgNaturalInfo = await getImgInfoAndHandlerCallback(waterfall, 
                            this.handlerImgLoadCallBack, this.handlerImgErrorCallBack, this.preloadingImgTimeout)
                        let imgRenderInfo = this.dynamicCalcImgRenderHeight(imgNaturalInfo.imgNaturalWidth, imgNaturalInfo.imgNaturalHeight)
                        this.setImgStyleProp(data[i], imgNaturalInfo, imgRenderInfo)
                    }
                }
                return data
            },
            hasHandlerData(arr) {
                let ret = arr.filter((obj) => {
                    return !hasOwn(obj, 'alreadyCalculate')
                })
                return {
                    has: ret.length > 0 ? true : false,
                    len: ret.length
                }
            },
            setWaterfallPropForDataItem(dataItem, idx) {
                this.$set(dataItem, 'waterfall', {})
                let props = ['waterfall-box-style', 'waterfall-content-style', 'img-style']
                props.forEach((prop) => {
                    this.$set(dataItem['waterfall'], prop, {})
                })
                return this.setPropForWaterfall(dataItem, {
                    idx,
                    imgUrl: dataItem.imgUrl,
                    imgNaturalWidth: dataItem.width || 0,
                    imgNaturalHeight: dataItem.height || 0
                })
            },
            setPropForWaterfall(dataItem, params) {
                for (let p in params) {
                    this.$set(dataItem['waterfall'], p, params[p])
                }
                return dataItem['waterfall']
            },
            setProp(dataItem, type, params) {
                for (let p in params) {
                    this.$set(dataItem['waterfall'][type], p, params[p])
                }
                return dataItem['waterfall'][type]
            },
            setImgStyleProp(dataItem, imgNaturalInfo, imgRenderInfo) {
                this.setPropForWaterfall(dataItem, { // 更新waterfall属性值且添加imgReady属性
                    imgNaturalWidth: imgNaturalInfo.imgNaturalWidth,
                    imgNaturalHeight: imgNaturalInfo.imgNaturalHeight,
                    imgReady: imgNaturalInfo.imgReady
                })

                if (imgNaturalInfo.imgReady) { // 获取到图片的真实宽高
                    this.setProp(dataItem, 'img-style', { width: imgRenderInfo.width + 'px', height: imgRenderInfo.height + 'px', display: 'block' })
                    this.setProp(dataItem, 'waterfall-content-style', this.contentStyle)
                } else { // 未获取到图片的真实宽高
                    this.setProp(dataItem, 'img-style', { width: '100%', height: '100%', display: 'block' })
                    this.setProp(dataItem, 'waterfall-content-style', 
                        Object.assign( {}, this.contentStyle, 
                            {
                               width: imgRenderInfo.width + 'px',
                               height: imgRenderInfo.height + 'px'
                            }
                        )
                    )
                }
            },
            dynamicCalcImgRenderHeight(naturalWidth, naturalHeight) {
                let ratio = naturalWidth / naturalHeight
                let width = this.getWaterfallWidth - this.getContentDivInfo.x
                let height = isNaN(width / ratio) ? this.getDefaultWaterfallHeight() : width / ratio
                return {
                    width: width,
                    height: height
                }
            },
            handlerImgLoadCallBack(args) {
                // console.log('加载成功: ', args)
            },
            handlerImgErrorCallBack(args) {
                console.log('加载失败: ', args)
            },
            processImgStyleAndWaterfallBoxStyle(data) {
                let i = 0, len = data.length
                for (; i < len; i++) {
                    if (!data[i]['alreadyCalculate']) {
                        data[i]['alreadyCalculate'] = true
                        if (i < this.getMaxCols) { // 第一行
                            let h = this.dynamicCalcWaterfallHieghtAndSetStyle(data[i], i)
                            this.aColsHeight.push(h)
                        } else {
                            let min = Math.min.apply(null, this.aColsHeight)
                            let minIdx = this.getArrMinIdx(this.aColsHeight, min)
                            let top = min
                            let left = this.getWaterfallWidth * minIdx
                            let h = this.dynamicCalcWaterfallHieghtAndSetStyle(data[i], minIdx)

                            this.setProp(data[i], 'waterfall-box-style', { 'position': 'absolute', 'left': left + 'px', 'top': top + 'px' })
                            this.aColsHeight[minIdx] += h
                        }
                    }
                }
                return data
            },
            dynamicCalcWaterfallHieghtAndSetStyle(dataItem, closIdx) {
                let obj = dataItem['waterfall']
                let preImgWidth, preImgHeight

                if (obj.imgReady) {
                    preImgWidth = parseFloat(obj['img-style']['width'])
                    preImgHeight = parseFloat(obj['img-style']['height'])
                    if (closIdx !== 0) {
                        this.setProp(dataItem, 'img-style', { width: (preImgWidth - this.gap.paddingLeft) + 'px' })
                    }
                    this.setProp(dataItem, 'img-style', { height: (preImgHeight - this.gap.padingBottom) + 'px' })
                } else {
                    let preContentWidth = parseFloat(obj['waterfall-content-style']['width'])
                    let preContentHeight = parseFloat(obj['waterfall-content-style']['height'])
                    if (closIdx !== 0) {
                        this.setProp(dataItem, 'waterfall-content-style', { width: (preContentWidth - this.gap.paddingLeft) + 'px' })
                    }
                    this.setProp(dataItem, 'waterfall-content-style', { height: (preContentHeight - this.gap.padingBottom) + 'px' })
                    preImgHeight = preContentHeight
                }

                this.setProp(dataItem, 'img-style', { 'background-color': this.getImgBackgroundColor() })

                if (closIdx !== 0) { // 非每列左边第一个都设置padding-left
                    this.setProp(dataItem, 'waterfall-box-style', { 'padding-left': this.gap.paddingLeft + 'px' })
                }
                this.setProp(dataItem, 'waterfall-box-style', {
                    'box-sizing': 'border-box',
                    'padding-bottom': this.gap.padingBottom + 'px',
                    float: 'left',
                    width: this.getWaterfallWidth + 'px'
                })

                return preImgHeight + this.getContentDivInfo.y
            },
            processWaterfallContainerStyle() {
                this.waterfallContainerStyle = {
                    'margin': '0px auto',
                    'width': `${this.getMaxCols * this.getWaterfallWidth}px`,
                    'position': 'relative'
                }
            },
            getArrMinIdx(arr, val) {
                return arr.findIndex((item) => {
                    return val === item
                })
            },
            listenScrollEvt() {
                window.onscroll = () => {
                    if (this.checkScroll() && !this.isEmitLoadData) {
                        this.isEmitLoadData = true
                        this.$emit('load-data')
                    }
                }
            },
            checkScroll() {
                let allBoxs = this.$refs['waterfall-box']
                let lastBox = allBoxs[allBoxs.length - 1]
                if (allBoxs && lastBox) {
                    let lastBoxHeight = lastBox.offsetTop + lastBox.offsetHeight / 2
                    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
                    let viewHeight = document.body.clientHeight || document.documentElement.clientHeight
                    return (lastBoxHeight < scrollTop + viewHeight) ? true : false
                }
            }
    	},
        created() {
            this.aColsHeight = []
            this.getDefaultWaterfallHeight = getRandomArrayItem(this.randomWaterfallHeight)
            this.getImgBackgroundColor = getRandomArrayItem(this.randomBackgroundColor)
            this._preValLength = this.waterfallData.length
        },
    	mounted() {
    		// this.init()
            this.listenScrollEvt()
    	}
    }
</script>

<style scoped>
    /* .waterfall-container {
    	position: relative;
    }

    .waterfall-box {
    	box-sizing: border-box;
    	width: 200px; 用户指定 或者 需要动态计算: 每个盒子的宽度(width + padding + border)
    	float: left;
    	padding-left: 5px;
    	padding-bottom: 5px;
    }

    .waterfall-content {
    	padding: 6px; 用户指定: 用来控制间隙;
    	border: 1px solid #eee;
    	border-radius: 5px;
    	box-shadow: 0 0 5px #eee;
    }

    .waterfall-content > img {
    	width: 100%;
    	height: auto;
    	display: block;
    } */

    /* loading 样式 */

    .first-loading {
    	position: fixed;
    	width: 100%;
    	height: 100%;
    	left: 0;
    	top: 0;
    	bottom: 0;
    	right: 0;
    	margin: auto;
    	background-color: #eee;
    }

    .loading-content {
    	position: absolute;
    	width: 64px;
    	height: 24px;
    	left: 50%;
    	top: 50%;
    	margin: -12px 0 0 -32px;
    } 

    .loading {
    	position: fixed;
    	width: 64px;
    	height: 24px;
    	bottom: 6px;
    	left: 50%;
    	margin-left: -32px;
    }  

    @keyframes ball-beat {
    	50% {
    	    opacity: 0.2;
    	    transform: scale(0.75);
    	}
    	100% {
    	    opacity: 1;
    	    transform: scale(1);
    	}
    }

    .dot {
    	vertical-align: bottom;
        background-color: #4b15ab;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 3px;
        animation-fill-mode: both;
        display: inline-block;
        animation: ball-beat .7s 0s infinite linear;
    }

    .dot:nth-child(1) {
    	animation-delay: .35s;
    }

    .dot:nth-child(2) {
    	animation-delay: 0;
    }

    .dot:nth-child(3) {
    	animation-delay: .35s;
    }
</style>

