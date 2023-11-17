import { client } from '../../api'

const headers = { 'Content-Type': 'multipart/form-data' }

const URL = {
  Shipping: '/admin/driver', // 배차기사 관리
}

/* ==============================
    출고 관리 - 배차기사 관리 (Shipping)
============================== */

// 배차기사 관리 - 목록 "GET"
export const getAdminShipping = (data) => {
  return client.get(URL.Shipping, { params: data })
}

// 배차기사 관리 - 등록 "POST"
export const postAdminShipping = (params) => client.post(URL.Shipping, params)

// 배차기사 관리 - 수정 "EDIT"
export const editAdminShipping = (params) => client.patch(URL.Shipping, params)

// 배차기사 관리 - 삭제 "DELETE"
export function deleteAdminShipping(id) {
  return client.delete(`${URL.Shipping}/${id}`)
}
