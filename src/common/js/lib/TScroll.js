;(function () {
    var AlloyTouch = typeof require === 'function'
        ? require('alloytouch')
        : window.AlloyTouch
    var Transform = typeof require === 'function'
        ? require('css3transform')
        : window.Transform

    var TScroll = function (option) {
        if (option.change) {
            option.change = before.call(this, this._change, option.change)
        }
        this.wrapperDom = getDom(option.touch)
        this.scrollerDom = getDom(option.target)
        this.at = new AlloyTouch(option)
        this.createBar()
        return this.at
    }

    function before (beforefn, f) {
        var self = this;
        return (function() {
            beforefn.apply(this, arguments)
            return f.apply(this, arguments)
        }).bind(self)
    }

    function getDom(id) {
        return typeof id === 'string' 
            ? document.querySelector(id) 
            : id
    }

    TScroll.prototype = {
        _change: function(v) {
            // console.log(v)
            this.scrollBar(v)
        },
        createBar: function() {
            if (!this.wrapperDom.___createdBar__) {
                var bar = this.barDom = document.createElement('div')
                var btn = this.btnDom = document.createElement('div')
                
                bar.style.cssText = `
                    position:absolute;
                    z-index:9999;
                    top:2px;
                    right:2px;
                    bottom:2px;
                    width:6px;
                    overflow:hidden;
                    border-radius:2px;
                    -webkit-transform: scaleX(.5);
                    transform: scaleX(.5);`
                btn.style.cssText = `
                    background:rgba(0,0,0,.4);
                    position:absolute;
                    top:0;
                    left:0;
                    right:0;
                    border-radius:2px;`
                bar.setAttribute('id', 'touch-bar')
                btn.setAttribute('id', 'touch-btn')
                bar.appendChild(btn)
                this.wrapperDom.appendChild(bar)
                this.wrapperDom.___createdBar__ = true
            }
        },
        getBarInfo: function() {
            var aLi = this.scrollerDom.children[0].children;
            var allHeight = 0
            Array.prototype.slice.call(aLi).forEach(function(li) {
                allHeight += li.offsetHeight
            })
            var barHeight = this.barDom.offsetHeight
            var scrollBarScaleY = barHeight / allHeight
            var btnSize = Math.round(barHeight * scrollBarScaleY)
            return {
                scrollBarScaleY,
                btnSize: (btnSize > 8 ? btnSize : 8)
            }
        },
        scrollBar: function(y) {
            var { scrollBarScaleY, btnSize } = this.getBarInfo()
            console.log(scrollBarScaleY, btnSize)
            var btn = this.btnDom
            var scrollY = Math.round(scrollBarScaleY * y * -1)
            btn.style.height = btnSize + 'px'
            btn.style.transform = 
            btn.style.msTransform = 
            btn.style.OTransform = 
            btn.style.MozTransform = 
            btn.style.webkitTransform = "translateY(" + scrollY + "px) translateZ(0)";
        }
    }

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = TScroll
    }else {
        window.TScroll = TScroll
    }
})()