// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
	error: require('./common/images/common/loading.gif'),
	loading: require('./common/images/common/loading.gif'),
	attempt: 1
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
