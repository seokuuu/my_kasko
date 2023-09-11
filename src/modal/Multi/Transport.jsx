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

import { InputContainer, NoOutInput, Unit } from '../../common/Input/Input'

const Transport = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['경매', '상시']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  console.log('checkRadio =>', checkRadio)

  return (
    // 기준 관리 -
    <>
      <NonFadeOverlay />
      <ModalContainer width={650}>
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
                <h6>패키지 번호</h6>
                <InputContainer>
                  <NoOutInput style={{ fontSize: '16px' }} placeholder="최소 길이" type="text" />
                  <Unit>M</Unit>
                </InputContainer>
                ~
                <InputContainer>
                  <NoOutInput style={{ fontSize: '16px' }} placeholder="최대 길이" type="text" />
                  <Unit>M</Unit>
                </InputContainer>
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>폭 입력</h6>
                <InputContainer>
                  <NoOutInput style={{ fontSize: '16px' }} placeholder="최소 폭" type="text" />
                  <Unit>M</Unit>
                </InputContainer>
                ~
                <InputContainer>
                  <NoOutInput style={{ fontSize: '16px' }} placeholder="최대 폭" type="text" />
                  <Unit>M</Unit>
                </InputContainer>
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>판매 구분</h6>
                <InputContainer style={{ width: '415px' }}>
                  <NoOutInput style={{ fontSize: '16px' }} placeholder="퍼센트 값" type="text" />
                  <Unit>%</Unit>
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

export default Transport
