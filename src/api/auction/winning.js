import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  winning: 'auction/successfulBid',
  allDetlete: 'auction/successfulBid/cancel-all',
}

export function getWinning(data) {
  console.log('data !@#', data)
  return client.get(`${urls.winning}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&orderType=${data.orderType}`)
}

export function deleteBidding(data) {
  return client.post(urls.allDetlete, data)
}
