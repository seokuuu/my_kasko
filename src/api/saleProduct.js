import { client } from '.'

const saleProductEndpoint = '/sale-product/order'

export const getSaleProductList = async (data) => {
  return client.get(saleProductEndpoint, { params: data })
}

export const getSaleProductDetail = async (uid) => {
  return client.get(`${saleProductEndpoint}/${uid}`)
}
