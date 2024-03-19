import { client } from '.'

const urls = {
	storageList: '/search/storage',
	spartList: '/search/spart',
}

export async function getStorageList() {
	const response = await client.get(`${urls.storageList}`)
	const storageList = response.data.data.map((item) => ({ value: item.storage, label: item.storage }))
	storageList.unshift({ value: '출발지', label: '출발지' })
	return storageList
}

export async function getSpartList() {
	const response = await client.get(`${urls.spartList}`)
	const spartList = response.data.data.map((item) => ({ value: item.spart, label: item.spart }))
	spartList.unshift({ value: '제품군', label: '제품군' })
	return spartList
}
