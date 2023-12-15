import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SkyBtn } from '../../common/Button/Button'
import {
  StandardDispatchEditAtom,
  btnCellRenderAtom,
  btnCellUidAtom,
  consolEditModalAtom,
  surEditModalAtom,
  userpageUserPreferEdit,
  usermanageClientEdit,
  UsermanageDestiEditModal,
  StandardConsoliateEdit,
} from '../../store/Layout/Layout'

const BtnCellRenderer = ({ data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]

  const navigate = useNavigate()

  const [overallData, setOverallData] = useState(data)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  // console.log('uidAtom @@@', uidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [modalMode, setModalMode] = useAtom(surEditModalAtom) // 할증 관리 modal
  const [dispatchModalMode, setDispatchModalMode] = useAtom(StandardDispatchEditAtom)
  const [consoliMode, setCosoliMode] = useAtom(consolEditModalAtom) // 합짐비 관리 modal

  const [userpageEditModal, setUserPageEditModal] = useAtom(userpageUserPreferEdit) // 마이페이지 수정 모달

  const [userManageEdit, setUserManageEdit] = useAtom(usermanageClientEdit) // 고객사 관리 수정 모달

  const [userDestiEdit, setUserDestiEdit] = useAtom(UsermanageDestiEditModal) // 고객사 목적지 관리 수정 모달

  const [consoliEdit, setConsoliEdit] = useAtom(StandardConsoliateEdit)

  // console.log('버튼 셀 @@@', userpageEditModal)

  // console.log('!!!')

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
        setBtnCellModal(true)
        setUidAtom(uid)
        setDispatchModalMode(true)
        break
      case 'userprefer':
        setUidAtom(uid)
        setUserPageEditModal(true)
      case 'usermanage': // 고객사 관리
        setUidAtom(uid)
        setUserManageEdit(true)
      case 'userdestination': // 고객사 목적지 관리
        setUidAtom(uid)
        setUserDestiEdit(true)
      // 클레임 관리 목록 수정 버튼 => 클레임 수정 페이지로 이동
      case 'claimUpdate':
        setBtnCellModal(true)
        setUidAtom(uid)
        setModalMode('수정')

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
