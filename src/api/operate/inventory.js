<<<<<<< HEAD
/* ==============================
    운영 관리 - 창고 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '..'
import { queryClient } from '../query'

// API ENDPOINT
const urls = 'storage'

// 쿼리키
const STORAGE_KEYS = {
  getStorageList: ['operate', 'Storage', 'list'],
  getStorage: ['operate', 'Storage', 'details'],
  registerStorage: ['operate', 'Storage', 'register'],
  updateStorage: ['operate', 'Storage', 'update'],
  removeStorage: ['operate', 'Storage', 'remove'],
}

// 창고 목록 조회
export function useStorageListQuery(params) {
  return useQuery({
    queryKey: STORAGE_KEYS.getStorageList,
    queryFn: async function () {
      const response = await client.get(urls, { params })
      return response.data.data
    },
  })
}

// 창고 상세 조회
export function useStorageDetailsQuery(id) {
  return useQuery({
    queryKey: STORAGE_KEYS.getStorage,
    queryFn: async function () {
      const response = await client.get(`${urls}/${id}`)

      return response.data.data
    },
    enabled: !!id,
  })
}

// 창고 등록
export function useStorageRegisterMutation() {
  return useMutation({
    mutationKey: STORAGE_KEYS.registerStorage,
    mutationFn: async function (params) {
      return client.post(urls, params)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: STORAGE_KEYS.getStorageList,
      })
    },
    onError() {
      alert('등록에 실패하였습니다.')
    },
  })
}

// 창고 수정
export function useStorageUpdateMutation() {
  return useMutation({
    mutationKey: STORAGE_KEYS.updateStorage,
    mutationFn: async function (params) {
      return client.patch(urls, params)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: STORAGE_KEYS.getStorageList,
      })
    },
    onError() {
      alert('수정에 실패하였습니다.')
    },
  })
}

// 창고 삭제
export function useStorageRemoveMutation() {
  return useMutation({
    mutationKey: STORAGE_KEYS.removeStorage,
    mutationFn: async function (id) {
      return client.delete(`${urls}/${id}`)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: STORAGE_KEYS.getStorageList,
      })
    },
    onError() {
      alert('삭제에 실패하였습니다.')
    },
  })
}
=======
import {client} from '../index'
import qs from "qs";

const urls ={ 
  inventory:'/inventory-ledger'
}

export async function getInventoryLedger(data) {
   const response = await client.get(`${urls.inventory}`,{ params:data ,paramsSerializer:(param) =>{
    return qs.stringify(param)
  }})

  return response
}
>>>>>>> master
