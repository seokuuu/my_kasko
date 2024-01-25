import React, { createContext, useReducer } from 'react'
import PackageDetailsModal from '../_components/PackageDetailsModal'

/**
 * PACKAGE CONTEXT
 * @description 패키지 상세 모달 활성화 여부를 공유하는 컨텍스트
 */
export const PackageViewerDispatchContext = createContext()
export const PackageViewerOnContext = createContext()

/**
 * @constant 패키지 액션 상수
 */
export const PACKAGE_VIEWER_ACTION = {
	setActionViewer: 'SET_ACTION_VIEWER',
	setReadOnlyViewer: 'SET_READ_ONLY_VIEWER',
	clear: 'CLEAR',
}

/**
 * @constant 패키지넘버 초기값
 */
const initialPackageViewerValue = {
	packageNumber: '',
	action: true,
}

/**
 * 패키지 액션 처리 리듀서
 */
const packageNumberReducer = (packageValue, action) => {
	switch (action.type) {
		case PACKAGE_VIEWER_ACTION.setActionViewer:
			return { packageNumber: action.value, action: true }
		case PACKAGE_VIEWER_ACTION.setReadOnlyViewer:
			return { packageNumber: action.value, action: false }
		case PACKAGE_VIEWER_ACTION.clear:
			return initialPackageViewerValue
		default:
			return packageValue
	}
}

/**
 * 사용자 상시판매 공통 레이아웃
 */
const UserSalesWrapper = ({ children }) => {
	const [packageViewer, dispatchPackageViewer] = useReducer(packageNumberReducer, initialPackageViewerValue)
	const packageViewerDispatcher = {
		setPackageActionViewer: (value) => {
			dispatchPackageViewer({ type: PACKAGE_VIEWER_ACTION.setActionViewer, value: value })
		},
		setPackageReadOnlyViewer: (value) => {
			dispatchPackageViewer({ type: PACKAGE_VIEWER_ACTION.setReadOnlyViewer, value: value })
		},
		clearViewer: () => {
			dispatchPackageViewer({ type: PACKAGE_VIEWER_ACTION.clear })
		},
	}

	return (

		<PackageViewerDispatchContext.Provider value={packageViewerDispatcher}>
			{children}
			{packageViewer.packageNumber && (
				<PackageDetailsModal {...packageViewer} onClose={packageViewerDispatcher.clearViewer} />
			)}
		</PackageViewerDispatchContext.Provider>
	)
}

export default UserSalesWrapper
