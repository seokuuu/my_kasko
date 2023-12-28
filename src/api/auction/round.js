import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  getAuction: 'admin/auction',
}

const keys = {
  getAuction: 'getAuction',
}
/* ==============================
    경매관리 - 경매 회차 관리
============================== */
export function getAuction(data) {
  console.log('data', data)
  return client.get(`${urls.getAuction}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
}

export function postAuction(data) {
  return client.post(urls.getAuction, data)
}

export function deleteAuction(id) {
  return client.delete(`${urls.getAuction}/${id}`)
}

// 공지&자료실 목록 조회
export function useGetAuctionList(params) {
  console.log('params', params)
  return useQuery({
    queryKey: keys.getAuction,
    queryFn: async function () {
      const response = await client.get(urls, {
        params,
      })

      return response.data.data
    },
  })
}
