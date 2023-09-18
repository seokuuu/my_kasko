import { client } from '../../api'

const headers = { 'Content-Type': 'multipart/form-data' }

const URL = {
  Destination: '/admin/destination',
}

// 목적지 관리 - 목록 "GET"
export const getAdminDestination = (data) => {
  return client.get(URL.Destination, { params: data })
}

// 목적지 관리 - 등록 "POST"
export const postAdminDestination = (params) => client.post(URL.Destination, params)
