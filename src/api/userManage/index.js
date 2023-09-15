import { client } from '../index'

const urls = {
  customer: 'admin/customer',
}
/* ==============================
    사용자관리 - 고객사 관리
============================== */
// export function getAuction(data) {
//   return client.get(`${urls.getAuction}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
// }
// {{dev}}/api/admin/customer?pageNum=1&pageSize=5
export async function getCustomer(data) {
  // console.log(data)
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
// {{dev}}/api/admin/customer?pageNum=1&pageSize=5&status=일반&approvalStatus=1&category=고객사&keyword=회사명1
