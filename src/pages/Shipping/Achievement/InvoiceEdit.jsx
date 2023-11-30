import React, { useEffect, useState, Fragment } from 'react'

import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import { CheckBox } from '../../../common/Check/Checkbox'
import { ClaimContent2, TableWrap } from '../../../components/MapTable/MapTable'
import {
  ExRadioWrap,
  FilterContianer,
  FilterHeader,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

const InvoiceEdit = ({}) => {
  const radioTableDummy = ['Y', 'N']

  const [checkRadio2, setCheckRadio2] = useState(
    Array.from({ length: radioTableDummy.length }, (_, index) => index === 0),
  )

  const [savedRadioValue2, setSavedRadioValue2] = useState('')
  useEffect(() => {
    const checkedIndex = checkRadio2.findIndex((isChecked, index) => isChecked && index < radioTableDummy.length)

    // 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
    // if (checkedIndex !== -1) {
    //   const selectedValue = radioDummy[checkedIndex];
    //   setSavedRadioValue(selectedValue); //내 state에 반환
    //   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
    // }
  }, [checkRadio2])

  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  const NewDummy = {
    '출고 일자': '2023.04.05',
    '출고 번호': '2023.04.05',
    고객사: '(주) 아이덴잇',
    목적지명: '154,585,000',
    '하차지 주소': '456,485,200',
    '하차지 연락처': '63,000',
    '하차지 담당자': '홍길동',
    차량번호: '12가 3456',
    '기사 연락처': '01012341234',
  }

  const entries = Object.entries(NewDummy)
  const chunkedEntries = []

  for (let i = 0; i < entries.length; i += 3) {
    chunkedEntries.push(entries.slice(i, i + 3))
  }

  return (
    <FilterContianer>
      <FilterHeader>
        <h1>거래 명세서 수정</h1>
        {/* 토글 쓰기 */}
      </FilterHeader>

      <TableWrap style={{ margin: '10px 0px' }}>
        <ClaimTable>
          {chunkedEntries.map((chunk, i) => (
            <ClaimRow key={i}>
              {chunk.map(([title, content], j) => (
                <Fragment key={j}>
                  <ClaimTitle>{title}</ClaimTitle>
                  <ClaimContent>{content}</ClaimContent>
                </Fragment>
              ))}
            </ClaimRow>
          ))}
        </ClaimTable>
      </TableWrap>

      <TableContianer>
        <Test3 />
      </TableContianer>
      <TableWrap style={{ marginTop: '10px' }}>
        <ClaimTable>
          <ClaimRow>
            <ClaimTitle style={{ width: '15%' }}>총 합계</ClaimTitle>
            <ClaimContent2>?</ClaimContent2>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle style={{ width: '100%' }}>추가비 및 공차비</ClaimTitle>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle style={{ width: '15%' }}>추가비</ClaimTitle>
            <ClaimContent2>?</ClaimContent2>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle style={{ width: '15%' }}>공차비</ClaimTitle>
            <ClaimContent2>?</ClaimContent2>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle style={{ width: '15%' }}>총 합계</ClaimTitle>
            <ClaimContent2>?</ClaimContent2>
          </ClaimRow>
        </ClaimTable>
      </TableWrap>
    </FilterContianer>
  )
}

export default InvoiceEdit
