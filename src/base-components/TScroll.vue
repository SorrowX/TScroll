<template>
	<div class="wrapper" ref="wrapper">
	    <div class="scroller" ref="scroller">
	    	<slot></slot>
	    </div>
	</div>
</template>

<script>
    import AlloyTouch from '@/common/js/lib/alloy_touch.css.js'
    // import AlloyTouch from '@/common/js/lib/alloy_touch.js'
    import Transform from '@/common/js/lib/transform.js'

    let props = {
    	// 如果有该属性,则认为是个简单的滚动,不含上拉下拉加载数据功能
    	simpleScroll: {
			type: String,
			default: ''
    	},
		// 每次从服务器上拉获取的新数据
		pullUpData: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 每次从服务器下拉获取的新数据
		pullDownData: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 用于渲染列表的数据
		renderDataList: {
			type: Array,
			default: function() {
				return []
			}
		},
		// 控制滚动条相关属性
		scrollBarOption: {
			type: Object,
			default: function() {
				return {
					show: true,  // 是否开启滚动条
					fade: false  // true 表示当滚动停止的时候滚动条是否需要渐隐
				}
			}
		},
		// 控制alloytouch相关属性 
		scrollOption: {
			type: Object,
			default: function() {
				return {
					excrMin: 0, // 多余的高度(滚动容器如果和屏幕高度一样,则该值为0,如果页面如果有头部和底部,需要减掉头部和底部的高度,则该值为头部的高度+底部的高度)
					maxSpeed: 1.2, // 滚动最大速度
					sensitivity: 1, // 滚动的灵敏度
					pullDownDistance: 0, // 下拉距离(超过指定距离才触发下拉事件)
					preventDefault: false // 是否阻止默认事件
				}
			}
		}
	}

	export default {
		props: props,
		data() {
			return {
				allData: [],
				preAllDataLength: 0,
				currentHeight: 0,
				curTranslateY: 0,
				loading: false
			}
		},
		watch: {
			// 简单的滚动容器内容
			simpleScroll(val, oldVal) {
				if (val === oldVal) return
				if (!this._simpleScroll) {
					this._simpleScroll = true
					this.processStaticData()
					this.init()
				}
			},
			// 观察从服务器 上拉 加载到的数据
            pullUpData(val, oldVal) {
            	if (val === oldVal || this._simpleScroll) return
				this.handlerPullData(val)
			},
			// 观察从服务器 下拉 加载到的新数据
            pullDownData(val, oldVal) {
            	if (val === oldVal || this._simpleScroll) return
			    this.handlerPullData(val, true)
			}
		},
		methods: {
			// 处理从服务器获取到的数据
			handlerPullData(loadData, isReset) {
				this.processData(loadData, isReset)
			    this.$nextTick(() => {
		    		this.init()
			    })
			},
			// 处理加载数据, 并且让父组件渲染列表ui
			processData(loadData, isReset) {
				if (isReset) {
					this.recoveryValState()
					this.$emit('update:renderDataList', [])
				}
				let i = 0, len = loadData.length
				for (; i < len; i++) {
				    this.allData.push({
				    	removed: false, 
				    	data: loadData[i], 
				    	translateY: 0, 
				    	dom: null 
				    })
				}
				this.$emit('update:renderDataList', this.allData)
			},
			// 处理渲染好的静态数据
			processStaticData() {
				this.listContainerDom = this.listContainerDom || this.$parent.$refs['tscroll-list-container']
				if (this.listContainerDom) {
					let child = this.listContainerDom.children
					Array.prototype.slice.call(child, 0).forEach((dom) => {
						this.allData.push({
					    	removed: false, 
					    	data: null, 
					    	translateY: 0, 
					    	dom: null
					    })
					})
				}
			},
			// 初始化列表dom,实例化at实例,初始化滚动条
			init() {
				// 初始化
				this.initOptions()
				this.initList()
		    	this.initAlloyTouch()
		    	this.initBar()
		    	// 状态重置
		        this.loading = false
                this.preAllDataLength = this.allData.length
                this.recoveryAtMax()
			},
			// 初始化配置选项
			initOptions() {
				if (!this._initOptions) {
					this._initOptions = true
					let scrollOption = props.scrollOption.default()
					for (let key in scrollOption) {
						if (!this.scrollOption.hasOwnProperty(key)) {
	                        this.$set(this.scrollOption, key, scrollOption[key])
						}
					}
					let scrollBarOption = props.scrollBarOption.default()
					for (let k in scrollBarOption) {
						if (!this.scrollBarOption.hasOwnProperty(k)) {
	                        this.$set(this.scrollBarOption, k, scrollBarOption[k])
						}
					}
				}
			},
			// 初始化列表dom,设置相应dom的translateY属性
			initList() {
				this.targetDom = this.$refs.scroller // 运动的对象的dom
	            this.touchDom = this.$refs.wrapper // 反馈触摸的dom
	            this.pullDownDom = this.pullDownDom || this.$parent.$refs['tscroll-pull-down'] // 下拉加载父容器dom
				this.listContainerDom = this.listContainerDom || this.$parent.$refs['tscroll-list-container'] // 列表父容器dom
	            this.pullUpDom = this.pullUpDom || this.$parent.$refs['tscroll-pull-up'] // 上拉加载父容器dom

				let arr = this.getRawDom()
	            let allDataLen = this.preAllDataLength
	            let len = arr.length,
	                i = 0,
	                height = 0
	            if (this.pullDownDom) { // 设置下拉dom 的translateY
	            	this.setTranslateY(this.pullDownDom, -parseInt(window.getComputedStyle(this.pullDownDom, null).height))
	            }
	            this.setTranslateY(arr[0], this.currentHeight)
	            this.allData[allDataLen].translateY = arr[0].__translateY__ = this.currentHeight
	            this.allData[allDataLen].dom = arr[0]
	            for (i = 1; i < len; i++) {
	                height = parseInt(window.getComputedStyle(arr[i - 1], null).height)
	                this.currentHeight += height
	                this.setTranslateY(arr[i], this.currentHeight)
	                this.allData[i + allDataLen].translateY = arr[i].__translateY__ = this.currentHeight
	                this.allData[i + allDataLen].dom = arr[i]
	            }
	            this.currentHeight += this.getListLastDomHeight() // 需要把列表容器中的最后一个元素的高度加给currentHeight
	            if (this.pullUpDom) { // 设置上拉dom 的translateY
	                this.setTranslateY(this.pullUpDom, this.currentHeight)
	            }
	            if (this.at) { // 有at实例才会去更新min属性
	                this.at.min = this.getMin()
	            }
		    },
		    getRawDom() {
		    	let listDom = this.listContainerDom.children
		    	let arr = []
		        Array.prototype.slice.call(listDom, 0).forEach((dom) => {
		        	if (dom.style.transform === "") {
						arr.push(dom)
		        	}
		        })
		        return arr
		    },
		    setTranslateY(dom,value) {
		        dom.style.transform = 
		        dom.style.msTransform = 
		        dom.style.OTransform = 
		        dom.style.MozTransform = 
		        dom.style.webkitTransform = "translateY(" + value + "px) translateZ(0)"
		    },
		    // 实例化at实例
		    initAlloyTouch() {
		    	let self = this
		    	if (this.at) return
		    	Transform(this.targetDom, true)
		    	this.vpHeight = window.innerHeight - this.scrollOption.excrMin
		    	this.debounceChange = this.change(100)
		        this.at = new AlloyTouch({
		            touch: self.touchDom, //反馈触摸的dom
		            vertical: true, //不必需, 默认是true代表监听竖直方向touch
		            target: self.targetDom, //运动的对象
		            property: "translateY", //被滚动的属性
		            maxSpeed: self.scrollOption.maxSpeed,
		            min: self.getMin(), //不必需, 滚动属性的最小值
		            max: 0, //不必需, 滚动属性的最大值
		            preventDefault: self.scrollOption.preventDefault,
		            sensitivity: self.scrollOption.sensitivity,
		            touchStart: function(evt, property) {
		            	// console.log('touchStart', evt, property)
		            	self.$emit("touchStart", evt, property)
		            },
		            touchMove: function(evt, property) {
		            	// console.log('touchMove', evt, property)
		            	self.$emit("touchMove", evt, property)
		            },
		            touchEnd: function(evt, current) {
		            	// console.log('touchEnd', evt, current)
		            	self.$emit("touchEnd", evt, current)
		            	self.pullDownEnd()
		            },
		            touchCancel: function(evt) {
		            	// console.log('touchCancel')
		            	self.$emit("touchCancel")
		            },
		            change: function(v) {
                        self.debounceChange.call(self, v)
                        self.scrollBar(v)
                        self.$emit("change", v)
		            },
		            animationEnd: function (current) {
		                self.curTranslateY = current
		                self.scrollBarAnimationEnd(current)
		                self.$emit("animationEnd", current)
		                // console.log('animationEnd', current)
		            }
		        })
		    },
		    getListLastDomHeight() {
		    	let child = this.listContainerDom.children
		    	if (this.listContainerDom && child.length > 0) {
                    return parseInt(window.getComputedStyle(child[child.length - 1], null).height)
		    	} else {
		    		return 0
		    	}
		    },
		    getMin() {
		    	let min = window.innerHeight - this.scrollOption.excrMin - this.currentHeight
		    	if (this.pullUpDom) { // 有上拉dom则减去 上拉dom的高度
		    		min = min - parseInt(window.getComputedStyle(this.pullUpDom, null).height)
		    	}
		    	if (min > 0) { // 说明当前列表内容不足以撑起整个容器, so 需要边界处理(隐藏滚动条)
		    		min = 0
		    		this.scrollBarOption.show = false
		    	}
		    	return min
		    },
		    change(ms) {
		    	return this.debounce(function (v) {
		    		if (v > 0) {
			    		// console.log("v: ", v)
		    		}
	                let i = 0, len = this.allData.length

	                for (; i < len; i++) {
	                    let item = this.allData[i]
	                    //保留5屏顺序
	                    if (
	                    	v + item.translateY > -this.vpHeight * 2 && 
	                    	v + item.translateY < this.vpHeight * 3
	                    ) {
	                        item.removed && this.listContainerDom.appendChild(item.dom)
	                        item.removed = false
	                    } else {
	                        if (!item.removed) {
	                            this.listContainerDom.removeChild(item.dom)
	                            item.removed = true
	                        }
	                    }
	                }

	                if (!this._simpleScroll) {
	                	if (v <= this.at.min + 20 && !this.loading) {
		                    this.pullUpLoading()
		                }
	                	if (
	                		this.scrollOption.pullDownDistance !== 0 && 
	                		v >= this.scrollOption.pullDownDistance && 
	                		!this.loading
	                	) {
		                	this.pullDownLoading()
		                }
	                }
	            }, ms || 100)
		    },
		    // 初始化滚动条
		    initBar() {
		    	if (!this._initBar) {
		    		this._initBar = true
					this.createBar()
			        this.showBar(this.scrollBarOption.show)
		    	}
		    },
    	    createBar() {
    	        if (!this.touchDom.___createdBar__) {
    	            let bar = this.barDom = document.createElement('div')
    	            let btn = this.btnDom = document.createElement('div')
    	            this.preBtnDomHeight = 0

    	            bar.style.cssText = `
    	                position: absolute;
    	                z-index: 9999;
    	                top: 2px;
    	                right: 2px;
    	                bottom: 2px;
    	                width: 5px;
    	                overflow: hidden;
    	                border-radius: 2px;
    	                -webkit-transform: scaleX(.5);
    	                transform: scaleX(.5);`
    	            btn.style.cssText = `
    	                background: rgba(0,0,0,.4);
    	                position: absolute;
    	                top: 0;
    	                left: 0;
    	                right: 0;
    	                border-radius: 2px;`
    	            bar.appendChild(btn)
    	            this.touchDom.appendChild(bar)
    	            this.touchDom.___createdBar__ = true
    	        }
    	    },
    	    getBarInfo(v) {
    	        let totalHeight = this.currentHeight
    	        this.barHeight = this.barHeight || this.barDom.offsetHeight
    	        let scrollBarScaleY = this.barHeight / totalHeight
    	        let btnDomHeight = Math.round(this.barHeight * scrollBarScaleY)
    	        if (v >= 0) { // 下拉时
    	        	scrollBarScaleY = this.barHeight / (totalHeight + v * 25)
    	        	btnDomHeight = Math.round(this.barHeight * scrollBarScaleY)
    	        }
    	        return {
    	            btnDomHeight: (btnDomHeight >= 12 ? btnDomHeight : 12),
    	            scrollY: Math.round(scrollBarScaleY * v)
    	        }
    	    },
    	    scrollBar(v) {
    	    	if (this._initBar) {
	    			if (!this.scrollBarOption.show) { return }
	    			if (this.scrollBarOption.fade && this.barDom.style.display === 'none') {
	    				this.barDom.style.display = 'block'
	    			}
	    			let { btnDomHeight, scrollY } = this.getBarInfo(v)
	    		    if (this.preBtnDomHeight !== btnDomHeight) {
	    		    	this.preBtnDomHeight = btnDomHeight
	    		    	this.btnDom.style.height = btnDomHeight + 'px'
	    		    }
	    		    if (!isNaN(scrollY)) {
		    		    this.setTranslateY(this.btnDom, Math.abs(scrollY))
	    		    }
    	    	}
    	    },
    	    scrollBarAnimationEnd(value) {
    	    	if (this._initBar) {
    	    		this.scrollBar(value)
	    	    	this.showBar(!this.scrollBarOption.fade)
    	    	}
    	    },
    	    showBar(bool) {
    	    	if (this._initBar) {
    	    		this.scrollBar(self.curTranslateY)
	    	    	if (bool) {
	    	    		this.barDom.style.display = 'block'
	    	    	} else {
	    	    		this.barDom.style.display = 'none'
	    	    	}
    	    	}
    	    },
    	    // 处理下拉相关函数
		    pullDownLoading() {
		    	this._pdlg = true
	            this.$emit('pullDownLoading')
		    },
		    pullDownEnd() {
		    	if (this._pdlg) {
		    		this.$emit('pullDownEnd')
		    		this._pdlg = false
		    		this.at.max = this.scrollOption.pullDownDistance
		    		this.at.to(this.at.max)
		    	}
		    },
		    recoveryAtMax() {
		    	if (this.at && this._pdlg) {
					this._pdlg = false
					this.at.max = 0
					this.at.to(0)
				}
		    },
		    // 处理上拉
		    pullUpLoading() {
		    	this.loading = true
		    	this.$emit('pullUpLoading', true)
		    },
		    // 滚动到指定dom
		    scrollTo(i, ms) {
		    	let dom, translateY
		    	new Promise((resolve) => {
		    		let type = Object.prototype.toString.call(i)
		    		let dom = null
		    		if (type === '[object Number]') {
		    			dom = this.allData[i] && this.allData[i].dom
		    			translateY = this.allData[i] && this.allData[i].translateY
		    		} else if (type === '[object String]') {
		    			if (i === 'top') {
		    				dom = this.allData[0] && this.allData[0].dom
		    				translateY = this.at.max
		    			} else if (i === 'bottom') {
							dom = this.allData[this.allData.length - 1].dom
							if (this.pullUpDom) {
								translateY = this.at.min + parseInt(window.getComputedStyle(this.pullUpDom, null).height)
							} else {
								translateY = this.at.min
							}
		    			}
		    		} else if (type === '[object HTMLLIElement]') {
		    			dom = i
		    			translateY = dom.__translateY__
		    		}
		    		if (!this.hasTheDom(dom)) { // 没有该dom的话则恢复所有dom,等到本次轮询末尾时再滚动到指定dom
		    			this.recoveryAllDom()
		    		}
		    		resolve('scrollTo')
		    	}).then((ret) => {
		    		this._to(translateY, ms)
		    	})
		    },
		    _to(translateY, ms) {
		    	ms = ms || 600
		    	if ((translateY || translateY === 0) && !isNaN(translateY)) {
	    			translateY > 0
	    			    ? translateY *= -1
	    			    : translateY
	    			this.at.to(translateY, ms)
	    			this.scrollBar(translateY)
	    		}
		    },
		    // 其他函数
		    getAllData() {
		    	return this.allData
		    },
		    getListActualDom() {
		    	if (this.listContainerDom) {
		    		return Array.prototype.slice.call(this.listContainerDom.children, 0)
		    	} else {
		    		return []
		    	}
		    },
		    hasTheDom(dom) {
		    	let ret = false
		    	let i = 0, 
		    	    arr = Array.prototype.slice.call(this.listContainerDom.children), 
		    	    len = arr.length
		    	for (; i < arr.length; i++) {
		    		if (arr[i] === dom) {
		    			ret = true
		    			break
		    		}
		    	}
		    	return ret
		    },
		    recoveryValState() {
		    	this.allData = []
				this.preAllDataLength = 0
				this.currentHeight = 0
				this.curTranslateY = 0
		    },
		    recoveryAllDom() {
		    	let docfrag = document.createDocumentFragment()
		    	this.allData.forEach((obj) => {
		    		docfrag.appendChild(obj.dom)
		    	})
		    	this.listContainerDom.innerHTML = ''
		    	this.listContainerDom.appendChild(docfrag)
		    },
		    debounce(fn, ms, ctx) {
		        ms || (ms = 150)
		        let last, deferTimer
		        return function () {
		            let context = ctx || this
		            let now = +new Date, args = arguments
		            if (last && now < last + ms) {
		                clearTimeout(deferTimer)
		                deferTimer = setTimeout(function () {
		                    last = now
		                    fn.apply(context, args)
		                }, ms)
		            } else {
		                last = now
		                fn.apply(context, args)
		            }
		        }
		    }
		}
	}
</script>

<style scoped>
	
</style>

