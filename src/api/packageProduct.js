import { client } from '.'

const packageProductEndpoint = '/package-product'

export const getPackageProductList = async (data) => {
  return client.get(packageProductEndpoint, { params: data })
}
