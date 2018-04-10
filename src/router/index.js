import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SimpleTscroll from '@/components/SimpleTscroll'

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
        }
    ]
})
