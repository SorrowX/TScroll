import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SimpleTscroll from '@/components/simple-tscroll/SimpleTscroll'
import XunLeiLive from '@/components/xunlei-live/live'
import YouLiao from '@/components/youliao/youliao'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/simple-tscroll',
            name: 'SimpleTscroll',
            component: SimpleTscroll
        },
        {
            path: '/xunlei-live',
            name: 'XunLeiLive',
            component: XunLeiLive
        },
        {
            path: '/youliao',
            name: 'youliao',
            component: YouLiao
        }
    ]
})
