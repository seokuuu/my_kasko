import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { styled } from 'styled-components'
import { BtnBound, SkyBtn, TGreyBtn, WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
  CustomInput,
  FilterContianer,
  FilterHeader,
  FilterTCTop,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import { TableWrap } from '../../../components/MapTable/MapTable'

const SellOrderDetail = ({}) => {
  const titleData = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량(KG)', '입금 요청 금액(원)']
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
            <P>목적지</P>
            <CustomInput placeholder="h50" width={60} />
            <CustomInput placeholder="목적지명" width={120} />
            <CustomInput placeholder="도착지 연락처" width={120} />
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

export const P = styled.p`
  position: relative;
  top: 5px;
`
