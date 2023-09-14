import { client } from '../index'

const urls = {
  getDestination: 'member/destination',
}
/* ==============================
    마이페이지 - 목적지 관리
============================== */
// export function getAuction(data) {
//   return client.get(`${urls.getAuction}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
// }

export function deleteDestination(id) {
  return client.delete(`${urls.getDestination}/${id}`)
}
