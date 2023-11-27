import React, { useState, useEffect, Fragment } from 'react'
import {
  BlackBtn,
  BtnBound,
  GreyBtn,
  SkyBtn,
  TGreyBtn,
  WhiteRedBtn,
  TWhiteBtn,
  WhiteBlackBtn,
  WhiteSkyBtn,
  BlueBtn,
} from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import {
  DoubleWrap,
  ExInputsWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  FilterTCTop,
  FilterTopContainer,
  Input,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
  CustomInput,
  GridWrap,
  ExCheckWrap,
  ExCheckDiv,
} from '../../../modal/External/ExternalFilter'

import { StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckImg2 } from '../../../common/Check/CheckImg'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { aucProAddModalAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import DefaultBlueBar from '../../../modal/Multi/DefaultBlueBar'

import { ClaimTable, ClaimRow, ClaimTitle, ClaimContent } from '../../../components/MapTable/MapTable'
import DateGrid from '../../../components/DateGrid/DateGrid'

// 경매 낙찰 상세
const WinningDetail = ({}) => {
  const titleData = ['패키지 명', '수량', '시작가', '패키지 명', '수량', '시작가']
  const contentData = ['알뜰패키지', '50', '3598', '알뜰패키지', '50', '3598', '알뜰패키지', '50', '3598']
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']
  const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
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
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>경매 낙찰 상세</h1>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      <FilterTopContainer>
        <FilterTCTop>
          <h6>경매 번호</h6>
          <p>2023041050</p>
        </FilterTCTop>
      </FilterTopContainer>
      <ClaimTable style={{ marginBottom: '30px' }}>
        {[0, 1].map((index) => (
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
      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap>
                  <h6 style={{ width: '130px' }}>확정 전송 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap style={{ borderBottom: '0px' }}>
                {' '}
                <PartWrap>
                  <h6>주문 상태</h6>
                  <ExCheckWrap>
                    {checkSales.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                          isChecked={check1[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
              </RowWrap>
            </FilterLeft>
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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p>목적지</p>
            <CustomInput placeholder="h50" width={60} height={32} />
            <CustomInput placeholder="목적지명" width={120} height={32} />
            <CustomInput placeholder="도착지 연락처" width={120} height={32} />
            <TWhiteBtn style={{ width: '50px' }} height={30}>
              찾기
            </TWhiteBtn>
            <TGreyBtn>적용</TGreyBtn>
            <BtnBound style={{ margin: '0px' }} />
            <WhiteBlackBtn>목적지 승인 요청</WhiteBlackBtn>
            <BtnBound style={{ margin: '0px' }} />
            <WhiteRedBtn>목적지 변경 반려</WhiteRedBtn>
            <WhiteSkyBtn str>목적지 변경 승인</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteSkyBtn>입금 요청서 발행</WhiteSkyBtn>
            <BtnBound style={{ margin: '0px' }} />
            <WhiteRedBtn>부분 낙찰 취소 </WhiteRedBtn>
            <SkyBtn>부분 입금 확인</SkyBtn>
          </div>
        </TCSubContainer>
        {addModal && <DefaultBlueBar setAddModal={setAddModal} />}
      </TableContianer>
    </FilterContianer>
  )
}

export default WinningDetail
