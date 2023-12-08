import React, { useEffect, useState } from 'react'
import { SkyBtn } from '../../common/Button/Button'
import {
  btnCellRenderAtom,
  btnCellUidAtom,
  surEditModalAtom,
  consolEditModalAtom,
  StandardDispatchEditAtom,
  userpageUserPreferEdit,
  userpageDestinationEdit,
} from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

const BtnCellRenderer = ({ data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]

  const [overallData, setOverallData] = useState(data)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  console.log('uidAtom @@@', uidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [modalMode, setModalMode] = useAtom(surEditModalAtom) // 할증 관리 modal
  const [dispatchModalMode, setDispatchModalMode] = useAtom(StandardDispatchEditAtom)
  const [consoliMode, setCosoliMode] = useAtom(consolEditModalAtom) // 합짐비 관리 modal

  const [userpageEditModal, setUserPageEditModal] = useAtom(userpageUserPreferEdit) // 마이페이지 수정 모달

  const [userDestiEdit, setUserDestiEdit] = useAtom(userpageDestinationEdit)

  console.log('버튼 셀 @@@', userpageEditModal)

  console.log('!!!')

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
      case 'input':
        setBtnCellModal(true)
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
      case 'userdestination':
        setUidAtom(uid)
        setUserDestiEdit(true)
      default:
        break
    }
  }

  const closeModal = () => {
    setBtnCellModal(false)
  }

  return (
    <>
      <SkyBtn onClick={btnClickedHandler}>수정</SkyBtn>
    </>
  )
}

export default BtnCellRenderer
