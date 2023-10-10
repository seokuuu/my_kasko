import React from 'react'
import { styled } from 'styled-components'
import { useState } from 'react'
import {
  NonFadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
  BlueSubContainer,
  BlueBarHeader,
  BlueMainDiv,
  BlueSubDiv,
  BlueBtnWrap,
  BlueBlackBtn,
} from '../Common/Common.Styled'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { BlueRadioWrap } from '../Common/Common.Styled'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

const Client = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['경매 대상재', '상시판매 대상재']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  console.log('checkRadio =>', checkRadio)

  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <NonFadeOverlay />
      <ModalContainer width={330}>
        <BlueBarHeader>
          <div>회원 제한</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <Div>
            <BlueRadioWrap style={{ display: 'block', margin: '10px' }}>
              {radioDummy.map((text, index) => (
                <RadioMainDiv key={index} style={{ margin: '30px' }}>
                  <RadioCircleDiv
                    isChecked={checkRadio[index]}
                    onClick={() => {
                      setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                    }}
                  >
                    <RadioInnerCircleDiv />
                  </RadioCircleDiv>
                  <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                </RadioMainDiv>
              ))}
            </BlueRadioWrap>
          </Div>
          <BlueBtnWrap style={{ height: '50px', marginBottom: '20px' }}>
            <BlueBlackBtn>적용</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default Client

const Div = styled.div`
  padding: 10px;
`