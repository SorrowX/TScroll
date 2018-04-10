var Move = (function() {

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
    /*if (typeof module === 'object' && module.exports) {
        module.exports = Move;
    } else {
        if (window.Move) {
            try {
                console.warn('Move has been declared!');
            } catch (e) {};
        } else {
            window.Move = Move;    // Move构造函数抛出去
        }
    };*/
    return Move;
})();

export default Move;