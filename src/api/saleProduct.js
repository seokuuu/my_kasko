import { client } from '.'
import qs from 'qs'

const saleProductEndpoint = '/sale-product/order'
const saleProductDetailsEndpoint = '/sale-product/order/details'

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
