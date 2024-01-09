import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { BlackBtn, GreyBtn, YellBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  SingleProductModalAtom,
  SingleProductSpecAtom,
  toggleAtom,
  selectedRowsAtom,
} from '../../../store/Layout/Layout'
import StandardFind from '../../../modal/Multi/StandardFind'
import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { useAtom, useAtomValue } from 'jotai'
import {
  DoubleWrap,
  ExCheckDiv,
  ExCheckWrap,
  ExInputsWrap,
  ExRadioWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  Input,
  MiniInput,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  SubTitle,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import { Filtering } from '../../../utils/filtering'
import useReactQuery from '../../../hooks/useReactQuery'
import Hidden from '../../../components/TableInner/Hidden'
import { getSingleProducts } from '../../../api/SellProduct'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/Single'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../Table/Table'
import { getStorageList, getSPartList } from '../../../api/search'
import { QueryClient } from '@tanstack/react-query'
import { supplierOptions, ProductOptions } from '../../../common/Option/storage'
import { KilogramSum } from '../../../utils/KilogramSum'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'

const SingleProduct = () => {
  const DEFAULT_OBJ = { value: '', label: '전체' }
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
    pageSize: 1000,
    type: '일반',
    category: '전체',
  }

  const [getRow, setGetRow] = useState('')
  const { data, isSuccess, refetch } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
  const singleList = data?.data?.list
  const singleProductPage = data?.data?.pagination
  const tableField = useRef(SingleDispatchFieldsCols)
  const getCol = tableField.current
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
  const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)
  const [spec, setSpec] = useAtom(SingleProductSpecAtom)
  const [isModal, setIsModal] = useAtom(SingleProductModalAtom)
  const checkBoxSelect = useAtomValue(selectedRowsAtom)
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
  const [productNumber, setProductNumber] = useState('')
  const [pagiNation, setPagination] = useState({})
  const [search, serSearch] = useState({
    productNumber: [],
  })
  const [storages, setStorages] = useState([])
  const [sparts, setSparts] = useState([])
  const selectedRef = useRef(null)
  const queryClient = new QueryClient()

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

  // 테이블 연결하기
  useEffect(() => {
    if (filterData === undefined) {
      singleList && setFilteredData(singleList)
    }
    if (!isSuccess && !filterData) return null
    if (Array.isArray(filterData)) {
      setGetRow(add_element_field(filterData, singleDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, filterData])

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
    if (isSuccess) {
      setFilteredData(singleList)
      setPagination(singleProductPage)
    }
  }, [isSuccess])
  useEffect(() => {
    if (storageList) return setStorages(storageList)
  }, [storageList])

  useEffect(() => {
    if (spartList) return setSparts(spartList)
  }, [spartList])

  const handleNumberChange = (e) => {
    const { name, value } = e.currentTarget
    setQuantity((p) => ({ ...p, [name]: value }))
  }

  const handleImageClick = () => {
    setProductNoNumber('')
    setProductNumber('')
    setSpec('')
    setSelect(() => ({
      storage: null,
      sPart: null,
      maker: null,
      stocks: null,
      supply: null,
      grade: null,
      preferThick: null,
    }))
    setQuantity({})
    setCheck1([])
    setCheck2([])
    setCheck3([])
    setCheckData1([])
    setCheckData2([])
    setCheckData3([])
    setIsRotated((prevIsRotated) => !prevIsRotated)

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
      setFilteredData(singleList)
      setPagination(singleProductPage)
    }
    console.log('SELECT', select)
  }

  const handleSearch = () => {
    const request = {
      pageNum: 1,
      pageSize: 10,
      type: '일반',
      category: '전체',
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
              <h5>전체</h5>
              <Link to={`/product/hyundai`}>
                <h6>현대제철</h6>
              </Link>
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
                    <ExRadioWrap>
                      {checkShips.map((x, index) => (
                        <RadioMainDiv>
                          <RadioCircleDiv
                            onClick={() => setCheck2(CheckBox(check2, check2.length, index))}
                            isChecked={check2[index]}
                          >
                            <RadioInnerCircleDiv isChecked={check2[index]} />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '5px' }}>{x}</div>
                        </RadioMainDiv>
                      ))}
                    </ExRadioWrap>
                  </PartWrap>
                </RowWrap>

                <RowWrap>
                  <PartWrap first>
                    <h6>판매가 유형</h6>
                    <ExRadioWrap>
                      {checkTypes.map((x, index) => (
                        <RadioMainDiv key={index}>
                          <RadioCircleDiv
                            onClick={() => setCheck3(CheckBox(check3, check3.length, index))}
                            isChecked={check3[index]}
                          >
                            <RadioInnerCircleDiv isChecked={check3[index]} />
                          </RadioCircleDiv>
                          <div style={{ display: 'flex', marginLeft: '5px' }}>{x}</div>
                        </RadioMainDiv>
                      ))}
                    </ExRadioWrap>
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
              조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
              {pagiNation ? pagiNation.listCount : singleProductPage?.listCount}개 )
              <Hidden />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PageDropdown />
              <Excel />
            </div>
          </TCSubContainer>
          <TCSubContainer bor>
            <div>
              선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{singleProductPage?.totalWeight} 중량 kg
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <YellBtn>추천제품지정 ( 0 / 10)</YellBtn>
            </div>
          </TCSubContainer>
          <Table getRow={getRow} getCol={getCol} />
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

export default SingleProduct
