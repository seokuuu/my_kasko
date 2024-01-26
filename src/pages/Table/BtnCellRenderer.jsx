import { useAtom, useSetAtom } from 'jotai'
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SkyBtn } from '../../common/Button/Button'
import {
	StandardConsoliateEdit,
	StandardDispatchEditAtom,
	UsermanageDestiEditModal,
	adminPageDestiEditModal,
	auctionRoundEditPageAtom,
	btnCellRenderAtom,
	btnCellUidAtom,
	consolEditModalAtom,
	operateAddAtom,
	requestSingleModify,
	singleModifyObj,
	singleProductModify,
	surEditModalAtom,
	userPageDestiEditModal,
	usermanageClientEdit,
	userpageUserPreferEdit,
	weightAtom,
} from '../../store/Layout/Layout'

import { UsermanageUserManageEditModal } from '../../store/Layout/Layout'
const BtnCellRenderer = ({ data, uidFieldName, editType, moveUrl }) => {
	const uid = data[uidFieldName]

	const navigate = useNavigate()

	const [overallData, setOverallData] = useState(data)
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	// console.log('uidAtom @@@', uidAtom)
	const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
	const [modalMode, setModalMode] = useAtom(surEditModalAtom) // 할증 관리 modal
	const [dispatchModalMode, setDispatchModalMode] = useAtom(StandardDispatchEditAtom)
	const [consoliMode, setCosoliMode] = useAtom(consolEditModalAtom) // 합짐비 관리 modal
	const [recommend, setRecommend] = useState(false)
	const [userpageEditModal, setUserPageEditModal] = useAtom(userpageUserPreferEdit) // 마이페이지 수정 모달

	const [userManageEdit, setUserManageEdit] = useAtom(usermanageClientEdit) // 고객사 관리 수정 모달

	const [userDestiEdit, setUserDestiEdit] = useAtom(UsermanageDestiEditModal) // 고객사 목적지 관리 수정 모달

	const [userPageDestiEdit, setUserPageDestiEdit] = useAtom(userPageDestiEditModal)
	const [adminPageDestiEdit, setAdminPageDestiEdit] = useAtom(adminPageDestiEditModal)

	const [consoliEdit, setConsoliEdit] = useAtom(StandardConsoliateEdit)

	const [userManageEditModal, setUserManageEditModal] = useAtom(UsermanageUserManageEditModal)
	const [auctionRoundEditModal, setAuctionRoundEditModal] = useAtom(auctionRoundEditPageAtom)
	const [singleModify, setSingleModify] = useAtom(singleProductModify)
	const [modifyObj, setModifyObj] = useAtom(requestSingleModify)
	const [weight, setWeight] = useAtom(weightAtom)
	// 관리자 > 운영 관리 > 제품군 관리,창고 관리 > 등록,수정 모달 관련 값
	const setProductRangeEditModal = useSetAtom(operateAddAtom)
	const btnClickedHandler = () => {
		switch (editType) {
			case 'table':
				setBtnCellModal(true)
				setUidAtom(uid)
				break
			case 'calcul':
				setBtnCellModal(true)
				setUidAtom(uid)
				setModalMode('수정')
				break
			case 'consoli':
				setConsoliEdit(true)
				setUidAtom(uid)
				setCosoliMode('수정')
				break
			case 'dispatch':
				setUidAtom(uid)
				setDispatchModalMode(true)
				break
			case 'userprefer':
				setUidAtom(uid)
				setUserPageEditModal(true)
				break
			case 'client': // 고객사 관리
				setUidAtom(uid)
				setUserManageEdit(true)
				break
			case 'userdestination': // 고객사 목적지 관리
				setUidAtom(uid)
				setUserDestiEdit(true)
				break
			case 'userPageDestination':
				setUidAtom(uid)
				setUserPageDestiEdit(true)
				break
			case 'adminPageDestination':
				setUidAtom(uid)
				setAdminPageDestiEdit(true)
				break
			// 클레임 관리 목록 수정 버튼 => 클레임 수정 페이지로 이동
			case 'claimUpdate':
				navigate(`/operate/common/product/${uid}`)
				break
			case 'usermanagemanage':
				setUidAtom(uid)
				setUserManageEditModal(true)
				break
			case 'auctionroundedit':
				setUidAtom(uid)
				setAuctionRoundEditModal(true)
				break
			case 'packageUpdate':
				navigate('/product/packageedit/' + data[uidFieldName], { state: { data: data } })
				break
			// 관리자 > 운영관리 > 제품군 관리 목록 수정
			case 'productRange':
				setUidAtom(uid)
				setProductRangeEditModal(true)
				break
			case 'productModify':
				setUidAtom(uid)
				setSingleModify(true)
				setModifyObj(data)
				break
			case 'weight':
				setUidAtom(uid)
				break
			default:
				break
		}
	}

	const closeModal = () => {
		setBtnCellModal(false)
	}

	return (
		<>
			<SkyBtn style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={btnClickedHandler}>
				수정
			</SkyBtn>
		</>
	)
}

export default BtnCellRenderer
