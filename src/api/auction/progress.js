import qs from 'qs'
import { client } from '..'

const urls = {
	progress: 'auction/progress',
}

// export function getProgess(data) {
// 	console.log('data', data)
// 	return client.get(`${urls.progress}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
// }

// productNumberList[] 오류가 남
export function getProgess(data) {
	return client.get(urls.progress, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
}
