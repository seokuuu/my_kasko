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
import { adminDestnationPopup } from '../../store/Layout/Popup'
import { onClickCheckAtom } from '../../store/Layout/Layout'

import { popupObject } from '../../store/Layout/Layout'
import { popupDummy } from '../Alert/PopupDummy'
import { popupTypeAtom, btnCellRenderAtom } from '../../store/Layout/Layout'

import styled from 'styled-components'
import { GreyBtn } from '../../common/Button/Button'
import { useRef } from 'react'
import { readExcelFile } from '../../utils/ReadExcelFile'
import { KrFiledtoEng } from '../../lib/tableHelpers'

//  ****** 수정용 table을 가져오는 단일 컴포넌트 *******
// ex) Destination으로 예를 듦
// 1. Destination에서 key값이 한글로 매핑된 Object를 가져온다 (getRow)
// 2. btnCellRenderAtom이 해당 TableModal의 switch 역할 - propsHandler로 받음
// propsHandler를 해당 firstPopupClick의 안 setNowPopup의 func 기능으로 쓴다.
const TableModal = ({ title, setBtnCellModal, propsHandler, modalInTable, getRow, uidAtom, onEditHandler }) => {
  const [onClickCheck, setOnClickCheck] = useAtom(onClickCheckAtom)
  const [popupSwitch, setPopupSwitch] = useAtom(adminDestnationPopup) // 팝업 스위치
  const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입

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

  const modalClose = () => {
    if (onClickCheck) {
      setBtnCellModal(false)
    } else {
      firstPopupClick('2-4')
    }
  }

  // 한글 key object의 uid에 해당하는 '목적지 고유 번호' 를 return
  const matchingRow = getRow?.find((row) => row['목적지 고유 번호'] === uidAtom)

  // matchingRow에서
  // '목적지 코드': 'auto',
  // '목적지 명': 'input', 와 같은 data가 매칭되게끔 필터함. auto는 렌더, input은 input으로 렌더처리
  //

  console.log('matchingRow ###', matchingRow)
  const filteredRow = Object.keys(modalInTable).reduce((acc, key) => {
    if (matchingRow[key]) {
      acc[key] = matchingRow[key]
    }
    return acc
  }, {})

  console.log('filteredRow ###', filteredRow)

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
            {/* <BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px', padding: '0px' }}>
              <Table>
                <thead>
                  <tr>
                    {Object.keys(filteredRow)?.map((key) => (
                      <Th key={key}>{key}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.values(filteredRow)?.map((value, index) => (
                      <Td key={index}>{value === 'auto' ? '' : <Input type="text" />}</Td>
                    ))}
                  </tr>
                </tbody>
              </Table>
            </BlueMainDiv> */}
            <BlueMainDiv style={{ margin: '0px auto', borderTop: 'none', height: '200px', padding: '0px' }}>
              <Table>
                <thead>
                  <tr>
                    {Object.keys(filteredRow)?.map((key) => (
                      <Th key={key}>{key}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.entries(filteredRow)?.map(([key, value], index) => (
                      <Td key={index}>
                        {modalInTable[key] === 'input' ? (
                          <Input type="text" name="name" onChange={onEditHandler} />
                        ) : (
                          matchingRow[key]
                        )}
                      </Td>
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
              저장
            </BlueBlackBtn>
            {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
          </BlueBtnWrap>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default TableModal

export const UldWrap = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
`

export const UldText = styled.div`
  color: #b5b5b5;
  font-size: 18px;
  margin-top: -20px;
`

export const UldBtn = styled.button`
  width: 200px;
  height: 35px;
  color: #4c83d6;
  background-color: white;
  border: 1px solid #b5b5b5;
  font-size: 18px;
  margin-top: 35px;
`

export const UldAfterWrap = styled.div`
  width: 100%;
  margin: 10px;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
  font-size: 18px;

  thead {
    background-color: #dbe2f0;
    border: 1px solid #ddd;
  }
`

export const Th = styled.th`
  border: 1px solid #c8c8c8;
  padding: 8px;
  text-align: center;
  font-weight: 100;
  font-size: 18px;
`

export const Td = styled.td`
  border: 1px solid #ddd;
  text-align: center;
  font-weight: 100;
  width: 100px;
  height: 35px;
  padding: 3px;
  font-size: 18px;
`

export const Input = styled.input`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`
