import React from 'react'
import { useState, useEffect } from 'react'

import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'

import { TableWrap } from '../../../components/MapTable/MapTable'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import { ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../components/MapTable/MapTable'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import Hidden from '../../../components/TableInner/Hidden'
import { ArrowDropDown } from '@mui/icons-material'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'

const StatusDetail = ({}) => {
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

  return (
    <FilterContianer>
      <FilterHeader>
        <h1>출고 현황 상세</h1>
        {/* 토글 쓰기 */}
      </FilterHeader>

      <TableWrap style={{ marginTop: '5px' }}>
        <ClaimTable>
          <ClaimRow>
            <ClaimTitle>출하 요청 일자</ClaimTitle>
            <ClaimContent>2023.04.05</ClaimContent>
            <ClaimTitle>출고 일자</ClaimTitle>
            <ClaimContent>001</ClaimContent>
            <ClaimTitle>출고 번호</ClaimTitle>
            <ClaimContent>20230403-001</ClaimContent>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle>목적지 1</ClaimTitle>
            <ClaimContent>부산 광역시</ClaimContent>
            <ClaimTitle>목적지 2</ClaimTitle>
            <ClaimContent>천안시</ClaimContent>
            <ClaimTitle>목적지 3</ClaimTitle>
            <ClaimContent>-</ClaimContent>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle>매출운임비</ClaimTitle>
            <ClaimContent>154,585,000</ClaimContent>
            <ClaimTitle>매입운임비</ClaimTitle>
            <ClaimContent>456,485,200</ClaimContent>
            <ClaimTitle>합짐비</ClaimTitle>
            <ClaimContent>63,000</ClaimContent>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle>운전사 명</ClaimTitle>
            <ClaimContent>홍길동</ClaimContent>
            <ClaimTitle>차량번호</ClaimTitle>
            <ClaimContent>12가 3456</ClaimContent>
            <ClaimTitle>기사 연락처</ClaimTitle>
            <ClaimContent>01012341234</ClaimContent>
          </ClaimRow>
        </ClaimTable>
      </TableWrap>

      <TableContianer>
        <TCSubContainer>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown />
            <Excel />
          </div>
        </TCSubContainer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  )
}

export default StatusDetail
