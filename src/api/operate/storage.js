/* ==============================
    운영 관리 - 창고 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { client } from '..'
import useAlert from '../../store/Alert/useAlert'
import { selectedRowsAtom } from '../../store/Layout/Layout'
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
		queryKey: [...STORAGE_KEYS.getStorageList, params.pageNum, params.pageSize],
		queryFn: async function () {
			const response = await client.get(urls, { params })
			return response.data.data
		},
	})
}

// 창고 상세 조회
export function useStorageDetailsQuery(id) {
	return useQuery({
		queryKey: [...STORAGE_KEYS.getStorage, id],
		queryFn: async function () {
			const response = await client.get(`${urls}/${id}`)

			return response.data.data
		},
		enabled: !!id,
	})
}

// 창고 등록
export function useStorageRegisterMutation() {
	const { simpleAlert } = useAlert()

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
			simpleAlert('등록에 실패하였습니다.')
		},
	})
}

// 창고 수정
export function useStorageUpdateMutation() {
	const { simpleAlert } = useAlert()

	return useMutation({
		mutationKey: STORAGE_KEYS.updateStorage,
		mutationFn: async function (params) {
			return client.patch(urls, params)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: STORAGE_KEYS.getStorageList,
			})
			queryClient.invalidateQueries({
				queryKey: STORAGE_KEYS.getStorage,
			})
		},
		onError() {
			simpleAlert('수정에 실패하였습니다.')
		},
	})
}

// 창고 삭제
export function useStorageRemoveMutation() {
	const { simpleAlert } = useAlert()
	const setSelected = useSetAtom(selectedRowsAtom)

	return useMutation({
		mutationKey: STORAGE_KEYS.removeStorage,
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
				queryKey: STORAGE_KEYS.getStorageList,
			})
			setSelected([])
		},
		onError() {
			simpleAlert('삭제에 실패하였습니다.')
		},
	})
}
