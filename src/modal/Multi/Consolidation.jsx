import React, { useEffect } from 'react'
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

import { useAtom } from 'jotai'

import { InputContainer, NoOutInput, TxtInput, Unit } from '../../common/Input/Input'
import { CustomSelect } from '../../common/Option/Main'

import { consolidationOptions } from '../../common/Option/Standard'
import { consolEditModalAtom, popupAtom, popupObject, popupTypeAtom } from '../../store/Layout/Layout'
import AlertPopup from '../Alert/AlertPopup'
import { popupDummy } from '../Alert/PopupDummy'
const ConsolidationModal = ({
  btnCellModal,
  setBtnCellModal,
  getRow,
  uidAtom,
  onChangeHandler,
  inputValues,
  setInputValues,
  title,
  propsHandler,
  editTitle,
  modalMode,
  selectedOption,
  handleDropValueChange,
  landValue,
}) => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

  const modalClose = () => {
    setBtnCellModal(false)
  }

  // 등록 - 수정간 input value 초기화
  useEffect(() => {
    if (modalMode === '등록') {
      setInputValues({
        dropValue: '2착',
        input1: '',
        input2: '',
      })
    } else {
      setInputValues({
        uid: uidAtom,
        input1: '',
        input2: '',
      })
    }
  }, [consolEditModalAtom])

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
      <ModalContainer width={400}>
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
                <h6>착</h6>
                {modalMode === '수정' ? (
                  <TxtInput placeholder={landValue} style={{ width: '250px', height: '35px' }} disabled />
                ) : (
                  <>
                    <CustomSelect
                      width={250}
                      options={consolidationOptions}
                      defaultValue={consolidationOptions[0]}
                      value={consolidationOptions.value}
                      onChange={handleDropValueChange}
                    />
                  </>
                )}
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>동일 시군</h6>
                <InputContainer style={{ width: '250px' }}>
                  <NoOutInput
                    name="input1"
                    onChange={onChangeHandler}
                    value={inputValues.input1}
                    style={{ fontSize: '16px' }}
                    placeholder="0"
                    type="text"
                  />
                  <Unit>원</Unit>
                </InputContainer>
              </BlueSubDiv>
              <BlueSubDiv style={{ height: '80px' }} bor>
                <h6>타 시군</h6>
                <InputContainer style={{ width: '250px' }}>
                  <NoOutInput
                    name="input2"
                    onChange={onChangeHandler}
                    value={inputValues.input2}
                    style={{ fontSize: '16px' }}
                    placeholder="0"
                    type="text"
                  />
                  <Unit>원</Unit>
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

export default ConsolidationModal
