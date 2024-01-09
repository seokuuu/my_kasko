import moment from 'moment'
import React, { useState } from 'react'
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

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'
import { ExRadioWrap } from '../External/ExternalFilter'

import { useEffect } from 'react'
import { CheckBox } from '../../common/Check/Checkbox'
import { popupAtom } from '../../store/Layout/Layout'
import AlertPopup from '../Alert/AlertPopup'

import { popupObject, popupTypeAtom } from '../../store/Layout/Layout'
import { popupDummy } from '../Alert/PopupDummy'

import { useRef } from 'react'
import styled from 'styled-components'
import { KrFiledtoEng } from '../../lib/tableHelpers'
import { readExcelFile } from '../../utils/ReadExcelFile'

import { CustomSelect } from '../../common/Option/Main'
import { Input, Table, Td, Th } from '../Table/TableModal'

// 1. Upload를 사용하는 컴포넌트에서 originEngRowField props를 받는다
// ex) Destination.jsx에서 StandardDestinaionFields를 받음.
// 2. excelToJson, setExcelToJson을 Props로 내려받아, handleFileExcel에 처리된 mappedData를 set으로 받는다

// 예시 )
// export const StandardTransportationPost = {
//   출발지: 'auto',
//   '목적지 코드': 'auto',
//   '목적지 명': 'input',
//   '제품 구분': 'auto',
//   '단가 적용 일자': 'auto',
//   '적용 단가': 'input',
// }

// 목적지 등록 기획 오류로 인한 보류 !!!
const Upload = ({
  modalSwitch,
  setModalSwitch,
  title,
  originEngRowField,
  excelToJson,
  setExcelToJson,
  propsHandler,
  modalInTable,
  getRow,
  uidAtom,
  onEditHandler,
  dropdownProps,
  width,
}) => {
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
    setNowPopup((prevNowPopup) => ({
      ...prevNowPopup,
      ...firstPopup,
      func: propsHandler,
    }))
  }

  // 팝업 타입 최신화
  useEffect(() => {
    const firstType = nowPopup.num.split('-')[0]
    setNowPopupType(firstType)
  }, [nowPopup, nowPopupType])

  const handleFileExcel = async (event) => {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setSelectedFile(selectedFile)
      setUploadProgress(0)

      try {
        const jsonData = await readExcelFile(selectedFile) // Excel 파일을 JSON으로 변환

        const mappedData = KrFiledtoEng(jsonData, originEngRowField)
        setExcelToJson(mappedData)
      } catch (error) {}
    }
  }

  const modalClose = () => {
    setModalSwitch(false)
  }

  const handleCancel = () => {
    setSelectedFile(null)
    setUploadProgress(0)

    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
  }

  const radioDummy = ['대량 등록', '단일 등록']

  const date = moment().format('YYYY-MM-DD')

  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = '현재 작업 중인 내용이 저장되지 않았습니다. 페이지를 나가시겠습니까?'
      event.returnValue = message // Standard for most browsers
      return message // For some older browsers
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  console.log('모멘트', moment().format('YYYY-MM-DD'))

  const propsWidth = () => {
    if (width) {
      return width
    } else {
      return 850
    }
  }
  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <FadeOverlay />
      <ModalContainer width={propsWidth}>
        <BlueBarHeader>
          <div>{title}</div>
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
                        <RadioInnerCircleDiv isChecked={checkRadio[index]} />
                      </RadioCircleDiv>
                      <div style={{ display: 'flex', marginLeft: '5px', color: 'black' }}>{text}</div>
                    </RadioMainDiv>
                  ))}
                </ExRadioWrap>
              </BlueSubDiv>
            </BlueMainDiv>
            {checkRadio[0] && (
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
                        onChange={handleFileExcel}
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <progress value={uploadProgress} max="100" />
                      <div>x</div>
                    </div>
                  </UldAfterWrap>
                )}
              </BlueMainDiv>
            )}
            {checkRadio[1] && (
              <BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px' }}>
                <Table>
                  <thead>
                    <tr>
                      {Object.keys(modalInTable)?.map((key) => (
                        <Th key={key}>{key}</Th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {Object.entries(modalInTable)?.map(([key, value], index) => (
                        <Td key={index}>
                          {value === 'input' ? (
                            value === '작성일' ? (
                              <div>{date}</div>
                            ) : (
                              <Input type="text" />
                            )
                          ) : value === 'dropdown' ? (
                            <CustomSelect
                              options={dropdownProps[0]?.options}
                              defaultValue={dropdownProps[0]?.defaultValue}
                            />
                          ) : value === 'dropdown2' ? (
                            <CustomSelect
                              options={dropdownProps[1]?.options}
                              defaultValue={dropdownProps[1]?.defaultValue}
                            />
                          ) : value === 'dropdown3' ? (
                            <CustomSelect
                              options={dropdownProps[2].options}
                              defaultValue={dropdownProps[2].defaultValue}
                            />
                          ) : (
                            ''
                          )}
                        </Td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
              </BlueMainDiv>
            )}
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
  align-items: center;
`
const Dropdown = styled.div``
