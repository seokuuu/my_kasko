/* ==============================
    운영 관리 - 제품군 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { client } from '..'
import useAlert from '../../store/Alert/useAlert'
import { queryClient } from '../query'

// API ENDPOINT
const urls = 'spart'

// 쿼리키
const PRODUCT_RANGE_KEYS = {
	getProductRangeList: ['operate', 'productRange', 'list'],
	getProductRange: ['operate', 'productRange', 'details'],
	registerProductRange: ['operate', 'productRange', 'register'],
	updateProductRange: ['operate', 'productRange', 'update'],
	removeProductRange: ['operate', 'productRange', 'remove'],
}

// 제품군 목록 조회
export function useProductRangeListQuery(params) {
	return useQuery({
		queryKey: [...PRODUCT_RANGE_KEYS.getProductRangeList, params.pageNum, params.pageSize],
		queryFn: async function () {
			const response = await client.get(urls, { params })
			return response.data.data
		},
	})
}

// 제품군 상세 조회
export function useProductRangeDetailsQuery(id) {
	return useQuery({
		queryKey: [...PRODUCT_RANGE_KEYS.getProductRange, id],
		queryFn: async function () {
			const response = await client.get(`${urls}/${id}`)

			return response.data.data
		},
		enabled: !!id,
	})
}

// 제품군 등록
export function useProductRangeRegisterMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: PRODUCT_RANGE_KEYS.registerProductRange,
		mutationFn: async function (params) {
			return client.post(urls, params)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: PRODUCT_RANGE_KEYS.getProductRangeList,
			})
		},
		onError() {
			simpleAlert('등록에 실패하였습니다.')
		},
	})
}

// 제품군 수정
export function useProductRangeUpdateMutation() {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationKey: PRODUCT_RANGE_KEYS.updateProductRange,
		mutationFn: async function (params) {
			return client.patch(urls, params)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: PRODUCT_RANGE_KEYS.getProductRangeList,
			})
		},
		onError() {
			simpleAlert('수정에 실패하였습니다.')
		},
	})
}

// 제품군 삭제
export function useProductRangeRemoveMutation() {
	const { simpleAlert } = useAlert()
	return useMutation({
		mutationKey: PRODUCT_RANGE_KEYS.removeProductRange,
		mutationFn: async function (id) {
			return client.delete(`${urls}/${id}`)
		},
		onSuccess(data) {
			if (data.data.data.length > 0) {
				simpleAlert('삭제할 수 없습니다.\n해당 항목은 현재 사용 중입니다.')
			} else {
				simpleAlert('삭제되었습니다.')
			}

			queryClient.invalidateQueries({
				queryKey: PRODUCT_RANGE_KEYS.getProductRangeList,
			})
		},
		onError(error) {
			simpleAlert('삭제에 실패하였습니다.')
		},
	})
}
