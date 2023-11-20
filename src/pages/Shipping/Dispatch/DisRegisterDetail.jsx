import React from 'react'
import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import { TableWrap } from '../../../components/MapTable/MapTable'
import {
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubcontianer,
  FilterLeft,
  FilterRight,
  RowWrap,
  PartWrap,
  PWRight,
  Input,
  GridWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
  ExRadioWrap,
  SubTitle,
  FilterHeaderAlert,
  FHALeft,
  ExInputsWrap,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../components/MapTable/MapTable'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

import Hidden from '../../../components/TableInner/Hidden'
import { ArrowDropDown } from '@mui/icons-material'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useAtom } from 'jotai'

const DisRegisterDetail = ({}) => {
  const radioTableDummy = ['Y', 'N']

  const [checkRadio2, setCheckRadio2] = useState(Array.from({ length: radioTableDummy.length }, () => false))

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
        <h1>배차/출고 등록 상세</h1>
        {/* 토글 쓰기 */}
      </FilterHeader>

      <TableWrap style={{ marginTop: '5px' }}>
        <ClaimTable>
          <ClaimRow>
            <ClaimTitle>출하 요청 일자</ClaimTitle>
            <ClaimContent>2023.04.05</ClaimContent>
            <ClaimTitle>순번</ClaimTitle>
            <ClaimContent>001</ClaimContent>
            <ClaimTitle>상차도 여부</ClaimTitle>
            <ClaimContent>
              <ExRadioWrap>
                {radioTableDummy.map((text, index) => (
                  <RadioMainDiv key={index}>
                    <RadioCircleDiv
                      isChecked={checkRadio2[index]}
                      onClick={() => {
                        setCheckRadio2(CheckBox(checkRadio2, checkRadio2.length, index))
                      }}
                    >
                      <RadioInnerCircleDiv />
                    </RadioCircleDiv>

                    <div style={{ display: 'flex', marginLeft: '5px' }}>
                      <p>{text}</p>
                    </div>
                  </RadioMainDiv>
                ))}
              </ExRadioWrap>
            </ClaimContent>
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
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>목록 제거</WhiteRedBtn>
            <WhiteSkyBtn>추가 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>합짐 변경 요청 승인 반려</WhiteRedBtn>
            <WhiteSkyBtn>합짐 변경 요청 승인</WhiteSkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default DisRegisterDetail
