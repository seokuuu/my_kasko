import { useEffect, useState, useRef } from 'react'
import { BlackBtn, GreyBtn, SkyBtn, WhiteRedBtn } from '../../common/Button/Button'
import { MainSelect } from '../../common/Option/Main'
import DateGrid from '../../components/DateGrid/DateGrid'
import Excel from '../../components/TableInner/Excel'
import HeaderToggle from '../../components/Toggle/HeaderToggle'
import { invenCustomer, invenCustomerData, pageSort, toggleAtom } from '../../store/Layout/Layout'
import { selectedRowsAtom } from '../../store/Layout/Layout'
import { useQueryClient } from '@tanstack/react-query'

import {
  DoubleWrap,
  ExCheckWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  PartWrap,
  PWRight,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../modal/External/ExternalFilter'

import { useAtom, useAtomValue } from 'jotai'
import Hidden from '../../components/TableInner/Hidden'
import PageDropdown from '../../components/TableInner/PageDropdown'
import { OrderFields, OrderFieldsCols } from '../../constants/admin/Order'
import useReactQuery from '../../hooks/useReactQuery'
import { add_element_field } from '../../lib/tableHelpers'
import { getAdminOrder } from '../../service/admin/Order'
import { CheckImg2, StyledCheckSubSquDiv } from '../../common/Check/CheckImg'
import { CheckBox } from '../../common/Check/Checkbox'
import { columnDefs } from './etcVariable'
import axios from 'axios'
import InventoryFind from '../../modal/Multi/InventoryFind'
import { getCustomerFind } from '../../service/admin/Auction'
import { getSPartList } from '../../api/search'
import Table from '../Table/Table'
import PagingComp from '../../components/paging/PagingComp'

const Order = ({}) => {
  const [checkSalesStart, setCheckSalesStart] = useState('') // 경매일자 시작
  const [checkSalesEnd, setCheckSalesEnd] = useState('') // 경매일자 끝
  const [checkConfirmStart, setCheckConfirmStart] = useState('') // 확정 전송 시작
  const [checkConfirmEnd, setCheckConfirmEnd] = useState('') // 확정 전송 끝
  const [checkAllTimeStart, setCheckAllTimeStart] = useState('') // 경매일자 시작
  const [checkAllTimeEnd, setCheckAllTimeEnd] = useState('') // 경매일자 끝

  const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)

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
    // 빈값을 제외한 값이 filteredCheck에 담긴다.
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
  // const gridRef = useRef()
  const [sortNum, setSortNum] = useAtom(pageSort)

  const handleDropdown = (e) => {
    setSortNum(e.target.value)
  }

  const [getRow, setGetRow] = useState('')
  const tableField = useRef(OrderFieldsCols)
  const getCol = tableField.current

  /** 테이블컴포넌트 */
  const [rowData, setRowData] = useState([])
  const [gridApi, setGridApi] = useState(null)
  const [gridColumnApi, setGridColumnApi] = useState(null)
  const onGridReady = (params) => {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
    params.api.sizeColumnsToFit()
  }
  useEffect(() => {
    console.log('그리드API', gridApi)
    if (gridApi) console.log('그리드API-함수호출', gridApi.getSelectedNodes())
  }, [gridApi])
  const onCellClicked = async (params) => {
    if (params.colDef.field === 'title') {
      window.location.href = `/operate/notice/view/${params.data.no}`
    }
  }
  const gridOptions = {
    getRowStyle: (params) => {
      if (params.node.rowPinned) return { 'font-weight': 'bold' }
    },
    headerHeight: 30,
    rowHeight: 30,
    pagination: true,
    paginationPageSize: 3,
  }
  /**
   * @description :페이징 처리 useState
   */
  const [currentPage, setCurrentPage] = useState(1)
  const totalPage = Math.ceil(rowData.length / gridOptions.paginationPageSize)

  const onPageChange = (pageNumber) => {
    gridApi.paginationGoToPage(pageNumber - 1)
    setCurrentPage(pageNumber)
  }

  /**
   * @Func :페이징 이동버튼
   */
  const goToNextPage = () => {
    const nextPage = Math.min(currentPage + 1, totalPage)
    onPageChange(nextPage)
  }
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = Math.min(currentPage - 1, totalPage)
      onPageChange(prevPage)
    }
  }
  const goToLastPage = () => {
    let currentGroupLastPage = Math.ceil(currentPage / 5) * 5
    currentGroupLastPage = Math.min(currentGroupLastPage, totalPage)

    // 현재 페이지가 그룹의 마지막 페이지인 경우, 다음 그룹의 마지막 페이지로 이동
    let targetPage
    // 다음 페이지 그룹의 1번째 페이지로 이동
    if (currentPage === currentGroupLastPage) targetPage = Math.min(currentGroupLastPage + 1, totalPage)
    // 현재 그룹의 마지막 페이지로 이동
    else targetPage = currentGroupLastPage

    onPageChange(targetPage)
  }
  const goToStartOfRange = () => {
    let startPageInGroup = Math.floor((currentPage - 1) / 5) * 5 + 1

    // 현재 페이지가 그룹의 시작 페이지일 경우, 이전 그룹의 마지막 페이지로 이동
    if (currentPage === startPageInGroup && currentPage !== 1) startPageInGroup = Math.max(startPageInGroup - 1, 1)

    onPageChange(startPageInGroup)
  }

  /** 주문 관리 목록 데이터 가져오기 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/order?pageNum=1&pageSize=10`)
        const data = await response.json()
        const transformedData = data.data.list.map((item) => ({
          auctionNumber: item.auctionNumber,
          createDate: item.createDate,
          packageName: item.packageName,
          packageNumber: item.packageNumber,
          customerCode: item.customerCode,
          customerName: item.customerName,
          storageName: item.storageName,
          saleType: item.saleType,
          salePriceType: item.salePriceType,
          weight: item.weight,
          orderNumber: item.orderNumber,
          productCount: item.productCount,
          totalPrice: item.totalPrice,
        }))

        setRowData(transformedData)
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }

    fetchData()
  }, [])
  const [checkedItems, setCheckedItems] = useState({})

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (item, isChecked) => {
    setCheckedItems({ ...checkedItems, [item]: isChecked })
  }

  // 주문 취소 버튼 클릭 핸들러
  const handleOrderCancel = () => {
    const checkedUids = Object.keys(checkedItems).filter(
      (customerDestinationUid) => checkedItems[customerDestinationUid],
    )

    const requestList = checkedUids.map((customerDestinationUid) => {
      // rowData에서 uid에 해당하는 항목을 찾습니다.
      const item = rowData.find((item) => item.customerDestinationUid === customerDestinationUid)
      // 해당 항목에서 saleType을 가져옵니다. 항목이 없으면 기본값을 설정할 수 있습니다.
      const saleType = item ? item.saleType : '기본값'

      return { customerDestinationUid, saleType }
    })

    // 주문 취소 API 호출
    axios
      .post('/api/order/cancel', { requestList })
      .then((response) => {
        console.log('Order cancelled successfully:', response.data)
      })
      .catch((error) => {
        console.error('Error cancelling order:', error)
      })
  }

  // columnDefs 수정
  // 체크박스 렌더러에 handleCheckboxChange 연결
  const newColumnDefs = [
    {
      ...columnDefs.find((col) => col.field === 'check'),
      cellRenderer: (params) => (
        <input
          type="checkbox"
          checked={checkedItems[params.data.weight] || false}
          onChange={(e) => handleCheckboxChange(params.data.weight, e.target.checked)}
        />
      ),
    },
    ...columnDefs.filter((col) => col.field !== 'check'),
  ]

  // 숫자를 천 단위로 구분하여 포맷팅하는 함수
  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number)
  }

  const [selected, setSelected] = useState({ sPart: '' })

  // 고객사 팝업 상태,객체
  const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer)
  const [customerData, setCustomerData] = useAtom(invenCustomerData)

  const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)

  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>주문 관리</h1>
        </div>
        {/* 토글 쓰기 */}
        <HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
      </FilterHeader>

      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap none>
                <PartWrap first>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect />
                  </PWRight>
                </PartWrap>

                <PartWrap>
                  <h6>고객사 명/고객사코드</h6>
                  <Input value={customerData.name} readOnly name="customerName" />
                  <Input value={customerData.code} readOnly name="customerCode" />
                  <GreyBtn
                    style={{ width: '70px' }}
                    height={35}
                    margin={10}
                    fontSize={17}
                    onClick={() => setCustomerPopUp(true)}
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
                      defaultValue={''}
                      name="sPart"
                      onChange={(e) =>
                        setSelected((p) => ({
                          ...p,
                          sPart: e.label,
                        }))
                      }
                    />
                  </PWRight>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap first>
                  <h6>경매 일자</h6>
                  <GridWrap>
                    <DateGrid
                      width={130}
                      bgColor={'white'}
                      fontSize={13}
                      startDate={checkSalesStart}
                      setStartDate={setCheckSalesStart}
                    />
                    <Tilde>~</Tilde>
                    <DateGrid
                      width={130}
                      bgColor={'white'}
                      fontSize={13}
                      startDate={checkSalesEnd}
                      setStartDate={setCheckSalesEnd}
                    />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6>확정 전송 일자</h6>
                  <GridWrap>
                    <DateGrid
                      width={130}
                      bgColor={'white'}
                      fontSize={13}
                      startDate={checkConfirmStart}
                      setStartDate={setCheckConfirmStart}
                    />
                    <Tilde>~</Tilde>
                    <DateGrid
                      width={130}
                      bgColor={'white'}
                      fontSize={13}
                      startDate={checkConfirmEnd}
                      setStartDate={setCheckConfirmEnd}
                    />
                  </GridWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap none>
                <PartWrap>
                  <h6>상시 판매 주문 일자</h6>
                  <GridWrap>
                    <DateGrid
                      width={130}
                      bgColor={'white'}
                      fontSize={13}
                      startDate={checkAllTimeStart}
                      setStartDate={setCheckAllTimeStart}
                    />
                    <Tilde>~</Tilde>
                    <DateGrid
                      width={130}
                      bgColor={'white'}
                      fontSize={13}
                      startDate={checkAllTimeEnd}
                      setStartDate={setCheckAllTimeEnd}
                    />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6>주문 상태</h6>
                  <ExCheckWrap>
                    {checkSales.map((x, index) => (
                      <ExCheckWrap style={{ marginRight: '15px' }}>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                          isChecked={check1[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckWrap>
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
            {/* 조회 목록 (선택 <span>선택 수량</span> / {totalListFormatted}개 ) */}
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handleDropdown} />
            <Excel getRow={getRow} />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>{/* 선택 중량<span>{KilogramSum(checkBoxSelect)}</span>kg / 총 중량{totalWeightFormatted} kg */}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn type="button" onClick={handleOrderCancel}>
              주문 취소
            </WhiteRedBtn>
            <SkyBtn>확정 전송</SkyBtn>
          </div>
        </TCSubContainer>
        <Table
          columnDefs={newColumnDefs}
          rowData={rowData}
          onGridReady={onGridReady}
          onCellClicked={onCellClicked}
          gridOptions={gridOptions}
          size={3}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <PagingComp
            currentPage={currentPage}
            totalPage={totalPage}
            onPageChange={onPageChange}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            goToLastPage={goToLastPage}
            goToStartOfRange={goToStartOfRange}
          />
        </div>
        <TCSubContainer>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>입금 취소</WhiteRedBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
      {customerPopUp && <InventoryFind title={'고객사 찾기'} setSwitch={setCustomerPopUp} data={inventoryCustomer} />}
    </FilterContianer>
  )
}

export default Order
