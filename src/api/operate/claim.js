/* ==============================
    운영 관리 - 클레임 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '..'
import { queryClient } from '../query'

// API URL

const urls = {
  claim: 'claim',
  claimProduct: 'claim/product',
}

// 쿼리 키
const CLAIM_KEYS = {
  getClaimList: ['operate', 'claim', 'list'],
  getProductToClaim: ['operate', 'claim', 'product', 'list'],
  getClaim: ['operate', 'claim', 'details'],
  registerClaim: ['operate', 'claim', 'register'],
  updateClaim: ['operate', 'claim', 'update'],
  removeClaim: ['operate', 'claim', 'delete'],
}

// 클레임 목록 조회
export function useClaimListQuery(params) {
  return useQuery({
    queryKey: CLAIM_KEYS.getClaimList,
    queryFn: async function () {
      const response = await client.get(urls.claim, {
        params,
      })
      return response.data.data
    },
  })
}

// 클레임 등록할 제품 목록
export function useProductListToRegisterClaimQuery(params) {
  return useQuery({
    queryKey: CLAIM_KEYS.getProductToClaim,
    queryFn: async function () {
      const response = await client.get(urls.claimProduct, {
        params,
      })
      return response.data.data
    },
  })
}

// 클레임 상세

// 등록
export function useClaimRegisterMutation() {
  return useMutation({
    mutationKey: CLAIM_KEYS.registerClaim,
    mutationFn: async function (params) {
      return client.post(urls.claim, params)
    },

    onError() {
      alert('등록에 실패하였습니다.')
    },
  })
}

// 수정
export function useClaimUpdateMutaion() {
  return useMutation({
    mutationKey: CLAIM_KEYS.updateClaim,
    mutationFn: async function (params) {
      return client.patch(urls.claim, params)
    },
    onError() {
      alert('수정에 실패하였습니다.')
    },
  })
}

// 삭제
export function useClaimDeleteMutation() {
  return useMutation({
    mutationKey: CLAIM_KEYS.removeClaim,
    mutationFn: async function (params) {
      return client.delete(`${urls.claim}/${params}`)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: CLAIM_KEYS.getClaimList })
    },
    onError() {
      alert('삭제에 실패하였습니다.')
    },
  })
}
