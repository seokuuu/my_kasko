import { client } from '.'
import qs from 'qs'
import useAlert from '../store/Alert/useAlert'
import { useQuery, useMutation } from '@tanstack/react-query'
import { queryClient } from './query'

const urls = {
	order: '/admin/order',
	orderDetail: '/admin/order/detail',
	orderDetailProno: '/admin/order/product',
	orderCancel: '/admin/order/cancel', // 상시 판매 관리 > 주문 확인 > 부분 취소
	orderDeposit: '/admin/order/deposit', // 상시 판매 관리 > 주문 확인 상세 > 부분 입금 취소
}

export async function useOrderCancel(data) {
	const response = await client.post(`${urls.orderCancel}`, data)
	return response.data
}

export const useDepositOrderCancel = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (cancelParam) => {
			await client.post(urls.orderCancel, cancelParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: 'order' })
			return simpleAlert('주문을 취소하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '주문 취소 중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}

export async function getOrderList(data) {
	const response = await client.get(`${urls.order}`, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
	return response.data
}

export async function getDetailOrderList(data) {
	const response = await client.get(`${urls.orderDetail}`, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
	return response.data
}

export async function getProNoList(data) {
	const response = await client.get(`${urls.orderDetailProno}`, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
	return response.data
}
