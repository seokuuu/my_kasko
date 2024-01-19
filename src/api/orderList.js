import { client } from '.'
import qs from 'qs'

const urls = {
  order: '/admin/order',
  orderDetail: '/admin/order/detail',
  orderDetailProno: '/admin/order/product',
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
