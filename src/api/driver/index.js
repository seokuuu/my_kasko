/* ==============================
    배차기사 API
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '../index'
import { useNavigate } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'

const DRIVER_URL = '/driver'

export const QUERY_KEY = {
  list: ['driver', 'list'],
  get: ['driver', 'details'],
  carNumberValid: ['driver', 'car-number-valid'],
  update: ['driver', 'update'],
  create: ['driver', 'create'],
  remove: ['driver', 'remove'],
}

// 목록
export function useDriverListQuery(params) {
  return useQuery({
    queryKey: QUERY_KEY.list,
    queryFn: async function () {
      const response = await client.get(DRIVER_URL, { params })
      return response.data.data
    },
  })
}

// 상세
export function useDriverGetQuery(id) {
  return useQuery({
    queryKey: QUERY_KEY.get,
    queryFn: async function () {
      const response = await client.get(`${DRIVER_URL}/${id}`)
      return response.data.data
    },
    cacheTime: 0,
    enabled: !!id,
  })
}

// 배차 차량 번호 valid
export async function driverCarNumberValidQuery(number) {
  try {
    await client.post(`${DRIVER_URL}/${number}`)
    return true
  } catch (e) {
    return false
  }
}

// 등록
export function useDriverCreateMutation() {
  const queryClient = new QueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.create,
    mutationFn: async function (params) {
      return client.post(DRIVER_URL, params)
    },
    onSuccess() {
      window.alert('등록되었습니다.')
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.list })
    },
    onError() {
      window.alert('등록에 실패하였습니다.')
    },
  })
}

// 수정
export function useDriverUpdateMutation() {
  const queryClient = new QueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.update,
    mutationFn: async function (params) {
      return client.patch(DRIVER_URL, params)
    },
    onSuccess() {
      window.alert('수정되었습니다.')
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.list,
      })
    },
    onError() {
      window.alert('수정에 실패하였습니다.')
    },
  })
}

// 삭제
export function useDriverRemoveMutation() {
  const queryClient = new QueryClient()
  return useMutation({
    mutationKey: QUERY_KEY.remove,
    mutationFn: async function (id) {
      return client.delete(`${DRIVER_URL}/${id}`)
    },
    onSuccess() {
      window.alert('삭제하였습니다.')
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.list,
      })
    },
    onError() {
      window.alert('삭제에 실패하였습니다.')
    },
  })
}
