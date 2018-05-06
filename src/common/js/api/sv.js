import axios from 'axios'

let key = 0
let serverData = getStaticData()

function getMediaInfo(options) {
	let {dir, type, frame, size, thumbFolderName, forceUpdate, page, num} = options
	let url = `/api/getMediaInfo?dir=${dir}&type=${type}&frame=${frame}&size=${size}&` +
	          `thumbFolderName=${thumbFolderName}&forceUpdate=${forceUpdate}&page=${page}&num=${num}`         
	return axios.get(url)
}

function getServerData(dirId) {
	let map = {
		'1': 'love',
		'2': 'you'
	}
	let dir = map[dirId] ? map[dirId] : 'love'
    return getMediaInfo({
	    dir: `C:\/Code\/Code\/Vue\/cli\/TScroll\/file-server\/public\/media\/fine-quality\/${dir}`,
	    type: 'jpg',
	    frame: 50,
	    thumbFolderName: 'jpg',
	    forceUpdate: false,
	    size: '660x370'
	}).then((ret) => {
		let data = ret.data.Body.result
		data = data.map((item) => {
			item.time = `00:25`
			item.count = `${Math.floor(Math.random()*1000)}次播放`
			return item
		})
		return {
			data,
			arrTag: ret.data.Body.arrTag
		}
	})
}

function getStaticData() {
	let ret = [],
		self = this
	Array.apply(null, {length: 40}).forEach((item, index) => {
		ret.push({
			title: '中国男子送非洲小孩一部手机，网友：真大方',
			count: '529次播放',
			time: '00:25',
			id: key++,
			videoPath: 'https://vd3.bdstatic.com/mda-ie4mdvis685kuqmx/hd/mda-ie4mdvis685kuqmx.mp4?playlist=%5B%22hd%22%2C%22sc%22%5D&auth_key=1525524818-0-0-1d91a03e59bf5c946bc809fd02cc4680&bcevod_channel=searchbox_feed&pd=test2',
			thumbPath: 'https://timgmb.bdimg.com/timg?searchbox_feed&quality=80&wh_rate=0&size=f660_370&ref=http%3A%2F%2Fwww.baidu.com&sec=1525477108&di=389ba6472271e3682c96742c11ce769a&src=http%3A%2F%2Fhjim1z9nvmtp56c2yvc.exp.bcevod.com%2Fmda-iduxc1s1r7ah0q8z%2Fmda-iduxc1s1r7ah0q8z00008.jpg'
		})
	})
	return ret
}

function getStaticTag() {
	let id = 0
	let arr = ['推荐', '搞笑', '影视', '直播', '社会', '本地']
	return Array.apply(null, { length: 20 }).map((item, index) => {
        return {
        	tag: arr[Math.floor(Math.random() * arr.length)],
	    	id: ++id
        }
	})
}


export function initData(dirId) {
	return getServerData(dirId).then((ret) => {
		serverData = ret.data
		return ret.arrTag
	}).catch((e) => {
		serverData = getStaticData()
		return getStaticTag()
	})
}

export function getData(num) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let len = num > serverData.length ? serverData.length : num
			if (len > 0) {
				return resolve(serverData.splice(0, num))
			} else {
				return resolve([])
			}
		}, 1200)
	})
}

