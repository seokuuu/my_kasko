import { client } from '../../api'

const saleProductEndpoint = '/sale-product'

export const getSaleProductList = async (data) => {
  return client.get(saleProductEndpoint, { params: data })
}

export const getSaleProductDetail = async (uid) => {
  return client.get(`${saleProductEndpoint}/${uid}`)
}
