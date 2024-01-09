import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { storageOptions } from '../../../common/Option/SignUp'
import { Link } from 'react-router-dom'
import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnBound, BtnWrap, TGreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn, ExcelBtn, YellBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, hyundaiModalAtom, hyundaiSpecAtom, specAtom, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import StandardFind from '../../../modal/Multi/StandardFind'
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
  MiniInput,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import useReactQuery from '../../../hooks/useReactQuery'
import { getSingleProducts } from '../../../api/SellProduct'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/Single'
import Table from '../../Table/Table'
import { add_element_field } from '../../../lib/tableHelpers'
import { useAtom, useAtomValue } from 'jotai'
import { QueryClient } from '@tanstack/react-query'
import { Filtering } from '../../../utils/filtering'
import { getStorageList, getSPartList } from '../../../api/search'
import { supplierOptions, ProductOptions } from '../../../common/Option/storage'
import { requestDataAtom } from '../../../store/Table/SalesRequst'
import ProductNumber from '../../../components/ProductNumber/ProductNumber'
import { KilogramSum } from '../../../utils/KilogramSum'

const DEFAULT_OBJ = { value: '', label: '전체' }

const Hyundai = ({}) => {
  const checkSales = ['전체', '판매재', '판매제외제', '판매 완료제']
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

  const requestParameter = {
    pageNum: 1,
    pageSize: 10,
    type: '일반',
    category: '현대제철',
  }

  const checkBoxSelect = useAtomValue(selectedRowsAtom)
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

  const handleSelectChange = (name, value) => {
    setSelect((prevState) => ({
      ...prevState,
      [name]: value.value,
    }))
  }
  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation

  const [getRow, setGetRow] = useState('')
  const { data, isSuccess, refetch } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
  const hyunDaiList = data?.data?.list
  const hyunDaiPage = data?.data?.pagination
  const tableField = useRef(SingleDispatchFieldsCols)
  const getCol = tableField.current
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
  const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)
  const [spec, setSpec] = useAtom(hyundaiSpecAtom)
  const [isModal, setIsModal] = useAtom(hyundaiModalAtom)
  // const [requestData, setRequestData] = useAtom(requestDataAtom)
  const [select, setSelect] = useState({
    storage: '',
    sPart: '',
    maker: '',
    stocks: '',
    supply: '',
    grade: '',
    preferThick: '',
  })
  const [Quantity, setQuantity] = useState({
    startThickness: '',
    endThickness: '',
    startWidth: '',
    endWidth: '',
    startHeight: '',
    endHeight: '',
    startSpecification: '',
    endSpecification: '',
  })
  const [filterData, setFilteredData] = useState([])
  const [productNoNumber, setProductNoNumber] = useState('')
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')
  const [productNumber, setProductNumber] = useState('')
  const [pagiNation, setPagination] = useState({})
  const [search, serSearch] = useState({
    productNumber: [],
  })
  const [storages, setStorages] = useState([])
  const [sparts, setSparts] = useState([])
  const selectedRef = useRef(null)
  const handleImageClick = () => {
    setProductNoNumber('')
    setProductNumber('')
    setSpec('')
    setSelect({
      storage: null,
      sPart: null,
      maker: null,
      stocks: null,
      supply: null,
      grade: null,
      preferThick: null,
    })
    setQuantity({})
    setCheck1([])
    setCheck2([])
    setCheck3([])
    setCheckData1([])
    setCheckData1([])
    setCheckData1([])
    setIsRotated((prevIsRotated) => !prevIsRotated)

    console.log(selectedRef)

    if (
      !spec ||
      !productNoNumber ||
      !productNumber ||
      !select ||
      !Quantity ||
      !checkData1 ||
      !checkData2 ||
      !checkData3
    ) {
      setFilteredData(hyunDaiList)
      setPagination(hyunDaiPage)
    }
  }

  useEffect(() => {
    if (storageList) return setStorages(storageList)
  }, [storageList])

  useEffect(() => {
    if (spartList) return setSparts(spartList)
  }, [spartList])

  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setFilteredData(hyunDaiList)
      setPagination(hyunDaiPage)
    }
  }, [isSuccess])

  useEffect(() => {
    if (filterData === undefined) {
      hyunDaiList && setFilteredData(hyunDaiList)
    }

    if (!isSuccess && !filterData) return null
    if (Array.isArray(filterData)) {
      setGetRow(add_element_field(filterData, singleDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, filterData])

  const handleNumberChange = (e) => {
    const { name, value } = e.currentTarget
    setQuantity((p) => ({ ...p, [name]: value }))
  }

  const queryClient = new QueryClient()

  const handleSearch = () => {
    const request = {
      pageNum: 1,
      pageSize: 10,
      type: '일반',
      category: '현대제철',
      proNo: productNoNumber, //프로넘
      storage: select.storage, // 창고
      spart: select.sPart, // 제품군
      stockStatus: select.stocks, //제품 상태
      supplier: select.supply, // 매입처
      preferThickNess: select.preferThick, // 정척여부
      grade: select.grade, //제품 등급
      maker: select.maker, // 제조사

      spec: spec, //규격약호
      minThickness: Quantity.startThickness, // 최소 두께
      maxThickness: Quantity.endThickness, // 최대 두게
      minWidth: Quantity.startWidth, // 최소 폭
      maxWidth: Quantity.endWidth, // 최대 폭
      minLength: Quantity.startheight, // 최소 길이
      maxLength: Quantity.endHeight, // 최대 길이
      minFailCount: Quantity.startSpecification, // 최소 유찰 횟수
      maxFailCount: Quantity.endSpecification, // 최대 유찰 횟수

      saleCategoryList: checkData1, // 판매 구분
      saleType: checkData2, // 판매 유형
      salePriceType: checkData3, //판매가 유형

      productNumberList: search.productNumber,
    }

    queryClient.prefetchQuery(['product', Filtering(request)], async () => {
      const res = await getSingleProducts(Filtering(request))
      // console.log('RES :', res.data)
      setFilteredData(res.data?.list)
      setPagination(res.data?.pagination)
      return res.data?.list
    })
  }

  return (
    <>
      <FilterContianer>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>단일 관리</h1>
            <SubTitle>
              <Link to={`/product/single`}>
                <h6>전체</h6>
              </Link>
              <h5>현대제철</h5>
              <Link to={`/product/salesproduct`}>
                <h6>판매제품</h6>
              </Link>
            </SubTitle>
          </div>
          <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
        </FilterHeader>
        {exFilterToggle && (
          <>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap none>
                  <PartWrap first>
                    <h6>ProNo.</h6>
                    <Input
                      value={productNoNumber}
                      onChange={(e) => {
                        setProductNoNumber(e.currentTarget.value)
                      }}
                    />
                  </PartWrap>
                  <PartWrap>
                    <h6>창고구분</h6>
                    <PWRight>
                      <MainSelect
                        ref={selectedRef}
                        options={[DEFAULT_OBJ, ...storages]}
                        defaultValue={[DEFAULT_OBJ, ...storages][0]}
                        name="storage"
                        // value={select.storage}
                        onChange={(e) => {
                          setSelect((p) => ({
                            ...p,
                            storage: e.label,
                          }))
                        }}
                      />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>매입처</h6>
                    <PWRight>
                      <MainSelect
                        options={supplierOptions}
                        defaultValue={{ value: '', label: '전체' }}
                        name="supply"
                        onChange={(e) => {
                          setSelect((p) => ({
                            ...p,
                            supply: e.value,
                          }))
                        }}
                      />
                    </PWRight>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>규격 약호</h6>
                    <Input value={spec} readOnly />
                    <GreyBtn
                      style={{ width: '70px' }}
                      height={35}
                      margin={10}
                      fontSize={17}
                      onClick={() => {
                        console.log(spec)
                        setIsModal(true)
                      }}
                    >
                      찾기
                    </GreyBtn>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>창고구분</h6>
                    <PWRight>
                      <MainSelect
                        options={[DEFAULT_OBJ, ...sparts]}
                        defaultValue={{ value: '', label: '전체' }}
                        name="sPart"
                        onChange={(e) => {
                          setSelect((p) => ({
                            ...p,
                            sPart: e.value,
                          }))
                        }}
                      />
                      {Object.entries(ProductOptions).map(([k, v], idx) => {
                        return (
                          <MainSelect
                            options={v}
                            defaultValue={v[0]}
                            name={k}
                            onChange={(e) => {
                              console.log(e)
                              handleSelectChange(k, e, idx)
                            }}
                          />
                        )
                      })}
                    </PWRight>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>판매 구분</h6>
                    <ExCheckWrap>
                      {checkSales.map((x, index) => (
                        <ExCheckDiv>
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

                <RowWrap>
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

                <RowWrap style={{ borderBottom: '0px' }}>
                  <PartWrap first>
                    <h6>두께(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput
                        value={Quantity?.startThickness || ''}
                        onChange={handleNumberChange}
                        name="startThickness"
                      />{' '}
                      <Tilde>~</Tilde>
                      <MiniInput
                        value={Quantity?.endThickness || ''}
                        onChange={handleNumberChange}
                        name="endThickness"
                      />
                    </ExInputsWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>폭(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput value={Quantity?.startWidth || ''} onChange={handleNumberChange} name="startWidth" />{' '}
                      <Tilde>~</Tilde>
                      <MiniInput value={Quantity?.endWidth || ''} onChange={handleNumberChange} name="endWidth" />
                    </ExInputsWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>길이(MM)</h6>
                    <ExInputsWrap>
                      <MiniInput value={Quantity?.startHeight || ''} onChange={handleNumberChange} name="startHeight" />{' '}
                      <Tilde>~</Tilde>
                      <MiniInput value={Quantity?.endHeight || ''} onChange={handleNumberChange} name="endHeight" />
                    </ExInputsWrap>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>유찰 횟수</h6>
                    <ExInputsWrap>
                      <Input
                        value={Quantity?.startSpecification || ''}
                        onChange={handleNumberChange}
                        name="startSpecification"
                      />{' '}
                      <Tilde>~</Tilde>
                      <Input
                        value={Quantity?.endSpecification || ''}
                        onChange={handleNumberChange}
                        name="endSpecification"
                      />
                    </ExInputsWrap>
                  </PartWrap>
                </RowWrap>
              </FilterLeft>
              <FilterRight>
                <ProductNumber setState={serSearch} valueName={'productNumber'} height="100%" />
              </FilterRight>
            </FilterSubcontianer>
            <FilterFooter>
              <div style={{ display: 'flex' }}>
                <p>초기화</p>
                <ResetImg
                  src="/img/reset.png"
                  style={{ marginLeft: '10px', marginRight: '20px' }}
                  onClick={() => handleImageClick()}
                  className={isRotated ? 'rotate' : ''}
                />
              </div>
              <div style={{ width: '180px' }}>
                <BlackBtn width={100} height={40} onClick={handleSearch}>
                  검색
                </BlackBtn>
              </div>
            </FilterFooter>
          </>
        )}
        <TableContianer>
          <TCSubContainer bor>
            <div>
              조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
              {pagiNation ? pagiNation?.listCount : hyunDaiPage?.listCount}개 )
              <Hidden />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PageDropdown />
              <Excel />
            </div>
          </TCSubContainer>
          <TCSubContainer bor>
            <div>
              선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{' '}
              {pagiNation ? pagiNation?.totalWeight : hyunDaiPage?.totalWeight} 중량 kg
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <TGreyBtn>적용</TGreyBtn>
              <BtnBound />
              <WhiteBlackBtn>판매 구분 변경</WhiteBlackBtn>
            </div>
          </TCSubContainer>
          <Table getRow={getRow} getCol={getCol} setChoiceComponent={() => {}} handleOnRowClicked={() => {}} />
          <TCSubContainer bor>
            <div></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <WhiteBlackBtn>장기재 등록</WhiteBlackBtn>
              <WhiteBlackBtn>원본 보기</WhiteBlackBtn>
            </div>
          </TCSubContainer>
        </TableContianer>
      </FilterContianer>

      {isModal === true && (
        <StandardFind
          closeFn={(e, text) => {
            const { tagName } = e.target
            // console.log('TARGET :', e.target.tagName)
            if (tagName === 'IMG') {
              setIsModal(false)
            } else {
              setSpec(text)
            }
            setIsModal(false)
          }}
        />
      )}
    </>
  )
}

export default Hyundai
