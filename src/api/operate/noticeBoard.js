/* ==============================
    운영 관리 - 전광판 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import { popupObject } from '../../store/Layout/Layout'
import { queryClient } from '../query'

// API ENDPOINT
const urls = 'banner'

// 쿼리키
const NOTICE_BOARD_KEYS = {
	getNoticeBoardList: ['operate', 'noticeBoard', 'list'],
	getNoticeBoard: ['operate', 'noticeBoard', 'details'],
	registerNoticeBoard: ['operate', 'noticeBoard', 'register'],
	updateNoticeBoard: ['operate', 'noticeBoard', 'update'],
	removeNoticeBoard: ['operate', 'noticeBoard', 'remove'],
}

// 전광판 목록 조회
export function useNoticeBoardListQuery(params) {
	return useQuery({
		queryKey: [...NOTICE_BOARD_KEYS.getNoticeBoardList, params.pageNum, params.pageSize],
		queryFn: async function () {
			const response = await client.get(urls, { params })
			return response.data.data
		},
	})
}

// 전광판 상세 조회
export function useNoticeBoardDetailsQuery(id) {
	return useQuery({
		queryKey: NOTICE_BOARD_KEYS.getNoticeBoard,
		queryFn: async function () {
			const response = await client.get(`${urls}/${id}`)

			return response.data.data
		},
		enabled: !!id,
	})
}

// 전광판 등록
export function useNoticeBoardRegisterMutation() {
	const navigate = useNavigate()
	const setNowPopup = useSetAtom(popupObject)

	return useMutation({
		mutationKey: NOTICE_BOARD_KEYS.registerNoticeBoard,
		mutationFn: async function (params) {
			return client.post(urls, params)
		},
		onSuccess() {
			setNowPopup((p) => ({ ...p, next: '1-12', func: () => navigate('/operate/noticeBoard') }))

			queryClient.invalidateQueries({
				queryKey: NOTICE_BOARD_KEYS.getNoticeBoardList,
			})
		},
		onError() {
			alert('등록에 실패하였습니다.')
		},
	})
}

// 전광판 수정
export function useNoticeBoardUpdateMutation() {
	const navigate = useNavigate()
	const setNowPopup = useSetAtom(popupObject)

	return useMutation({
		mutationKey: NOTICE_BOARD_KEYS.updateNoticeBoard,
		mutationFn: async function (params) {
			return client.patch(urls, params)
		},
		onSuccess() {
			setNowPopup((p) => ({ ...p, next: '1-12', func: () => navigate('/operate/noticeBoard') }))

			queryClient.invalidateQueries({
				queryKey: NOTICE_BOARD_KEYS.getNoticeBoardList,
			})
		},
		onError() {
			alert('수정에 실패하였습니다.')
		},
	})
}

// 전광판 삭제
export function useNoticeBoardRemoveMutation() {
	return useMutation({
		mutationKey: NOTICE_BOARD_KEYS.removeNoticeBoard,
		mutationFn: async function (id) {
			return client.delete(`${urls}/${id}`)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: NOTICE_BOARD_KEYS.getNoticeBoardList,
			})
		},
		onError() {
			alert('삭제에 실패하였습니다.')
		},
	})
}
