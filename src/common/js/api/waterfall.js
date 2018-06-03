import axios from 'axios'

export function getData(options) {
	let url = `/api/km`         
	return axios.get(url)
}