import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import state from './state.js'
import * as getters from './getters.js'
import mutations from './mutations.js'
import * as actions from './actions.js'

const debug = true
Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
