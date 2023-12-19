/* ==============================
    운영 관리 - 팝업 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

// API ENDPOINT
const urls = 'popup'

// 쿼리키
const POPUP_KEYS = {
  getPopupList: ['operate', 'popup', 'list'],
  getPopup: ['operate', 'popup', 'details'],
  registerPopup: ['operate', 'popup', 'register'],
  updatePopup: ['operate', 'popup', 'update'],
  removePopup: ['operate', 'popup', 'remove'],
}

// 팝업 목록 조회
export function usePopupListQuery(params) {
  return useQuery({
    queryKey: POPUP_KEYS.getPopupList,
    queryFn: async function () {
      const response = await client.get(urls, { params })
      return response.data.data
    },
  })
}

// 팝업 상세 조회
export function usePopupDetailsQuery(id) {
  return useQuery({
    queryKey: POPUP_KEYS.getPopup,
    queryFn: async function () {
      const response = await client.get(`${urls}/${id}`)

      return response.data.data
    },
    enabled: !!id,
  })
}

// 팝업 등록
export function usePopupRegisterMutation() {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: POPUP_KEYS.registerPopup,
    mutationFn: async function (params) {
      return client.post(urls, params)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: POPUP_KEYS.getPopupList,
      })
      navigate('/operate/exposure')
    },
    onError() {
      alert('등록에 실패하였습니다.')
    },
  })
}

// 팝업 수정
export function usePopupUpdateMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: POPUP_KEYS.updatePopup,
    mutationFn: async function (params) {
      return client.patch(urls, params)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: POPUP_KEYS.getPopupList,
      })
      navigate('/operate/exposure')
    },
    onError() {
      alert('수정에 실패하였습니다.')
    },
  })
}

// 팝업 삭제
export function usePopupRemoveMutation() {
  return useMutation({
    mutationKey: POPUP_KEYS.removePopup,
    mutationFn: async function (id) {
      return client.delete(`${urls}/${id}`)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: POPUP_KEYS.getPopupList,
      })
    },
    onError() {
      alert('삭제에 실패하였습니다.')
    },
  })
}