/* ==============================
    운영 관리 - 공지사항&자료실 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { queryClient } from '../query'

// 폼 데이터 헤더
const headers = { 'Content-Type': 'multipart/form-data' }

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
    enabled: !!id,
  })
}

// 공지 & 자료실 등록(type 값에 따라 성공시 리다이렉트되는 url이 다릅니다.)
export function useNoticeRegisterMutation(type) {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: NOTICE_KEYS.registerNotice,
    mutationFn: async function (params) {
      console.log('등록 API  동작')

      const noneFileData = {
        title: params.title,
        content: params.content,
        status: params.status,
        type: params.type,
      }

      const fileData = params.fileList

      const form = new FormData()
      form.append(
        'request',
        // JSON.stringify(noneFileData),
        new Blob([JSON.stringify(noneFileData)], {
          type: 'application/json',
        }),
      )

      if (fileData) {
        fileData.forEach((f, i) => {
          console.log('post file :', f)
          form.append(`fileList[${i}]`, f)
        })
      }

      for (let key of form.keys()) {
        console.log(key, ':', form.get(key))
      }
      return client.post(urls, form, { headers })
    },
    onSuccess() {
      if (type === 'notice') {
        navigate('/operate/notice')
      } else {
        navigate('/operate/datasheet')
      }
      queryClient.invalidateQueries({
        queryKey: NOTICE_KEYS.getNoticeList,
      })
    },
    onError(error) {
      console.log('등록 에러 :', error)
    },
  })
}
// 공지 & 자료실 수정
export function useNoticeUpdateMutation(type) {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: NOTICE_KEYS.updateNotice,
    mutationFn: async function (params) {
      return client.patch(urls, {
        request: params,
      })
    },
    onSuccess() {
      if (type === 'notice') {
        navigate('/operate/notice')
      } else {
        navigate('/operate/datasheet')
      }
      queryClient.invalidateQueries({
        queryKey: NOTICE_KEYS.getNoticeList,
      })
    },
    onError(error) {
      console.error(error)
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
