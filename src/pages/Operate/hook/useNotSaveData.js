import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { popupAtom, popupObject } from '../../../store/Layout/Layout'

const useNotSaveData = (condition) => {
	const setNowPopup = useSetAtom(popupObject)
	const setPopupSwitch = useSetAtom(popupAtom)
	const navigate = useNavigate()
	const location = useLocation()
	console.log('condition :', condition)

	// useEffect(() => {
	// 	return () => {
	// 		if (condition) {
	// 			navigate(location.pathname)
	// 			setPopupSwitch(true)
	// 			setNowPopup({
	// 				num: '2-4',
	// 				func: () => {
	// 					// '확인' 버튼을 누르면 팝업을 닫고 이동하려던 경로로 이동합니다.
	// 					// setPopupSwitch(false)
	// 				},
	// 			})
	// 		}
	// 		// if (prevLocation !== location.pathname && condition) {
	// 		// 	// 경로가 바뀌려고 할 때, 조건이 true라면 경로 이동을 막고 팝업을 띄웁니다.
	// 		// 	navigate(prevLocation)

	// 		// }
	// 	}

	// 	// 현재 위치를 이전 위치로 저장합니다.
	// 	// setPrevLocation(location.pathname)
	// }, [condition])
	/**
	 * @description
	 * 특정 조건이 있고 현재 경로와 다르게 될 때,라우트 이동을 block 해준다.
	 *
	 */

	// useEffect(() => {
	// 	return () => {
	// 		if (condition) {
	// 			// alert('sdfsdf')
	// 			setPopupSwitch(true)
	// 			setNowPopup({ num: '2-4', func: () => navigate('/operate/noticeBoard/') })
	// 		}
	// 	}
	// }, [condition])
	function listener(e) {
		console.log('e :', e)
		e.preventDefault()
		e.returnValue = 'sdsdsdsd'
	}
	useEffect(() => {
		// window.addEventListener('beforeunload', listener)
		// return () => window.addEventListener('beforeunload', listener)
		// return () => {
		// 	window.removeEventListener('beforeunload', listener)
		// }
	}, [location.pathname])
}

export default useNotSaveData
