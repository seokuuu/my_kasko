import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useBlocker } from 'react-router-dom'
import { popupAtom, popupObject } from '../store/Layout/Layout'

/**
 * @description
 * 특정 조건이 있을 때, 라우터 변경을 방지하고 작성중이던 폼에 대하여 저장 취소 컨펌 모달을 띄워줍니다.
 * @param {boolean} isNotEqualPrevious 변경 여부입니다.(이전 내용과 변경된 내용 비교 여부 값)
 */
const useAlertSave = (isNotEqualPrevious) => {
	const setNowPopup = useSetAtom(popupObject)
	const setPopupSwitch = useSetAtom(popupAtom)
	const blocker = useBlocker(
		({ currentLocation, nextLocation }) => isNotEqualPrevious && currentLocation.pathname !== nextLocation.pathname,
	)
	/**
	 * @description
	 * 내용의 변경여부가 있으면 모달을 띄워줍니다.
	 * @todo 다음 모달이 뜨지 않도록 해야합니다.
	 *
	 */

	useEffect(() => {
		if (blocker.state === 'blocked') {
			setPopupSwitch(true)
			setNowPopup({
				num: '2-4',
				title: '현재 작업 중인 내용이 저장되지 않았습니다. \n페이지를 나가시겠습니까?',
				next: '1-1',
				func: () => {
					blocker.proceed()
				},
			})
		}
	}, [blocker])
}

export default useAlertSave
