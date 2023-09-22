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
  BlueBtnWrap,
  BlueBlackBtn,
  BlueHalfDiv,
  BlueInput,
} from '../Common/Common.Styled'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { BlueRadioWrap } from '../Common/Common.Styled'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'
import { GreyBtn } from '../../common/Button/Button'
import { TxtInput } from '../../common/Input/Input'

const DispatchDetail = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['검색 ', '직접 입력']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  console.log('checkRadio =>', checkRadio)

  return (
    // 출고 관리 - 배차/출고 등록
    <>
      <NonFadeOverlay />
      <ModalContainer width={530}>
        <BlueBarHeader>
          <div>배차 기사 등록</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              <BlueSubDiv style={{ display: 'block', height: '80px' }}>
                <h6>등록 방식</h6>
                <BlueRadioWrap style={{ gap: '100px', padding: '25px 0px' }}>
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
            </BlueMainDiv>
            {checkRadio[1] ? (
              <>
                <BlueMainDiv style={{ border: 'none' }}>
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
              </>
            ) : (
              <>
                <BlueMainDiv>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '80px' }}>검색</div>
                    <TxtInput />
                    <GreyBtn height={40} width={15} margin={5}>
                      찾기
                    </GreyBtn>
                  </div>
                </BlueMainDiv>
                <BlueMainDiv>검색 결과 영역 추가 필요</BlueMainDiv>
              </>
            )}
          </div>

          <BlueBtnWrap>
            <BlueBlackBtn>등록</BlueBlackBtn>
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default DispatchDetail
