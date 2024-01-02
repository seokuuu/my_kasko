import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  detailprogress: 'progress-detail',
}

export function getDetailProgress(data) {
  console.log('data', data)
  return client.get(
    `${urls.detailprogress}?pageNum=${data.pageNum}&pageSize=${data.pageSize}&customerCode=${data.customerCode}`,
  )
}
