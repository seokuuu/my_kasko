import { client, formHeaders } from '..'

/* ==============================
    경매 시작 단가 관리 (startprice)
================================= */

const urls = {
	startprice: 'admin/price',
}

// 목록
export function getStartPrice(data) {

	return client.get(`${urls.startprice}`, { params: data })
}

// 삭제
export const deleteStartPrice = (id) => {
	return client.delete(`${urls.startprice}/${id}`)
}

// 단가 일괄 변경
export const patchEditPrice = (data) => {
	return client.patch(`${urls.startprice}/price`, data)
}

// 단가 등록
export const unitPricePost = (data) => {
	return client.post(`${urls.startprice}`, data)
}

// 대량 등록
export const uploadMultiPrice = (data) => {
	const form = new FormData()
	form.append('excel', data.file)

	return client.post(`${urls.startprice}/excel`, form, {
		headers: formHeaders,
		// onUploadProgress: (e) => {

		// },
	})
}

// const postMutation = useMutationQuery('', postBidding)

// // 응찰 버튼 POST
// const confirmOnClickHandler = () => {
//   postMutation.mutate(input)
// }
