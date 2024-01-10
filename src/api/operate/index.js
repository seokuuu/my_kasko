import {useMutation, useQuery} from '@tanstack/react-query'
import {client} from '../index'
import {queryClient} from '../query'

const urls = {
  policy: 'policy',
  footer: 'footer',
}

/**
 * @constant
 * - 운영 관리 쿼리키값
 */
const OPERATE_KEYS = {
  getFooter: ['operate', 'footer', 'get'],
  updateFooter: ['operate', 'footer', 'update'],
}

// {{dev}}/api/policy?type=개인정보 수집 동의

/* ==============================
    운영 관리 - 이용 약관
============================== */
const POLICY_KEYS = {
  getPolicy: ['policy', 'list'],
  postPolicy: ['policy', 'update']
}

export function usePolicyQuery(data) {
  return useQuery({
    queryKey: [...POLICY_KEYS.getPolicy, data],
    queryFn: async () => {
      return await client.get(`${urls.policy}?type=${data}`);
    }
  })
}

// 약관 수정
export function usePolicyMutation(type) {
  return useMutation({
    mutationKey: POLICY_KEYS.postPolicy,
    mutationFn: async function (params) {
      return client.post(urls.policy, params)
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [...POLICY_KEYS.getPolicy, type]
      })
    },
    onError() {
      alert('저장에 실패하였습니다.')
    },
  })
}
/* ==============================
    운영 관리 - 푸터 관리
============================== */

/**
 *
 * @description
 * 푸터 조회
 */
export function useFooterQuery() {
  return useQuery({
    queryKey: OPERATE_KEYS.getFooter,
    queryFn: async function () {
      const response = await client.get(urls.footer)
      return response.data.data
    },
  })
}

/**
 *
 * @description
 * 푸터 변경
 */
export function useFooterMutation() {
  return useMutation({
    mutationKey: OPERATE_KEYS.updateFooter,
    mutationFn: async function (params) {
      return client.post(urls.footer, params)
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: OPERATE_KEYS.getFooter })
      alert('저장되었습니다.')
    },
    onError() {
      alert('저장에 실패하였습니다.')
    },
  })
}
