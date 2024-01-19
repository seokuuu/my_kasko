import React, { Fragment, useEffect, useState } from 'react'
import { BlackBtn, SkyBtn, WhiteRedBtn } from '../../common/Button/Button'
import DateGrid from '../../components/DateGrid/DateGrid'
import Excel from '../../components/TableInner/Excel'
import { toggleAtom } from '../../store/Layout/Layout'
import Test3 from '../Test/Test3'

import { CheckBox } from '../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../common/Check/CheckImg'

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
  FilterTCTop,
  GridWrap,
  PartWrap,
  ResetImg,
  RowWrap,
  TableContianer,
  TCSubContainer,
  Tilde,
} from '../../modal/External/ExternalFilter'

import Hidden from '../../components/TableInner/Hidden'
import PageDropdown from '../../components/TableInner/PageDropdown'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../components/MapTable/MapTable'
import Table from '../Table/Table'
import { AdminOrderManageFieldsCols } from '../../constants/admin/AdminOrderManage'
import useReactQuery from '../../hooks/useReactQuery'
import { getDetailOrderList, getOrderList } from '../../api/orderList'
import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}
const AdminOrderDetail = ({}) => {
  const query = useQuery()

  // 쿼리 스트링에서 값 추출
  const auctionNumber = query.get('auctionNumber')
  const customerCode = query.get('customerCode')
  const storage = query.get('storage')
  const customerDestinationUid = query.get('customerDestinationUid')
  const sendDate = query.get('sendDate')

  const saleType = query.get('saleType')
  const weight = query.get('weight')
  const customerDestinationAddress = query.get('customerDestinationAddress')
  const customerDestinationName = query.get('customerDestinationName')
  const customerName = query.get('customerName')
  const totalPrice = query.get('totalPrice')
  const customerDestinationPhone = query.get('customerDestinationPhone')
  const checkSales = ['전체', '확정 전송', '확정 전송 대기']
  const paramData = {
    pageNum: 1,
    pageSize: 3,
    auctionNumber: auctionNumber,
    customerCode: customerCode,
    storage: storage,
    customerDestinationUid: customerDestinationUid,
    sendDate: sendDate,

    saleType: saleType,
    weight: weight,
    customerDestinationAddress: customerDestinationAddress,
    customerDestinationName: customerDestinationName,
    customerName: customerName,
    customerDestinationPhone: customerDestinationPhone,
    totalPrice: totalPrice,
  }
  const [param, setParam] = useState(paramData)
  const [detailOrderPagination, setDetailOrderPagination] = useState([])
  const [detailOrderListData, setDetailOrderListData] = useState(null)

  const { data: detailRes, isSuccess } = useReactQuery(param, 'getDetailOrderList', getDetailOrderList)
  useEffect(() => {
    if (detailRes && detailRes.data && detailRes.data.list) {
      setDetailOrderListData(detailRes.data.list)
      setDetailOrderPagination(detailRes.data.pagination)
    }
  }, [isSuccess, detailRes])
  const onPageChange = (value) => {
    setParam((prevParam) => ({
      ...prevParam,
      pageNum: Number(value),
    }))
  }
  //checkSales
  const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

  //checkShips
  const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

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
  const titleData = [
    '판매 구분',
    '고객 코드',
    '고객사',
    '총 중량',
    '입금 요청 금액',
    '목적지 명',
    '하차지 주소',
    '하차지 연락처',
    '',
  ]
  const contentData = [
    saleType,
    customerCode,
    customerName,
    weight,
    totalPrice,
    customerDestinationName,
    customerDestinationAddress,
    customerDestinationPhone,
    '',
  ]
  const queryClient = useQueryClient()
  const { data: getOrderRes } = useReactQuery(param, 'getOrderList', getOrderList, {
    initialData: () => {
      // React Query 캐시에서 초기 데이터를 가져옵니다.
      return queryClient.getQueryData('getOrderList')
    },
  })

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
    <>
      <FilterContianer>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>주문 관리 상세</h1>
          </div>
          {/* 토글 쓰기 */}
        </FilterHeader>
        <FilterTCTop>
          <h6>경매 번호</h6>
          <p>{auctionNumber}</p>
        </FilterTCTop>
        <TableWrap>
          <ClaimTable>
            {[0, 1, 2].map((index) => (
              <ClaimRow key={index}>
                {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                  <Fragment agmentkey={title}>
                    <ClaimTitle>{title}</ClaimTitle>
                    <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                  </Fragment>
                ))}
              </ClaimRow>
            ))}
          </ClaimTable>
        </TableWrap>

        {exFilterToggle && (
          <>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>주문 일자</h6>
                    <GridWrap>
                      <DateGrid bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid bgColor={'white'} fontSize={17} />
                    </GridWrap>
                  </PartWrap>
                  <PartWrap>
                    <h6>주문 상태</h6>
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
                </RowWrap>
                <RowWrap style={{ borderBottom: '0px' }}>
                  <PartWrap />
                  <PartWrap />
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
              <WhiteRedBtn>부분 주문 취소</WhiteRedBtn>
              <SkyBtn>부분 확정 전송</SkyBtn>
            </div>
          </TCSubContainer>

          <Table
            getCol={AdminOrderManageFieldsCols}
            getRow={detailOrderListData}
            tablePagination={detailOrderPagination}
            onPageChange={onPageChange}
          />
          <TCSubContainer style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div>
              <WhiteRedBtn>입금 취소</WhiteRedBtn>
            </div>
          </TCSubContainer>
        </TableContianer>
      </FilterContianer>
    </>
  )
}

export default AdminOrderDetail
