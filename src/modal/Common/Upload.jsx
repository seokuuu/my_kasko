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

import styled from 'styled-components'
import { GreyBtn } from '../../common/Button/Button'
import { useRef } from 'react'

const Upload = ({ modalIsOpen, setModalIsOpen, blueTitle }) => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치

  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체

  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

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
    setModalIsOpen(false)
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setSelectedFile(selectedFile)
      setUploadProgress(0)
    }
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setUploadProgress(0)

    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const radioDummy = ['대량 등록', '단일 등록']

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  console.log('', (popupMessages[1].find((message) => message.num === '4') || {}).title)

  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <FadeOverlay />
      <ModalContainer width={850}>
        <BlueBarHeader>
          <div>{blueTitle}</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv style={{ margin: '0px auto' }}>
              <BlueSubDiv>
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
            </BlueMainDiv>
            <BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px', display: 'flex' }}>
              {!selectedFile && (
                <BlueSubDiv style={{ display: 'block' }}>
                  <UldWrap>
                    <UldText>
                      업로드 최대 용량 10MB <br /> 파일의 용량에 따라 업로드 시간이 지연될 수 있습니다.
                    </UldText>
                    <input
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    <UldWrap>
                      {selectedFile && (
                        <div>
                          <div>{selectedFile.name}</div>
                          <div>
                            <progress value={uploadProgress} max="100" />
                          </div>
                        </div>
                      )}
                    </UldWrap>
                  </UldWrap>
                  <UldWrap>
                    <UldBtn onClick={() => fileInputRef.current.click()}> 업로드</UldBtn>
                  </UldWrap>
                </BlueSubDiv>
              )}
              {selectedFile && (
                <UldAfterWrap>
                  <div style={{ fontSize: '16px' }}>{selectedFile.name}</div>
                  <div style={{ display: 'flex' }}>
                    <progress value={uploadProgress} max="100" />
                    <div>x</div>
                  </div>
                </UldAfterWrap>
              )}
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
            {popupSwitch && <AlertPopup />}
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default Upload

const UldWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
`

const UldText = styled.div`
  color: #b5b5b5;
  font-size: 18px;
  margin-top: -20px;
`

const UldBtn = styled.button`
  width: 200px;
  height: 35px;
  color: #4c83d6;
  background-color: white;
  border: 1px solid #b5b5b5;
  font-size: 18px;
  margin-top: 35px;
`

const UldAfterWrap = styled.div`
  width: 100%;
  margin: 10px;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
`
