import { client } from './index'

const urls = {
	cancelOrder: '/admin/order/cancel',
	cancelOrderList: '/admin/order/cancel-all',
	depositCancelOrder: '/admin/order/deposit',
	depositCancelOrderList: '/admin/order/deposit-all',
}

// 부분 주문 취소
export async function cancelOrderPost(data) {
	try {
		const response = await client.post(`${urls.cancelOrder}`, data)
		return response.data
	} catch (e) {
		throw new Error('주문 취소 중 오류가 발생했습니다.')
	}
}

// 전체 주문 취소
export async function cancelOrderList(data) {
	try {
		const response = await client.post(`${urls.cancelOrderList}`, data)
		return response.data
	} catch (e) {
		throw new Error('주문 취소 중 오류가 발생했습니다.')
	}
}

// 부분 입금 취소
export async function depositCancelOrder(data) {
	try {
		const response = await client.post(`${urls.depositCancelOrder}`, data)
		return response.data
	} catch (e) {
		throw new Error('입금 취소 중 오류가 발생했습니다.')
	}
}

// 전체 입금 취소
export async function depositCancelOrderList(data) {
	try {
		const response = await client.post(`${urls.depositCancelOrderList}`, data)
		return response.data
	} catch (e) {
		throw new Error('입금 취소 중 오류가 발생했습니다.')
	}
}
