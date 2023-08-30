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

import { BlackBtn, GreyBtn } from '../../common/Button/Button'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

const Achievement = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['해당없음', '추가', '차감']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  console.log('checkRadio =>', checkRadio)

  return (
    // 판매 제품 관리 - 패키지 관리
    <>
      <NonFadeOverlay />
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
              <BlueSubDiv style={{ height: '50px' }}>
                <h6>출고번호 번호</h6>
                <p style={{ color: '#4C83D6' }}>20230403-001</p>
              </BlueSubDiv>
            </BlueMainDiv>
            <BlueMainDiv>
              <BlueSubDiv style={{ height: '50px' }}>
                <h6>출고번호 번호</h6>
                <p style={{ color: '#4C83D6' }}>20230403-001</p>
              </BlueSubDiv>
            </BlueMainDiv>
            <BlueMainDiv style={{ border: 'none' }}>
              <BlueSubDiv style={{ height: '50px' }}>
                <BlueRadioWrap style={{ gap: '50px', padding: '0px' }}>
                  {radioDummy.map((text, index) => (
                    <RadioMainDiv key={index}>
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
              </BlueSubDiv>
              <div style={{ display: 'flex', gap: '20px' }}>
                <BlueInput style={{ width: '40%' }} placeholder="추가비" />
                <BlueInput style={{ width: '40%' }} placeholder="금액을 입력해 주세요." />
              </div>
            </BlueMainDiv>
            <BlueMainDiv style={{ border: 'none' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <BlueInput style={{ width: '40%' }} placeholder="출고 중량" /> *
                <BlueInput style={{ width: '40%' }} placeholder="목적지/목적지 코드" />
                <GreyBtn width={13} height={35}>
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
