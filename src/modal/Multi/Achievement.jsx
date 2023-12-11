import React, { useState } from 'react'
import { GreyBtn } from '../../common/Button/Button'
import { TxtInput } from '../../common/Input/Input'
import {
  Bar,
  BlueBarHeader,
  BlueBlackBtn,
  BlueBtnWrap,
  BlueInput,
  BlueMainDiv,
  BlueRadioWrap,
  BlueSubContainer,
  BlueSubDiv,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../Common/Common.Styled'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

import { styled } from 'styled-components'
import { CheckImg2, StyledCheckSubSquDiv } from '../../common/Check/CheckImg'
import { ExCheckDiv } from '../External/ExternalFilter'

const Achievement = ({ setAddedModal }) => {
  const modalClose = () => {
    setAddedModal(false)
  }

  const radioDummy = ['해당없음', '추가', '차감']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const checkDummy = ['공차비 추가']
  const [check1, setCheck1] = useState(Array.from({ length: checkDummy.length }, () => false))

  console.log('checkRadio =>', checkRadio)

  return (
    // 판매 제품 관리 - 패키지 관리
    <>
      <FadeOverlay />
      <ModalContainer width={500}>
        <BlueBarHeader>
          <div>추가비 및 공차비 추가</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              <BlueSubDiv style={{ height: '30px' }}>
                <h6>출고번호 번호</h6>
                <p style={{ color: '#4C83D6' }}>20230403-001</p>
              </BlueSubDiv>
            </BlueMainDiv>
            <BlueMainDiv>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                <div style={{ width: '80px' }}>고객사</div>
                <TxtInput />
                <GreyBtn height={40} width={15} margin={5}>
                  찾기
                </GreyBtn>
              </div>
            </BlueMainDiv>
            <Bar width={90} color="#c8c8c8" top={15} />
            <BlueMainDiv style={{ border: 'none' }}>
              <BlueSubDiv style={{ height: '50px' }}>
                <BlueRadioWrap style={{ gap: '50px', padding: '0px', marginLeft: '-10px' }}>
                  {radioDummy.map((text, index) => (
                    <RadioMainDiv key={index}>
                      <RadioCircleDiv
                        isChecked={checkRadio[index]}
                        onClick={() => {
                          setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                        }}
                      >
                        <RadioInnerCircleDiv isChecked={checkRadio[index]} />
                      </RadioCircleDiv>
                      <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                    </RadioMainDiv>
                  ))}
                </BlueRadioWrap>
              </BlueSubDiv>
              <div style={{ display: 'flex', gap: '20px' }}>
                <BlueInput style={{ width: '40%' }} placeholder="추가비" />
                <BlueInput style={{ width: '40%' }} placeholder="금액을 입력해 주세요." />
              </div>
            </BlueMainDiv>
            <CheckDiv>
              {checkDummy.map((x, index) => (
                <ExCheckDiv>
                  <StyledCheckSubSquDiv
                    onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                    isChecked={check1[index]}
                  >
                    <CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
                  </StyledCheckSubSquDiv>
                  <p>{x}</p>
                </ExCheckDiv>
              ))}
            </CheckDiv>
            <BlueMainDiv style={{ border: 'none' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <BlueInput style={{ width: '40%' }} placeholder="출고 중량" /> *
                <BlueInput style={{ width: '40%' }} placeholder="목적지/목적지 코드" />
                <GreyBtn width={13} height={35} fontSize={16}>
                  찾기
                </GreyBtn>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <p>=</p>
                <BlueInput style={{ width: '40%', marginTop: '10px' }} placeholder="금액" />
              </div>
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

export default Achievement

const CheckDiv = styled.div`
  display: flex;
  margin-left: 30px;
  position: relative;
  top: 15px;
  font-size: 16px;
`
