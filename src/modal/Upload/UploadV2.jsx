import './style.css'
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
import useMutationQuery from '../../hooks/useMutationQuery'
import { postExcelSubmitProduct } from '../../api/SellProduct'

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
const UploadV2 = ({
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
  postApi,
}) => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입 (1,2,3)

  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { mutate, isError } = useMutationQuery('upload', postApi)

  const handlerFileUpload = (e) => {
    const formData = new FormData()
    Array.from(selectedFile).forEach((el) => {
      formData.append('excel', el)
    })
    mutate(formData)
  }
  // 처음 팝업 띄우는 컴포넌트의 onClickHandler
  const firstPopupClick = (num) => {
    setPopupSwitch(true)
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup((prevNowPopup) => ({
      ...prevNowPopup,
      ...firstPopup,
      func: handlerFileUpload,
    }))
  }

  // 팝업 타입 최신화
  useEffect(() => {
    const firstType = nowPopup.num.split('-')[0]
    setNowPopupType(firstType)
  }, [nowPopup, nowPopupType])

  const handleFileExcel = async (event) => {
    const selectedFile = event.target.files

    if (selectedFile) {
      setSelectedFile(selectedFile)
      setInterval(() => {
        if (uploadProgress < 100) {
          let i = Math.floor(Math.random() * 101)
          // i += 10
          setUploadProgress((p) => p + i)
        }
        // setUploadProgress(10)
      }, 1300)
      try {
        // 단일이 아닌 대량으로 엑셀을 여러개 넣거나 엑셀에 들어가는 내용들이 여러개이기에
        // Promise.all로 배열의 요소마다 readExcelFile을 적용할수 있게 했습니다.
        const jsonData = await Promise.all(
          Array.from(selectedFile).map(
            (file) => readExcelFile(file), // Excel 파일을 JSON으로 변환
          ),
        )
        const mappedData = KrFiledtoEng(jsonData, originEngRowField)

        setExcelToJson(mappedData)
      } catch (error) {
        console.log(error)
      }
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

  // console.log('모멘트', moment().format('YYYY-MM-DD'))
  // console.log('파일들', selectedFile)
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
            <BlueMainDiv style={{ margin: '8px auto', height: '200px' }}>
              {!selectedFile && (
                <BlueSubDiv style={{ display: 'block', margin: '7% auto' }}>
                  <UldWrap>
                    <UldText>
                      업로드 최대 용량 10MB <br /> 파일의 용량에 따라 업로드 시간이 지연될 수 있습니다.
                    </UldText>
                    <input
                      multiple="multiple"
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
                            <progress value={uploadProgress} max="100" style={{ background: 'blue' }} />
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
              <div style={{ display: 'flex', flexDirection: 'column', width: '732px' }}>
                {selectedFile &&
                  Object.entries(selectedFile)?.map(([k, v], idx) => (
                    <UldAfterWrap>
                      <div style={{ fontSize: '16px' }}>{v.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Progressbar style={{ background: 'blue' }} value={uploadProgress} max="100" id="progress" />
                        <div>x</div>
                      </div>
                    </UldAfterWrap>
                  ))}
              </div>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn
              onClick={() => {
                if (uploadProgress > 100) {
                  firstPopupClick('2-3')
                } else if (uploadProgress < 100) {
                  alert('업로드중입니다.')
                }
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

export default UploadV2

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
  /* border: 1px solid; */
  display: flex;
  padding: 8px;
  background: #f1f1f1;
  /* gap:4px; */
  justify-content: space-between;
  align-items: center;
`
const Dropdown = styled.div``

const Progressbar = styled.progress`
  background-color: blue;
  ::-webkit-progress-bar {
    background-color: gray;
  }
  ::-webkit-progress-value {
    background-color: #4c83d6;
  }
`
