import { client } from './index'

const urls = {
  cancleOrderList: '/admin/order/cancel-all',
  depositCancleOrderList: '/admin/order/deposit-all'
}
export async function cancelOrderList(data) {
  try{
    const response = await client.post(`${urls.cancleOrderList}`,data)
    return response.data
  }catch(e){
    throw new Error('주문 취소 중 오류가 발생했습니다.');
  }
}export async function depositCancleOrderList(data) {
  try{
    const response = await client.post(`${urls.depositCancleOrderList}`,data)
    return response.data
  }catch(e){
    throw new Error('입금 취소 중 오류가 발생했습니다.');
  }
}