import qs from 'qs'
import { client } from '..'
import { useQuery } from '@tanstack/react-query'

const urls = {
	winning: 'auction/successfulBid',
	winningDetail: 'auction/successfulBid/detail',
	winningCreate: 'auction/successfulBid/product',
	destination: '/search/destination',
}

// export function getWinning(data) {

// 	return client.get(`${urls.winning}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&orderType=${data.orderType}`)
// }

export function getWinning(data) {
	return client.get(urls.winning, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
}

// 낙찰 취소
export function deleteBidding(data) {
	return client.post(`${urls.winning}/cancel-all`, data)
}
// 입금 확인
export function depositConfirm(data) {
	return client.post(`${urls.winning}/confirm-all`, data)
}

// 부분 낙찰 취소
export function partDeleteBidding(data) {
	return client.post(`${urls.winning}/cancel/${data}`)
}

// 부분 입금 확인
export function partDepositConfirm(data) {
	return client.post(`${urls.winning}/confirm/${data}`)
}

// 목적지 승인 요청
export function destiApproveReq(data) {
	return client.post(`${urls.winning}/request`, data)
}
// 목적지 변경 반려
export function destiChangeReject(data) {
	return client.post(`${urls.winning}/reject`, data)
}
// 목적지 변경 승인
export function destiChangeApprove(data) {
	return client.post(`${urls.winning}/approve`, data)
}

// 입금 요청서 발행
export function publishDepositForm(data) {
	return client.post(`${urls.winning}/deposit`, data)
}

// 고객사 목적지 목록 (경매 낙찰 관리)
export const getAuctionDestination = () => {
	return client.get(`${urls.winning}/destination`)
}

// 고객사 목적지 목록 상세 (경매 낙찰 관리)
export const getAuctionDetailDestination = (data) => {
	return client.get(`${urls.winning}/destination?customerCode=${data}`)
}

// 응찰 목적지 조회
export function getDestinations(keyword) {
	return client.get(`${urls.destination}?keyword=${keyword}`)
}

// 낙찰 생성 경매 번호
export const getAuctionNumber = () => {
	return client.get(`${urls.winning}/number`)
}

// 낙찰 생성
export const successfulBid = (data) => {
	return client.post(`${urls.winning}`, data)
}

// export function getWinningDetail(data) {

// 	return client.get(
// 		`${urls.winningDetail}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&auctionNumber=${data.auctionNumber}&storage=${data.storage}&customerDestinationUid=${data.customerDestinationUid}&biddingStatus=${data.biddingStatus}`,
// 	)
// }

export function getWinningDetail(data) {
	return client.get(urls.winningDetail, {
		params: data,
	})
}

// 낙찰 생성 (낙찰 생성 제품 목록)
export function getWinningCreate(data) {
	return client.get(urls.winningCreate, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
}

export function useGetWinningCreateBiddingTotalPrice(data) {
	return useQuery({
		queryKey: ['winning', 'biddingtotalprice', data],
		queryFn: async function () {
			const response = await client.post('/auction/successfulBid/totalBiddingPrice', data)
			return response.data.data
		},
		enabled: data !== null,
	})
}

export function useGetWinningCreateBiddingProducts(data) {
	return useQuery({
		queryKey: ['winning', 'createbiddingProducts', data],
		queryFn: async function () {
			const response = await client.post('/auction/successfulBid/createBiddingProduct', data)
			return response.data.data
		},
		enabled: data !== null,
	})
}
