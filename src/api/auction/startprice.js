import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  startprice: 'admin/price',
}

export function getStartPrice(data) {
  console.log('data', data)
  return client.get(`${urls.startprice}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}
