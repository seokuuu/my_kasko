import React, { useEffect, useState, Fragment } from 'react'

import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import { CheckBox } from '../../../common/Check/Checkbox'
import { TableWrap } from '../../../components/MapTable/MapTable'
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

const DisRegisterDetail = ({}) => {
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
    '고객사 명': '삼우',
    '고객사 코드': '123123',
    '목적지 1': '부산 광역시',
    '고객사 명2': '삼우',
    '고객사 코드2': '123123',
    '목적지 2': '부산 광역시',
    '고객사 명3': '삼우',
    '고객사 코드3': '123123',
    '목적지 3': '부산 광역시',
    '출하 요청 일자': '2023.04.05',
    '출고 일자': '2023.04.05',
    '상차도 여부': 'Radio',
    매출운임비: '154,585,000',
    매입운임비: '456,485,200',
    합짐비: '63,000',
    '운전사 명': '홍길동',
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
        <h1>배차/출고 등록 상세</h1>
        {/* 토글 쓰기 */}
      </FilterHeader>

      {/* <TableWrap style={{ marginTop: '5px' }}>
        <ClaimTable>
          <ClaimRow>
            <ClaimTitle>목적지 1</ClaimTitle>
            <ClaimContent>부산 광역시</ClaimContent>
            <ClaimTitle>목적지 2</ClaimTitle>
            <ClaimContent>천안시</ClaimContent>
            <ClaimTitle>목적지 3</ClaimTitle>
            <ClaimContent>-</ClaimContent>
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
            <ClaimTitle>목적지 1</ClaimTitle>
            <ClaimContent>부산 광역시</ClaimContent>
            <ClaimTitle>목적지 2</ClaimTitle>
            <ClaimContent>천안시</ClaimContent>
            <ClaimTitle>목적지 3</ClaimTitle>
            <ClaimContent>-</ClaimContent>
          </ClaimRow>
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
      </TableWrap> */}

      <TableWrap style={{ marginTop: '5px' }}>
        <ClaimTable>
          {chunkedEntries.map((chunk, i) => (
            <ClaimRow key={i}>
              {chunk.map(([title, content], j) => (
                <Fragment key={j}>
                  <ClaimTitle>{title}</ClaimTitle>
                  <ClaimContent>
                    {content === 'Radio' ? (
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
                    ) : (
                      content
                    )}
                  </ClaimContent>
                </Fragment>
              ))}
            </ClaimRow>
          ))}
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>선별 변경 요청 승인 반려</WhiteRedBtn>
            <WhiteSkyBtn>선별 변경 요청 승인</WhiteSkyBtn>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>목록 제거</WhiteRedBtn>
            <WhiteSkyBtn>추가 등록</WhiteSkyBtn>
            <WhiteRedBtn>배차 취소</WhiteRedBtn>
            <WhiteSkyBtn>배차 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>선별 취소</WhiteRedBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default DisRegisterDetail
