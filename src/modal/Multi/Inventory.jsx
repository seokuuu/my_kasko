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
} from '../Common/Common.Styled'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

const Inventory = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['판매재', '판매 제외 재']
  const radioDummy2 = ['불량', '제외 요청', '기타 사유']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, () => false))

  const [checkRadio2, setCheckRadio2] = useState(Array.from({ length: radioDummy2.length }, () => false))

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
                <ExRadioWrap>
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
                </ExRadioWrap>
              </BlueSubDiv>
              {checkRadio[1] && (
                <BlueSubDiv bor>
                  <h6>판매 제외 사유</h6>
                  <ExRadioWrap>
                    {radioDummy2.map((text, index) => (
                      <RadioMainDiv key={index}>
                        <RadioCircleDiv
                          isChecked={checkRadio2[index]}
                          onClick={() => {
                            setCheckRadio2(CheckBox(checkRadio2, checkRadio2.length, index))
                          }}
                        >
                          <RadioInnerCircleDiv />
                        </RadioCircleDiv>
                        <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                      </RadioMainDiv>
                    ))}
                  </ExRadioWrap>
                </BlueSubDiv>
              )}
            </BlueMainDiv>
          </div>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default Inventory
