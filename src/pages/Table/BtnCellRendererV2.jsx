import { useAtom } from 'jotai'
import React from 'react'
import { SkyBtn } from '../../common/Button/Button'
import { weightAtom, weightObj } from '../../store/Layout/Layout'
const BtnCellRendererV2 = ({ data, uidFieldName, editType, moveUrl }) => {
  const uid = data[uidFieldName]
  const [weight, setWeight] = useAtom(weightAtom)
  const [obj, setObj] = useAtom(weightObj)

  const btnClickedHandler = () => {
    setWeight(true)
    setObj(data)
  }
  console.log('DATA : ', data)
  return (
    <>
      <SkyBtn style={{ marginLeft: 'auto', marginRight: 'auto' }} onClick={btnClickedHandler}>
        {data['중량 판매 개수'] === 0 ? '중량 판매' : '수정'}
      </SkyBtn>
    </>
  )
}

export default BtnCellRendererV2
