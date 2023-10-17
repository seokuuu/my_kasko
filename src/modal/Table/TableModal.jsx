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
import { readExcelFile } from '../../utils/ReadExcelFile'
import { KrFiledtoEng } from '../../lib/tableHelpers'

// 1. Upload를 사용하는 컴포넌트에서 originEngRowField props를 받는다
// ex) Destination.jsx에서 StandardDestinaionFields를 받음.
// 2. excelToJson, setExcelToJson을 Props로 내려받아, handleFileExcel에 처리된 mappedData를 set으로 받는다
const TableModal = ({ setModalSwitch, title, btnCellModal, setBtnCellModal, propsPost, modalInTable }) => {
  const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

  // 처음 팝업 띄우는 컴포넌트의 onClickHandler
  const firstPopupClick = (num) => {
    setPopupSwitch(true)
    const firstPopup = popupDummy.find((popup) => popup.num === num)
    setNowPopup((prevNowPopup) => ({
      ...prevNowPopup,
      ...firstPopup,
      func: propsPost,
    }))
  }

  // 팝업 타입 최신화
  useEffect(() => {
    const firstType = nowPopup.num.split('-')[0]
    setNowPopupType(firstType)
  }, [nowPopup, nowPopupType])

  const modalClose = () => {
    setBtnCellModal(false)
  }

  return (
    // 재고 관리 - 판매 구분 변경
    <>
      <FadeOverlay />
      <ModalContainer style={{ zIndex: '9999' }} width={850}>
        <BlueBarHeader>
          <div>{title}</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer>
          <div>
            <BlueMainDiv style={{ margin: '0px auto' }}>
              <BlueSubDiv></BlueSubDiv>
            </BlueMainDiv>
            <BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px', padding: '0px' }}>
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
                    {Object.values(modalInTable)?.map((value, index) => (
                      <Td key={index}>{value === 'auto' ? '' : <Input type="text" />}</Td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </BlueMainDiv>
          </div>
          <BlueBtnWrap>
            <BlueBlackBtn
              onClick={() => {
                firstPopupClick('2-3')
              }}
            >
              테이블 테스트
            </BlueBlackBtn>
            {popupSwitch && <AlertPopup />}
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default TableModal

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

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  font-size: 18px;

  thead {
    background-color: #dbe2f0;
    border: 1px solid #ddd;
  }
`

const Th = styled.th`
  border: 1px solid #c8c8c8;
  padding: 8px;
  text-align: center;
  font-weight: 100;
`

const Td = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  font-weight: 100;
  width: 100px;
  height: 35px;
  padding: 3px;
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`
