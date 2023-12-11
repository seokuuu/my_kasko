/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { storageOptions } from '../../../../common/Option/SignUp'
import InventoryFind from '../../../../modal/Multi/InventoryFind'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BlackBtn, GreyBtn } from '../../../../common/Button/Button'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../../common/Check/CheckImg'
import { CheckBox } from '../../../../common/Check/Checkbox'
import { MainSelect } from '../../../../common/Option/Main'
import DateGrid from '../../../../components/DateGrid/DateGrid'
import {
  popupObject,
  selectedRowsAtom,
  toggleAtom,
  popupTypeAtom,
  invenDestination,
  invenCustomer,
  invenCustomerData,
  invenDestinationData,
} from '../../../../store/Layout/Layout'
// import Test3 from '../../../Test/Test3'
import { useAtom } from 'jotai'

import {
  DoubleWrap,
  ExCheckDiv,
  ExCheckWrap,
  FilterContianer,
  FilterFooter,
  FilterHeader,
  FilterLeft,
  FilterRight,
  FilterSubcontianer,
  GridWrap,
  Input,
  PWRight,
  PartWrap,
  ResetImg,
  RowWrap,
  TableContianer,
  Tilde,
} from '../../../../modal/External/ExternalFilter'
import useReactQuery from '../../../../hooks/useReactQuery'
import { getInventoryLedger } from '../../../../api/operate/inventory'
import Table from '../../../Table/Table'
import { add_element_field } from '../../../../lib/tableHelpers'
import { InventoryFieldsCols, InvertoryFields } from '../../../../constants/admin/Inventroy'
import { getSPartList, getStorageList, getDestinationFind } from '../../../../api/search'
import { getCustomerFind } from '../../../../service/admin/Auction'

