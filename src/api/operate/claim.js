/* ==============================
    운영 관리 - 클레임 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { client, formHeaders } from '..'
import { Filtering, FilteringV2 } from '../../utils/filtering'
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

// 폼 데이터 생성
function createFormData(params, type) {
  const form = new FormData()

  // 파일이 아닌 데이터(등록)
  const registerNoneFileData = {
    productUid: params.productUid,
    content: params.content,
    requestDate: params.requestDate,
    registrationDate: params.registrationDate,
    processor: params.processor,
    kaskoReturnDate: params.kaskoReturnDate,
    hsReturnDate: params.hsReturnDate,
    endDate: params.endDate,
    claimStatus: params.claimStatus,
  }

  // 파일이 아닌 데이터(수정)
  const updateNoneFileData = {
    uid: params.uid,
    productUid: params.productUid,
    content: params.content,
    requestDate: params.requestDate,
    registrationDate: params.registrationDate,
    processor: params.processor,
    kaskoReturnDate: params.kaskoReturnDate,
    hsReturnDate: params.hsReturnDate,
    endDate: params.endDate,
    deleteFileList: params.deleteFileList,
    claimStatus: params.claimStatus,
  }
  // 파일 데이터
  const fileData = params.fileList

  // 폼 데이터에 파일이 아닌 데이터 추가
  form.append(
    'request',
    new Blob([JSON.stringify(type === 'register' ? registerNoneFileData : updateNoneFileData)], {
      type: 'application/json',
    }),
  )

  // 폼 데이터에 파일 데이터 추가
  if (fileData) {
    fileData.forEach((f) => {
      form.append(`fileList`, f)
    })
  }

  return form
}

// 클레임 목록 조회
export function useClaimListQuery(params) {
  console.log('클레임 목록 조회 :', Filtering(params))
  return useQuery({
    queryKey: [...CLAIM_KEYS.getClaimList, params.pageNum, params.pageSize],
    queryFn: async function () {
      const response = await client.get(urls.claim, {
        params: FilteringV2(params),
        paramsSerializer: (param) => {
          return qs.stringify(param)
        },
      })
      return response.data.data
    },
    // enabled: !!params.startDate || !!params.endDate,
  })
}

// 클레임 등록할 제품 목록
export function useProductListToRegisterClaimQuery(params) {
  return useQuery({
    queryKey: [...CLAIM_KEYS.getProductToClaim, params.pageNum, params.pageSize],
    queryFn: async function () {
      const response = await client.get(urls.claimProduct, {
        params: FilteringV2(params),
        paramsSerializer: (param) => {
          return qs.stringify(param)
        },
      })

      console.log('response :', response)
      return response.data.data
    },
  })
}

// 클레임 상세
export function useClaimDetailsQuery(id) {
  return useQuery({
    queryKey: [...CLAIM_KEYS.getClaim, id],
    queryFn: async function () {
      const response = await client.get(`${urls.claim}/${id}`)
      return response.data.data
    },
    enabled: !!id,
  })
}

// 등록
export function useClaimRegisterMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: CLAIM_KEYS.registerClaim,
    mutationFn: async function (params) {
      return client.post(urls.claim, createFormData(params, 'register'), { headers: formHeaders })
    },
    onSuccess() {
      navigate('/operate/common/product')
    },
    onError() {
      alert('등록에 실패하였습니다.')
    },
  })
}

// 수정
export function useClaimUpdateMutaion() {
  const navigate = useNavigate()

  return useMutation({
    mutationKey: CLAIM_KEYS.updateClaim,
    mutationFn: async function (params) {
      return client.patch(urls.claim, createFormData(params, 'update'), { headers: formHeaders })
    },
    onSuccess() {
      navigate('/operate/common')
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
