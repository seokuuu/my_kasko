import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BlackBtn,
  BtnBound,
  GreyBtn,
  TGreyBtn,
  WhiteBlackBtn,
  WhiteRedBtn,
  WhiteSkyBtn,
} from '../../../common/Button/Button'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'
import { CheckBox } from '../../../common/Check/Checkbox'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/ProductNumber/ProductNumber'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  CustomInput,
  DoubleWrap,
  ExCheckDiv,
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
  PWRight,
  PartWrap,
  ResetImg,
  RowWrap,
  SubTitle,
  TCSubContainer,
  TableBottomWrap,
  TableContianer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import { blueModalAtom, popupObject, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import Multi2 from '../../../modal/Common/Multi2'
import { useAtom, useAtomValue } from 'jotai'
import { getSingleProducts, patchSaleCategory } from '../../../api/SellProduct'
import { getSPartList, getStorageList } from '../../../api/search'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { ProductOptions, supplierOptions } from '../../../common/Option/storage'
import Excel from '../../../components/TableInner/Excel'
import { SingleDispatchFieldsCols, singleDispatchFields } from '../../../constants/admin/Single'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import StandardFind from '../../../modal/Multi/StandardFind'
import { specAtom } from '../../../store/Layout/Layout'
import { KilogramSum } from '../../../utils/KilogramSum'
import { Filtering } from '../../../utils/filtering'
import usePaging from '../../Operate/hook/usePaging'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'
import { hyunDaiMultiModal } from '../../../store/Layout/Layout'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { changeCategoryAtom } from '../../../store/Layout/Popup'

const SalesProduct = () => {
  const checkSales = ['전체', '판매재', '판매제외제', '판매 완료제']
  // const checkSales = ['전체', '미응찰', '관심제품', '응찰']
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

  //state
  const [filterData, setFilteredData] = useState([])
  const [search, setSearch] = useState({
    productNumber: [],
  })
  //store
  const [spec, setSpec] = useAtom(specAtom)
  const [isModal, setIsModal] = useState(blueModalAtom)
  const [productNumber, setProductNumber] = useState('')
  const [pagination, setPagination] = useState({})
  const checkBoxSelect = useAtomValue(selectedRowsAtom)
  const currentPath = window.location.pathname
  const [isMultiModal, setIsMultiModal] = useAtom(hyunDaiMultiModal)
  const [parameter, setParameter] = useAtom(changeCategoryAtom)
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

  const [isRotated, setIsRotated] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [nowPopup, setNowPopup] = useAtom(popupObject)
  // Function to handle image click and toggle rotation

  const [requestParameter, setRequestParamter] = useState({
    pageNum: 1,
    pageSize: 50,
    type: '일반',
    category: '동은스틸',
  })
  const { data, isSuccess, isLoading } = useReactQuery(requestParameter, 'product-list', getSingleProducts)
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
  const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)
  const SaleProductList = data?.r
  const SaleProductPages = data?.pagination

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(SingleDispatchFieldsCols)
  const getCol = tableField.current

  // Filter State
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
  const [selectProductNumber, setSelectProductNumber] = useState([])
  const toggleBtnClick = () => {
    setExfilterToggle((prev) => !prev)
    if (exFilterToggle === true) {
      setToggleMsg('Off')
    } else {
      setToggleMsg('On')
    }
  }

  useEffect(() => {
    if (filterData === undefined) {
      SaleProductList && setFilteredData(SaleProductList)
    }

    if (!isSuccess && !filterData) return null
    if (Array.isArray(filterData)) {
      setGetRow(add_element_field(filterData, singleDispatchFields))
    }
    //타입, 리액트쿼리, 데이터 확인 후 실행
  }, [isSuccess, filterData])

  useEffect(() => {
    if (isSuccess) {
      setFilteredData(SaleProductList)
      setPagination(SaleProductPages)
    }
  }, [isSuccess])

  const handleSelectChange = (name, value) => {
    setSelect((prevState) => ({
      ...prevState,
      [name]: value.label,
    }))
  }
  const queryClient = useQueryClient()
  const handleNumberChange = (e) => {
    const { name, value } = e.currentTarget
    setQuantity((p) => ({ ...p, [name]: value }))
  }
  const handleSearch = () => {
    const request = {
      pageNum: 1,
      pageSize: 50,
      type: '일반',
      category: '동은스틸',

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
      saleType: checkData2.join(''), // 판매 유형
      salePriceType: checkData3.join(''), //판매가 유형

      productNumberList: search.productNumber,
    }
    const filterData = Filtering(request)

    queryClient.prefetchQuery(['product', filterData], async () => {
      const res = await getSingleProducts(filterData)
      setFilteredData(res.data?.list)
      setPagination(res.data?.pagination)
      return res.data?.list
    })
  }
  // 초기화
  const handleImageClick = () => {
    setProductNoNumber('')
    setProductNumber('')
    setSpec('')
    setSelect(() => ({
      storage: '',
      sPart: '',
      maker: '',
      stocks: '',
      supply: '',
      grade: '',
      preferThick: '',
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
      setFilteredData(SalesProduct)
      setPagination(SaleProductPages)
    }
    console.log('SELECT', select)
  }
  useEffect(() => {
    if (checkBoxSelect?.length === 0) return
    setSelectProductNumber(() => checkBoxSelect?.map((i) => i['제품 번호']))
  }, [checkBoxSelect])
  const { mutate, isError } = useMutationQuery('change-category', patchSaleCategory)
  const changeSaleCategory = () => {
    const res = mutate(parameter, {
      onSuccess: () => {
        setIsMultiModal(false)
        window.location.reload()
      },
      onError: (e) => {
        setErrorMsg(e.data.message)
        setNowPopup({
          num: '1-12',
          title: '',
          content: `${e.data.message}`,
          func: () => {
            console.log('hi')
            setIsMultiModal(false)
          },
        })
      },
    })

    return res
  }
  const { pagination: customPagination, onPageChanage } = usePaging(data, setRequestParamter)
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
                        <RadioMainDiv>
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
                  <ProductNumber setState={setSearch} valueName={'productNumber'} height="100%" />
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
              {pagination ? pagination?.listCount : SaleProductPages?.listCount}개 )
              <Hidden />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <PageDropdown handleDropdown={(e) => onSizeChange(e, setRequestParamter)} />
              <Excel />
            </div>
          </TCSubContainer>
          <TCSubContainer bor>
            <div>
              선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총{' '}
              {pagination ? pagination?.totalWeight : SaleProductPages?.totalWeight} 중량 kg
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <p>아울렛 일괄 변경</p>
                <CustomInput placeholder="아울렛 입력" width={120} height={32} onChange={() => {}} />
                <TGreyBtn>적용</TGreyBtn>
              </div>
              <BtnBound />
              <WhiteBlackBtn
                onClick={() => {
                  if (checkBoxSelect == null) alert('제품을 선택해 주세요.')
                  else {
                    setIsMultiModal(true)
                  }
                }}
              >
                판매 구분 변경
              </WhiteBlackBtn>
              <BtnBound />
              <WhiteBlackBtn>판매 유형 변경</WhiteBlackBtn>
            </div>
          </TCSubContainer>
          <Table
            getRow={getRow}
            getCol={getCol}
            loading={isLoading}
            tablePagination={customPagination}
            onPageChange={onPageChanage}
          />
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
      {isMultiModal === true && (
        <Multi2
          closeFn={(e, text) => {
            const { tagName } = e.target
            // console.log('TARGET :', e.target.tagName)
            if (tagName === 'IMG') {
              setIsMultiModal(false)
            }
          }}
          errMsg={errorMsg}
          saveFn={changeSaleCategory}
          productNumbers={selectProductNumber}
        />
      )}
    </>
  )
}

export default SalesProduct
