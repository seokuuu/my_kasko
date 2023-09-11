import { useState } from 'react'
import React from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import {
  GreyBtn,
  ExcelBtn,
  WhiteBlackBtn,
  WhiteRedBtn,
  SkyBtn,
  WhiteSkyBtn,
  BtnBound,
  TGreyBtn,
} from '../../../common/Button/Button'
import Test3 from '../../../pages/Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import BlueBar from '../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { CustomInput, FilterWrap } from '../../../modal/External/ExternalFilter'
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
  InputStartWrap,
  FilterHeaderAlert,
  FilterTCTop,
} from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'

import { ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../components/MapTable/MapTable'

import { TableWrap } from '../../../components/MapTable/MapTable'

const WinningDetail = ({}) => {
  const titleData = ['고객사 명', '고객 코드', '', '총 수량', '총 중량(KG)', '입금 요청 금액(원)']
  const contentData = ['(주) 아이덴잇', 'K00-0012', '', '30', '4,685,798', '54,685,798']
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

  const [isModal, setIsModal] = useAtom(blueModalAtom)

  console.log('isModal =>', isModal)

  const modalOpen = () => {
    setIsModal(true)
  }

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>낙찰 확인 상세</h1>
        </FilterHeader>
        <FilterTCTop>
          <h6>경매 번호</h6>
          <p>2023041050</p>
        </FilterTCTop>

        <TableWrap>
          <ClaimTable>
            {[0, 1].map((index) => (
              <ClaimRow key={index}>
                {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                  <React.Fragment agmentkey={title}>
                    <ClaimTitle>{title}</ClaimTitle>
                    <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                  </React.Fragment>
                ))}
              </ClaimRow>
            ))}
          </ClaimTable>
        </TableWrap>
      </div>

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
            <P>목적지</P>
            <CustomInput placeholder="h50" width={60} />
            <CustomInput placeholder="목적지명" width={120} />
            <CustomInput placeholder="도착지 연락처" width={120} />
            <WhiteBlackBtn>찾기</WhiteBlackBtn>
            <TGreyBtn>적용</TGreyBtn>
            <BtnBound />
            <WhiteBlackBtn>목적지 승인 요청</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <Test3 />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteSkyBtn>입금 요청서 발행</WhiteSkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default WinningDetail

const P = styled.p`
  position: relative;
  top: 5px;
`
