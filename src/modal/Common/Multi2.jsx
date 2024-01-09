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
  FadeOverlay,
} from '../Common/Common.Styled'

import { blueModalAtom } from '../../store/Layout/Layout'
import { useAtom } from 'jotai'

import { ExRadioWrap } from '../External/ExternalFilter'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../common/Check/RadioImg'

import { CheckBox } from '../../common/Check/Checkbox'
import { useEffect } from 'react'
import CommonTest from '../Alert/PopupMessages'
import { popupMessages } from '../Alert/PopupMessages'
import AlertPopup from '../Alert/AlertPopup'
import { popupAtom } from '../../store/Layout/Layout'

import { popupObject } from '../../store/Layout/Layout'
import { popupDummy } from '../Alert/PopupDummy'
import { popupTypeAtom } from '../../store/Layout/Layout'
import { changeCategoryAtom } from '../../store/Layout/Popup'

const Multi2 = ({ modalSwitch, errMsg, setModalSwitch, closeFn, saveFn, productNumbers }) => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치

  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체

  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

  const [parameter, setParmeter] = useAtom(changeCategoryAtom)

  // 처음 팝업 띄우는 컴포넌트의 onClickHandler
  const firstPopupClick = (num) => {
    setPopupSwitch(true)
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup(firstPopup)
  }

  // 팝업 타입 최신화
  useEffect(() => {
    const firstType = nowPopup.num.split('-')[0]
    setNowPopupType(firstType)
  }, [nowPopup, nowPopupType])

  const modalClose = () => {
    setModalSwitch(false)
  }

  const radioDummy = ['판매재', '판매제외재', '판매완료재']
  const radioDummy2 = ['불량', '제외 요청', '기타 사유']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [checkRadio2, setCheckRadio2] = useState(Array.from({ length: radioDummy2.length }, (_, index) => index === 0))
  const [checkData1, setCheckData1] = useState(Array.from({ length: radioDummy.length }, () => ''))
  const [checkData2, setCheckData2] = useState(Array.from({ length: radioDummy.length }, () => ''))

  console.log('', (popupMessages[1].find((message) => message.num === '4') || {}).title)

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = radioDummy.map((value, index) => {
      return checkRadio[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData1(filteredCheck)
  }, [checkRadio])

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = radioDummy2.map((value, index) => {
      return checkRadio2[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData2(filteredCheck)
  }, [checkRadio2])

  // console.log('라디오값', checkData1)
  useEffect(() => {
    setParmeter((p) => ({
      ...p,
      saleCategory: checkData1 ? checkData1.join('') : '판매재', // 판매재, 판매제외재, 판매완료재
      excludeSaleReason: checkData1.join('') !== '판매제외재' ? '' : checkData2.join(''), // 판매 제외재 사유
      numbers: productNumbers, // 제품번호 목록
    }))
  }, [checkData1, checkData2])

  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <FadeOverlay />
      <ModalContainer width={530}>
        <BlueBarHeader>
          <div>판매 구분 변경</div>
          <div>
            <WhiteCloseBtn onClick={closeFn} src="/svg/white_btn_close.svg" />
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
                        <RadioInnerCircleDiv isChecked={checkRadio[index]} />
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
                          <RadioInnerCircleDiv isChecked={checkRadio2[index]} />
                        </RadioCircleDiv>
                        <div style={{ display: 'flex', marginLeft: '17px', color: 'black' }}>{text}</div>
                      </RadioMainDiv>
                    ))}
                  </ExRadioWrap>
                </BlueSubDiv>
              )}
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn
              onClick={() => {
                firstPopupClick('2-3')
              }}
              // saveFn={saveFn}
            >
              저장
            </BlueBlackBtn>
            {popupSwitch && <AlertPopup saveFn={saveFn} err={errMsg} setPopupSwitch={setPopupSwitch} />}
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default Multi2
