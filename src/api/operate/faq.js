/* ==============================
    운영 관리 - FAQ
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import useAlert from '../../store/Alert/useAlert'
import { selectedRowsAtom } from '../../store/Layout/Layout'
import { queryClient } from '../query'

// API URL
const urls = 'faq'

// 쿼리 키
export const FAQ_KEYS = {
	getList: ['operate', 'faq', 'list'],
	getDetails: ['operate', 'faq', 'details'],
	update: ['operdate', 'faq', 'update'],
	create: ['operdate', 'faq', 'create'],
	remove: ['operdate', 'faq', 'remove'],
}

// 목록
export function useFaqListQuery(params) {
	return useQuery({
		queryKey: [...FAQ_KEYS.getList, params],
		queryFn: async function () {
			const response = await client.get(urls, { params })
			return response.data.data
		},
	})
}

// 상세
export function useFaqDetailsQuery(id) {
	return useQuery({
		queryKey: FAQ_KEYS.getDetails,
		queryFn: async function () {
			const response = await client.get(`${urls}/${id}`)
			return response.data.data
		},
		enabled: !!id,
	})
}

// 등록
export function useFaqRegisterMutation() {
	const navigate = useNavigate()
	const { simpleAlert, showAlert } = useAlert()

	return useMutation({
		mutationKey: FAQ_KEYS.create,
		mutationFn: async function (params) {
			return client.post(urls, params)
		},
		onSuccess() {
			showAlert({ title: '등록이 완료되었습니다.', func: () => navigate('/operate/faq') })
			queryClient.invalidateQueries({
				queryKey: FAQ_KEYS.getList,
			})
		},
		onError() {
			simpleAlert('등록에 실패하였습니다.')
		},
	})
}

// 수정
export function useFaqUpdateMutation() {
	const navigate = useNavigate()
	const { simpleAlert, showAlert } = useAlert()

	return useMutation({
		mutationKey: FAQ_KEYS.update,
		mutationFn: async function (params) {
			return client.patch(urls, params)
		},
		onSuccess() {
			showAlert({ title: '저장이 완료되었습니다.', func: () => navigate('/operate/faq') })
			queryClient.invalidateQueries({
				queryKey: FAQ_KEYS.getList,
			})
		},
		onError() {
			simpleAlert('저장에 실패하였습니다.')
		},
	})
}

// 삭제
export function useFaqRemoveMutation() {
	const { simpleAlert } = useAlert()
	const setSelected = useSetAtom(selectedRowsAtom)

	return useMutation({
		mutationKey: FAQ_KEYS.remove,
		mutationFn: async function (id) {
			return client.delete(`${urls}/${id}`)
		},
		onSuccess() {
			simpleAlert('삭제되었습니다.')
			queryClient.invalidateQueries({
				queryKey: FAQ_KEYS.getList,
			})
			setSelected([])
		},
		onError() {
			simpleAlert('삭제에 실패하였습니다.')
		},
	})
}
