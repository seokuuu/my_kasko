import React from 'react'
import { useState } from 'react'
import {
  NonFadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
  BlueSubContainer,
  BlueBarHeader,
  BlueMainDiv,
  BlueSubDiv,
  BlueRadioWrap,
  BlueInput,
  BlueBlackBtn,
  BlueBtnWrap,
} from '../Common/Common.Styled'

import { BlackBtn } from '../../common/Button/Button'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

import { InputContainer, NoOutInput, TxtInput, Unit } from '../../common/Input/Input'
import { Input } from '@mui/material'

const Consolidation = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['경매', '상시']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  console.log('checkRadio =>', checkRadio)

  return (
    // 기준 관리 -
    <>
      {' '}
      <NonFadeOverlay />
      <ModalContainer width={400}>
        <BlueBarHeader>
          <div>할증 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              <BlueSubDiv style={{ height: '80px' }}>
                <h6>착</h6>
                <TxtInput placeholder="2착" style={{ width: '250px', height: '35px' }} disabled />
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>동일 시군</h6>
                <InputContainer style={{ width: '250px' }}>
                  <NoOutInput style={{ fontSize: '16px' }} placeholder="0" type="text" />
                  <Unit>원</Unit>
                </InputContainer>
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>타 시군</h6>
                <InputContainer style={{ width: '250px' }}>
                  <NoOutInput style={{ fontSize: '16px' }} placeholder="0" type="text" />
                  <Unit>원</Unit>
                </InputContainer>
              </BlueSubDiv>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn>저장</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default Consolidation
