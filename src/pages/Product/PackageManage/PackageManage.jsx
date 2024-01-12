import { useState, useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import { MainSelect } from '../../../common/Option/Main'
import { Link } from 'react-router-dom'
import { BlackBtn, BtnWrap, YellBtn, BtnBound, WhiteRedBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn, ExcelBtn, WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  blueModalAtom,
  packageCreateAtom,
  packageModeAtom,
  toggleAtom,
  packageDetailModal,
} from '../../../store/Layout/Layout'
import { add_element_field } from '../../../lib/tableHelpers'
import { CheckBox } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import Package from '../../Sales/Package/Package'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import {
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
  ExCheckWrap,
  ExCheckDiv,
  ExInputsWrap,
  SubTitle,
  TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import { packageCEAtom } from '../../../store/Layout/Layout'
import Hidden from '../../../components/TableInner/Hidden'
import { getPackageList } from '../../../api/SellProduct'
import useReactQuery from '../../../hooks/useReactQuery'
import { packageDispatchFields, packageDispatchFieldsCols } from '../../../constants/admin/SellPackage'
import Table from '../../Table/Table'
import PackageManageFind from '../../../modal/Multi/PackageManage'
import PackageDetailModal from '../../../modal/Multi/PackageDetailModal.jsx'
const PackageManage = ({}) => {
  const [isCreate, setIsCreate] = useState(false)
  const [packBtn, setPackBtn] = useAtom(packageModeAtom)
  const [isModal, setIsModal] = useAtom(packageCreateAtom)

  // 패키지생성 모달창 띄우기
  const onClickPostHandler = () => {
    setPackBtn('post')
    setIsModal(true)
    setIsCreate(true)
  }

  const checkSales = ['전체', '판매재', '판매제외제', '판매완료재']
  const checkShips = ['전체', '경매대상재', '상시판매 대상재']
  const checkTypes = ['전체', '특가', '일반']

  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
  const [check2, setCheck2] = useState(Array.from({ length: checkShips.length }, () => false))
  const [check3, setCheck3] = useState(Array.from({ length: checkTypes.length }, () => false))
  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))
  const [checkData2, setCheckData2] = useState(Array.from({ length: checkShips.length }, () => ''))
  const [checkData3, setCheckData3] = useState(Array.from({ length: checkTypes.length }, () => ''))
  const [detailModal, setDatilModal] = useAtom(packageDetailModal)
  const tableFields = useRef(packageDispatchFieldsCols)
  const getCol = tableFields.current

  const parameter = { pageNum: 1, pageSize: 1000, saleType: '' }
  const { data, isSuccess } = useReactQuery(parameter, 'package-list', getPackageList)
  const packageList = data?.r
  const pagination = data?.pagination

  const [getRow, setGetRow] = useState('')
  const [filteredData, setFilterData] = useState([])

  useEffect(() => {
    if (packageList !== undefined && isSuccess) {
      setFilterData(packageList)
    }
    if (!isSuccess && !filteredData) return null
    if (Array.isArray(filteredData)) {
      setGetRow(add_element_field(filteredData, packageDispatchFields))
    }
  }, [isSuccess, filteredData])

  // 체크박스,라디오 관련 이펙트 함수
  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkSales.map((value, index) => {
      return check1[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData1(filteredCheck)
  }, [check1])

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkShips.map((value, index) => {
      return check2[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData2(filteredCheck)
  }, [check2])

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkTypes.map((value, index) => {
      return check3[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData3(filteredCheck)
  }, [check3])

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

  return (
    <FilterContianer>
      <FilterHeader>
        <h1>패키지 관리</h1>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>
      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap first>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>
                <PartWrap>
                  <h6>매입처</h6>
                  <PWRight>
                    <MainSelect options={storageOptions} defaultValue={storageOptions[0]} />
                  </PWRight>
                </PartWrap>
                <PartWrap>
                  <h6>유찰 횟수</h6>
                  <ExInputsWrap>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </ExInputsWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>구분</h6>
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>판매 구분</h6>
                  <ExCheckWrap>
                    {checkSales.map((x, index) => (
                      <ExCheckDiv style={{ marginRight: '5px', gap: '0px' }}>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                          isChecked={check1[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
                <PartWrap>
                  <h6>판매 유형</h6>
                  <ExCheckWrap>
                    {checkShips.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck2(CheckBox(check2, check2.length, index, true))}
                          isChecked={check2[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check2[index]} />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
              </RowWrap>

              <RowWrap style={{ border: '0px' }}>
                <PartWrap first>
                  <h6>판매가 유형</h6>
                  <ExCheckWrap>
                    {checkTypes.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck3(CheckBox(check3, check3.length, index, true))}
                          isChecked={check3[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check3[index]} />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
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
        <TCSubContainer bor>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <YellBtn>추천제품지정 (0 / 10)</YellBtn>
            <BtnBound />
            <WhiteBlackBtn>판매 구분 변경</WhiteBlackBtn>
            <BtnBound />
            <WhiteRedBtn>패키지 해제</WhiteRedBtn>

            <WhiteSkyBtn onClick={onClickPostHandler}>
              <p style={{ color: '#4C83D6' }}>패키지 생성</p>
              {/* <Link to="/product/packagecreate" style={{ color: '#4C83D6' }}></Link> */}
            </WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Table
          getRow={getRow}
          getCol={getCol}
          setChoiceComponent={() => {
            // console.log('수정')
          }}
        />
      </TableContianer>
      {isModal && <PackageManageFind isCreate={isCreate} url={'/product/packagecreate'} />}
      {detailModal && <PackageDetailModal />}
    </FilterContianer>
  )
}

export default PackageManage
