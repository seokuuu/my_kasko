import React from 'react'
import {
  BlueBarHeader,
  BlueBlackBtn,
  BlueBtnWrap,
  BlueMainDiv,
  BlueSubContainer,
  BlueSubDiv,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../Common/Common.Styled'

import AlertPopup from '../Alert/AlertPopup'

import { surEditModalAtom } from '../../store/Layout/Layout'

import { useAtom } from 'jotai'

import { useEffect } from 'react'
import { InputContainer, NoOutInput, Unit } from '../../common/Input/Input'

import { popupAtom, popupObject, popupTypeAtom } from '../../store/Layout/Layout'
import { popupDummy } from '../Alert/PopupDummy'

const TransportModal = ({
  onChangeHandler,
  setBtnCellModal,
  title,
  data1,
  data2,
  data3,
  inputValues,
  setInputValues,
  propsHandler,
}) => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
  const modalClose = () => {
    setBtnCellModal(false)
  }

  // 등록 - 수정간 input value 초기화
  useEffect(() => {
    setInputValues({
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
    })
  }, [surEditModalAtom])

  const firstPopupClick = (num) => {
    setPopupSwitch(true)
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup((prevNowPopup) => ({
      ...prevNowPopup,
      ...firstPopup,
      func: propsHandler,
    }))
  }

  return (
    // 기준 관리 -
    <>
      <FadeOverlay />
      <ModalContainer width={650}>
        <BlueBarHeader>
          <div>{title}</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv>
              <BlueSubDiv style={{ height: '80px' }}>
                <h6>{data1}</h6>
                <InputContainer style={{ width: '190px' }}>
                  <NoOutInput
                    name="input1"
                    value={inputValues.input1}
                    onChange={onChangeHandler}
                    style={{ fontSize: '16px' }}
                    placeholder="최소 길이"
                    type="text"
                  />
                  <Unit>M</Unit>
                </InputContainer>
                <p style={{ margin: '0px 5px' }}>~</p>
                <InputContainer>
                  <NoOutInput
                    name="input2"
                    onChange={onChangeHandler}
                    value={inputValues.input2}
                    style={{ fontSize: '16px' }}
                    placeholder="최대 길이"
                    type="text"
                  />
                  <Unit>M</Unit>
                </InputContainer>
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>{data2}</h6>
                <InputContainer style={{ width: '190px' }}>
                  <NoOutInput
                    name="input3"
                    onChange={onChangeHandler}
                    value={inputValues.input3}
                    style={{ fontSize: '16px' }}
                    placeholder="최소 폭"
                    type="text"
                  />
                  <Unit>M</Unit>
                </InputContainer>
                <p style={{ margin: '0px 5px' }}>~</p>
                <InputContainer>
                  <NoOutInput
                    name="input4"
                    onChange={onChangeHandler}
                    value={inputValues.input4}
                    style={{ fontSize: '16px' }}
                    placeholder="최대 폭"
                    type="text"
                  />
                  <Unit>M</Unit>
                </InputContainer>
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>{data3}</h6>
                <InputContainer style={{ width: '415px' }}>
                  <NoOutInput
                    name="input5"
                    onChange={onChangeHandler}
                    value={inputValues.input5}
                    style={{ fontSize: '16px' }}
                    placeholder="퍼센트 값"
                    type="text"
                  />
                  <Unit>%</Unit>
                </InputContainer>
              </BlueSubDiv>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn
              onClick={() => {
                firstPopupClick('2-3')
              }}
            >
              저장
            </BlueBlackBtn>
            {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default TransportModal
