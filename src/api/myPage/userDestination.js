import { client } from '../index'

const urls = {
  getDestination: 'member/destination',
}
/* ==============================
    마이페이지 - 목적지 관리
============================== */
export function getDestination(data) {
  return client.get(`${urls.getDestination}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
}

export function deleteDestination(id) {
  return client.delete(`${urls.getDestination}/${id}`)
}
