import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'
import qs from 'qs'

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
