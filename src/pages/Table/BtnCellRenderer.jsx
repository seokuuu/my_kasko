import React, { useEffect, useState } from 'react'
import { SkyBtn } from '../../common/Button/Button'
import { btnCellRenderAtom, btnCellUidAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

const BtnCellRenderer = ({ data, uidFieldName, editType }) => {
  console.log("data !!!", data)
  const uid = data[uidFieldName]
  const [overallData, setOverallData] = useState(data)
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)

  console.log('overallData ', overallData)
  console.log('uidAtom =>', uidAtom)
  console.log('editType', editType)

  const btnClickedHandler = () => {
    switch (editType) {
      case 'table':
        console.log("btnCellModal", btnCellModal)
        setBtnCellModal(true)
        setUidAtom(uid)
        console.log('Clicked uid:', uid)
        break
      case 'b':
        // 추가적인 작업이 필요한 경우
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
