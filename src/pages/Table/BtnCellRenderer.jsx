import React, { useEffect } from 'react'
import { SkyBtn } from '../../common/Button/Button'
import Table from '../../modal/Table/Table'
import { btnCellRenderAtom, btnCellUidAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

// ex) StandardDestinaionFieldsCols에서 uid 역할을 하는 key값을 수정 array에 넣어주자
const BtnCellRenderer = ({ value, data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]

  // uid를 전역으로 관리
  //
  const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)

  useEffect(() => {
    setUidAtom(uid)
  }, [])
  console.log('uidAtom =>', uidAtom)

  const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)

  console.log('editType', editType)

  const btnClickedHandler = () => {
    switch (editType) {
      case 'table':
        setBtnCellModal(true)
        break
      case 'b':
        break
      case 'c':
        break
      case 'd':
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
