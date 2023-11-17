import React, { useEffect, useState } from 'react'
import { SkyBtn } from '../../common/Button/Button'
import {
  btnCellRenderAtom,
  btnCellUidAtom,
  surEditModalAtom,
  consolEditModalAtom,
  StandardDispatchEditAtom,
} from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

const BtnCellRenderer = ({ data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]

  console.log('data tlqkf', data)

  const [overallData, setOverallData] = useState(data)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  console.log('uidAtom @@@', uidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [modalMode, setModalMode] = useAtom(surEditModalAtom) // 할증 관리 modal
  const [dispatchModalMode, setDispatchModalMode] = useAtom(StandardDispatchEditAtom)
  const [consoliMode, setCosoliMode] = useAtom(consolEditModalAtom) // 합짐비 관리 modal

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
