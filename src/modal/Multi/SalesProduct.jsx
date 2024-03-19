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
import { BlueRadioWrap } from '../Common/Common.Styled'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'

const SalesProduct = () => {
  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalClose = () => {
    setIsModal(false)
  }

  const radioDummy = ['경매 대상재', '상시판매 대상재']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))


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
            </BlueMainDiv>
          </div>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default SalesProduct
