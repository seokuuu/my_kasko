import { client } from '../../api'

const headers = { 'Content-Type': 'multipart/form-data' }

const URL = {
  CustomerFind: '/auction/successfulBid/customer', // 고객사 찾기
}

// 목적지 관리 - 목록 "GET"
export const getCustomerFind = (data) => {
  return client.get(URL.CustomerFind, { params: data })
}
