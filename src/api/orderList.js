import { client } from '.'
import qs from 'qs'

const urls = {
  order: '/admin/order',
  orderDetail: '/admin/order/detail',
  orderDetailProno: '/admin/order/product',
  cancleAllOrderList: '/admin/order/cancel-all',
  depositCancleAllOrderList: '/admin/order/deposit-all'
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

export async function cancelAllOrderList(data) {
  try{
    const response = await client.post(`${urls.cancleAllOrderList}`,data)
    return response.data
  }catch(e){
    throw new Error('주문 취소 중 오류가 발생했습니다.');
  }
}export async function depositCancleAllOrderList(data) {
  try{
    const response = await client.post(`${urls.depositCancleAllOrderList}`,data)
    return response.data
  }catch(e){
    throw new Error('입금 취소 중 오류가 발생했습니다.');
  }
}