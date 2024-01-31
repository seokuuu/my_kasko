import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '../index'
import { queryClient } from '../query'
import useAlert from '../../store/Alert/useAlert'

const MERGE_CODE_URL = '/admin/mergecost'
const SHIPMENT_URL = '/shipment'
const SHIPMENT_MERGE_URL = `${SHIPMENT_URL}/merge`
const SHIPMENT_OUT_URL = `${SHIPMENT_URL}/out`
const SHIPMENT_DRIVER_URL = `${SHIPMENT_URL}/driver`
const SHIPMENT_ORDER_INVOICE_URL = `${SHIPMENT_URL}/invoice`
const SHIPMENT_ORDER_STATEMENT_URL = `${SHIPMENT_URL}/order-statement`
const SHIPMENT_EXTRA_COST_URL = `${SHIPMENT_URL}/extra-cost`

export const QUERY_KEY = {
	mergeCostList: ['merge-cost', 'list'],
	list: ['shipment', 'list'],
	statusUpdate: ['shipment', 'status-update'],
	recommendMergeList: ['shipment', 'merge-list'],
	createMerge: ['shipment', 'merge', 'create'],
	updateMerge: ['shipment', 'merge', 'update'],
	deleteMerge: ['shipment', 'merge', 'delete'],
	statusUpdateMerge: ['shipment', 'merge', 'status'],
	dispatchList: ['shipment', 'dispatch', 'list'],
	dispatchDetails: ['shipment', 'dispatch', 'details'],
	setDispatch: ['shipment', 'dispatch', 'set'],
	removeDispatch: ['shipment', 'dispatch', 'remove'],
	addExtraCost: ['shipment', 'extra', 'add'],
	removeExtraCost: ['shipment', 'extra', 'remove'],
	invoice: ['shipment', 'invoice'],
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
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.statusUpdate,
		mutationFn: async function (params) {
			return client.post(SHIPMENT_URL, params)
		},
		onSuccess() {
			simpleAlert('완료되었습니다.')
			queryClient.invalidateQueries(QUERY_KEY.list)
			queryClient.invalidateQueries(QUERY_KEY.dispatchList)
			queryClient.invalidateQueries(QUERY_KEY.dispatchDetails)
		},
		onError(error) {
			simpleAlert(error?.message ?? '실패하였습니다.')
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
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.createMerge,
		mutationFn: async function (params) {
			return client.post(SHIPMENT_MERGE_URL, params)
		},
		onSuccess() {
			simpleAlert('선별 등록 완료되었습니다.', () => window.location.reload())
			queryClient.invalidateQueries({
				queryKey: QUERY_KEY.list,
			})
		},
		onError(error) {
			simpleAlert(error?.message ?? '등록 실패하였습니다.')
		},
	})
}

// 선별 목록 변경
export function useShipmentMergeUpdateMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.updateMerge,
		mutationFn: async function (params) {
			return client.put(SHIPMENT_MERGE_URL, params)
		},
		onSuccess() {
			simpleAlert('변경 완료되었습니다.', () => window.location.reload())
			queryClient.invalidateQueries(QUERY_KEY.dispatchList)
			queryClient.invalidateQueries(QUERY_KEY.dispatchDetails)
		},
		onError(error) {
			simpleAlert(error?.message ?? '변경 실패하였습니다.')
		},
	})
}

// 선별 목록 해제
export function useShipmentMergeDeleteMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.deleteMerge,
		mutationFn: async function (id) {
			return client.delete(`${SHIPMENT_MERGE_URL}/${id}`)
		},
		onSuccess() {
			simpleAlert('해제 완료되었습니다.', () => window.location.reload())
			queryClient.invalidateQueries(QUERY_KEY.dispatchList)
			queryClient.invalidateQueries(QUERY_KEY.dispatchDetails)
		},
		onError(error) {
			simpleAlert(error?.message ?? '해제 실패하였습니다.')
		},
	})
}

// 선별 요청 승인 / 반려
export function useShipmentMergeStatusUpdateMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.statusUpdateMerge,
		mutationFn: async function (params) {
			return client.patch(SHIPMENT_MERGE_URL, params)
		},
		onSuccess() {
			simpleAlert('승인 상태 변경 완료되었습니다.', () => window.location.reload())
			queryClient.invalidateQueries(QUERY_KEY.dispatchList)
			queryClient.invalidateQueries(QUERY_KEY.dispatchDetails)
		},
		onError(error) {
			simpleAlert(error?.message ?? '승인 상태 변경 실패하였습니다.')
		},
	})
}

// 배차/출고 등록 목록 페이지
export function useShipmentDispatchListQuery(params) {
	return useQuery({
		queryKey: QUERY_KEY.dispatchList,
		queryFn: async function () {
			const response = await client.get(SHIPMENT_OUT_URL, { params })
			return response.data.data
		},
	})
}
// 배차/출고 등록 상세 페이지
export function useShipmentDispatchDetailsQuery(id) {
	return useQuery({
		queryKey: [...QUERY_KEY.dispatchDetails, id],
		queryFn: async function () {
			const response = await client.get(`${SHIPMENT_OUT_URL}/${id}`)
			return response.data.data
		},
	})
}

// 배차 기사 등록
export function useSetDispatchMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.setDispatch,
		mutationFn: async function (params) {
			return client.post(SHIPMENT_DRIVER_URL, params)
		},
		onSuccess() {
			simpleAlert('배차 등록되었습니다.')
			queryClient.invalidateQueries(QUERY_KEY.dispatchList)
			queryClient.invalidateQueries(QUERY_KEY.dispatchDetails)
		},
		onError(error) {
			simpleAlert(error?.message ?? '등록 실패하였습니다.')
		},
	})
}

// 배차 기사 등록 취소
export function useRemoveDispatchMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.removeDispatch,
		mutationFn: async function (id) {
			return client.delete(`${SHIPMENT_DRIVER_URL}/${id}`)
		},
		onSuccess() {
			simpleAlert('배차 취소가 완료되었습니다.')
			queryClient.invalidateQueries(QUERY_KEY.dispatchList)
			queryClient.invalidateQueries(QUERY_KEY.dispatchDetails)
		},
		onError(error) {
			simpleAlert(error?.message ?? '실패하였습니다.')
		},
	})
}

// 추가비 및 공차비 추가
export function useShipmentAddExtraCostMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.addExtraCost,
		mutationFn: async function (param) {
			return client.post(SHIPMENT_EXTRA_COST_URL, param)
		},
		onSuccess() {
			simpleAlert('완료되었습니다.', () => window.location.reload())
			queryClient.invalidateQueries(QUERY_KEY.list)
		},
		onError(error) {
			simpleAlert(error?.message ?? '실패하였습니다.')
		},
	})
}

// 추가비 및 공차비 삭제
export function useShipmentRemoveExtraCostMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: QUERY_KEY.removeExtraCost,
		mutationFn: async function (id) {
			return client.delete(`${SHIPMENT_EXTRA_COST_URL}/${id}`)
		},
		onSuccess() {
			simpleAlert('완료되었습니다.')
			queryClient.invalidateQueries(QUERY_KEY.list)
		},
		onError(error) {
			simpleAlert(error?.message ?? '실패하였습니다.')
		},
	})
}

// 출고 거래명세서 출력
export function useShipmentInvoiceListQuery(params) {
	return useQuery({
		queryKey: QUERY_KEY.invoice,
		queryFn: async function () {
			const response = await client.get(SHIPMENT_ORDER_INVOICE_URL, { params })
			return response.data.data
		},
		enabled: !!params,
	})
}
