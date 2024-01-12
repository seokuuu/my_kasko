import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '../index'
import { queryClient } from '../query'

const MERGE_CODE_URL = '/admin/mergecost'
const SHIPMENT_URL = '/shipment'
const SHIPMENT_MERGE_URL = `${SHIPMENT_URL}/merge`
const SHIPMENT_OUT_URL = `${SHIPMENT_URL}/out`
const SHIPMENT_DRIVER_URL = `${SHIPMENT_URL}/driver`
const SHIPMENT_ORDER_RECEIPT_URL = `${SHIPMENT_URL}/order-receipt`
const SHIPMENT_ORDER_STATEMENT_URL = `${SHIPMENT_URL}/order-statement`
const SHIPMENT_EXTRA_COST_URL = `${SHIPMENT_URL}/extra-cost`

export const QUERY_KEY = {
  mergeCostList: ['merge-cost', 'list'],
  list: ['shipment', 'list'],
  statusUpdate: ['shipment', 'status-update'],
  recommendMergeList: ['shipment', 'merge-list'],
  createMerge: ['shipment', 'merge', 'create'],
  dispatchList: ['shipment', 'dispatch', 'list'],
}

// 합짐비 목록 조회
export function useMergeListQuery() {
  return useQuery({
    queryKey: QUERY_KEY.mergeCostList,
    queryFn: async function () {
      const response = await client.get(MERGE_CODE_URL, { params: { pageNum: 1, pageSize: 5 } })
      return response?.data?.data?.list
    },
  })
}

// 출하지시 목록
export function useShipmentListQuery(params) {
  return useQuery({
    queryKey: QUERY_KEY.list,
    queryFn: async function () {
      const response = await client.get(SHIPMENT_URL, { params })
      return response.data.data
    },
  })
}

// 출고 상태 변경
export function useShipmentStatusUpdateMutation() {
  return useMutation({
    mutationKey: QUERY_KEY.statusUpdate,
    mutationFn: async function (params) {
      return client.post(SHIPMENT_URL, params)
    },
    onSuccess() {
      window.alert('완료되었습니다.')
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.list,
      })
    },
    onError() {
      window.alert('수정에 실패하였습니다.')
    },
  })
}

// 추천 선별 목록
export function useShipmentMergeListQuery() {
  return useQuery({
    queryKey: QUERY_KEY.recommendMergeList,
    queryFn: async function () {
      const response = await client.get(SHIPMENT_MERGE_URL)
      return response.data.data
    },
  })
}

// 선별 등록
export function useShipmentMergeMutation() {
  return useMutation({
    mutationKey: QUERY_KEY.createMerge,
    mutationFn: async function (params) {
      return client.post(SHIPMENT_MERGE_URL, params)
    },
    onSuccess() {
      window.alert('선별 등록 완료되었습니다.')
      window.location.reload()
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.list,
      })
    },
    onError(error) {
      window.alert(error?.message ?? '등록 실패하였습니다.')
    },
  })
}

// 배차/출고 등록 페이지 목록
export function useShipmentDispatchListQuery(params) {
  return useQuery({
    queryKey: QUERY_KEY.dispatchList,
    queryFn: async function () {
      const response = await client.get(SHIPMENT_OUT_URL, { params })
      return response.data.data
    },
  })
}
