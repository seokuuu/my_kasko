import { client } from '../index'

const urls = {
  customer: 'admin/customer',
  clientDestination: 'admin/customer-destination',
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
// {{dev}}/api/admin/customer-destination?pageNum=1&pageSize=5
