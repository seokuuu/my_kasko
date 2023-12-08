import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '../index'
import { queryClient } from '../query'

const urls = {
  policy: 'policy',
  footer: 'footer',
}

/**
 * @constant
 * - 운영 관리 쿼리키값
 */
const OPERATE_KEYS = { getFooter: ['operate', 'footer', 'get'], updateFooter: ['operate', 'footer', 'update'] }

// {{dev}}/api/policy?type=개인정보 수집 동의

/* ==============================
    운영 관리 - 이용 약관
============================== */
export function getPolicy(data) {
  return client.get(`${urls.policy}?type=${data}`)
}

export function postPolicy(data) {
  return client.post(urls.policy, data)
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
