import { client } from '../index'

const urls = {
  customer: 'admin/customer',
  clientDestination: 'admin/customer-destination',
  userManage: 'admin/member',
  profileEdit: 'admin/privacy',
}
/* ==============================
    사용자관리 - 고객사 관리
============================== */
export async function getCustomer(data) {
  try {
    const response = await client.get(`${urls.customer}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export function deleteCustomer(id) {
  return client.delete(`${urls.customer}/${id}`)
}

/* ==============================
    사용자관리 - 고객사 목적지 관리
============================== */
export function get_clientDestination(data) {
  return client.get(`${urls.clientDestination}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}

export function delete_clientDestination(id) {
  return client.delete(`${urls.clientDestination}/${id}`)
}

export function post_clientDestination(data) {
  return client.post(urls.clientDestination, data)
}

export function patch_clientDestination(data) {
  return client.patch(urls.clientDestination, data)
}

/* ==============================
    사용자관리 - 사용자 관리
============================== */
// {{dev}}/api/admin/member?pageNum=1&pageSize=50
export function get_userManage(data) {
  return client.get(`${urls.userManage}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}

export function delete_userManage(id) {
  return client.delete(`${urls.userManage}/${id}`)
}

export function post_userManage(data) {
  return client.post(urls.userManage, data)
}

export function patch_userManage(data) {
  return client.patch(urls.userManage, data)
}

/* ==============================
    사용자관리 - 개인정보 수정
============================== */
export function patchProfile(data) {
  return client.patch(urls.profileEdit, data)
}

export function getProfile() {
  return client.get(urls.profileEdit)
}
