import React from 'react'
import { useState, useEffect } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'

import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
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
  CustomInput,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { TableWrap, ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../components/MapTable/MapTable'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'

const Request = ({ setChoiceComponent }) => {
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

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>출고 요청</h1>
          <Subtitle2
            onClick={() => {
              setChoiceComponent('requestRecom')
            }}
          >
            선별 추천
          </Subtitle2>
        </div>

        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>

      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap none>
                <PartWrap first>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>

                <PartWrap>
                  <h6>고객사 명/고객사코드</h6>
                  <Input />
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>목적지</h6>
                  <CustomInput width={160} height={36} />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>경매 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>

                <PartWrap>
                  <h6>출하 지시 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap none>
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                </PartWrap>
              </RowWrap>
            </FilterLeft>
            <FilterRight>
              <DoubleWrap>
                <h6>제품 번호 </h6>
                <textarea
                  placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                />
              </DoubleWrap>
            </FilterRight>
          </FilterSubcontianer>
          <FilterFooter>
            <div style={{ display: 'flex' }}>
              <p>초기화</p>
              <ResetImg
                src="/img/reset.png"
                style={{ marginLeft: '10px', marginRight: '20px' }}
                onClick={handleImageClick}
                className={isRotated ? 'rotate' : ''}
              />
            </div>
            <div style={{ width: '180px' }}>
              <BlackBtn width={100} height={40}>
                검색
              </BlackBtn>
            </div>
          </FilterFooter>
        </>
      )}

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown />
            <Excel />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>출하 취소</WhiteRedBtn>
            <WhiteSkyBtn>선별 목록 추가</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
      </TableContianer>
      <FilterHeader style={{}}>
        <h1>선별 등록</h1>
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
                      isWhite
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

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>목록 제거</WhiteRedBtn>
            <WhiteSkyBtn>선별 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  )
}

export default Request

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
