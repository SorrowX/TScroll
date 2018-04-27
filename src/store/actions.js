import * as types from './mutation-types'

// 有料短视频
export const setYlAllData = function({commit, state}, allData) {
    commit(types.SET_YL_ALL_DATA, allData)
}
