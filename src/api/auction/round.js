import { useQuery } from '@tanstack/react-query'
import { client } from '..'

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

export function getAuctionTime() {
	return client.get(urls.getAuction + '/time')
}

// 상세 GET
export function getDetailAuction(data) {
	return client.get(`${urls.getAuction}/${data.auctionNumber}`, { params: data })
}

// 추가 제품 목록 GET
export function getExtraProductList(data) {
	return client.get(urls.getExtraProduct, { params: data })
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
