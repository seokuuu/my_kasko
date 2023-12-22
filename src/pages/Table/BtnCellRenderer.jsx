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
  userpageDestinationEdit,
  userpageUserPreferEdit,
} from '../../store/Layout/Layout'

const BtnCellRenderer = ({ data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]
  const navigate = useNavigate()
  const [overallData, setOverallData] = useState(data)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  console.log('uidAtom @@@', uidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [modalMode, setModalMode] = useAtom(surEditModalAtom) // 할증 관리 modal
  const [dispatchModalMode, setDispatchModalMode] = useAtom(StandardDispatchEditAtom)
  const [consoliMode, setCosoliMode] = useAtom(consolEditModalAtom) // 합짐비 관리 modal
  const [recommend, setRecommend] = useState(false)
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
        break
      case 'userdestination':
        setUidAtom(uid)
        setUserDestiEdit(true)
        break
      // 클레임 관리 목록 수정 버튼 => 클레임 수정 페이지로 이동
      case 'claimUpdate':
        navigate('/')
        break
      case 'recommend':
        setRecommend(true)
        break
      default:
        break
    }
  }

  const closeModal = () => {
    setBtnCellModal(false)
  }

  return <>{recommend ? <div>추천 {data['제품명']}</div> : <SkyBtn onClick={btnClickedHandler}>수정</SkyBtn>}</>
}

export default BtnCellRenderer
