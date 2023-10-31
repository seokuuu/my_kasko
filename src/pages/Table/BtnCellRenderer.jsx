import React, { useEffect, useState } from 'react'
import { SkyBtn } from '../../common/Button/Button'
import { btnCellRenderAtom, btnCellUidAtom, surEditModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

const BtnCellRenderer = ({ data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]
  const [overallData, setOverallData] = useState(data)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
  const [modalMode, setModalMode] = useAtom(surEditModalAtom)

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
      case 'c':
        // 추가적인 작업이 필요한 경우
        break
      case 'd':
        // 추가적인 작업이 필요한 경우
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
