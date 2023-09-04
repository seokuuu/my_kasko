import React from 'react'
import { RightBarWrap, RightBarLeft, RightBarRight } from './Right.Styled'

const Right = () => {
  return (
    <RightBarWrap>
      <RightBarLeft>
        <div>
          <img src="/img/right_1_on.png" />
        </div>
        <div>
          <img src="/img/right_2_off.png" />
        </div>
        <div>
          <img src="/img/right_3_off.png" />
        </div>
        <div>
          <img src="/img/right_4_off.png" />
        </div>
      </RightBarLeft>
      <RightBarRight>
        <img src="/img/right_controller.png" />
      </RightBarRight>
    </RightBarWrap>
  )
}

export default Right
