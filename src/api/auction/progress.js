import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

const urls = {
  progress: 'auction/progress',
}

export function getProgess(data) {
  console.log('data', data)
  return client.get(`${urls.progress}?pageNum=${data.pageNum}&pageSize=${data.pageSize}`)
}
