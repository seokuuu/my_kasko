import { client } from '../../api'

const headers = { 'Content-Type': 'multipart/form-data' }

const URL = {
  Order: '/admin/order', // 목적지 관리
}

/* ==============================
    주문 관리 - 주문 관리 (Order)
============================== */

// 주문 관리 - 목록 "GET"
export const getAdminOrder = (data) => {
  return client.get(URL.Order, { params: data })
}
