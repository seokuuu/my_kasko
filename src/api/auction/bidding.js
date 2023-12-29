import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  bidding: 'auction/list',
}

export function getBidding(data) {
  console.log('data', data)
  return client.get(`${urls.bidding}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&type=${data.type}`)
}
