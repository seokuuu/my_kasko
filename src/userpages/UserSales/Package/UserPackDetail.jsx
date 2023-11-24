import React, { Fragment, useEffect, useState } from 'react'
import { GreenBtn, SkyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import Test3 from '../../../pages/Test/Test3'
import { toggleAtom } from '../../../store/Layout/Layout'

import {
  FilterContianer,
  FilterHeader,
  FilterTCTop,
  FilterTopContainer,
  TableContianer,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import styled from 'styled-components'
import {
  BlueBarHeader,
  BlueSubContainer,
  FadeOverlay,
  ModalContainer,
  WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'

// 패키지 상세보기 (경매)
const UserPackDetail = ({}) => {
  const modalClose = () => {
    setAddModal(false)
  }
  const titleData = ['패키지 명', '수량', '시작가']
  const contentData = ['알뜰패키지', '50', '3598']
  const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']

  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkSales.map((value, index) => {
      return check1[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData1(filteredCheck)

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check1])

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

  return (
    <>
      <FadeOverlay />
      <ModalContainer style={{ width: '75%', height: '98vh' }}>
        <BlueBarHeader style={{ height: '60px' }}>
          {/* <div>{title}</div> */}
          <div>패키지 상세 보기(경매)</div>
          <div>
            <WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
          </div>
        </BlueBarHeader>
        <BlueSubContainer style={{ padding: '0px 30px' }}>
          <FilterContianer>
            <FilterHeader>
              <div style={{ display: 'flex' }}></div>
              {/* 토글 쓰기 */}
              <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
            </FilterHeader>
            <FilterTopContainer>
              <FilterTCTop>
                <h6>패키지 번호</h6>
                <p>2023041050</p>
              </FilterTCTop>
            </FilterTopContainer>
            <ClaimTable style={{ marginBottom: '30px' }}>
              {[0].map((index) => (
                <ClaimRow key={index}>
                  {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                    <Fragment agmentkey={title}>
                      <ClaimTitle>{title}</ClaimTitle>
                      <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                    </Fragment>
                  ))}
                </ClaimRow>
              ))}
            </ClaimTable>
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
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}></div>
              </TCSubContainer>
              <Test3 hei2={350} hei={100} />

              <Bottom style={{ display: 'flex' }}>
                <GreenBtn width={14} height={38} fontSize={18}>
                  장바구니
                </GreenBtn>
                <SkyBtn style={{ borderRadius: '0px' }} width={14} height={38} fontSize={18}>
                  제품구매
                </SkyBtn>
              </Bottom>
            </TableContianer>
          </FilterContianer>
        </BlueSubContainer>
      </ModalContainer>
    </>
  )
}

export default UserPackDetail

const Bottom = styled.div`
  padding-top: 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
