import { client } from '..'
import qs from 'qs'
const urls = {
	detailprogress: 'progress-detail',
}

// export function getDetailProgress(data) {
// 	console.log('data', data)
// 	return client.get(
// 		`${urls.detailprogress}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&customerCode=${data.customerCode}`,
// 	)
// }

export function getDetailProgress(data) {
	return client.get(urls.detailprogress, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
}
