/**
 *  dom选取, 和操作dom元素的一些方法
 *  包括移动端的事件
 *  ajax, url处理, 跨浏览器事件的封装
 *  和其他一些常用的方法
 *  author: Sorrow.X
 *  state: 持续跟新中
 */
; (function () {
    'use strict';

    if (!Date.now)
        Date.now = function () { return new Date().getTime(); };

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
                                   || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

; (function(win, doc) {

 	function JSLibrary(arg) {

 		//用来保存选中的元素, elements是一个真正的数组, 不是HTMLCollection对象
 		this.elements = [];

 		switch (typeof arg) {
 			case 'function':
 				_methodSets.ready(arg);
 				break;
 			case 'string':
 				switch (arg.charAt(0)) {
 					case '#': //ID
 						var obj = doc.querySelector(arg);
 						this.elements.push(obj);
 						break;
 					case '.': //class
 						this.elements = _methodSets.getByClass(doc, arg.substring(1));
 						break;
 					default: //tagName
 						this.elements = _methodSets.convertToArray(doc.getElementsByTagName(arg));
 				}
 				break;
 			case 'object':
 				this.elements.push(arg);
 		}
 	};

	// 用来存放内部调用的方法
 	JSLibrary.methodSets = {      

        //文档加载完毕执行js脚本
 		ready: (function() {
		    var funcs = []; //当获得事件时,要运行的函数
		    var bReady = false; //当触发事件处理程序时,切换到true

		    //当文档准备就绪时,调用事件处理程序
		    function handler(e) {
		        //如果已经运行过一次, 只需要返回
		        if (bReady) return;

		        //如果发生readystatechange事件,但是其状态不是'complete'的话, 那么文档尚未准备好
		        if (e.type === 'readystatechange' && doc.readyState !== 'complete') return;

		        //运行所有注册函数, 注意每次都要计算funcs.length, 以防止这些函数的调用可能会导致注册更多的函数
		        for (var i = 0; i < funcs.length; i++) {
		            funcs[i].call(doc);
		        }

		        //现在设置ready标识为true, 并移除所有函数
		        bReady = true;
		        funcs = null;
		    }

		    //为接收到任何事件注册处理程序
		    if (doc.addEventListener) {
		        doc.addEventListener('DomContentLoaded', handler, false);
		        doc.addEventListener('readystatechange', handler, false);
		        win.addEventListener('load', handler, false);

		    } else if (doc.attachEvent) {
		        doc.attachEvent('onreadystatechange', handler);
		        win.attachEvent('onload', handler);
		    }

		    //返回whenReady()函数
		    return function whenReady(f) {
		        if (bReady) f.call(doc); //若准备完毕, 只需要运行它
		        else funcs.push(f); //否则, 加入列队等候
		    }
		})(),

		//把NodeList数组对象转换成数组
		convertToArray: function(nodes) { 
		    var arrayOfNodes = null;

		    try {
		        arrayOfNodes = Array.prototype.slice.call(nodes, 0);
		    } catch (ex) { //兼容ie8及以前的版本
		        arrayOfNodes = new Array();
		        for (var i = 0; i < nodes.length; i++) {
		            arrayOfNodes.push(nodes[i]);
		        }

		    };

		    return arrayOfNodes;
		},

 		myAddEvent: function(obj, sEv, fn) {
 			if (obj.attachEvent) {
 				obj.attachEvent('on' + sEv, function() {
 					if (false == fn.call(obj)) {
 						event.cancelBubble = true;
 						return false;
 					}
 				});
 			} else {
 				obj.addEventListener(sEv, function(ev) {
 					if (false == fn.call(obj)) {
 						ev.cancelBubble = true;
 						ev.preventDefault();
 					}
 				}, false);
 			}
 		},

 		getByClass: function(oParent, sClass) {
 			var aEle = oParent.getElementsByTagName('*');
 			var aResult = [];
 			var i = 0;

 			for (i = 0; i < aEle.length; i++) {
 				if (aEle[i].className == sClass) {
 					aResult.push(aEle[i]);
 				}
 			}

 			return aResult;
 		},

 		getStyle: function(obj, attr) {
 			if (obj.currentStyle) {
 				return obj.currentStyle[attr];
 			} else {
 				return getComputedStyle(obj, false)[attr];
 			}
 		}
 		
 	};

 	var _methodSets = JSLibrary.methodSets;


 	/********************* 以下JSLibrary 原型方法   开始 ************************/
 	JSLibrary.prototype = {
 		constructor: JSLibrary,

        /**
         *  这个点击事件是针对传统pc的
         *  手机端使用tap事件
         */
 		click: function(callback) {

 			this.elements.forEach(function(item) {
 				_methodSets.myAddEvent(item, 'click', callback);
 			});

 			return this;
 		},

 		_setEvent: function(evtName, callback) {

			var oFinger = null, currentDom = null;
			
			for (var i = 0, len = this.elements.length; i < len; i += 1) {
				currentDom = this.elements[i];
				if (currentDom.oFinger) {

                    currentDom.oFinger.on(evtName, callback);
				} else {

					oFinger = new jsLib.Finger(currentDom, {});
				    oFinger.on(evtName, callback);
				    currentDom.oFinger = oFinger;
				};
			};
		},

		_removeEvent: function(evtName, callback) {

			var currentDom = null;

			for (var i = 0, len = this.elements.length; i < len; i += 1) {
				currentDom = this.elements[i];
				if (currentDom.oFinger) {
					currentDom.oFinger.off(evtName, callback);
				};
			};
		},

        /**
         *  移动端事件
         *  @use
         *
            var aLi = jsLib('#ul1').find('li').swipe(swipe);
			function swipe(ev) {
                console.log(ev.direction);
			}
			aLi.tap(tap);
			function tap(ev) {
				console.log('tap');
				jsLib(ev.target).removeSwipe(swipe);
			}
			aLi.doubleTap(doubleTap);
			function doubleTap(ev) {
				console.log('doubleTap');
				jsLib(ev.target).removeTap(tap);
			};
			aLi.longTap(longTap);
			function longTap(ev) {
				console.log('longTap');
				jsLib(ev.target).removeDTap(doubleTap);
			};

			aLi.destroy();    //销毁dom上的一切事件
         */

		tap: function(callback) {

			this._setEvent('tap', callback);

			return this;
		},

		removeTap: function(callback) {

			this._removeEvent('tap', callback);

			return this;
		},


		swipe: function(callback) {
			// console.log(ev.direction);

			this._setEvent('swipe', callback);

			return this;
		},

		removeSwipe: function(callback) {

			this._removeEvent('swipe', callback);

			return this;
		},

        
		longTap: function(callback) {

			this._setEvent('longTap', callback);

			return this;
		},

		removeLTap: function(callback) {

			this._removeEvent('longTap', callback);

			return this;
		},

		doubleTap: function(callback) {

			this._setEvent('doubleTap', callback);

			return this;
		},

		removeDTap: function(callback) {

			this._removeEvent('doubleTap', callback);

			return this;
		},

		destroy: function() {

			var currentDom = null;

			for (var i = 0, len = this.elements.length; i < len; i += 1) {
				currentDom = this.elements[i];
				if (currentDom.oFinger) {
					currentDom.oFinger.destroy();
				};
			};

			return this;
		},

		transform: function() {

			for (var i = 0, len = this.elements.length; i < len; i += 1) {
				jsLib.Transform(this.elements[i]);
			};

			return this.toDom();
		},

        /*
         * 据父节点查找其子孩子
         * @param { String } 可以是标签名或.calss名
         */
 		find: function(str) {
 			var i = 0;
 			var aResult = [];

 			for (i = 0; i < this.elements.length; i++) {
 				switch (str.charAt(0)) {
 					case '.': //class
 						var aEle = _methodSets.getByClass(this.elements[i], str.substring(1));

 						aResult = aResult.concat(aEle);
 						break;
 					default: //标签
 						var aEle = this.elements[i].getElementsByTagName(str);

 						aResult = _methodSets.convertToArray(aEle);
 				}
 			}

 			var newJSLib = jsLib();

 			newJSLib.elements = aResult;

 			return newJSLib;
 		},

 		/*
 		 * 获取点击时它在其兄弟节点的索引位置
 		 */
 		index: function() {
 			var _this = this;
 			return (function(_this) {
 				var obj = _this.elements[0];
 				var aBrother = obj.parentNode.children;
 				var i = 0;

 				for (i = 0; i < aBrother.length; i++) {
 					if (aBrother[i] == obj) {
 						return i;
 					}
 				}
 			}(_this));
 		},

 		/*
 		 * 获取第几个dom对象(含原型方法)
 		 * @param { Number } 从0开始
 		 */
 		eq: function(n) {
 			return jsLib(this.elements[n]);
 		},

 		/*
 		 * 返回元素的length长度
 		 */
 		length: function() {
 			return this.elements.length;
 		},

 		/*
 		 * 单纯地获取dom对象(不含原型方法)
 		 * @param { Number } 从0开始
 		 */
 		toDom: function() {
 			if (this.elements.length === 1) {
 				return this.elements[0];
 			} else {
 				return this.elements;
 			}
 		},

 		show: function() {
 			this.elements.forEach(function(item) {
 				item.style.display = 'block';
 			});
 		},

 		hide: function() {
 			this.elements.forEach(function(item) {
 				item.style.display = 'none';
 			});
 		},

 		/*
 		 * 给节点元素添加样式(多个或者单个)
 		 * @param { Object } {width: '100px', height: '100px', background: '#ccc', opacity: 30}
 		 * @use: setStyle([oDiv,oDiv2], {width: '100px', height: '100px', background: '#ccc', opacity: 30});
 		 * @use: setStyle(oDiv, {width: 100, height: 100, background: '#ccc', opacity: 30});
 		 */
 		setStyle: function(json) {
 			(function setDomStyle(obj, json) {
 			    if (obj.length) { //对象数组

 			        // for (var i = 0; i < obj.length; i++) arguments.callee(obj[i], json);
 			        for (var i = 0; i < obj.length; i++) setDomStyle(obj[i], json);

 			    } else {
 			        if (arguments.length == 2) {

 			            // for (var attr in json) arguments.callee(obj, attr, json[attr]);
 			            for (var attr in json) setDomStyle(obj, attr, json[attr]);

 			        } else {
 			            switch (arguments[1].toLowerCase()) {
 			                case 'opacity':
 			                    obj.style.filter = 'alpha(opacity:' + arguments[2] + ')';
 			                    obj.style.opacity = arguments[2] / 100;
 			                    break;
 			                default:
 			                    if (typeof arguments[2] == 'number') {
 			                        obj.style[arguments[1]] = arguments[2] + 'px';
 			                    } else {
 			                        obj.style[arguments[1]] = arguments[2];
 			                    }
 			                    break;
 			            }
 			        }
 			    }
 			})(this.elements, json);
 		},

        /*
         * 获取/设置dom样式
         * @param { String } 样式名
         * @param { String } 样式值
         */
 		css: function(attr, value) {
			if (arguments.length == 2) {    //设置样式
				var i = 0;

				for (i = 0; i < this.elements.length; i++) {
					this.elements[i].style[attr] = value;
				}
			} else {    //获取样式
				if (typeof attr == 'string') {
					return _methodSets.getStyle(this.elements[0], attr);
				} else {
					for (i = 0; i < this.elements.length; i++) {
						var k = '';

						for (k in attr) {
							this.elements[i].style[k] = attr[k];
						}
					}
				}
			}

			return this;
 		},

 		/*
 		 * 获取/设置dom属性
 		 * @param { String } dom属性名
 		 * @param { String } dom属性值
 		 */
 		attr: function(attr, value) {
 			if (arguments.length == 2) {
 				var i = 0;

 				for (i = 0; i < this.elements.length; i++) {
 					this.elements[i][attr] = value;
 				}
 			} else {
 				return this.elements[0][attr];
 			}

 			return this;
 		},

 		removeAttr: function(name) {
 			this.elements.forEach(function(item) {
 				item.removeAttribute(name);
 			});

 			return this;
 		},

 		/*
 		 * 给元素节点设置Css3样式
 		 * @param { String } name 属性名
 		 * @param { String } value 属性值
 		 */
 		setStyle3: function(name, value) {
 		    this.elements.forEach(function(item) {
 		    	item.style['Webkit' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
 		    	item.style['Moz' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
 		    	item.style['ms' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
 		    	item.style['O' + name.charAt(0).toUpperCase() + name.substring(1)] = value;
 		    	item.style[name] = value;
 		    });
 		},

 		/*
 		 * 给元素节点添加class
 		 * @param { String } sClass class名
 		 */
 		addClass: function(sClass) {
 		    var re = new RegExp('\\b' + sClass + '\\b');
            
            this.elements.forEach(function(item) {
            	if (re.test(item.className)) return;
            	item.className = (item.className + ' ' + sClass).match(/\S+/g).join(' ');
            });

			return this;
 		},

 		/*
 		 * 移除某元素节点的class
 		 * @param { String } sClass class名
 		 */
 		removeClass: function(sClass) {
 		    var re = new RegExp('\\b' + sClass + '\\b', 'g');

 		    this.elements.forEach(function(item) {
	 		    item.className = item.className.replace(re, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
 		    });

			return this;
 		},

 		/*
 		 * 设置dom文本
 		 */
 		html: function(str) {
			this.elements.forEach(function(item) {
				item.innerHTML = str;
			});
 		},

        /*
         * 扩张方法,把一些好的方法扩张到JSLibrary原型上
         * @param { String } 方法名
         * @param { Function } 函数
         */
 		extend: function(name, fn) {
 			JSLibrary.prototype[name] = fn;
 		},

		/**
		 * [功能: 返回元素e的第几层祖先元素, 如果不存在此类祖先或祖先不是Element,
		 *  则返回NUll]
		 * @param  {Object Dom} e 指定的元素
		 * @param  {Number} n 第n层祖先元素
		 * @return {Object Dom}   返回其祖父元素
		 */
		parent: function(n) {
			if (this.elements.length > 1) return;    //多个元素直接返回
			var e = this.elements[0];

	        if (n === undefined) n = 1;
	        while(n -- && e)
	        	e = e.parentNode;
	        if (!e || e.nodeType !== 1)
	        	return null;

	        // return e;
	        return jsLib(e);
		},

	    /**
	     * [功能: 返回元素e的第几个兄弟元素, n为正,返回后续的第n个兄弟元素,
	     *  n为负,返回前面的第n个兄弟元素, n为0, 返回e本身]
	     * @param  {Object Dom} e 指定的元素
	     * @param  {Number} n 第几个兄弟节点
	     * @return {Object Dom}   返回第几个兄弟节点
	     */
		sibling: function(n) {
			if (this.elements.length > 1) return;    //多个元素直接返回
			var e = this.elements[0];

	        while(e && n !== 0) {    //如果e未定义, 立即返回它

	            if (n > 0) {    //查找后续的兄弟元素
	                if (e.nextElementSibling) {
	                	e = e.nextElementSibling;
	                } else {
	                	for (e = e.nextSibling; e && e.nodeType !== 1; e = e.nextSibling)
	                		/* 空循环 */;
	                };
	                n --;
	            } else {    //查找前面的兄弟元素
	                if (e.previousElementSibing) {
	                	e = e.previousElementSibing;
	                } else {
	                	for (e = e.previousSibling; e && e.nodeType !== 1; e = e.previousSibling)
	                		/* 空循环 */;
	                };
	                n ++;
	            }
	        }

	        // return e;
	        return jsLib(e);
		},

		/**
		 * [功能: 返回元素e的第n代子元素,如果不存在则为NUll,
		 * 负值n代表从后往前计数. 0表示第一个子元素, -1代表最后一个, -2代表倒数第二个,以此类推.(和children功能一样, 从0开始)]
		 * @param  {Object Dom} e 指定的元素
		 * @param  {Number} n 第几个
		 * @return {Object Dom}   返回第n代子元素
		 */
		child: function(n) {
			if (this.elements.length > 1) return;    //多个元素直接返回
			var e = this.elements[0];
			if (!e) return;

	        if (e.children) {                   // 如果children数组存在
	        	if (n < 0)                      // 转换负的n为数组索引
	        		n += e.children.length;     
	        	if (n < 0)                      // 如果它仍然为负, 说明没有子元素
	        		return null;
	        	// return e.children[n];           //返回指定的子元素
	        	return jsLib(e.children[n]);           //返回指定的子元素
	        }

	        //如果e没有children数组, 找到第一个子元素并向前数, 或找到最后一个子元素并往回数
	        if (n >= 0) {
	        	//找到元素的第一个子元素
	        	if (e.firstElementChild) {
	        		e = e.firstElementChild;
	        	} else {
	        		for (e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling)
	        			/* 空循环 */;
	        	}
				// return this.sibling(e, n);    //返回第一个子元素的第n个兄弟元素
				return jsLib(this.sibling(e, n));    //返回第一个子元素的第n个兄弟元素
	        } else {    // n为负数
	            if (e.lastElementChild) {
	            	e.lastElementChild;
	            } else {
	            	for (e = e.lastChild; e && e.nodeType !== 1; e = e.previousSibling)
	            		/* 空循环 */;
	            }
	            // return this.sibling(e, n+1);
	            return jsLib(this.sibling(e, n+1));
	        }
		}
 	};

 	/********************* 以上JSLibrary 原型方法   结束 ************************/


 	/************** 以下是一些常用的方法挂在到jsLib(类方法)   开始 **************/


 	/**
 	 *  一些实用工具方法挂载到jsLib.utils
 	 */

 	jsLib.utils = {};
    
    /**
     *  检测一个值是否是NaN 
     */
    jsLib.utils.isReallyNaN = function(x) {
    	return x !== x;
    };

    /**
     *  检测一个对象是否为空
     */
    jsLib.utils.isEmptyObj = function(obj){
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                return false;
            }
        }
        return true;
    };

	/**
	 *  检测一个对象是否为数组
	 */
	jsLib.utils.isArray = function (arr) {
		if (Array.isArray) {
			return Array.isArray(arr);
		} else {
			return Object.prototype.toString.call(arg) === '[object Array]';
		}
	};

	/**
	 *
	 * @param parent    要拷贝的对象
	 * @param child    返回浅拷贝的对象
	 *
	 * 如果parent对象中属性也是对象或者数组，那么浅拷贝的对象是引用parent这个对象
	 */
    jsLib.utils.extend = function(parent, child) {
		var i;
		child = child || {};
		for (i in parent) {
			if (parent.hasOwnProperty(i)) {
				child[i] = parent[i];
			};
		};
		return child;
	};

	/**
	 *
	 * @param parent
	 * @param child
	 * 深拷贝以后，parent对象和child对象就不相等了,都是独立的了
	 */
	jsLib.utils.extendDeep = function(parent, child) {
		var i,
			toStr = Object.prototype.toString,
			astr = "[object Array]";

		child = child || {};

		for (i in parent) {
			if (parent.hasOwnProperty(i)) {
				if (typeof parent[i] === 'object') {
					child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
					this.extendDeep(parent[i], child[i]);
				} else {
					child[i] = parent[i];
				};
			};
		};
		return child;
	};

	/**
	 *  从数组中随机取几个不重复的元素
	 */
	jsLib.utils.getArrayItems = function(arr, num) {
		var temp_array = new Array();
		for (var index in arr) {
			temp_array.push(arr[index]);
		}
		var return_array = new Array();
		for (var i = 0; i<num; i++) {
			if (temp_array.length>0) {
				var arrIndex = Math.floor(Math.random()*temp_array.length);
				return_array[i] = temp_array[arrIndex];
				temp_array.splice(arrIndex, 1);
			} else {
				break;
			};
		};
		return return_array;
	}

	/**
	 *  判断点在多边形内
	 *  eg:  var pointCenter = {x: gV.box_w/2, y: gV.box_h/2};
	 *	 var polygon = [
	 *		 {x:aClientLeftPoint[0], y:aClientLeftPoint[1]},
	 *		 {x:aClientRightPoint[0], y:aClientRightPoint[1]},
	 *		 {x:aClientRightunderPoint[0], y:aClientRightunderPoint[1]},
	 *		 {x:aClientLeftunderPoint[0], y:aClientLeftunderPoint[1]},
	 *		 {x:aClientLeftPoint[0], y:aClientLeftPoint[1]}
	 *	 ];
	 *   jsLib.utils.pointInPolygon(pointCenter, polygon);
	 */
	jsLib.utils.pointInPolygon = function(curPoint, points) {
		var counter = 0;
		for (var i = 0, p1, p2; i < points.length; i++) {
			p1 = points[i];
			p2 = points[(i + 1) % points.length];
			if (p1.y == p2.y) {
				continue;
			}
			if (curPoint.y <= Math.min(p1.y, p2.y)) {
				continue;
			}
			if (curPoint.y >= Math.max(p1.y, p2.y)) {
				continue;
			}
			var x = (curPoint.y - p1.y) * (p2.x - p1.x) / (p2.y - p1.y) + p1.x;
			if (x > curPoint.x) counter++;
		};

		if (counter % 2 == 0) {
			return false;
		} else {
			return true;
		};
	};

	/**
     * [功能: 作为一个对象的w和h属性返回视口的尺寸(视口坐标)]
     * @param  {Object} w 指定的窗口
     * @return {Object}   { x: 屏幕的宽度, y: 屏幕的高度 }
     */
    jsLib.utils.getViewportSize = function(w) {
    	//使用指定的窗口, 如果不带参数则使用当前窗口
    	var w = w || window;

    	//出了ie8及更早的版本以外, 其他浏览器都能用
    	if (w.innerWidth != null)
    		return { w: w.innerWidth, h: w.innerHeight };

    	//对标准下的ie (或任何浏览器)
    	var d = w.document;
    	if (document.compatMode == 'CSS1Compat')
    		return {
    			w: d.documentElement.clientWidth,
    			h: d.documentElement.clientHeight
    		};

        //对怪异模式下的浏览器
        return { w: d.body.clientWidth, h: d.body.clientHeight };
    };

    /**
     * [功能: 查询窗口滚动条的位置]
     * @param  {Object} w 指定的窗口
     * @return {Object}   { x: 滚动条的x, y: 滚动条的y }
     */
    jsLib.utils.getScrollOffset = function(w) {
    	//使用指定的窗口, 如果不带参数则使用当前窗口
    	var w = w || window;

    	//除了ie8及更早的版本, 其他浏览器都能用
    	if (w.pageXOffset != null)
    		return { x: w.pageXOffset, y: w.pageYOffset }

    	//对于标准下的ie(或任意浏览器)
    	var d = w.document;
    	if (document.compatMode == 'CSS1Compat')
    		return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop }

    	//对于怪异模式下的浏览器
    	return { x: d.body.scrollLeft, y: d.body.scrollTop }
    };


    /**
     * [功能: 文档如果有滚动条的话,就不行了(文档坐标,含滚动条)]
     * @param  {Object Dom} e dom节点
     * @return {Object}   返回节点坐标(含滚动条)
     */
    jsLib.utils.getElementPosition = function(e) {
    	var x = 0,
    	    y = 0;
    	while(e != null) {
    		x += e.offsetLeft;
    		y += e.offsetTop;
    		e = e.offsetParent;
    	}

    	return { x: x, y: y };
    };

    /**
     * [功能: 增强版(视口坐标)  与 dom.getBoundingClientRect()对象中left和top相等,并且getBoundingClientRect方法效率高]
     * @param  {Object Dom} elt dom节点
     * @return {Object}     返回节点坐标(不含滚动条)
     */
    jsLib.utils.getElementPos = function(elt) {
    	var x = 0, y = 0;

    	//循环以累加偏移量
    	for (var e = elt; e != null; e = e.offsetParent) {
    		x += e.offsetLeft;
    		y += e.offsetTop;
    	}

    	//在此循环所有的祖先元素,减去滚动的偏移量
    	//这也减去了主滚动条, 并转化为视口坐标
    	for (var e = elt.parentNode; e != null && e.nodeType == 1; e = e.parentNode) {
    		x -= e.scrollLeft;
    		y -= e.scrollTop;
    	}

    	return { x: x, y: y };
    };

    //函数赋值
    jsLib.utils.getByClass = _methodSets.getByClass;
    jsLib.utils.convertToArray = _methodSets.convertToArray;


 	/*
 	 * 仅仅简单的dom Id选择器
 	 */
 	jsLib.getEle = function(id) {
 		return doc.querySelector(id);
 	};

 	 
	/*  ajax 的封装, 含跨域 jsonp
	 *
 	 *  参数	     默认值	          描述	              可选值
	 *	url	         “”	             请求的链接	          string
	 *	type	     get	         请求的方法	          get,post
	 *	data	     null	         请求的数据	          object,string
	 *	contentType	 “”	             请求头	              string
	 *	dataType	 “”	             请求的类型	          jsonp
	 *	async	     true	         是否异步	          blooean
	 *	timeOut	     undefined	     超时时间	          number
	 *	before	     function(){}	 发送之前执行的函数	  function
	 *	error	     function(){}	 请求报错执行的函数	  function
	 *	success	     function(){}	 请求成功的回调函数	  function
     *
	 *	@use
	 *	ajax({
	 *	    type:"post",
	 *	    dataType: 'jsonp',
	 *	    url:"http://wx.indoorun.com/wx/getUnitsOfFloor.html", //添加自己的接口链接
	 *	    data: {'regionId':'14428254382730015', 'floorId':'14428254382890016'},
	 *	    timeOut:5000,
	 *	    before:function(){
	 *	      console.log("before");  
	 *	    },
	 *	    success:function(str){
	 *	        console.log(str);
	 *	    },
	 *	    error:function(){
	 *	        console.log("error");
	 *	    }
	 *	});
 	 */
 	jsLib.ajax = function(options) {
 	    //编码数据
 	    function setData() {
 	        var name, value;
 	        if (data) {
 	            if (typeof data === "string") {
 	                data = data.split("&");
 	                for (var i = 0, len = data.length; i < len; i++) {
 	                    name = data[i].split("=")[0];
 	                    value = data[i].split("=")[1];
 	                    data[i] = encodeURIComponent(name) + "=" + encodeURIComponent(value);
 	                }
 	                data = data.replace("/%20/g", "+");
 	            } else if (typeof data === "object") {
 	                var arr = [];
 	                for (var name in data) {
 	                	if (typeof data[name] !== 'undefined') {
							var value = data[name].toString();
							name = encodeURIComponent(name);
							value = encodeURIComponent(value);
							arr.push(name + "=" + value);
						}

 	                }
 	                data = arr.join("&").replace("/%20/g", "+");
 	            }
 	            //若是使用get方法或JSONP，则手动添加到URL中
 	            if (type === "get" || dataType === "jsonp") {
 	                url += url.indexOf("?") > -1 ? (url.indexOf("=")>-1 ? "&"+data : data ): "?" + data;
 	            }
 	        }
 	    }
 	    // JSONP
 	    function createJsonp() {

 	        var script = document.createElement("script"),
 	            timeName = new Date().getTime() + Math.round(Math.random() * 1000),
 	            callback = "JSONP_" + timeName;

 	        window[callback] = function(data) {
 	            clearTimeout(timeout_flag);
 	            document.body.removeChild(script);
 	            success(data);
 	        }
 	        script.src = url +  (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callback;
 	        script.type = "text/javascript";
 	        document.body.appendChild(script);
 	        setTime(callback, script);
 	    }
 	    //设置请求超时
 	    function setTime(callback, script) {
 	        if (timeOut !== undefined) {
 	            timeout_flag = setTimeout(function() {
 	                if (dataType === "jsonp") {
 	                    // delete window[callback];
 	                    document.body.removeChild(script);

 	                } else {
 	                    timeout_bool = true;
 	                    xhr && xhr.abort();
 	                }
 	                console.log("timeout");

 	            }, timeOut);
 	        }
 	    }
 	    // XHR
 	    function createXHR() {
 	        //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
 	        //所以创建XHR对象，需要在这里做兼容处理。
 	        function getXHR() {
 	            if (window.XMLHttpRequest) {
 	                return new XMLHttpRequest();
 	            } else {
 	                //遍历IE中不同版本的ActiveX对象
 	                var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
 	                for (var i = 0; i < versions.length; i++) {
 	                    try {
 	                        var version = versions[i] + ".XMLHTTP";
 	                        return new ActiveXObject(version);
 	                    } catch (e) {}
 	                }
 	            }
 	        }
 	        //创建对象。
 	        xhr = getXHR();
 	        xhr.open(type, url, async);
 	        //设置请求头
 	        if (type === "post" && !contentType) {
 	            //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
 	            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
 	        } else if (contentType) {
 	            xhr.setRequestHeader("Content-Type", contentType);
 	        }
 	        //添加监听
 	        xhr.onreadystatechange = function() {
 	            if (xhr.readyState === 4) {
 	                if (timeOut !== undefined) {
 	                    //由于执行abort()方法后，有可能触发onreadystatechange事件，
 	                    //所以设置一个timeout_bool标识，来忽略中止触发的事件。
 	                    if (timeout_bool) {
 	                        return;
 	                    }
 	                    clearTimeout(timeout_flag);
 	                }
 	                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

 	                    success(xhr.responseText);
 	                } else {
 	                     error(xhr.status, xhr.statusText);
 	                }
 	            }
 	        };
 	        //发送请求
 	        xhr.send(type === "get" ? null : data);
 	        setTime(); //请求超时
 	    }

 	    var url = options.url || "", //请求的链接
 	        type = (options.type || "get").toLowerCase(), //请求的方法,默认为get
 	        data = options.data || null, //请求的数据
 	        contentType = options.contentType || "", //请求头
 	        dataType = options.dataType || "", //请求的类型
 	        async = options.async === undefined && true, //是否异步，默认为true.
 	        timeOut = options.timeOut, //超时时间。 
 	        before = options.before || function() {}, //发送之前执行的函数
 	        error = options.error || function() {}, //错误执行的函数
 	        success = options.success || function() {}; //请求成功的回调函数
 	    var timeout_bool = false, //是否请求超时
 	        timeout_flag = null, //超时标识
 	        xhr = null; //xhr对角
 	    setData();
 	    before();
 	    if (dataType === "jsonp") {
 	        createJsonp();
 	    } else {
 	        createXHR();
 	    }
 	};

 	/*
 	 * 把url后面的参数放入到一个对象中去
 	 * 返回这个对象
 	 */
 	jsLib.getQueryString = function() {

 	    var str = location.search.length > 0 ? location.search.substring(1) : "";
 	    var items = str.length ? str.split("&") : [];

 	    var args = {}, item = null, name = null, value = null;

 	    for (var i = 0, len = items.length; i < len; i++) {
 	        item = items[i].split("=");
 	        name = decodeURIComponent(item[0]);
 	        value = decodeURIComponent(item[1]);
 	        if (name.length) {
 	            args[name] = value;
 	        }
 	    };

 	    return args;
 	};

 	/*
 	 * 绑定和解绑事件的方法
 	 */
 	jsLib.EventUtil = {

 	    //事件绑定  EventUtil.addHandler()
 	    addHandler: function(element, type, handler) { //要绑定的元素, 事件类型, 发生事件的函数
 	        if (element.addEventListener) {
 	            element.addEventListener(type, handler, false); // false为事件冒泡 (w3c标准下)
 	        } else if (element.attachEvent) {
 	            element.attachEvent('on' + type, handler); //  只有事件冒泡 (ie下)
 	        } else {
 	            element['on' + type] = handler;
 	        }
 	    },

 	    //事件移除 
 	    removeHandler: function(element, type, handler) {
 	        if (element.removeEventListener) {
 	            element.removeEventListener(type, handler, false);
 	        } else if (element.detachEvent) {
 	            element.detachEvent('on' + type, handler);
 	        } else {
 	            element['on' + type] = null;
 	        }
 	    },

 	    //获取事件对象 
 	    getEvent: function(event) {
 	        return event ? event : win.event;
 	    },

 	    //获取事件目标 
 	    getTarget: function(event) {
 	        var oEvent = jsLib.EventUtil.getEvent(event);
 	        return oEvent.target || oEvent.srcElement; //标准或ie下
 	    },

 	    //取消默认事件 
 	    preventDefault: function(event) {
 	        var oEvent = jsLib.EventUtil.getEvent(event);
 	        oEvent.preventDefault ? oEvent.preventDefault() : oEvent.returnValue = false;
 	    },

 	    //阻止事件冒泡和事件捕获 
 	    stopPropagation: function(event) {
 	        var oEvent = jsLib.EventUtil.getEvent(event);
 	        oEvent.stopPropagation ? oEvent.stopPropagation() : oEvent.cancelBubble = true;
 	    }
 	};

 	/************** 以上是一些常用的方法挂在到jsLib(类方法)   结束 **************/




 	/************** 以下一些方法(插件)扩展到JSLibrary原型上    开始 **************/

 	/*
 	 * 任意dom节点运动方法
 	 * @param { Object } 运动的属性
 	 * @param { Function } 回调函数
 	 * @user jsLib('#id').animate({left: '200', top: '200', 'opacity': 30});
 	 */
    jsLib().extend('animate', function(json, fn, time) {

    	var time = time || 30;

    	this.elements.forEach(function(item, index, array) {
    		startMove(item, json, fn);
    	});

    	function getStyle(obj, attr) {
    	    if (obj.currentStyle) {
    	        return obj.currentStyle[attr];
    	    } else {
    	        return getComputedStyle(obj, false)[attr];
    	    }
    	}
    	//运动
    	function startMove(obj, json, fn) {
    	    clearInterval(obj.timer);
    	    obj.timer = setInterval(function() {
    	        var attr = '';
    	        var iStop = true; //假设所有值都到达了，定时器里一轮的运动结束了
    	        for (attr in json) {
    	            //1.计算当前值
    	            var iCurr = 0;
    	            if (attr == 'opacity') {
    	                iCurr = parseInt(parseFloat(getStyle(obj, attr)) * 100);
    	            } else {
    	                iCurr = parseInt(getStyle(obj, attr));
    	            }
    	            //2.计算速度
    	            var speed = (json[attr] - iCurr) / 8;
    	            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    	            //3.检测停止
    	            if (iCurr != json[attr]) {
    	                iStop = false;
    	            };
    	            if (attr == 'opacity') {
    	                obj.style.opacity = (iCurr + speed) / 100;
    	                obj.style.filter = 'alpha(opacity:' + (iCurr + speed) + ')';
    	            } else {
    	                obj.style[attr] = iCurr + speed + 'px';
    	            };
    	        };
    	        if (iStop) { //所有属性都到达了目标，那就关闭定时器
    	            clearInterval(obj.timer);
    	            fn && fn();
    	        };
    	    }, time);
    	}
    });


    /**
     * 任意运动, 传入回调函数, 分批执行 
     * @return {_stopMove} 可以停止运动
     * 可以单独使用
     * @user 
     * var stop = new Move.elastic([0, 1], 800, function(v){
     *     console.log(v);    // v是速度在 0,1之间以各种运动变化, 每变化一次就执行一次函数
	 * }
	 *
	 * stop();  //通过调用,可以立即停止
     */
	; (function(exports) {

		var PI = Math.PI,
			sin = Math.sin,
			cos = Math.cos,
			pow = Math.pow,
			abs = Math.abs,
			sqrt = Math.sqrt;

		var request = window.requestAnimationFrame,
			stopRequest = window.cancelAnimationFrame;
		var _move, _stopMove;    // 都是函数, 不支持requestAnimationFrame的浏览器就使用定时器

		//初始化运动函数和停止函数  
		if (request) {
			_move = function(fn, timer) {    // fn: 匿名函数, timer: 不同的空对象
				var step = function() {
					if (!fn()) {    // fn函数返回值为假值则调用requestAnimationFrame方法(true代表运动结束)
						timer.id = request(step);
					};
				};
				step();    // 函数调用
			};
		} else {
			_move = function(fn, timer) {
				timer.id = setInterval(fn, 16);    // 采用定时器, 时间间隔不能低于16
			};
		};
		if (stopRequest) {
			_stopMove = function(timer) {
				stopRequest(timer.id);    // 停止动画调用
			};
		} else {
			_stopMove = function(timer) {
				clearInterval(timer.id);    // 关闭定时器
			};
		};

		var Move = function() {    // Move构造函数
			this.aCurve = [];    // 曲线动画函数名集合
			this.init();
		};    


		var curve = Move.prototype = {    // Move原型
			// 初始化动画曲线 
			init: function() {
				this.extends({
					//定义域和值域均为[0, 1], 传入自变量x返回对应值y
					//先加速后减速
					ease: function(x) {
						// return -0.5*cos(PI * (2 - x)) + 0.5;
						if (x <= 0.5) return 2 * x * x;
						else if (x > 0.5) return -2 * x * x + 4 * x - 1;
					},

					// 初速度为0 ,一直加速
					easeIn: function(x) {
						return x * x;
					},

					//先慢慢加速1/3, 然后突然大提速, 最后减速
					ease2: function(x) {
						return x < 1 / 3 ? x * x : -2 * x * x + 4 * x - 1;
					},

					//初速度较大, 一直减速, 缓冲动画
					easeOut: function(x) {
						return pow(x, 0.8);
					},

					//碰撞动画
					collision: function(x) {
						var a, b; //a, b代表碰撞点的横坐标
						for (var i = 1, m = 20; i < m; i++) {
							a = 1 - (4 / 3) * pow(0.5, i - 1);
							b = 1 - (4 / 3) * pow(0.5, i);
							if (x >= a && x <= b) {
								return pow(3 * (x - (a + b) / 2), 2) + 1 - pow(0.25, i - 1);
							}
						}
					},

					//弹性动画
					elastic: function(x) {
						return -pow(1 / 12, x) * cos(PI * 2.5 * x * x) + 1;
					},

					//匀速动画
					linear: function(x) {
						return x;
					},

					//断断续续加速减速
					wave: function(x) {
						return (1 / 12) * sin(5 * PI * x) + x;
					},

					//先向反方向移动一小段距离, 然后正方向移动, 并超过终点一小段, 然后回到终点
					opposite: function(x) {
						return (sqrt(2) / 2) * sin((3 * PI / 2) * (x - 0.5)) + 0.5;
					},

					// 相反的三次贝塞尔
					reverseEase: function (x) {    
				        return 1 - Math.sqrt(1 - x * x);
				    }
				});
			},

			// 随机选择一个动画方法名
			getRd: function () {
				var preItem = null;

				return function () {
					var arr = this.aCurve;
					var index = Math.floor(Math.random() * arr.length),
					    item = arr[index],
					    result;

					if (preItem != item) {
						preItem = item;
						result = item;
					} else {
						result = this.getRd(arr);
					};

					return result;
				};
			}(),

			// 扩张曲线动画
			extends: function(obj) {
				for (var k in obj) {
					if (k in curve) {
						console.warn('扩张的方法名' + k + ': 已经存在, 换个方法名吧!' );
						return;
					};
					this.aCurve.push(k);
					curve[k] = (function(moveType) {    // 给Move原型添加 动画曲线 方法
						return function() {
							return _doMove.call(this, arguments, moveType);    // 每个动画曲线方法实际调用_doMove函数
						};
					})(obj[k]);
				};
			}
		};


		/**
		 * 开始动画函数
		 * arg: 用户要传的([0, 1000], 500, function(v){ ... }, fnEnd)
		 * moveType: 曲线动画函数
		 */
		function _doMove(arg, moveType) {
			var r,    // r => 过渡范围, 例如[0, 1000]   (必须传, 且传数组)
			    d,    // d => 过渡时间, ms,             (可不传, 默认500) 
			    fn,    // fn => 每一帧的回调函数, 传入当前过渡值v   (必须传) 
			    fnEnd;    // fnEnd => 动画结束时回调               (可不传)    

			// 严格限制传入参数, 且传入的参数可以没有顺序
			for (var i = 0; i < 4; i++) {
				if (typeof arg[i] === 'object' && !r) r = arg[i];
				else if (typeof arg[i] === 'number' && !d) d = arg[i];
				else if (typeof arg[i] === 'function' && !fn) fn = arg[i];
				else if (typeof arg[i] === 'function' && !fnEnd) fnEnd = arg[i];
			};

			if (!r instanceof Array || !fn) return;    // 如果r不是数组或者fn不是函数(真值)就return掉

			d = d || 500;    // 过渡时间默认500ms

			var from = +new Date, //起始时间
				x = 0,    
				y,
				a = r[0],    // 过渡范围的起点
				b = r[1];    // 过度范围的终点

			var timer = 't' + Math.random();    // 随机数

			var self = this;    // 存一下Move的实例

			//用于保存定时器ID的对象, requestAnimation递归调用必须传入对象(给实例添加timer属性值为{})
			this[timer] = {};

			// 优先使用requestAnimationFrame否则setInterval定时器
			_move(function() {
				x = (+new Date - from) / d;

				if (x >= 1) {    // 动画结束
					fn(b);    // 调用外部动画的回调函数且把过度范围的终点值作为参数传过去
					if (fnEnd) fnEnd();    // 如果有动画结束回调函数就执行回调函数
					return true;    // 返回真值停止调用requestAnimationFrame方法
				} else {    // 动画进行中
					y = moveType(x);    // 调用动画曲线中的函数返回运动数字
					fn(a + (b - a) * y);    // 调用外部动画的回调函数传参为 a + (b - a) * y
				};
			}, self[timer]);

			return function() {
				_stopMove(self[timer]);    // 调用cancelAnimationFrame方法停止动画
				return a + (b - a) * y;    // 返回动画停止后的运动数字
			};
		};

		// 抛出去
		exports.Move = Move;    // Move构造函数抛出去
	
	})(jsLib);

	; (function(exports) {
	    // 一些要使用的内部工具函数

	    // 2点之间的距离 (主要用来算pinch的比例的, 两点之间的距离比值求pinch的scale)
	    function getLen(v) {
	        return Math.sqrt(v.x * v.x + v.y * v.y);
	    };

	    // dot和getAngle函数用来算两次手势状态之间的夹角, cross函数用来算方向的, getRotateAngle函数算手势真正的角度的
	    function dot(v1, v2) {
	        return v1.x * v2.x + v1.y * v2.y;
	    };

	    // 求两次手势状态之间的夹角
	    function getAngle(v1, v2) {
	        var mr = getLen(v1) * getLen(v2);
	        if (mr === 0) return 0;
	        var r = dot(v1, v2) / mr;
	        if (r > 1) r = 1;
	        return Math.acos(r);
	    };

	    // 利用cross结果的正负来判断旋转的方向(大于0为逆时针, 小于0为顺时针)
	    function cross(v1, v2) {
	        return v1.x * v2.y - v2.x * v1.y;
	    };

	    // 如果cross大于0那就是逆时针对于屏幕是正角,对于第一象限是负角,所以 角度 * -1, 然后角度单位换算
	    function getRotateAngle(v1, v2) {
	        var angle = getAngle(v1, v2);
	        if (cross(v1, v2) > 0) {
	            angle *= -1;
	        };
	        return angle * 180 / Math.PI;
	    };

	    // HandlerAdmin构造函数
	    var HandlerAdmin = function(el) {
	        this.handlers = [];    // 手势函数集合
	        this.el = el;    // dom元素
	    };

	    // HandlerAdmin原型方法

	    // 把fn添加到实例的 handlers数组中
	    HandlerAdmin.prototype.add = function(handler) {
	        this.handlers.push(handler); 
	    };

	    // 删除 handlers数组中的函数
	    HandlerAdmin.prototype.del = function(handler) {
	        if(!handler) this.handlers = [];    // handler为假值,handlers则赋值为[](参数不传undefined,其实不管this.handlers有没有成员函数,都得置空)

	        for(var i = this.handlers.length; i >= 0; i--) {
	            if(this.handlers[i] === handler) {    // 如果函数一样
	                this.handlers.splice(i, 1);    // 从handler中移除该函数(改变了原数组)
	            };
	        };
	    };

	    // 执行用户的回调函数
	    HandlerAdmin.prototype.dispatch = function() {
	        for(var i=0, len=this.handlers.length; i<len; i++) {
	            var handler = this.handlers[i];    
	            if(typeof handler === 'function') handler.apply(this.el, arguments);    // 执行回调this为dom元素, 把触发的事件对象作为参数传过去了
	        };
	    };

	    function wrapFunc(el, handler) {
	        var handlerAdmin = new HandlerAdmin(el);    // 实例化一个对象
	        handlerAdmin.add(handler);

	        return handlerAdmin;
	    };

	    // AlloyFinger构造函数
	    var AlloyFinger = function (el, option) {    // el: dom元素/id, option: 各种手势的集合对象

	        this.element = typeof el == 'string' ? document.querySelector(el) : el;    // 获取dom元素

	        // 绑定原型上start, move, end, cancel函数的this对象为 AlloyFinger实例
	        this.start = this.start.bind(this);
	        this.move = this.move.bind(this);
	        this.end = this.end.bind(this);
	        this.cancel = this.cancel.bind(this);

	        // 给dom元素 绑定原生的 touchstart, touchmove, touchend, touchcancel事件, 默认冒泡
	        this.element.addEventListener("touchstart", this.start, false);
	        this.element.addEventListener("touchmove", this.move, false);
	        this.element.addEventListener("touchend", this.end, false);
	        this.element.addEventListener("touchcancel", this.cancel, false);

	        this.preV = { x: null, y: null };    // 开始前的坐标
	        this.pinchStartLen = null;    // start()方法开始时捏的长度
	        this.scale = 1;    // 初始缩放比例为1
	        this.isDoubleTap = false;    // 是否双击, 默认为false

	        var noop = function () { };    // 空函数(把用户没有绑定手势函数默认赋值此函数)

	        // 提供了14种手势函数. 根据option对象, 分别创建一个 HandlerAdmin实例 赋值给相应的this属性
	        this.rotate = wrapFunc(this.element, option.rotate || noop);
	        this.touchStart = wrapFunc(this.element, option.touchStart || noop);
	        this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
	        this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
	        this.pinch = wrapFunc(this.element, option.pinch || noop);
	        this.swipe = wrapFunc(this.element, option.swipe || noop);
	        this.tap = wrapFunc(this.element, option.tap || noop);
	        this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
	        this.longTap = wrapFunc(this.element, option.longTap || noop);
	        this.singleTap = wrapFunc(this.element, option.singleTap || noop);
	        this.pressMove = wrapFunc(this.element, option.pressMove || noop);
	        this.touchMove = wrapFunc(this.element, option.touchMove || noop);
	        this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
	        this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);

	        this.delta = null;    // 差值 变量增量
	        this.last = null;    // 最后数值
	        this.now = null;    // 开始时的时间戳
	        this.tapTimeout = null;    // tap超时
	        this.singleTapTimeout = null;    // singleTap超时
	        this.longTapTimeout = null;    // longTap超时(定时器的返回值)
	        this.swipeTimeout = null;    // swipe超时
	        this.x1 = this.x2 = this.y1 = this.y2 = null;    // start()时的坐标x1, y1, move()时的坐标x2, y2 (相对于页面的坐标)
	        this.preTapPosition = { x: null, y: null };    // 用来保存start()方法时的手指坐标
	    };

	    // AlloyFinger原型对象
	    AlloyFinger.prototype = {

	        start: function (evt) {
	            if (!evt.touches) return;    // 如果没有TouchList对象, 直接return掉 (touches: 位于屏幕上的所有手指的列表)

	            this.now = Date.now();    // 开始时间戳
	            this.x1 = evt.touches[0].pageX;    // 相对于页面的 x1, y1 坐标
	            this.y1 = evt.touches[0].pageY;
	            this.delta = this.now - (this.last || this.now);    // 时间戳差值

	            this.touchStart.dispatch(evt);    // 调用HandlerAdmin实例this.touchStart上的dispatch方法(用户的touchStart回调就在此调用的)

	            if (this.preTapPosition.x !== null) {    // 开始前tap的x坐标不为空的话(一次没点的时候必然是null了)
	                this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
	            };
	            this.preTapPosition.x = this.x1;    // 把相对于页面的 x1, y1 坐标赋值给 this.preTapPosition
	            this.preTapPosition.y = this.y1;
	            this.last = this.now;    // 把开始时间戳赋给 this.last
	            var preV = this.preV,    // 把开始前的坐标赋给 preV变量
	                len = evt.touches.length;    // len: 手指的个数

	            if (len > 1) {    // 一根手指以上
	                this._cancelLongTap();    // 取消长按定时器
	                this._cancelSingleTap();    // 取消SingleTap定时器

	                var v = {    // 2个手指坐标的差值
	                    x: evt.touches[1].pageX - this.x1, 
	                    y: evt.touches[1].pageY - this.y1 
	                };
	                preV.x = v.x;    // 差值赋值给PreV对象
	                preV.y = v.y;

	                this.pinchStartLen = getLen(preV);    // start()方法中2点之间的距离
	                this.multipointStart.dispatch(evt);    // (用户的multipointStart回调就在此调用的)
	            };

	            this.longTapTimeout = setTimeout(function () {
	                this.longTap.dispatch(evt);    // (用户的longTap回调就在此调用的)
	            }.bind(this), 750);
	        },

	        move: function (evt) {
	            if (!evt.touches) return;    // 如果没有TouchList对象, 直接return掉 (touches: 位于屏幕上的所有手指的列表)

	            var preV = this.preV,    // 把start方法保存的2根手指坐标的差值xy赋给preV变量
	                len = evt.touches.length,    // 手指个数
	                currentX = evt.touches[0].pageX,    // 第一根手指的坐标(相对于页面的 x1, y1 坐标)
	                currentY = evt.touches[0].pageY;
	            this.isDoubleTap = false;    // 移动过程中不能双击了

	            if (len > 1) {    // 2根手指以上(处理捏pinch和旋转rotate手势)

	                var v = {    // 第二根手指和第一根手指坐标的差值
	                    x: evt.touches[1].pageX - currentX, 
	                    y: evt.touches[1].pageY - currentY 
	                };

	                if (preV.x !== null) {    // start方法中保存的this.preV的x不为空的话

	                    if (this.pinchStartLen > 0) {    // 2点间的距离大于0
	                        evt.scale = getLen(v) / this.pinchStartLen;    // move中的2点之间的距离除以start中的2点的距离就是缩放比值
	                        this.pinch.dispatch(evt);    // scale挂在到evt对象上 (用户的pinch回调就在此调用的)
	                    };

	                    evt.angle = getRotateAngle(v, preV);    // 计算angle角度
	                    this.rotate.dispatch(evt);    // (用户的pinch回调就在此调用的)
	                };

	                preV.x = v.x;    // 把move中的2根手指中的差值赋值给preV, 当然也改变了this.preV
	                preV.y = v.y;

	            } else {    // 一根手指(处理拖动pressMove手势)

	                if (this.x2 !== null) {    // 一根手指第一次必然为空,因为初始化赋值为null, 下面将会用x2, y2保存上一次的结果

	                    evt.deltaX = currentX - this.x2;    // 拖动过程中或者手指移动过程中的差值(当前坐标与上一次的坐标)
	                    evt.deltaY = currentY - this.y2;

	                } else {
	                    evt.deltaX = 0;    // 第一次嘛, 手指刚移动,哪来的差值啊,所以为0呗
	                    evt.deltaY = 0;
	                };
	                this.pressMove.dispatch(evt);    // deltaXY挂载到evt对象上,抛给用户(用户的pressMove回调就在此调用的)
	            };

	            this.touchMove.dispatch(evt);    // evt对象因if语句而不同,挂载不同的属性抛出去给用户 (用户的touchMove回调就在此调用的)

	            this._cancelLongTap();    // 取消长按定时器

	            this.x2 = currentX;    // 存一下本次的pageXY坐标, 为了下次做差值
	            this.y2 = currentY;

	            if (len > 1) {    // 2个手指以上就阻止默认事件
	                evt.preventDefault();
	            };
	        },

	        end: function (evt) {
	            if (!evt.changedTouches) return;    // 位于该元素上的所有手指的列表, 没有TouchList也直接return掉

	            this._cancelLongTap();    // 取消长按定时器

	            var self = this;    // 存个实例
	            if (evt.touches.length < 2) {    // 手指数量小于2就触发 (用户的多点结束multipointEnd回调函数)
	                this.multipointEnd.dispatch(evt);
	            };

	            this.touchEnd.dispatch(evt);    // 触发(用户的touchEnd回调函数)

	            //swipe 滑动
	            if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) || (this.y2 && Math.abs(this.preV.y - this.y2) > 30)) {

	                evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);    // 获取上下左右方向中的一个

	                this.swipeTimeout = setTimeout(function () {
	                    self.swipe.dispatch(evt);    // 立即触发,加入异步队列(用户的swipe事件的回调函数)
	                }, 0);

	            } else {   // 以下是tap, singleTap, doubleTap事件派遣

	                this.tapTimeout = setTimeout(function () {

	                    self.tap.dispatch(evt);    // 触发(用户的tap事件的回调函数)
	                    // trigger double tap immediately
	                    if (self.isDoubleTap) {    // 如果满足双击的话

	                        self.doubleTap.dispatch(evt);    // 触发(用户的doubleTap事件的回调函数)
	                        clearTimeout(self.singleTapTimeout);    // 清除singleTapTimeout定时器

	                        self.isDoubleTap = false;    // 双击条件重置

	                    } else {
	                        self.singleTapTimeout = setTimeout(function () {
	                            self.singleTap.dispatch(evt);    // 触发(用户的singleTap事件的回调函数)
	                        }, 250);
	                    };

	                }, 0);    // 加入异步队列,主线程完成立马执行
	            };

	            this.preV.x = 0;    // this.preV, this.scale, this.pinchStartLen, this.x1 x2 y1 y2恢复初始值
	            this.preV.y = 0;
	            this.scale = 1;
	            this.pinchStartLen = null;
	            this.x1 = this.x2 = this.y1 = this.y2 = null;
	        },

	        cancel: function (evt) {
	            //清除定时器
	            clearTimeout(this.singleTapTimeout);
	            clearTimeout(this.tapTimeout);
	            clearTimeout(this.longTapTimeout);
	            clearTimeout(this.swipeTimeout);
	            // 执行用户的touchCancel回调函数,没有就执行一次noop空函数
	            this.touchCancel.dispatch(evt);
	        },

	        _cancelLongTap: function () {    // 取消长按定时器
	            clearTimeout(this.longTapTimeout);
	        },

	        _cancelSingleTap: function () {    // 取消延时SingleTap定时器
	            clearTimeout(this.singleTapTimeout);
	        },

	        // 2点间x与y之间的绝对值的差值作比较,x大的话即为左右滑动,y大即为上下滑动,x的差值大于0即为左滑动,小于0即为右滑动
	        _swipeDirection: function (x1, x2, y1, y2) {    // 判断用户到底是从上到下，还是从下到上，或者从左到右、从右到左滑动
	            return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
	        },

	        // 给dom添加14种事件中的一种
	        on: function(evt, handler) {    
	            if(this[evt]) {    // 看看有没有相应的事件名
	                this[evt].add(handler);    // HandlerAdmin实例的add方法
	            };
	        },

	        // 移除手势事件对应函数
	        off: function(evt, handler) {
	            if(this[evt]) {
	                this[evt].del(handler);    // 从数组中删除handler方法
	            };
	        },

	        destroy: function() {

	            // 关闭所有定时器
	            if(this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
	            if(this.tapTimeout) clearTimeout(this.tapTimeout);
	            if(this.longTapTimeout) clearTimeout(this.longTapTimeout);
	            if(this.swipeTimeout) clearTimeout(this.swipeTimeout);

	            // 取消dom上touchstart, touchmove, touchend, touchcancel事件
	            this.element.removeEventListener("touchstart", this.start);
	            this.element.removeEventListener("touchmove", this.move);
	            this.element.removeEventListener("touchend", this.end);
	            this.element.removeEventListener("touchcancel", this.cancel);

	            // 把14个HandlerAdmin实例的this.handlers置为空数组
	            this.rotate.del();
	            this.touchStart.del();
	            this.multipointStart.del();
	            this.multipointEnd.del();
	            this.pinch.del();
	            this.swipe.del();
	            this.tap.del();
	            this.doubleTap.del();
	            this.longTap.del();
	            this.singleTap.del();
	            this.pressMove.del();
	            this.touchMove.del();
	            this.touchEnd.del();
	            this.touchCancel.del();

	            // 实例成员的变量全部置为null
	            this.preV = this.pinchStartLen = this.scale = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null;

	            return null;
	        }
	    };

	    // 抛出去
	    exports.Finger = AlloyFinger;
	    
	})(jsLib);

	; (function(exports) {

		var DEG_TO_RAD =  0.017453292519943295;

		// 三维矩阵
		var Matrix3D = function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
			this.elements = window.Float32Array ? new Float32Array(16) : [];
			var te = this.elements;
			te[0] = (n11 !== undefined) ? n11 : 1;
			te[1] = n21 || 0;
			te[2] = n31 || 0;
			te[3] = n41 || 0;

			te[4] = n12 || 0;
			te[5] = (n22 !== undefined) ? n22 : 1;
			te[6] = n32 || 0;
			te[7] = n42 || 0;

			te[8] = n13 || 0;
			te[9] = n23 || 0;
			te[10] = (n33 !== undefined) ? n33 : 1;
			te[11] = n43 || 0;

			te[12] = n14 || 0;
			te[13] = n24 || 0;
			te[14] = n34 || 0;
			te[15] = (n44 !== undefined) ? n44 : 1;
		};

		Matrix3D.prototype = {
			constructor: Matrix3D,

			set: function(n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
				var te = this.elements;
				te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
	            te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
	            te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
	            te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;
	            return this;
			},
			identity: function() {
				this.set(
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1
				);
				return this;
			},
			appendTransform: function(x, y, z, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ) {
				
				var rx = rotateX * DEG_TO_RAD;
				var cosx = this._rounded(Math.cos(rx));
				var sinx = this._rounded(Math.sin(rx));
				var ry = rotateY * DEG_TO_RAD;
	            var cosy = this._rounded(Math.cos(ry));
	            var siny = this._rounded(Math.sin(ry));
	            var rz = rotateZ * DEG_TO_RAD;
	            var cosz = this._rounded(Math.cos(rz * -1));
	            var sinz = this._rounded(Math.sin(rz * -1));

	            this.multiplyMatrices(this, this._arrayWrap([
	            	1, 0, 0, x,
	            	0, cosx, sinx, y,
	            	0, -sinx, cosx, z,
	            	0, 0, 0, 1
	            ]));

	            this.multiplyMatrices(this, this._arrayWrap([
	                cosy, 0, siny, 0,
	                0, 1, 0, 0,
	                -siny, 0, cosy, 0,
	                0, 0, 0, 1
	            ]));

	            this.multiplyMatrices(this, this._arrayWrap([
	                cosz * scaleX, sinz * scaleY, 0, 0,
	                -sinz * scaleX, cosz * scaleY, 0, 0,
	                0, 0, 1 * scaleZ, 0,
	                0, 0, 0, 1
	            ]));

	            if (skewX || skewY) {
	                this.multiplyMatrices(this, this._arrayWrap([
	                    this._rounded(Math.cos(skewX * DEG_TO_RAD)), this._rounded(Math.sin(skewX * DEG_TO_RAD)), 0, 0,
	                    -1 * this._rounded(Math.sin(skewY * DEG_TO_RAD)), this._rounded(Math.cos(skewY * DEG_TO_RAD)), 0, 0,
	                    0, 0, 1, 0,
	                    0, 0, 0, 1
	                ]));
	            };

	            if (originX || originY || originZ) {
	                this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];
	                this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];
	                this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];
	            };

				return this;
			},
			// 矩阵相乘
			multiplyMatrices: function(a, be) {
				var ae = a.elements;
				var te = this.elements;

				var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
	            var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
	            var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
	            var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

	            var b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
	            var b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
	            var b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
	            var b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];

	            te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
	            te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
	            te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
	            te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

	            te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
	            te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
	            te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
	            te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

	            te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
	            te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
	            te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
	            te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

	            te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
	            te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
	            te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
	            te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

	            return this;
			},
			// 解决角度为90的整数倍导致Math.cos得到极小的数，其实是0。导致不渲染
			_rounded: function(value, i) {
				i = Math.pow(10, i || 15);
				return Math.round(value * i) / i;
			},
			_arrayWrap: function(arr) {
				return window.Float32Array ? new Float32Array(arr) : arr;
			}
		};

		// 主入口函数
		function Transform(obj, notPerspective) {
			var observeProps = ['translateX', 'translateY', 'translateZ', 'scaleX', 'scaleY', 'scaleZ', 'rotateX', 'rotateY', 'rotateZ', 'skewX', 'skewY', 'originX', 'originY', 'originZ'],
			    objIsElement = isElement(obj);
			if (!notPerspective) {
				observeProps.push('perspective');
			};

			obj.matrix3d = new Matrix3D();
			observe(
				obj, 
				observeProps, 
				function() {
				    var mtx = obj.matrix3d.identity().appendTransform(obj.translateX, obj.translateY, obj.translateZ, obj.scaleX, obj.scaleY, obj.scaleZ, obj.rotateX, obj.rotateY, obj.rotateZ, obj.skewX, obj.skewY, obj.originX, obj.originY, obj.originZ);
				    var transform = (notPerspective ? '' : 'perspective(' + obj.perspective + 'px) ') + 'matrix3d(' + Array.prototype.slice.call(mtx.elements).join(',') + ')';
				    if (objIsElement) {
				    	obj.style.transform = obj.style.msTransform = obj.style.OTransform = obj.style.MozTransform = obj.style.webkitTransform = transform;
				    } else {
				    	obj.transform = transform;
				    };
			    });

			if (!notPerspective) {
				obj.perspective = 500;    // 景深默认值
			};
			obj.scaleX = obj.scaleY = obj.scaleZ = 1;
			obj.translateX = obj.translateY = obj.translateZ = obj.rotateX = obj.rotateY = obj.rotateZ = obj.skewX = obj.skewY = obj.originX = obj.originY = obj.originZ = 0;
		};

		// 工具函数
		function isElement(obj) {
			return (
			    typeof HTMLElement === 'object' ? obj instanceof HTMLElement : //DOM2
			    obj && typeof obj === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string'
			);
		};

		function observe(target, props, callback) {
			for (var i = 0, len = props.length; i < len; i += 1) {
				var prop = props[i];
				watch(target, prop, callback);
			};
		};

		// 每一次改变那15个属性中的任意一个,都会执行回调
		function watch(target, prop, callback) {
			Object.defineProperty(target, prop, {
				get: function() {
					return this['_' + prop];
				},
				set: function(value) {
					if (value !== this['_' + prop]) {
						this['_' + prop] = value;
						callback();
					};
				}
			});
		};

		// 抛出去
		exports.Transform = Transform;

	})(jsLib);


    /************** 上面一些方法(插件)扩展到JSLibrary原型上    结束 **************/


    // 把jsLib抛出去
 	function jsLib(arg) {
 		return new JSLibrary(arg);
 	};

 	if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = jsLib;
    } else {
 		if (!win.jsLib) win.jsLib = jsLib;		
    };
}(window, document));