import { client } from '.'

const urls = {
	Destination: '/member/destination',
	privacy: '/member/privacy',
	favorite: '/member/favorite',
}

// 목적지 쿼리키
export const destinationQueryKey = {
	// 목록 API
	list: 'getDestination',
}

// 선호제품 쿼리키
export const preferQueryKey = {
	// 목록 API
	list: 'getCustomerfavorite',
}

/* ==============================
    마이페이지 - 목적지 관리 - 목적지 등록
============================== */
export function postDestination(data) {
	return client.post(urls.Destination, data)
}

export function getDestination(data) {
	return client.get(`${urls.Destination}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}

export function getDetailDestination(data) {
	return client.get(`${urls.Destination}/${data}`)
}

export function patchDestination(data) {
	return client.patch(urls.Destination, data)
}

/* ==============================
    마이페이지 - 개인정보수정
============================== */
export function updateCustomer(input, fileForms) {
	const form = new FormData()

	form.append(
		'request',
		new Blob([JSON.stringify(input)], {
			type: 'application/json',
		}),
	)
	// fileForms에 있는 파일 정보 추가

	if (fileForms.bankBook instanceof File) {
		form.append('bankBook', fileForms.bankBook)
	}

	if (fileForms.registration instanceof File) {
		form.append('registration', fileForms.registration)
	}

	for (let [key, value] of form.entries()) {
		console.log(key, value)
	}

	return client.patch(urls.privacy, form, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
}

// 상세
export function getCustomerPrivacy() {
	return client.get(urls.privacy)
}
// 중복확인
export function checkBusinessNumber(data) {
	return client.post(`${urls.privacy}/${data}`)
}

/* ==============================
    마이페이지 - 선호제품관리
============================== */
export function getCustomerfavorite(data) {
	return client.get(`${urls.favorite}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}
export function postCustomerfavorite(data) {
	console.log('data !!!', data)
	return client.post(urls.favorite, data)
}
export function getDetailCustomerfavorite(data) {
	return client.get(`${urls.favorite}/${data}`)
}

export function patchCustomerfavorite(data) {
	return client.patch(urls.favorite, data)
}
export function deleteCustomerfavorite(data) {
	return client.delete(`${urls.favorite}/${data}`)
}
