/* ==============================
    운영 관리 - FAQ
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

// API URL
const urls = 'faq'

// 쿼리 키
export const FAQ_KEYS = {
  getList: ['operate', 'faq', 'list'],
  getDetails: ['operate', 'faq', 'details'],
  update: ['operdate', 'faq', 'update'],
  create: ['operdate', 'faq', 'create'],
  remove: ['operdate', 'faq', 'remove'],
}

// 목록
export function useFaqListQuery(params) {
  return useQuery({
    queryKey: FAQ_KEYS.getList,
    queryFn: async function () {
      const response = await client.get(urls, { params })
      return response.data.data
    },
  })
}

// 상세
export function useFaqDetailsQuery(id) {
  return useQuery({
    queryKey: FAQ_KEYS.getDetails,
    queryFn: async function () {
      const response = await client.get(`${urls}/${id}`)
      return response.data.data
    },
    enabled: !!id,
  })
}

// 등록
export function useFaqRegisterMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: FAQ_KEYS.create,
    mutationFn: async function (params) {
      return client.post(urls, params)
    },
    onSuccess() {
      navigate('/operate/faq')
    },
  })
}

// 수정
export function useFaqUpdateMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: FAQ_KEYS.update,
    mutationFn: async function (params) {
      return client.patch(urls, params)
    },
    onSuccess() {
      navigate('/operate/faq')
    },
  })
}

// 삭제
export function useFaqRemoveMutation() {
  return useMutation({
    mutationKey: FAQ_KEYS.remove,
    mutationFn: async function (id) {
      return client.delete(`${urls}/${id}`)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: FAQ_KEYS.getList,
      })
      // queryClient.invalidateQueries({
      //   queryKey: FAQ_KEYS.getList,
      // })
    },
    onError() {
      alert('삭제에 실패하였습니다.')
    },
  })
}
