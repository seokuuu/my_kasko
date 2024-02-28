import { client } from '.'

const urls = {
	storage: '/search/storage',
	spart: '/search/spart',
	destination: '/search/destination',
	destinationDiv: '/search/destination-div',
	customerDestination: '/search/customer-destination',
	spec: '/search/spec',
	special: '/search/destination-special',
	prono: '/search/prono',
}

// 창고 리스트
export async function getStorageList() {
	const response = await client.get(`${urls.storage}`)

	return response.data.data.map((item) => {
		return {
			label: item.storage,
			value: item.uid,
			address: item.address,
		}
	})
}

// 제품군 리스트
export async function getSPartList() {
	const response = await client.get(`${urls.spart}`)

	return response.data.data.map((item) => {
		return {
			label: item.spart,
			value: item.uid,
		}
	})
}

export function getDestinationFind() {
	const response = client.get(`${urls.destination}`)

	return response
}

export function getCustomerDestinationByCustomerCode(customerCode) {
	return client.get(`${urls.customerDestination}?customerCode=${customerCode}`)
}

export function getDestinations(keyword) {
	return client.get(`${urls.destination}?keyword=${keyword}`)
}

// 규격 약호 리스트
export async function getSpecList() {
	const response = await client.get(`${urls.spec}`)
	return response.data.data
}

// 특수 목적지
export async function getSpecialDestination() {
	const response = await client.get(urls.special)
	return response.data.data.map((item) => {
		return {
			label: item,
			value: item,
		}
	})
}

// 특수 목적지
export async function getProNoList() {
	const response = await client.get(urls.prono)
	return response.data.data
}
