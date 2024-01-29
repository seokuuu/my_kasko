import { client } from '.'
import qs from 'qs'
import useAlert from '../store/Alert/useAlert'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from './query'

const saleProductEndpoint = '/sale-product/order'
const saleProductDetailsEndpoint = '/sale-product/order/details'
const saleProductOrderConfirmEndpoint = '/sale-product/order/confirm'
const saleProductOrderPartConfirmEndpoint = '/sale-product/order/confirm-part'

export const getSaleProductList = async (data) => {
	return client.get(saleProductEndpoint, {
		params: data,
		paramsSerializer: (param) => {
			return qs.stringify(param)
		},
	})
}

export const getSaleProductDetail = async (data) => {
	return client.get(saleProductDetailsEndpoint, { params: data })
}

export const usePostSaleProductOrderConfirm = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (orderParam) => {
			await client.post(saleProductOrderConfirmEndpoint, orderParam)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: 'cart' })
			return simpleAlert('부분 입금을 완료하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}

export const usePostSaleProductOrderPartConfirm = () => {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationFn: async (orderParam) => {
			const orderUids = orderParam.updateList.map((item) => item.uid)
			await client.post(saleProductOrderPartConfirmEndpoint, { orderUids })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: 'cart' })
			return simpleAlert('부분 입금을 완료하였습니다.')
		},
		onError: (error) => {
			return simpleAlert(error?.data?.message || '요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		},
	})
}
