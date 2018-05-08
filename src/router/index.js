import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SimpleTscroll from '@/components/simple-tscroll/SimpleTscroll'
import XunLeiLive from '@/components/xunlei-live/live'
import YouLiao from '@/components/youliao/youliao'
import YouLiaoVideo from '@/components/youliao/youliao-video'
import Sv from '@/components/sv-video/sv'
import SvVideo from '@/components/sv-video/sv-video'
import SvList from '@/components/sv-video/sv-list'

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
            component: YouLiao,
            children: [
                {
                  path: 'video/:id',
                  component: YouLiaoVideo
                }
            ]
        },
        {
            path: '/sv/:id',
            name: 'sv',
            component: Sv,
            children: [
                {
                  path: 'sv-video/:key',
                  component: SvVideo
                }
            ]
        },
        {
            path: '/sv-list',
            name: 'svList',
            component: SvList,
            children: [
                {
                  path: 'sv-video/:id',
                  component: SvVideo
                }
            ]
        }
    ]
})
