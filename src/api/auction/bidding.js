import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
	bidding: 'auction',
	bid: 'auction/bid',
}

// 로그인 후 이용해주세요 오류 남. 필터 기능 없이 일단 진행
// export function getBidding(data) {
// 	return client.get(urls.bidding, { params: data })
// }

export function getBidding(data) {
	console.log('data', data)
	return client.get(`${urls.bidding}/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
}

export function postBidding(data) {
	return client.post(urls.bid, data)
}
