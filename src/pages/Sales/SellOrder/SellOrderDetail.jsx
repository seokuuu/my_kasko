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
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import BlueBar from '../../../modal/BlueBar/BlueBar'
import { blueModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import { FilterWrap } from '../../../modal/External/ExternalFilter'
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

import { TableWrap, ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../Shipping/Claim/ClaimRegister'

const SellOrderDetail = ({}) => {
  const titleData = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량', '입금 요청 금액']
  const contentData = ['2023040558', '4,685,798', 'K00000', '30', '4,685,798', '54,685,798']
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
          <h1>상시 판매 주문 확인 상세</h1>
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
            <Input style={{ width: '60px' }} />
            <Input style={{ width: '120px' }} />
            <Input style={{ width: '120px' }} />
            <TGreyBtn>적용</TGreyBtn>
            <BtnBound />
            <WhiteBlackBtn>목적지 승인 요청</WhiteBlackBtn>
            <BtnBound />
            <WhiteRedBtn>목적지 변경 반려</WhiteRedBtn>
            <WhiteSkyBtn>목적지 변경 반려</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>부분 주문 취소</WhiteRedBtn>
            <SkyBtn>부분 입금 확인</SkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default SellOrderDetail
