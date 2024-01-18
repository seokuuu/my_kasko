import React, { Fragment, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { useUserDestinationUpdateRequestMutation, useUserOrderDetailsQuery } from '../../../api/user'
import { BtnBound, TGreyBtn, WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { userOrderDetailsField, userOrderDetailsFieldsCols } from '../../../constants/user/order'
import useTableData from '../../../hooks/useTableData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
import DepositRequestForm from '../../../modal/Docs/DepositRequestForm'
import {
  FilterContianer,
  FilterHeader,
  FilterTCTop,
  TCSubContainer,
  TableContianer
} from '../../../modal/External/ExternalFilter'
import DestinationChange from '../../../modal/Multi/DestinationChange'
import Table from '../../../pages/Table/Table'

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
  pageNum: 1,
  pageSize: 50,
}

/**
 * @constant 주문정보 테이블 칼럼
 */
const INFO_COLUMNS = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량(KG)', '입금 요청 금액(원)'];

/**
 * @constant 제품번호 한글 키
 */
const UID_KEY = '고유 번호';

/**
 * 주분 정보 테이블 로우 반환 함수
 * @param {*} data 주문상세목록 데이터
 * @return {array<string>}
 */
const getInfoRows = (data, salesNumber) => {
  const initialData = [salesNumber, '-', '-', 0, 0, 0];
  if (data) {
    initialData[1] = data[0]?.customerName || '-' // 고객사
    initialData[2] = data[0]?.customerCode || '-' // 고객코드
    data.forEach((v) => {
      initialData[3] += Number(v?.quantity) || 0 // 총 수량
      initialData[4] += Number(v?.totalWeight) || 0 // 총 중량
      initialData[5] += Number(v?.totalBiddingPrice) || 0 // 입금 요청 금액
    })
    initialData.forEach((v, idx) => {
      if (!isNaN(v)) {
        initialData[idx] = v.toLocaleString()
      }
    })
  }
  return initialData
}

/**
 * 사용자 주문 확인 상세 페이지
 * @param {string} props.salesNumber 상시판매 번호(경매 번호)
 */
const OrderDetail = ({ salesNumber }) => {
  // API 파라미터
  const { searchParams, handleParamsChange, handlePageSizeChange } = useTableSearchParams({
    ...initialSearchParams,
    auctionNumber: salesNumber,
  })
  // API
  const { data: orderData, isError, isLoading } = useUserOrderDetailsQuery(searchParams)
  // 테이블 데이터, 페이지 데이터, 총 중량
  const { tableRowData, paginationData, totalWeightStr, totalCountStr } = useTableData({
    tableField: userOrderDetailsField,
    serverData: orderData,
    wish: { display: true, cellKey: 'productNumber', valueKey: 'productNumber' }
  })
  // 인포테이블 데이터
  const infoData = useMemo(() => getInfoRows(orderData?.list || [], salesNumber), [orderData, salesNumber])
  // 선택항목 데이터
  const { selectedData, selectedWeightStr, selectedCountStr, hasSelected } = useTableSelection({ weightKey: '중량' })
  // 목적지 데이터 || 목적지 변경 항목 데이터
  const [destination, setDestination] = useState(null); // { code: '', name: '', tel: '' }
  const [destinationUpdateItems, setDestinationUpdateItems] = useState([]);
  // 목적지 변경 API
  const { mutate: requestDestinationUpdate, isLoaidng: isRequstLoading } = useUserDestinationUpdateRequestMutation();
  // 입금요청서 발행 모드
  const [receiptPrint, setReceiptPrint] = useState(false);
  // 목적지 변경항목 반영 테이블 데이터
  const tableRowDataWithNewDestination = useMemo(() => {
    const destinationItemUids = destinationUpdateItems.map(v => v[UID_KEY]);
    const newTableRowData = tableRowData.map(v => {
      if(destinationItemUids.includes(v[UID_KEY])) {
        return ({
          ...v, 
          '변경요청 목적지명': destination.name,
          '변경요청 목적지코드': destination.code,
          '변경요청 목적지 주소': destination.address,
          '변경요청 목적지 연락처': destination.phone,
        })
      } 
      return v;
    });
    return newTableRowData;
  }, [destinationUpdateItems, tableRowData]);

  /**
   * 목적지 적용 핸들러 
   * @description 서버 요청 하지 않으며, 테이블에 노출되는 데이터에만 적용합니다.
   */
  function handleDestinationApply() {
    if(!destination) {
      return alert('목적지를 검색해 주세요.');
    }
    if(!hasSelected) {
      return alert('목적지를 적용할 상품을 선택해 주세요.');
    }

    setDestinationUpdateItems(selectedData.map(v => ({ ...v, destination: destination })));
  }
  
  /**
   * 목적지 승인 요청 핸들러
   * @description 서버에 승인을 요청합니다.
  */
 function handleDestinationApprovalRequest() {
    if(!destination) {
      return alert('적용할 목적지를 선택해 주세요.');
    }
    if(destinationUpdateItems.length < 1) {
      return alert('목적지를 적용할 상품을 선택해 주세요.');
    }

    requestDestinationUpdate({
      updateList: destinationUpdateItems.map(v => ({
        uid: v[UID_KEY],
        requestCustomerDestinationUid: destination.uid
      }))
    });

    setDestinationUpdateItems([]);
    setDestination(null);
  }

  // ERROR SECTION
  if (isError) {
    return <div>ERROR</div>
  }

  return (
    <FilterContianer>
      <div>
        {/* 경매 번호 */}
        <FilterHeader>
          <h1>주문 확인 상세</h1>
        </FilterHeader>
        <FilterTCTop>
          <h6>경매 번호</h6>
          <p>{salesNumber}</p>
        </FilterTCTop>
        {/* 경매 정보 */}
        <TableWrap>
          <ClaimTable>
            {[0, 1].map((index) => (
              <ClaimRow key={index}>
                {INFO_COLUMNS.slice(index * 3, index * 3 + 3).map((title, idx) => (
                  <Fragment agmentkey={title}>
                    <ClaimTitle>{title}</ClaimTitle>
                    <ClaimContent>{infoData[index * 3 + idx]}</ClaimContent>
                  </Fragment>
                ))}
              </ClaimRow>
            ))}
          </ClaimTable>
        </TableWrap>
      </div>
      <TableContianer>
        {/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handlePageSizeChange} />
            <Excel getRow={tableRowData} />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <P>목적지</P>
            <DestinationChange
              customerCode={infoData[2]} 
              customerName={infoData[1]} 
              value={destination}
              onSubmit={d => { setDestination(d) }} 
            />
            <TGreyBtn onClick={handleDestinationApply}>적용</TGreyBtn>
            <BtnBound />
            <WhiteBlackBtn disabled={isRequstLoading} onClick={handleDestinationApprovalRequest}>목적지 승인 요청</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        {/* 테이블 */}
        <Table
          getRow={tableRowDataWithNewDestination}
          getCol={userOrderDetailsFieldsCols}
          loading={isLoading}
          paginationData={paginationData}
          onPageChange={(p) => {
            handleParamsChange({ page: p })
          }}
        />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteSkyBtn
              onClick={() => {
                setReceiptPrint(true)
              }}
            >
              입금 요청서 발행
            </WhiteSkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
      {/* 입금 요청서 모달 */}
      {receiptPrint &&  (
        <DepositRequestForm
          title="상시판매 입금요청서"
          auctionNumber={salesNumber}
          salesDeposit
          onClose={() => {
            setReceiptPrint(false)
          }}
        />
      )}
    </FilterContianer>
  )
}

export default OrderDetail

export const P = styled.p`
  position: relative;
  top: 5px;
`
