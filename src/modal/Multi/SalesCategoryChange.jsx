import React, { useState } from 'react'
import {
  BlueBarHeader,
  BlueMainDiv,
  BlueRadioWrap,
  BlueSubContainer,
  BlueSubDiv,
  ModalContainer,
  NonFadeOverlay,
  WhiteCloseBtn,
} from '../Common/Common.Styled'

import { useAtom } from 'jotai'
import { blueModalAtom } from '../../store/Layout/Layout'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

const SalesCategoryChange = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['판매재', '판매 제외 재', '장기재']
  const radioDummy2 = ['불량', '제외 요청', '기타 사유']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  const [checkRadio2, setCheckRadio2] = useState(Array.from({ length: radioDummy2.length }, (_, index) => index === 0))

  console.log('checkRadio =>', checkRadio)

  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <NonFadeOverlay />
      <ModalContainer width={530}>
        <BlueBarHeader>
          <div>판매 구분 변경</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              <BlueSubDiv>
                <h6>판매 구분</h6>
                <BlueRadioWrap>
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
              {checkRadio[1] && (
                <BlueSubDiv bor>
                  <h6>판매 제외 사유</h6>
                  <BlueRadioWrap>
                    {radioDummy2.map((text, index) => (
                      <RadioMainDiv key={index}>
                        <RadioCircleDiv
                          isChecked={checkRadio2[index]}
                          onClick={() => {
                            setCheckRadio2(CheckBox(checkRadio2, checkRadio2.length, index))
                          }}
                        >
                          <RadioInnerCircleDiv isChecked={checkRadio2[index]} />
                        </RadioCircleDiv>
                        <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                      </RadioMainDiv>
                    ))}
                  </BlueRadioWrap>
                </BlueSubDiv>
              )}
            </BlueMainDiv>
          </div>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default SalesCategoryChange
