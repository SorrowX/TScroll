import * as types from './mutation-types'

// 有料短视频
const mutations = {
    [types.SET_YL_ALL_DATA](state, arrData) {
        if (Array.isArray(arrData)) {
        	arrData.forEach((obj) => {
				state.youliao.allData.push(obj)
        	})
        }
    }
}

export default mutations
