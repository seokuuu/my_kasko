import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
	getAuction: 'admin/auction',
	getExtraProduct: 'admin/auction/product',
}

const keys = {
	getAuction: 'getAuction',
}
/* ==============================
    경매관리 - 경매 회차 관리
============================== */

// 목록 GET
export function getAuction(data) {
	console.log('data @@!!@@', data)
	return client.get(urls.getAuction, { params: data })
}
// export function getAuction(data) {
// 	console.log('data', data)
// 	return client.get(`${urls.getAuction}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
// }

// 상세 GET
export function getDetailAuction(data) {
	return client.get(`${urls.getAuction}/${data.auctionNumber}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}

// 추가 제품 목록 GET
export function getExtraProductList(data) {
	return client.get(
		`${urls.getExtraProduct}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&saleType=${data.saleType}&registrationStatus=${data.registrationStatus}&type=${data.pageSize}`,
	)
}

// 등록 POST
export function postAuction(data) {
	return client.post(urls.getAuction, data)
}

// 삭제 DELETE
export function deleteAuction(id) {
	return client.delete(`${urls.getAuction}/${id}`)
}

// 수정 PATCH
export function editAuction(data) {
	return client.patch(urls.getAuction, data)
}

// 공지&자료실 목록 조회
export function useGetAuctionList(params) {
	console.log('params', params)
	return useQuery({
		queryKey: keys.getAuction,
		queryFn: async function () {
			const response = await client.get(urls, {
				params,
			})

			return response.data.data
		},
	})
}
