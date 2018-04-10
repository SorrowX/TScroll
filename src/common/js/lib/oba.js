/**
 * observejs --- By dnt http://kmdjs.github.io/
 * Github: https://github.com/kmdjs/observejs
 * MIT Licensed.
 * Sorrow.X --- 添加注释,注释纯属个人理解
 */
; (function(win) {

	var observe = function(target, arr, callback) {

		var _observe = function(target, arr, callback) {    // target: 监听对象, arr: 监听对象的属性列表, callback: 回调函数
			if (!target.$observer) target.$observer = this;    // 给target监听对象添加$observer属性,值为_observe构造函数的实例
			var $observer = target.$observer;    // 把实例赋值给$observer变量
			var eventPropArr = [];    //事件属性列表
			if (observe.isArray(target)) {    // 监听对象如果是数组
				if (target.length === 0) {    // 如果是个空数组
					target.$observeProps = {};    // 给监听对象添加新属性$observeProps且赋值为{}空对象
					target.$observeProps.$observerPath = '#';    // 给监听对象的属性$observeProps对象添加$observerPath属性且赋值为'#'
				};
				$observer.mock(target);    // 调用原型上的mock方法(给target加上数组的方法)
			};
			for (var prop in target) {    // 遍历监听对象属性(含原型上的属性)
				if (target.hasOwnProperty(prop)) {    // 只对对象自身的属性感兴趣(不要原型上的)
					if (callback) {    // 如果用户传了三个参数的话
						if (observe.isArray(arr) && observe.isInArray(arr, prop)) {    // arr如果是数组且prop属性在数组中
							eventPropArr.push(prop);
							$observer.watch(target, prop);
						} else if (observe.isString(arr) && prop == arr) {    // arr如果是字符串且prop属性与arr字符串一样
							eventPropArr.push(prop);
							$observer.watch(target, prop);
						};
					} else {
						eventPropArr.push(prop);    //添加target的属性到eventPropArr数组
						$observer.watch(target, prop);    // 调用原型上的watch方法(给属性添加监听)
					};
				};
			};
			$observer.target = target;    // 给$observer对象添加target属性
			if (!$observer.propertyChangedHandler) $observer.propertyChangedHandler = [];    // 给$observer对象添加属性propertyChangedHandler,值为空数组
			var propChanged = callback ? callback : arr;    // propChanged存储回调函数
			$observer.propertyChangedHandler.push({    // 给$observer对象或者target.$observer对象(其实就是this实例啦)属性propertyChangedHandler数组添加一个对象
				all: !callback,
				propChanged: propChanged,
				eventPropArr: eventPropArr
			});
		};

		_observe.prototype = {    // 原型

			"onPropertyChanged": function(prop, value, oldValue, target, path) {    // prop: 属性, value: 设置的新值, oldValue: 上一次属性的值, target: 监听对象, path: 路径
				if (value !== oldValue && this.propertyChangedHandler) {    // prop的新旧值不同且实例的propertyChangedHandler属性为真值
					var rootName = observe._getRootName(prop, path);
					for (var i = 0, len = this.propertyChangedHandler.length; i < len; i++) {    // 循环遍历
						var handler = this.propertyChangedHandler[i];    // 数组成员
						if (handler.all || observe.isInArray(handler.eventPropArr, rootName) || rootName.indexOf("Array-") === 0) {
							handler.propChanged.call(this.target, prop, value, oldValue, path);    // 执行用户的回调函数
						};
					};
				};
				if (prop.indexOf('Array-') !== 0 && typeof value === 'object') {    // prop字符串不包含'Array-'且value是array或者object
					this.watch(target, prop, target.$observeProps.$observerPath);    // 属性为对象或者数组,再次对其属性进行监听
				};
			},

			"mock": function(target) {    // target: 数组
				var self = this;    // 存个实例
				observe.methods.forEach(function(item) {    // 遍历数组的每个方法
					target[item] = function() {    // 给target数组对象添加方法
						var old = Array.prototype.slice.call(this, 0);    // 把原始数组存一下
						var result = Array.prototype[item].apply(this, Array.prototype.slice.call(arguments));    // 数组不同方法的返回值
						if (new RegExp("\\b" + item + "\\b").test(observe.triggerStr)) {
							for (var cprop in this) {
								if (this.hasOwnProperty(cprop) && !observe.isFunction(this[cprop])) {    // 数组含有可枚举的属性并且属性不是函数
									self.watch(this, cprop, this.$observeProps.$observerPath);    // 对数组的属性进行监听(以前的属性也重新再次监听了,我觉得不太好,可以改进,不知道理解错了没)
								};
							};
							// todo
							self.onPropertyChanged("Array-" + item, this, old, this, this.$observeProps.$observerPath);
						};
						return result;
					};
					target['real' + item.substring(0, 1).toUpperCase() + item.substring(1)] = function() {    // 返回数组方法真实的的结果(其实就是调用数组的方法)
						return Array.prototype[item].apply(this, Array.prototype.slice.call(arguments));
					};
				});
			},

			"watch": function(target, prop, path) {    // target: 监听对象, prop: 监听对象的属性, path: 调用路径
				if (prop === "$observeProps" || prop === "$observer") return;    // 如果监听对象的属性等于$observeProps, $observer这2个属性中的任何一个,就return掉了
				if (observe.isFunction(target[prop])) return;    // 如果监听对象的属性类型是函数,也return掉
				if (!target.$observeProps) target.$observeProps = {};    // 如果target对象没有$observeProps属性,则加上这个属性且值为{}, 有的话就跳过
				if (path !== undefined) {    // 如果路径不为空,则设置$observerPath值为path
					target.$observeProps.$observerPath = path;
				} else {    // 否则默认'#'
					target.$observeProps.$observerPath = '#';
				};
				var self = this;    // self存个_observe实例对象
				var currentValue = target.$observeProps[prop] = target[prop];    // 当前属性的value值(target.$observeProps对象添加了这个prop属性且有值)
				Object.defineProperty(target, prop, {    // 给target对象的属性添加set, get方法
					get: function() {    // 返回 target.$observeProps属性的值
						return this.$observeProps[prop];
					},
					set: function(value) {
						var old = this.$observeProps[prop];    // 存一下上一次的属性值
						this.$observeProps[prop] = value;    // 设置新的属性值
						self.onPropertyChanged(prop, value, old, this, target.$observeProps.$observerPath);    // 设置值时,触发实例onPropertyChanged方法
					}
				});
				if (typeof currentValue == 'object') {    // 如果属性值是array或者object
					if (observe.isArray(currentValue)) {    // 如果是数组
						this.mock(currentValue);    // 调用原型上的mock方法
						if (currentValue.length === 0) {    // 如果是空数组
							if (!currentValue.$observeProps) currentValue.$observeProps = {};    // 如果currentValue对象没有$observeProps属性,则加上这个属性且值为{}, 有的话就跳过
							if (path !== undefined) {    // 如果路径不为空,则设置currentValue.$observerPath值为path
								currentValue.$observeProps.$observerPath = path;
							} else {    // 否则默认'#'
								currentValue.$observeProps.$observerPath = '#';
							};
						};
					};
					for (var cprop in currentValue) {    // 循环currentValue对象的每一个成员
						if (currentValue.hasOwnProperty(cprop)) {    // 只对对象自身的属性感兴趣(不要原型上的)
							this.watch(currentValue, cprop, target.$observeProps.$observerPath + '-' + prop);    // 再次监听(递归)
						};
					};
				};
			}
		};

		return new _observe(target, arr, callback);    // 实例化_observe构造函数
	};

	// observe的静态属性
	observe.methods = ["concat", "copyWithin", "entries", "every", "fill", "filter", "find", "findIndex", "forEach", "includes", "indexOf", "join", "keys", "lastIndexOf", "map", "pop", "push", "reduce", "reduceRight", "reverse", "shift", "slice", "some", "sort", "splice", "toLocaleString", "toString", "unshift", "values", "size"];
	observe.triggerStr = ["concat", "copyWithin", "fill", "pop", "push", "reverse", "shift", "sort", "splice", "unshift", "size"].join(",");

	// observe的静态方法(工具函数)
	observe.isArray = function(arr) {    // 判断参数arr是否为数组
		return Object.prototype.toString.call(arr) === '[object Array]';
	};

	observe.isInArray = function(arr, item) {    // 判断item是否在数组arr中
		for (var i = arr.length; --i > -1; ) {
			if (item === arr[i]) return true;
		};
		return false;
	};

	observe.isString = function(str) {    // 判断str是否为字符串
		return typeof str === 'string';
	};

	observe.isFunction = function(fn) {    // 判断参数fn是否为函数
		return Object.prototype.toString.call(fn) === '[object Function]';
	};

	observe._getRootName = function (prop, path) {    // 返回属性名或者#
		if (path === '#') {
			return prop;
		};
		return path.split('-')[1];
	};

	observe.add = function(obj, prop) {    // 给对象添加属性且监听这个添加的属性
		var $observer = obj.$observer;
		$observer.watch(obj, prop);
	};

	observe.set = function(obj, prop, value, exec) {    // 给对象添加属性且赋值, exec表示赋值后是否要回调一次监听函数
		if (!exec) {
			obj[prop] = value;
		};
		var $observer = obj.$observer;
		$observer.watch(obj, prop);
		if (exec) {
			obj[prop] = value;
		};
	};

	Array.prototype.size = function(length) {    // 数组size()方法
		this.length = length;
	};


	// 抛出去
	if (typeof module != 'undefined' && module.exports && this.module !== module) {
		module.exports = observe;
	} else if (typeof define === 'function' && define.amd) {
		define(observe);
	} else {
		win.observe = observe;
	};

})(Function('return this')());