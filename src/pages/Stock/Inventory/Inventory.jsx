import { useEffect, useMemo, useRef, useState } from 'react'
import { BlackBtn, GreyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'

import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
  StockMultiModal,
  popupObject,
  selectedRowsAtom,
  toggleAtom,
  weightAtom,
  weightObj,
} from '../../../store/Layout/Layout'
import Table from '../../../pages/Table/Table'
import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'

import { useAtom, useAtomValue } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Multi from '../../../modal/Common/Multi'
import {
  DoubleWrap,
  ExCheckDiv,
  ExCheckWrap,
  ExInputsWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  MiniInput,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../../modal/External/ExternalFilter'
import usePaging from '../../Operate/hook/usePaging'
import { modalAtom } from '../../../store/Layout/Layout'
import useTableData from '../../../hooks/useTableData'
import useReactQuery from '../../../hooks/useReactQuery'
import { getInventoryStocks, patchStockCategory } from '../../../api/stocks/Inventory'
import { StockInventoryFieldCols, StockInventoryFields } from '../../../constants/admin/StockInventory'
import { add_element_field } from '../../../lib/tableHelpers'
import Multi2 from '../../../modal/Common/Multi2'
import { isArray } from 'lodash'
import useMutationQuery from '../../../hooks/useMutationQuery'
import { changeCategoryAtom } from '../../../store/Layout/Popup'
import SellWeight from '../../../modal/Multi/SellWeight'
import WeightSales from '../../../modal/Multi/WeightSales'
const Inventory = ({}) => {
  const checkSales = ['전체', '판매재', '판매제외제']
  const checkShips = ['전체', '출고완료', '미출고']
  const [request, setRequest] = useState({
    pageNum: 1,
    pageSize: 50,
    reciptStatus: '입고 확정',
  })
  const checkBoxSelect = useAtomValue(selectedRowsAtom)
  console.log(checkBoxSelect)
  const { data: TableData, isLoading, isSuccess } = useReactQuery(request, 'getInventroyStock', getInventoryStocks)
  const { mutate, isError } = useMutationQuery('change-category2', patchStockCategory)
  // const { tableRowData, paginationData, totalWeight } = useTableData(data, StockInventoryFields)
  const table = useRef(StockInventoryFieldCols)
  const getCol = table.current
  const page = TableData?.data?.pagination
  const [pagenations, setPaginations] = useState([])
  const [weight, setWeight] = useAtom(weightAtom)
  const [isMulti, setIsMulti] = useAtom(StockMultiModal)
  const [selectObj, setSelectObj] = useAtom(weightObj)
  const [selectProductNumber, setSelectProductNumber] = useState([])
  // console.log(tableRowData)
  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
  const [check2, setCheck2] = useState(Array.from({ length: checkShips.length }, () => false))
  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))
  const [checkData2, setCheckData2] = useState(Array.from({ length: checkShips.length }, () => ''))

  const tableRowData = useMemo(() => {
    if (!TableData || !TableData?.data?.list) {
      return []
    }
    const rowData = TableData?.data?.list
    const displayData = add_element_field(rowData, StockInventoryFields)
    setPaginations(page)
    return displayData
  }, [isSuccess, TableData])

  useEffect(() => {
    if (checkBoxSelect?.length === 0) return
    setSelectProductNumber(() => checkBoxSelect?.map((i) => i['제품 번호']))
  }, [checkBoxSelect])
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
  const [parameter, setParameter] = useAtom(changeCategoryAtom)
  const [nowPopup, setNowPopup] = useAtom(popupObject)
  const [modalSwitch, setModalSwitch] = useAtom(modalAtom)
  const [errorMsg, setErrorMsg] = useState('')
  const openModal = () => {
    setModalSwitch(true)
  }

  const changeSaleCategory = () => {
    const res = mutate(parameter, {
      onSuccess: (d) => {
        if (d?.data.status === 200) {
          setIsMulti(false)
          window.location.reload()
        }
      },
      onError: (e) => {
        setErrorMsg(e.data.message)
        setNowPopup({
          num: '1-12',
          title: '',
          content: `${e.data.message}`,
          func: () => {
            setIsMulti(false)
          },
        })
      },
    })

    return res
  }

  const { pagination: customPagination, onPageChanage } = usePaging(TableData, setRequest)
  return (
    <FilterContianer>
      <FilterHeader>
        <h1>재고 관리</h1>
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
                  <h6>규격 약호</h6>
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17}>
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>입고일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} width={130} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} width={130} />
                  </GridWrap>
                </PartWrap>

                <PartWrap>
                  <h6>출고일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} width={130} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} width={130} />
                  </GridWrap>
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
                  <h6>운송 진행 </h6>
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
                  <h6>구분</h6>
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                  <MainSelect />
                </PartWrap>
              </RowWrap>

              <RowWrap none>
                <PartWrap first>
                  <h6>두께(MM)</h6>
                  <ExInputsWrap>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </ExInputsWrap>
                </PartWrap>
                <PartWrap>
                  <h6>폭(MM)</h6>
                  <ExInputsWrap>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
                  </ExInputsWrap>
                </PartWrap>
                <PartWrap>
                  <h6>길이(MM)</h6>
                  <ExInputsWrap>
                    <MiniInput /> <Tilde>~</Tilde>
                    <MiniInput />
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
            <Excel
            //  getRow={getRow}
            />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteBlackBtn
              onClick={() => {
                if (!isArray(checkBoxSelect)) return
                if (checkBoxSelect.length === 0) {
                  alert('제품을 선택해주세요')
                } else {
                  openModal()
                }
              }}
            >
              판매 구분 변경
            </WhiteBlackBtn>
            <WhiteRedBtn>입고 확정 취소</WhiteRedBtn>
          </div>
        </TCSubContainer>
        <Table getRow={tableRowData} getCol={getCol} tablePagination={page} onPageChange={onPageChanage} />
      </TableContianer>
      {/* {isMulti === true && (
        <Multi2
          closeFn={(e, text) => {
            const { tagName } = e.target
            // console.log('TARGET :', e.target.tagName)
            if (tagName === 'IMG') {
              setIsMulti(false)
            }
          }}
          errMsg={errorMsg}
          saveFn={changeSaleCategory}
          productNumbers={selectProductNumber}
        />
      )} */}
      {modalSwitch && (
        <Multi2
          closeFn={(e, text) => {
            const { tagName } = e.target
            // console.log('TARGET :', e.target.tagName)
            if (tagName === 'IMG') {
              setModalSwitch(false)
            }
          }}
          length={2}
          setModalSwitch={setModalSwitch}
          errMsg={errorMsg}
          saveFn={changeSaleCategory}
          productNumbers={selectProductNumber}
        />
      )}
      {/* {weight && <SellWeight />} */}
      {/* {weight && <SellWeight />} */}
      {weight && <WeightSales />}
    </FilterContianer>
  )
}

export default Inventory
