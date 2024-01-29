import { client } from '.'

export const packageProductEndpoint = '/package-product'

export const getPackageProductList = async (data) => {
	return client.get(packageProductEndpoint, { params: data })
}
