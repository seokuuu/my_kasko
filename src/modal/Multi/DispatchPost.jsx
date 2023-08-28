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
import { styled } from 'styled-components'

const DispatchPost = () => {
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
          <div>배차 기사 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv style={{ border: 'none' }}>
              <BlueOneDiv>
                <h6>창고</h6>
                <BlueInput disabled />
              </BlueOneDiv>
              <BlueHalfDiv>
                <div>
                  <h6>기사 명</h6>
                  <BlueInput disabled />
                </div>
                <div>
                  <h6>연락처</h6>
                  <BlueInput disabled />
                </div>
              </BlueHalfDiv>
              <BlueHalfDiv>
                <div>
                  <h6>차량 번호</h6>
                  <div style={{ display: 'block', height: '100px', border: '1px solid blue' }}>
                    <BlueInput disabled />
                    <BlackBtn style={{ marginTop: '5px' }} width={90} height={35}>
                      중복 확인{' '}
                    </BlackBtn>
                  </div>
                </div>
                <div>
                  <h6>차량 종류</h6>
                  <BlueInput disabled />
                </div>
              </BlueHalfDiv>

              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>판매 구분</h6>
                <BlueInput placeholder="패키지 명을 입력하세요." />
              </BlueSubDiv>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn>생성</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default DispatchPost

const BlueOneDiv = styled.div`
  display: block;
  border: 1px solid black;
  padding: 10px;

  h6 {
    margin-bottom: 5px;
  }
`

const BlueHalfDiv = styled.div`
  display: flex;
  border: 1px solid magenta;
  padding: 10px;
  /* justify-content: space-between; */

  input {
    width: 90%;
  }

  > div {
    width: 100%;
  }

  h6 {
    margin-bottom: 5px;
  }
`
