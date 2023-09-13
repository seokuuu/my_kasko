import { client } from '../index'

const urls = {
  getAuction: 'admin/auction',
}
/* ==============================
    경매관리 - 경매 회차 관리
============================== */
export function getAuction(data) {
  return client.get(`${urls.getAuction}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
}
