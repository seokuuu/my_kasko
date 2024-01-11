import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  bidding: 'auction',
  bid: 'auction/bid',
}

export function getBidding(data) {
  console.log('data', data)
  return client.get(`${urls.bidding}/list?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
}

export function postBidding(data) {
  return client.post(urls.bid, data)
}
