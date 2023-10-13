import React from 'react'
import { SkyBtn } from '../../common/Button/Button'
import Table from '../../modal/Table/Table'
import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

// ex) StandardDestinaionFieldsCols에서 uid 역할을 하는 key값을 수정 array에 넣어주자
const BtnCellRenderer = ({ value, data, uidFieldName, editType }) => {
  const uid = data[uidFieldName]
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  console.log('editType', editType)

  const btnClickedHandler = () => {
    switch (editType) {
      case 'table':
        setIsModal(true)
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
    setIsModal(false)
  }

  return (
    <>
      <SkyBtn onClick={btnClickedHandler}>수정</SkyBtn>
      {isModal && <Table uid={uid} />}
    </>
  )
}

export default BtnCellRenderer
