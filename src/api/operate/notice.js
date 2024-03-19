/* ==============================
    운영 관리 - 공지사항&자료실 관리
============================== */

import { useMutation, useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { client } from '..'
import useAlert from '../../store/Alert/useAlert'
import { selectedRowsAtom } from '../../store/Layout/Layout'
import { queryClient } from '../query'

// 폼 데이터 헤더
const headers = { 'Content-Type': 'multipart/form-data' }

// API ENDPOINT
const urls = 'notice'

// 쿼리키
const NOTICE_KEYS = {
	getNoticeList: ['operate', 'notice', 'list'],
	getNotice: ['operate', 'notice', 'details'],
	registerNotice: ['operate', 'notice', 'register'],
	updateNotice: ['operate', 'notice', 'update'],
	removeNotice: ['operate', 'notice', 'remove'],
	changeExposure: ['operate', 'notice', 'exposure'],
}

/// 공지&자료실 목록 조회
export function useNoticeListQuery(params) {
	return useQuery({
		queryKey: [...NOTICE_KEYS.getNoticeList, params],
		queryFn: async function () {
			const response = await client.get(urls, {
				params,
			})

			return response.data.data
		},
	})
}

/// 공지&자료실 상세
export function useNoticeDetailsQuery(id) {
	return useQuery({
		queryKey: [...NOTICE_KEYS.getNotice, id],
		queryFn: async function () {
			const response = await client.get(`${urls}/${id}`)

			return response.data.data
		},
		enabled: !!id,
	})
}

// 공지 & 자료실 등록(type 값에 따라 성공시 리다이렉트되는 url이 다릅니다.)
function createFormData(params, type, isRegister) {
	const form = new FormData()

	// 파일이 아닌 데이터(등록)
	const registerNoneFileData = {
		title: params.title,
		content: params.content,
		status: params.status,
		type,
	}

	// 파일이 아닌 데이터(수정)
	const updateNoneFileData = {
		uid: params.uid,
		title: params.title,
		content: params.content,
		status: params.status,
		deleteFileList: params.deleteFileList,
		type,
	}

	// 파일 데이터
	const fileData = params.fileList

	// 폼 데이터에 파일이 아닌 데이터 추가
	form.append(
		'request',
		// JSON.stringify(noneFileData),
		new Blob([JSON.stringify(isRegister ? registerNoneFileData : updateNoneFileData)], {
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

// 공지&자료실 등록
export function useNoticeRegisterMutation(type) {
	const navigate = useNavigate()
	const { simpleAlert, showAlert } = useAlert()

	return useMutation({
		mutationKey: NOTICE_KEYS.registerNotice,
		mutationFn: async function (params) {
			const form = createFormData(params, type, true)

			return client.post(urls, form, { headers })
		},
		onSuccess() {
			if (type === '공지사항') {
				showAlert({ title: '등록이 완료되었습니다.', func: () => navigate('/operate/notice') })
			} else {
				showAlert({ title: '등록이 완료되었습니다.', func: () => navigate('/operate/datasheet') })
			}
			queryClient.invalidateQueries({
				queryKey: NOTICE_KEYS.getNoticeList,
			})
		},
		onError(error) {
			if (error.data.status === 400) {
				return simpleAlert(error.data.message)
			}

			simpleAlert('등록에 실패하였습니다.')
		},
	})
}
// 공지 & 자료실 수정
export function useNoticeUpdateMutation(type) {
	const navigate = useNavigate()
	const { simpleAlert, showAlert } = useAlert()

	return useMutation({
		mutationKey: NOTICE_KEYS.updateNotice,
		mutationFn: async function (params) {
			const form = createFormData(params, type, false)
			return client.patch(urls, form, { headers })
		},
		onSuccess() {
			if (type === '공지사항') {
				showAlert({ title: '수정이 완료되었습니다.', func: () => navigate('/operate/notice') })
			} else {
				showAlert({ title: '수정이 완료되었습니다.', func: () => navigate('/operate/datasheet') })
			}
			queryClient.invalidateQueries({
				queryKey: NOTICE_KEYS.getNoticeList,
			})
			queryClient.invalidateQueries({
				queryKey: NOTICE_KEYS.getNotice,
			})
		},
		onError(error) {
			if (error.data.status === 400) {
				return simpleAlert(error.data.message)
			}

			simpleAlert('등록에 실패하였습니다.')
		},
	})
}

// 공지 & 자료실 삭제
export function useNoticeRemoveMutation() {
	const { simpleAlert } = useAlert()
	const setSelected = useSetAtom(selectedRowsAtom)

	return useMutation({
		mutationKey: NOTICE_KEYS.removeNotice,
		mutationFn: async function (id) {
			return client.delete(`${urls}/${id}`)
		},
		onSuccess() {
			simpleAlert('삭제되었습니다.')
			queryClient.invalidateQueries({
				queryKey: NOTICE_KEYS.getNoticeList,
			})
			setSelected([])
		},
		onError() {
			simpleAlert('삭제에 실패하였습니다.')
		},
	})
}

// 상단 노출 변경
export function useNoticeExposureMutation() {
	return useMutation({
		mutationKey: NOTICE_KEYS.changeExposure,
		mutationFn: async function (params) {
			return client.patch(`${urls}/status`, params)
		},
	})
}
