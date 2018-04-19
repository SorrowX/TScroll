// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import fastclick from 'fastclick'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: require('./assets/logo.png'),
    loading: require('@/common/images/common/loading.jpg'),
    attempt: 1,
    // the default is ['scroll', 'wheel', 'mousewheel', 'resize', 'animationend', 'transitionend']
    // listenEvents: [ 'scroll' ]
})

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
