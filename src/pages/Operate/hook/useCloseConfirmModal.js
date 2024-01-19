import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { popupAtom } from '../../../store/Layout/Layout'

/**
 * @description
 * 목록 페이지 진입시 확인 모달을 닫아줍니다.
 * 이유는 등록,수정시 확인을 눌렀을 때, 현재 모달을 닫아줄 수 없어 목록에 진입했을 때 닫아주기 위함입니다.
 * @returns
 */
const useCloseConfirmModal = () => {
	const setPopupSwitch = useSetAtom(popupAtom)

	useEffect(() => {
		setPopupSwitch(false)
	}, [])
}

export default useCloseConfirmModal
