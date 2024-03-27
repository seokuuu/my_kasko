import { client } from '..'
import qs from 'qs'
const urls = {
	bidding: 'auction',
	bid: 'auction/bid',
	agreement: 'admin/auction/agreement',
}

// 로그인 후 이용해주세요 오류 남. 필터 기능 없이 일단 진행
// pageNum=1&pageSize=50&type=%EB%8B%A8%EC%9D%BC
// pageNum: 1
// pageSize: 50
// type: 단일

// productNumberList 오류가 남
export function getBidding(data) {
	return client.get(`${urls.bidding}/list`, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
}

// export function getBidding(data) {
// 	return client.get(`${urls.bidding}/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
// }

export function getBiddingPackDetail(data) {
	return client.get(
		`${urls.bidding}/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}&packageNumber=${data.packageNumber}`,
	)
}

// 응찰
export function postBidding(data) {
	return client.post(urls.bid, data)
}

// 입찰 동의 내역 등록
export function postAgreement(data) {
	return client.post(urls.agreement, data)
}

//입찰 동의 여부 체크
export function getAgreement(data) {
	return client.get(`${urls.agreement}/${data}`)
}

// 경매 응찰 목적지 찾기
export function getAuctionDestination() {
	return client.get(`${urls.bidding}/destination`)
}