const Inventory = ({}) => {
  const checkStores = ['전체', '미입고', '입고 대기', '입고 확정', '입고 확정 취소']
  const checkSales = ['전체', '판매재', '판매제외제']
  const checkShips = ['전체', '확정 전송', '확정 전송 대기']
  const checkTransits = ['전체', '출고 완료', '미출고']
  const checkShipments = ['전체', '출하 대기', '출하 완료', '출고 지시', '출고 완료', '운송 완료']

  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
  const [check2, setCheck2] = useState(Array.from({ length: checkShips.length }, () => false))
  const [check3, setCheck3] = useState(Array.from({ length: checkStores.length }, () => false))
  const [check4, setCheck4] = useState(Array.from({ length: checkTransits.length }, () => false))
  const [check5, setCheck5] = useState(Array.from({ length: checkShipments.length }, () => false))

  // Date
  const [checkSalesStart, setCheckSalesStart] = useState('') // 경매일자 시작
  const [checkSalesEnd, setCheckSalesEnd] = useState('') // 경매일자 끝

  const [Start2, setStart2] = useState('') // 주문일자 시작
  const [End2, setEnd2] = useState('') // 주문일자 끝

  const [Start3, setStart3] = useState('') // 주문일자 시작
  const [End3, setEnd3] = useState('') // 주문일자 끝

  const [Start4, setStart4] = useState('') // 주문일자 시작
  const [End4, setEnd4] = useState('') // 주문일자 끝

  const [Start5, setStart5] = useState('') // 주문일자 시작
  const [End5, setEnd5] = useState('') // 주문일자 끝

  // 목적지 팝업 상태,객체
  const [destinationPopUp, setDestinationPopUp] = useAtom(invenDestination)
  const [destinationData, setDestinationData] = useAtom(invenDestinationData)
  // 고객사 팝업 상태,객체
  const [customerPopUp, setCustomerPopUp] = useAtom(invenCustomer)
  const [customerData, setCustomerData] = useAtom(invenCustomerData)

  const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

  const [checkData2, setCheckData2] = useState(Array.from({ length: checkShips.length }, () => ''))
  const [checkData3, setCheckData3] = useState(Array.from({ length: checkStores.length }, () => ''))

  const [checkData4, setCheckData4] = useState(Array.from({ length: checkTransits.length }, () => ''))
  const [checkData5, setCheckData5] = useState(Array.from({ length: checkShipments.length }, () => ''))

  // SELECT 데이터
  const [selected, setSelected] = useState({ storage: '', sPart: '' })

  // 테이블 데이터
  const [getRow, setGetRow] = useState('')
  const tableField = useRef(InventoryFieldsCols)
  const getCol = tableField.current
  const checkedArray = useAtom(selectedRowsAtom)[0]

  // 페이지 네이션 변수 및 선언
  const [currentPage, setCurrentPage] = useState(1)

  const Param = {
    pageNum: 10,
    pageSize: 50,
  }
  // 인벤토리 테이블 리스트 데이터 불러오기
  const { isLoading, isError, data, isSuccess } = useReactQuery(Param, 'getInventoryLedge', getInventoryLedger)
  // 창고
  const { data: storageList } = useReactQuery('', 'getStorageList', getStorageList)
  // 제품군
  const { data: spartList } = useReactQuery('', 'getSPartList', getSPartList)
  const { data: inventoryCustomer } = useReactQuery('', 'getCustomerFind', getCustomerFind)
  const { data: inventoryDestination } = useReactQuery('', 'getDestinationFind', getDestinationFind)

  const resData = data?.data?.data?.list
  const pagination = data?.data?.data?.pagination
  const storage = storageList

  useEffect(() => {
    let getData = resData
    //타입, 리액트쿼리, 데이터 확인 후 실행
    if (!isSuccess && !resData) return
    if (Array.isArray(getData)) {
      setGetRow(add_element_field(getData, InvertoryFields))
    }
  }, [isSuccess, resData])

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

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check2])

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkStores.map((value, index) => {
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

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkTransits.map((value, index) => {
      return check4[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData4(filteredCheck)

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check4])

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkShipments.map((value, index) => {
      return check5[index] ? value : ''
    })
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter((item) => item !== '')
    setCheckData5(filteredCheck)

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check5])

  // useEffect(() => {
  //   setNowPopupType(2)
  //   setDestinationPopUp({
  //     num: '2-1',
  //     title: '저장하시겠습니까?',
  //     next: '1-12',
  //   })
  // }, [])

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

  // console.log('선택값', selected.sPart, selected.storage)
  // console.log('선택값', selected.sPart)
  // console.log('커스터머데이터', customerData)
  // console.log('데스티네이션', destinationData)
  return (
    <FilterContianer>
      <FilterHeader>
        <div style={{ display: 'flex' }}>
          <h1>재고 수불 관리</h1>
        </div>
      </FilterHeader>
      {exFilterToggle && (
        <>
          <FilterSubcontianer>
            <FilterLeft>
              <RowWrap>
                <PartWrap>
                  <h6>창고 구분</h6>
                  <PWRight>
                    <MainSelect
                      options={storageList}
                      defaultValue={''}
                      name="storage"
                      onChange={(e) => {
                        setSelected((p) => ({ ...p, storage: e.label }))
                      }}
                    />
                  </PWRight>
                </PartWrap>
                <PartWrap>
                  <h6>고객사 명</h6>
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
                <PartWrap>
                  <h6>목적지</h6>
                  <Input value={`${destinationData.name}/${destinationData.code}`} />
                  <GreyBtn
                    style={{ width: '70px' }}
                    height={35}
                    margin={10}
                    fontSize={17}
                    onClick={() => setDestinationPopUp(true)}
                  >
                    찾기
                  </GreyBtn>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap>
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
                <PartWrap>
                  <h6>입고 상태</h6>
                  <ExCheckWrap>
                    {checkStores.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck3(CheckBox(check3, check3.length, index, true))}
                          isChecked={check3[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap>
                  <h6>판매 구분</h6>
                  <ExCheckWrap>
                    {checkSales.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
                          isChecked={check1[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
                <PartWrap>
                  <h6>주문 상태</h6>
                  <ExCheckWrap>
                    {checkShips.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck2(CheckBox(check2, check2.length, index, true))}
                          isChecked={check2[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
              </RowWrap>

              <RowWrap>
                <PartWrap>
                  <h6>출하 상태</h6>
                  <ExCheckWrap>
                    {checkShipments.map((x, index) => (
                      <ExCheckDiv>
                        <StyledCheckSubSquDiv
                          onClick={() => setCheck5(CheckBox(check5, check5.length, index, true))}
                          isChecked={check5[index]}
                        >
                          <CheckImg2 src="/svg/check.svg" />
                        </StyledCheckSubSquDiv>
                        <p>{x}</p>
                      </ExCheckDiv>
                    ))}
                  </ExCheckWrap>
                </PartWrap>
              </RowWrap>

              <RowWrap>
                <PartWrap>
                  <h6 style={{ width: '120px' }}>경매 일자</h6>
                  <GridWrap>
                    <DateGrid
                      bgColor={'white'}
                      fontSize={17}
                      startDate={checkSalesStart}
                      setStartDate={setCheckSalesStart}
                    />
                    <Tilde>~</Tilde>
                    <DateGrid
                      bgColor={'white'}
                      fontSize={17}
                      startDate={checkSalesEnd}
                      setStartDate={setCheckSalesEnd}
                    />
                  </GridWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap>
                  <h6 style={{ width: '120px' }}>주문 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setStart2} startDate={Start2} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setEnd2} startDate={End2} />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6 style={{ width: '120px' }}>출고 요청 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setStart3} startDate={Start3} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setEnd3} startDate={End3} />
                  </GridWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap>
                <PartWrap>
                  <h6 style={{ width: '120px' }}>출고 지시 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setStart4} startDate={Start4} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setEnd4} startDate={End4} />
                  </GridWrap>
                </PartWrap>
                <PartWrap>
                  <h6 style={{ width: '120px' }}>출고 일자</h6>
                  <GridWrap>
                    {' '}
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setStart5} startDate={Start5} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} setStartDate={setEnd5} startDate={End5} />
                  </GridWrap>
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
        <Table getCol={getCol} getRow={getRow} />
      </TableContianer>

      {customerPopUp && <InventoryFind title={'고객사 찾기'} setSwitch={setCustomerPopUp} data={inventoryCustomer} />}
      {destinationPopUp && (
        <InventoryFind title={'목적지 찾기'} setSwitch={setDestinationPopUp} data={inventoryDestination} />
      )}
    </FilterContianer>
  )
}

export default Inventory
