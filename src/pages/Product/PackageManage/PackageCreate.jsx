/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import Excel from '../../../components/TableInner/Excel'
// import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, YellBtn, BtnBound, WhiteRedBtn, SkyBtn } from '../../../common/Button/Button'
// import DateGrid from '../../../components/DateGrid/DateGrid'
// import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { WhiteBlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { packageModeAtom, singleAllProductModal, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
// import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'
import { WhiteBtn } from '../../../common/Button/Button'
import {
  FilterContianer,
  FilterHeader,
  Input,
  TableContianer,
  TCSubContainer,
  FilterTopContainer,
  FilterTCTop,
  FilterTCBottom,
  FilterTCBSub,
} from '../../../modal/External/ExternalFilter'
import { useQuery } from '@tanstack/react-query'
import { ExRadioWrap } from '../../../modal/External/ExternalFilter'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import useReactQuery from '../../../hooks/useReactQuery'
import { getPackageProductsList } from '../../../api/SellProduct'
import { useLocation } from 'react-router-dom'
// import { getPackageProductsList } from '../../../api/packageProduct'
import { add_element_field } from '../../../lib/tableHelpers'
import { packageProductsDispatchFieldsCols, packageProductsDispatchFields } from '../../../constants/admin/SellPackage'
import Table from '../../Table/Table'
import { CRWMainBottom } from '../../Operate/Common/Datasheet/DatasheetEdit'
import { CRWSub } from '../../Operate/Common/Datasheet/DatasheetEdit'
import { useAtom } from 'jotai'
import SingleAllProduct from '../../../modal/Multi/SingleAllProduct'
const PackageCreate = () => {
  const radioDummy = ['경매', '상시']
  const prevData = useLocation().state?.data
  const [isModal, setIsModal] = useAtom(singleAllProductModal)
  const [mode, setMode] = useAtom(packageModeAtom)
  console.log('MODE', mode)
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [savedRadioValue, setSavedRadioValue] = useState('')
  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
  }, [checkRadio])
  //checkSales

  const tableField = useRef(packageProductsDispatchFieldsCols)
  const getCol = tableField.current
  const [requestParams, setRequestParams] = useState(
    prevData && {
      pageNum: 1,
      pageSize: 10,
      packageNumber: prevData['패키지 번호'],
    },
  )

  const { data, isSuccess } = useQuery(
    ['packageProducts', requestParams],
    () => getPackageProductsList(requestParams),
    {
      enabled: mode !== 'post',
    },
  )
  // const { data, isSuccess } = useReactQuery(requestParams, 'packageProducts', getPackageProductsList)
  const packageData = data?.r
  const packagePage = data?.pagination

  const [getRow, setGetRow] = useState('')
  const [filteredData, setFilteredData] = useState([])

  const handleSelectChange = (selectedOption, name) => {}
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
  useEffect(() => {
    if (isSuccess && prevData) {
      setFilteredData(packageData)
    }
  }, [isSuccess, requestParams])

  useEffect(() => {
    if (isSuccess && filteredData === undefined) {
      packageData && setFilteredData(packageData)
    }
    if (!isSuccess && !filteredData) return null
    if (Array.isArray(filteredData) && prevData) {
      setGetRow(add_element_field(filteredData, packageProductsDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, filteredData, prevData])

  const handleAddProduct = () => {
    setIsModal(true)
  }
  return (
    <FilterContianer>
      <p style={{ color: 'black' }}>{mode}</p>
      <FilterHeader>
        <h1>패키지 {prevData ? '수정' : '생성'}</h1>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {exFilterToggle && (
        <>
          <FilterTopContainer>
            {prevData && (
              <FilterTCTop>
                <h6>패키지 번호</h6>
                <p>{prevData['패키지 번호']}</p>
              </FilterTCTop>
            )}
            <FilterTCBottom>
              <FilterTCBSub>
                <div>
                  <h6>판매 유형</h6>
                  <div style={{ marginTop: '2px' }}>
                    <ExRadioWrap>
                      {radioDummy.map((text, index) => (
                        <RadioMainDiv key={index}>
                          <RadioCircleDiv
                            isWhite
                            isChecked={checkRadio[index]}
                            onClick={() => {
                              setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
                            }}
                          >
                            <RadioInnerCircleDiv isWhite isChecked={checkRadio[index]} />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
                        </RadioMainDiv>
                      ))}
                    </ExRadioWrap>
                  </div>
                </div>
                <div>
                  <h6>패키지 명 지정</h6>
                  <div>
                    <Input />
                  </div>
                </div>
                <div>
                  <h6>시작가/판매가</h6>
                  <div>
                    <Input />
                  </div>
                </div>
              </FilterTCBSub>
            </FilterTCBottom>
          </FilterTopContainer>
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
        <TCSubContainer bor>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <WhiteRedBtn>목록 제거</WhiteRedBtn>
            <WhiteBlackBtn onClick={handleAddProduct}>제품 추가</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        <Table getCol={getCol} getRow={getRow} />
        <CRWMainBottom>
          <CRWSub>
            <BtnWrap>
              <WhiteBtn width={90} height={50} style={{ marginRight: '10px' }}>
                돌아가기
              </WhiteBtn>
              <BlackBtn width={90} height={50}>
                등록
              </BlackBtn>
            </BtnWrap>
          </CRWSub>
        </CRWMainBottom>
      </TableContianer>
      {isModal && <SingleAllProduct />}
    </FilterContianer>
  )
}

export default PackageCreate
