/* ==============================
    운영 관리 - 정책 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '..'
import { queryClient } from '../query'

// API ENDPOINT
const urls = 'auction-policy'

// 쿼리키
const AUTION_POLICY_KEYS = {
  getActionPolicy: ['operate', 'auctionPolicy', 'details'],
  updateActionPolicy: ['operate', 'auctionPolicy', 'update'],
}

// 정책 상세
export function useAutionPolicyQuery() {
  return useQuery({
    queryKey: AUTION_POLICY_KEYS.getActionPolicy,
    queryFn: async function () {
      const response = await client.get(urls)
      return response.data.data
    },
  })
}

// 정책 등록/수정
export function useAutionPolicyMutation() {
  return useMutation({
    mutationKey: AUTION_POLICY_KEYS.updateActionPolicy,
    mutationFn: async function (params) {
      return client.post(urls, params)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: AUTION_POLICY_KEYS.getActionPolicy,
      })
    },

    onError() {
      alert('등록에 실패하였습니다.')
    },
  })
}
