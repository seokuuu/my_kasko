import React from 'react'
import { SkyBtn } from '../../common/Button/Button'

const BtnCellRenderer = ({}) => {
  const btnClickedHandler = () => {
    console.log('클릭 되었습니다!!!!')
  }

  return <SkyBtn onClick={btnClickedHandler}>수정</SkyBtn>
}

export default BtnCellRenderer
