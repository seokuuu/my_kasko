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
  BlueOneDiv,
  BlueHalfDiv,
} from '../Common/Common.Styled'

import { BlackBtn } from '../../common/Button/Button'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'
import { styled } from 'styled-components'
import { CustomSelect } from '../../common/Option/Main'

import { storageOptions } from '../../common/Option/SignUp'

const DispatchEdit = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['경매', '상시']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  console.log('checkRadio =>', checkRadio)

  return (
    // 판매 제품 관리 - 패키지 관리
    <>
      <NonFadeOverlay />
      <ModalContainer width={550}>
        <BlueBarHeader>
          <div>배차 기사 수정</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv style={{ border: 'none' }}>
              <BlueOneDiv bor>
                <h6>창고</h6>
                <CustomSelect options={storageOptions} defaultValue={storageOptions[0]} />
              </BlueOneDiv>
              <BlueHalfDiv>
                <div>
                  <h6>기사 명</h6>
                  <BlueInput placeholder="홍길동" />
                </div>
                <div>
                  <h6>연락처</h6>
                  <BlueInput placeholder="'-'제외한 숫자 입력" />
                </div>
              </BlueHalfDiv>
              <BlueHalfDiv>
                <div>
                  <h6>차량 번호</h6>
                  <div style={{ display: 'block', height: '50px' }}>
                    <BlueInput placeholder="예) 123가5678" />
                  </div>
                </div>
                <div>
                  <h6>차량 종류</h6>
                  <BlueInput placeholder="예) 카고 트럭" />
                </div>
              </BlueHalfDiv>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn>수정</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default DispatchEdit
