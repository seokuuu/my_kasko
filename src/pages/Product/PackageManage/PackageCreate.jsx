/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
// import { MainSelect } from '../../../common/Option/Main'
import { BlackBtn, BtnWrap, WhiteRedBtn } from '../../../common/Button/Button'
// import DateGrid from '../../../components/DateGrid/DateGrid'
// import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle'
import { WhiteBlackBtn } from '../../../common/Button/Button'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { packageModeAtom, singleAllProductModal, toggleAtom } from '../../../store/Layout/Layout'

import { CheckBox } from '../../../common/Check/Checkbox'
// import { StyledCheckMainDiv, StyledCheckSubSquDiv, CheckImg2 } from '../../../common/Check/CheckImg'
import { WhiteBtn } from '../../../common/Button/Button'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
  ExRadioWrap,
  FilterContianer,
  FilterHeader,
  FilterTCBSub,
  FilterTCBottom,
  FilterTCTop,
  FilterTopContainer,
  Input,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'

import { useMutation, useQuery } from '@tanstack/react-query'
import { RadioMainDiv, RadioCircleDiv, RadioInnerCircleDiv } from '../../../common/Check/RadioImg'
import useReactQuery from '../../../hooks/useReactQuery'
import { getPackageProductsList, postCreatePackage } from '../../../api/SellProduct'
import { useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'
import { packageProductsDispatchFields, packageProductsDispatchFieldsCols } from '../../../constants/admin/SellPackage'
import { add_element_field } from '../../../lib/tableHelpers'
import SingleAllProduct from '../../../modal/Multi/SingleAllProduct'
import { packageCreateObjAtom } from '../../../store/Layout/Layout'
import { CRWMainBottom, CRWSub } from '../../Operate/Common/Datasheet/DatasheetEdit'
import usePaging from '../../Operate/hook/usePaging'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'

import useMutationQuery from '../../../hooks/useMutationQuery'

const PackageCreate = () => {
  const radioDummy = ['경매', '상시']
  const prevData = useLocation().state?.data
  const [packageObj, setPackageObj] = useAtom(packageCreateObjAtom)
  const [packageName, setPackageName] = useState(prevData ? prevData['패키지 이름'] : packageObj?.packageName)
  const [price, setPrice] = useState(prevData ? prevData['패키지 경매&판매 시작가'] : packageObj?.price)

  const [isModal, setIsModal] = useAtom(singleAllProductModal)
  const [mode, setMode] = useAtom(packageModeAtom)
  const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
  const [savedRadioValue, setSavedRadioValue] = useState('')
  const [select, setSelect] = useState([])
  const [selectUid, setSelectUid] = useState([])
  const [curUid, setCuruid] = useState([])

  useEffect(() => {
    setCheckRadio(
      Array.from({ length: radioDummy.length }, (_, index) => {
        if (prevData !== undefined && prevData['판매 유형'] === '상시판매 대상재') {
          return index === 1
        } else {
          return index === 0
        }
      }),
    )
  }, [prevData])

  useEffect(() => {
    const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

    const updateValue = radioDummy[checkedIndex]
    setSavedRadioValue(() => {
      if (updateValue === '경매') {
        return '경매 대상재'
      } else if (updateValue === '상시') {
        return '상시판매 대상재'
      }
    })
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

  const { data, isSuccess, isLoading } = useQuery(
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
  console.log('data :', data)
  console.log('filteredData :', filteredData)
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
  }, [isSuccess, requestParams, packageData])

  useEffect(() => {
    setCuruid(filteredData.map((item) => item?.productUid))
    console.log(curUid)
  }, [isSuccess])
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
  const handleChangePackName = (e) => {
    const { value, name } = e.currentTarget
    if (name === 'packageName') {
      setPackageName(value)
    } else if (name === 'price') {
      setPrice(value)
    }
  }

  // console.log(
  //   'SELECT',
  //   select.map((i) => {
  //     return
  //   }),
  // )

  const { pagination, onPageChanage } = usePaging(data, setRequestParams)
  useEffect(() => {
    if (!select) return null

    console.log(select.map((i) => i['고유 번호']))
    setSelectUid(() => select.map((i) => i['고유 번호']))
    console.log(selectUid)
  }, [select])

  const [createRequest, setCreateRequest] = useState({})
  const [updateRequest, setUpdateRequest] = useState({})

  useEffect(() => {
    setCreateRequest({
      name: packageName,
      saleType: savedRadioValue,
      productUids: selectUid,
    })
  }, [packageName, savedRadioValue, selectUid])

  useEffect(() => {
    setUpdateRequest({
      name: packageName,
      saleType: savedRadioValue,
      productUids: [...curUid, ...selectUid],
      price: price,
      uid: prevData['고유 번호'],
    })
  }, [packageName, savedRadioValue, selectUid, price])

  const { mutate: create } = useMutationQuery(['query'], postCreatePackage)
  const { mutate: update } = useMutationQuery(['query'], postCreatePackage)
  const handleSubmit = () => {
    console.log('어디서 3번이 찍히는걸까 ')
    create(createRequest, {
      onSuccess: () => {
        window.location.reload()
      },
    })
  }

  const handleUpdate = () => {
    update(updateRequest, {
      onSuccess: () => {
        // window.location.reload()
      },
    })
  }
  return (
    <FilterContianer>
      <h1>{mode}</h1>
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
                    <Input name={'packageName'} value={packageName} onChange={handleChangePackName} />
                  </div>
                </div>
                <div>
                  <h6>시작가/판매가</h6>
                  <div>
                    <Input name={'price'} value={price} onChange={handleChangePackName} />
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
            <PageDropdown handleDropdown={(e) => onSizeChange(e, setRequestParams)} />
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
        <Table
          getCol={getCol}
          getRow={select.length <= 0 ? [...getRow, ...select] : select}
          tablePagination={pagination}
          onPageChange={onPageChanage}
          loading={isLoading}
        />
        <Table getCol={getCol} getRow={select.length === 0 ? getRow : [...getRow, ...select]} />
        <CRWMainBottom>
          <CRWSub>
            <BtnWrap>
              <WhiteBtn width={90} height={50} style={{ marginRight: '10px' }}>
                돌아가기
              </WhiteBtn>
              {!prevData ? (
                <BlackBtn width={90} height={50} onClick={handleSubmit}>
                  등록
                </BlackBtn>
              ) : (
                <BlackBtn width={90} height={50} onClick={handleUpdate}>
                  수정
                </BlackBtn>
              )}
            </BtnWrap>
          </CRWSub>
        </CRWMainBottom>
      </TableContianer>
      {isModal && <SingleAllProduct selectPr={select} setSelectPr={setSelect} />}
    </FilterContianer>
  )
}

export default PackageCreate
