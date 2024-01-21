// import { useEffect } from 'react'
// import { useBlocker } from 'react-router-dom'
// import useAlert from '../store/Alert/useAlert'

// /**
//  * @description
//  * 특정 조건이 있을 때, 라우터 변경을 방지하고 작성중이던 폼에 대하여 저장 취소 컨펌 모달을 띄워줍니다.
//  * @param {boolean} blockCondition 변경 여부입니다.(이전 내용과 변경된 내용 비교 여부 값)
//  */
// const useBlockRoute = (blockCondition) => {
// 	const { simpleConfirm } = useAlert()
// 	const blocker = useBlocker(
// 		({ currentLocation, nextLocation }) => blockCondition && currentLocation.pathname !== nextLocation.pathname,
// 	)

// 	useEffect(() => {
// 		if (blocker.state === 'blocked') {
// 			simpleConfirm('현재 작업 중인 내용이 저장되지 않았습니다. \n페이지를 나가시겠습니까?', () => blocker.proceed())
// 		}
// 	}, [blocker])
// }

// export default useBlockRoute
