import { useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import { Link } from 'react-router-dom'
import { MainSelect } from '../../../common/Option/Main'
import {
  BlackBtn,
  BtnBound,
  BtnWrap,
  TGreyBtn,
  WhiteBlackBtn,
  WhiteRedBtn,
  WhiteSkyBtn,
} from '../../../common/Button/Button'
import DateGrid from '../../../components/DateGrid/DateGrid'
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { GreyBtn, ExcelBtn, YellBtn } from '../../../common/Button/Button'
import Test3 from '../../Test/Test3'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import { QueryClient } from '@tanstack/react-query'
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
  TableBottomWrap,
  MiniInput,
  ExRadioWrap,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import Excel from '../../../components/TableInner/Excel'
import useReactQuery from '../../../hooks/useReactQuery'
import { getSingleProducts } from '../../../api/SellProduct'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/Single'
import Table from '../../Table/Table'
import { add_element_field } from '../../../lib/tableHelpers'
import StandardFind from '../../../modal/Multi/StandardFind'
import { useAtom } from 'jotai'
import { getSpecList } from '../../../api/search'
import { specAtom } from '../../../store/Layout/Layout'
import { getStorageList, getSPartList } from '../../../api/search'
import {
  supplierOptions,
  makerOptions,
  stocksStateOptions,
  gradeOptions,
  preferThickOptions,
  ProductOptions,
} from '../../../common/Option/storage'
import { Filtering } from '../../../utils/filtering'

const SalesProduct = () => {
  const checkSales = ['전체', '미응찰', '관심제품', '응찰']
  const checkShips = ['전체', '경매대상재', '상시판매 대상재']
  const checkTypes = ['전체', '특가', '일반']
  const radioDummy = ['전체', '낙찰', '낙찰 취소', '낙찰 확정']
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: checkSales.length }, (_, index) => index === 0))
  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
  const [check2, setCheck2] = useState(Array.from({ length: checkShips.length }, () => false))
  const [check3, setCheck3] = useState(Array.from({ length: checkTypes.length }, () => false))

  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))
  const [checkData2, setCheckData2] = useState(Array.from({ length: checkShips.length }, () => ''))
  const [checkData3, setCheckData3] = useState(Array.from({ length: checkTypes.length }, () => ''))
  const [spec, setSpec] = useAtom(specAtom)
  const [isModal, setIsModal] = useState(blueModalAtom)
  const [productNumber, setProductNumber] = useState('')
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

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check3])

  const [isRotated, setIsRotated] = useState(false)

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setProductNoNumber('')
    setProductNumber('')
    setSelect({})
    setQuantity({})
    setCheck1([])
    setCheck2([])
    setCheck3([])
    setCheckData1([])
    setCheckData1([])
    setCheckData1([])
    setIsRotated((prevIsRotated) => !prevIsRotated)
  }

  const requestParameter = {
    pageNum: 1,
    pageSize: 1000,
    type: '일반',
    category: '판매제품',
  }
  const [request, setRequest] = useState({
    pageNum: 1,
    pageSize: 100,
    type: '일반',
    category: '판매제품',
    proNo: '',
    storage: '',
    spart: '',
    stockStatus: '',
    supplier: '',
    preferThickNess: '',
    grade: '',
    maker: '',
    spec: '',
    minThickness: '',
    maxThickness: '',
    minWidth: '',
    maxWidth: '',
    minLength: '',
    maxLength: '',
    minFailCount: '',
    maxFailCount: '',
    saleCategory: '',
    saleType: '',
    salePriceType: '',
    productNumberList: '',
  })
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
  const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(SingleDispatchFieldsCols)
  const getCol = tableField.current
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
  const [productNoNumber, setProductNoNumber] = useState('')
  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
  const [toggleMsg, setToggleMsg] = useState('On')

  const { data, isSuccess } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
  const SaleProductList = data?.data.list

  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }
  useEffect(() => {
    // if (!isSuccess && !SingleProductList) return null
    if (Array.isArray(SaleProductList)) {
      setGetRow(add_element_field(SaleProductList, singleDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, SaleProductList])

  const handleSelectChange = (name, value) => {
    setSelect((prevState) => ({
      ...prevState,
      [name]: value.label,
    }))
  }
  const queryClient = new QueryClient()
  const handleNumberChange = (e) => {
    const { name, value } = e.currentTarget
    setQuantity((p) => ({ ...p, [name]: value }))
  }
  const handleSearch = () => {
    const request = {
      pageNum: 1,
      pageSize: 1000,
      type: '일반',
      category: '판매제품',

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

      saleCategoryList: checkData1.join(','), // 판매 구분
      saleType: checkData2.join(','), // 판매 유형
      salePriceType: checkData3.join(','), //판매가 유형

      productNumberList: '',
    }
    const filterData = Filtering(request)

    queryClient.prefetchQuery(['product', filterData], async () => {
      const res = await getSingleProducts(filterData)
      console.log(res)
    })
  }

  return (
    <>
      {' '}
      <FilterContianer>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>단일 관리</h1>
            <SubTitle>
              <Link to={`/product/single`}>
                <h6>전체</h6>
              </Link>
              <Link to={`/product/hyundai`}>
                <h6>현대제철</h6>
              </Link>

              <h5>판매제품</h5>
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
                        options={storageList}
                        defaultValue={{ value: '', label: '전체' }}
                        name="storage"
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
                            supply: e.label,
                          }))
                        }}
                      />
                    </PWRight>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>규격 약호</h6>
                    <Input value={spec} aria-readonly />
                    <GreyBtn
                      style={{ width: '70px' }}
                      height={35}
                      margin={10}
                      fontSize={17}
                      onClick={() => {
                        setIsModal(true)
                      }}
                    >
                      찾기
                    </GreyBtn>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap first>
                    <h6>구분</h6>
                    <PWRight>
                      <MainSelect
                        options={spartList}
                        defaultValue={{ value: '', label: '전체' }}
                        name="sPart"
                        onChange={(e) => {
                          setSelect((p) => ({
                            ...p,
                            sPart: e.label,
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
                    <h6>조회구분</h6>
                    <ExRadioWrap>
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
                    </ExRadioWrap>
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
              <TGreyBtn>적용</TGreyBtn>
              <BtnBound />
              <WhiteSkyBtn>Pro. no 생성</WhiteSkyBtn>
              <BtnBound />
              <WhiteBlackBtn>판매 구분 변경</WhiteBlackBtn>
              <BtnBound />
              <WhiteBlackBtn>판매 유형 변경</WhiteBlackBtn>
            </div>
          </TCSubContainer>
          <Table getRow={getRow} getCol={getCol} />
          <TCSubContainer bor>
            <div></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <WhiteRedBtn>제품 삭제</WhiteRedBtn>
              <WhiteBlackBtn>제품 등록</WhiteBlackBtn>
            </div>
          </TCSubContainer>
          <TableBottomWrap>
            <BlackBtn width={15} height={40}>
              저장
            </BlackBtn>
          </TableBottomWrap>
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

export default SalesProduct
