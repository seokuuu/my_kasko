import { client } from '.'

const saleProductEndpoint = '/sale-product/order'
const saleProductDetailsEndpoint = '/sale-product/order/details'

export const getSaleProductList = async (data) => {
	return client.get(saleProductEndpoint, { params: data })
}

export const getSaleProductDetail = async (data) => {
	return client.get(saleProductDetailsEndpoint, { params: data })
}
