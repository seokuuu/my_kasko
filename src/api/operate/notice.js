/* ==============================
    운영 관리 - 공지사항&자료실 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

// API ENDPOINT
const urls = 'notice'

// 쿼리키
const NOTICE_KEYS = {
  getNoticeList: ['operate', 'notice', 'list'],
  getNotice: ['operate', 'notice', 'details'],
  registerNotice: ['operate', 'notice', 'register'],
  updateNotice: ['operate', 'notice', 'update'],
  removeNotice: ['operate', 'notice', 'remove'],
  changeExposure: ['operate', 'notice', 'exposure'],
}

/// 공지&자료실 목록 조회
export function useNoticeListQuery(params) {
  return useQuery({
    queryKey: NOTICE_KEYS.getNoticeList,
    queryFn: async function () {
      const response = await client.get(urls, {
        params,
      })

      return response.data.data
    },
  })
}

/// 공지&자료실 상세
export function useNoticeDetailsQuery(id) {
  return useQuery({
    queryKey: NOTICE_KEYS.getNotice,
    queryFn: async function () {
      const response = await client.get(`${urls}/${id}`)

      return response.data.data
    },
  })
}

// 공지 & 자료실 등록
export function useNoticeRegisterMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: NOTICE_KEYS.registerNotice,
    mutationFn: async function (params) {
      return client.post(urls, { request: params })
    },
    onSuccess() {
      navigate('/operate/notice')
      queryClient.invalidateQueries({
        queryKey: NOTICE_KEYS.getNoticeList,
      })
    },
    onError() {
      alert('등록에 실패하였습니다.')
    },
  })
}
// 공지 & 자료실 수정
export function useNoticeUpdateMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: NOTICE_KEYS.updateNotice,
    mutationFn: async function (params) {
      return client.patch(urls, {
        request: params,
      })
    },
    onSuccess() {
      navigate('/operate/notice')

      queryClient.invalidateQueries({
        queryKey: NOTICE_KEYS.getNoticeList,
      })
    },
    onError() {
      alert('수정에 실패하였습니다.')
    },
  })
}

// 공지 & 자료실 삭제
export function useNoticeRemoveMutation() {
  return useMutation({
    mutationKey: NOTICE_KEYS.removeNotice,
    mutationFn: async function (id) {
      return client.delete(`${urls}/${id}`)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: NOTICE_KEYS.getNoticeList,
      })
    },
    onError() {
      alert('삭제에 실패하였습니다.')
    },
  })
}

// 상단 노출 변경
export function useNoticeExposureMutation() {
  return useMutation({
    mutationKey: NOTICE_KEYS.changeExposure,
    mutationFn: async function (params) {
      return client.patch(`${urls}/status`, params)
    },
  })
}
