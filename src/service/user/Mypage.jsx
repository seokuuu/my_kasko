import { client } from '../../api'

const headers = { 'Content-Type': 'multipart/form-data' }

const URL = {
  Destination: '/member/destination',
}

// 목적지 관리 - 목록 "GET"
export const getMemberDestination = (data) => {
  return client.get(
    `${URL.Destination}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&category=${data.category}&keyword=${data.keyword}`,
  )
}

// 목적지 관리 - 등록 "POST"
export const postMemberDestination = (params) => client.post(URL.Destination, params)


