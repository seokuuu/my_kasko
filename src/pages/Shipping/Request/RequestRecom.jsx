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

import {
  TCSubContainer,
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
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { TableWrap, ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../components/MapTable/MapTable'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'

const RequestRecom = ({}) => {
  const titleData = [
    '제품 중량(kg)',
    '제품 공급가액',
    '운반비 공급가액',
    '제품 중량(kg)',
    '제품 공급가액',
    '운반비 공급가액',
    '제품 중량(kg)',
    '제품 공급가액',
    '운반비 공급가액',
  ]
  const contentData = [
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
  ]
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  }
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

  const radioDummy = ['독차', '합짐']
  const radioTableDummy = ['Y', 'N']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

  const [savedRadioValue, setSavedRadioValue] = useState('')
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    // 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
    // if (checkedIndex !== -1) {
    //   const selectedValue = radioDummy[checkedIndex];
    //   setSavedRadioValue(selectedValue); //내 state에 반환
    //   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
    // }
  }, [checkRadio])

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

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>선별 추천 목록</h1>
        </div>

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
                      <RadioInnerCircleDiv isChecked={checkRadio2[index]} />
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
            <ClaimContent>-</ClaimContent>
            <ClaimTitle>목적지 2</ClaimTitle>
            <ClaimContent>-</ClaimContent>
            <ClaimTitle>목적지 3</ClaimTitle>
            <ClaimContent>-</ClaimContent>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle>매출운임비</ClaimTitle>
            <ClaimContent>-</ClaimContent>
            <ClaimTitle>매입운임비</ClaimTitle>
            <ClaimContent>-</ClaimContent>
            <ClaimTitle>합짐비</ClaimTitle>
            <ClaimContent>-</ClaimContent>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle>매출운임비</ClaimTitle>
            <ClaimContent>-</ClaimContent>
            <ClaimTitle>매입운임비</ClaimTitle>
            <ClaimContent>-</ClaimContent>
            <ClaimTitle>합짐비</ClaimTitle>
            <ClaimContent>-</ClaimContent>
          </ClaimRow>
          <ClaimRow>
            <ClaimTitle style={{ width: '50%' }}>합짐비</ClaimTitle>
            <ClaimContent style={{ width: '50%' }}>-</ClaimContent>
          </ClaimRow>
        </ClaimTable>
      </TableWrap>

      <SpaceDiv>
        <h6>입찰 방식</h6>
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

              <div style={{ display: 'flex', marginLeft: '5px' }}>
                <p style={{ fontSize: '16px' }}>{text}</p>
              </div>
            </RadioMainDiv>
          ))}
        </ExRadioWrap>
      </SpaceDiv>

      <TableContianer style={{ paddingBottom: '10px' }}>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>목록 제거</WhiteRedBtn>
            <WhiteSkyBtn>합짐 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
        <TCSubContainer style={{ paddingBottom: '0px' }}>
          <div>
            합계 금액(매입/매출 운임비):<span>123,456,789</span>(원)
          </div>
          <div>
            <WhiteBlackBtn>목록 추가</WhiteBlackBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default RequestRecom

const SpaceDiv = styled.div`
  position: relative;
  display: flex;
  top: -10px;
  align-items: center;

  > h6 {
    font-size: 16px;
    color: #6b6b6b;
    width: 100px;
  }
`

const Subtitle2 = styled.h5`
  margin-left: 20px;
  display: flex;
  justify-content: ce;
  align-items: center;
  gap: 20px;
  font-size: 18px;
  height: min-content;
  margin-top: 3px;
  color: #4c83d6;
  cursor: pointer;
  &:hover {
    font-weight: 700;
  }
`
