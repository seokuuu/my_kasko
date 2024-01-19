import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

/* ==============================
    경매 시작 단가 관리 (startprice)
================================= */

const urls = {
  startprice: 'admin/price',
}

// 목록
export function getStartPrice(data) {
  console.log('data', data)
  return client.get(`${urls.startprice}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}

// 삭제
export const deleteStartPrice = (id) => {
  return client.delete(`${urls.startprice}/${id}`)
}

// 단가 일괄 변경
export const patchEditPrice = (data) => {
  return client.patch(`${urls.startprice}/price`, data)
}

// 단가 등록
export const unitPricePost = (data) => {
  return client.post(`${urls.startprice}`, data)
}

// const postMutation = useMutationQuery('', postBidding)

// // 응찰 버튼 POST
// const confirmOnClickHandler = () => {
//   postMutation.mutate(input)
// }
