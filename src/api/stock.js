import qs from 'qs'
import { client, formHeaders } from '.'

const urls = {
	incoming: '/admin/store',
}

export async function getInComingList(data) {
	const response = await client.get(`${urls.incoming}`, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
	return response.data
}

export async function deleteIncomeProduct(data) {
	try {
		return await client.delete(`${urls.incoming}/${data}`)
	} catch (e) {
		throw new Error('선택된 제품이 없습니다.')
	}
}
export async function incomingConfirm(data) {
	try {
		const response = await client.post(`${urls.incoming}/confirm/${data}`)
		return response
	} catch (e) {
		throw new Error('선택된 제품이 없습니다.')
	}
}

// 엑셀 대량 등록
export async function postExcelSubmitProduct(data) {
	const form = new FormData()
	form.append('excel', data)

	try {
		return await client.post(`${urls.incoming}`, form, {
			headers: formHeaders,
		})
	} catch (e) {
		alert(e?.data?.message)
	}
}
