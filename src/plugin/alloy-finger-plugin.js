let AlloyFingerPlugin = {
	install: function(Vue, options) {
		const AlloyFinger = options.AlloyFinger
		if (!AlloyFinger) {
			throw new Error('you need include the AlloyFinger!')
		}

		const EVENTMAP = {
	        'touch-start': 'touchStart',
	        'touch-move': 'touchMove',
	        'touch-end': 'touchEnd',
	        'touch-cancel': 'touchCancel',
	        'multipoint-start': 'multipointStart',
	        'multipoint-end': 'multipointEnd',
	        'tap': 'tap',
	        'double-tap': 'doubleTap',
	        'long-tap': 'longTap',
	        'single-tap': 'singleTap',
	        'rotate': 'rotate',
	        'pinch': 'pinch',
	        'press-move': 'pressMove',
	        'swipe': 'swipe'
	    }
	    let CACHE = []
	    let directiveOpts = {}

	    let getElemCacheIndex = function(elem) {
	    	return CACHE.findIndex((cacheObj) => {
	    		return cacheObj.elem = elem
	    	})
	    }

	    let doOnOrOff = function(cacheObj, options) {
	    	let {eventName, elem, func, oldFunc} = options

	    	if (cacheObj && cacheObj.alloyFinger) {
	    		if (cacheObj.alloyFinger.off && oldFunc) {
					cacheObj.alloyFinger.off(eventName, oldFunc)
	    		}
	    		if (cacheObj.alloyFinger.on && func) {
	    			cacheObj.alloyFinger.on(eventName, func)
	    		}
	    	} else {
	    		options = {}
	    		options[eventName] = func

	    		CACHE.push({
	    			elem: elem,
	    			alloyFinger: new AlloyFinger(elem, options)
	    		})
	    	}
	    }

	    let doBindEvent = function(elem, binding) {
	    	let func = binding.value
	    	let oldFunc = binding.oldValue
	    	let eventName = binding.arg

	    	eventName = EVENTMAP[eventName]

	    	let cacheObj = CACHE[getElemCacheIndex(elem)]

	    	doOnOrOff(cacheObj, { elem, func, oldFunc, eventName })
	    }

	    let doUnbindEvent = function(elem) {
	    	let index = getElemCacheIndex(elem)

	    	if (!isNaN(index) && typeof index === 'number') {
	    		let delArr = CACHE.splice(index, 1)
	    		if (
	    			delArr.length &&
	    			delArr[0] &&
	    			delArr[0].alloyFinger.destroy
	    		) {
	    			delArr[0].alloyFinger.destroy()
	    		}
	    	}
	    }

	    directiveOpts = {
	    	bind: doBindEvent,
	    	update: doBindEvent,
	    	unbind: doUnbindEvent
	    }

	    Vue.directive('finger', directiveOpts)
	}
}

export default AlloyFingerPlugin