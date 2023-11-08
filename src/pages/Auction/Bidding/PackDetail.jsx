import React, { useEffect, useState } from 'react'
import { BtnBound, SkyBtn, TGreyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import Test3 from '../../Test/Test3'

import {
  CustomInput,
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

// 패키지 상세보기 (경매)
const PackDetail = ({}) => {
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
              <React.Fragment agmentkey={title}>
                <ClaimTitle>{title}</ClaimTitle>
                <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
              </React.Fragment>
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
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <p>시작가 일괄 변경</p>
            <CustomInput placeholder="" width={120} height={32} />
            <TGreyBtn height={30} style={{ width: '50px' }}>
              적용
            </TGreyBtn>
            <BtnBound />
            <SkyBtn
              onClick={() => {
                setAddModal(true)
              }}
            >
              제품 추가 (패키지)
            </SkyBtn>
          </div>
        </TCSubContainer>
        <Test3 hei2={350} hei={100} />
        <TCSubContainer></TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default PackDetail