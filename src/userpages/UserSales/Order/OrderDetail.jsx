import React, { Fragment, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { useUserOrderDetailsQuery } from '../../../api/user'
import { BtnBound, TGreyBtn, WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import CustomPagination from '../../../components/pagination/CustomPagination'
import { userOrderDetailsField, userOrderDetailsFieldsCols } from '../../../constants/user/order'
import useTableData from '../../../hooks/useTableData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
import {
  CustomInput,
  FilterContianer,
  FilterHeader,
  FilterTCTop,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
  pageNum: 1, 
  pageSize: 50 
}

/**
 * @constant 주문정보 테이블 칼럼
 */
const INFO_COLUMNS = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량(KG)', '입금 요청 금액(원)'];

/**
 * 주분 정보 테이블 로우 반환 함수
 * @param {*} data 주문상세목록 데이터
 * @return {array<string>}
 */
const getInfoRows = (data, salesNumber) => {
  const initialData = [salesNumber, '-', '-', 0, 0, 0];
  if(data) {
    initialData[1] = data[0]?.customerName || '-'; // 고객사
    initialData[2] = data[0]?.customerCode || '-'; // 고객코드
    data.forEach(v => {
      initialData[3] += Number(v?.quantity) || 0;            // 총 수량
      initialData[4] += Number(v?.totalWeight) || 0;         // 총 중량
      initialData[5] += Number(v?.totalBiddingPrice) || 0;   // 입금 요청 금액
    })
    initialData.forEach((v, idx) => {
      if(!isNaN(v)) {
        initialData[idx] = v.toLocaleString();
      }
    })
  }
  return initialData;
}

/**
 * 사용자 주문 확인 상세 페이지
 * @param {string} props.salesNumber 상시판매 번호(경매 번호) 
 */
const OrderDetail = ({ salesNumber }) => {
  // API 파라미터
  const { searchParams, handleParamsChange, handlePageSizeChange } = useTableSearchParams({...initialSearchParams, auctionNumber: salesNumber});
  // API
  const { data: orderData, isError } = useUserOrderDetailsQuery(searchParams);
  // 테이블 데이터, 페이지 데이터, 총 중량
  const { tableRowData, paginationData, totalWeightStr, totalCountStr } = useTableData({ tableField: userOrderDetailsField, serverData: orderData });
  // 인포테이블 데이터
  const infoData = useMemo(() => getInfoRows(orderData?.list || [], salesNumber), [orderData, salesNumber]);
  // 선택항목 데이터
  const { selectedData, selectedWeightStr, selectedCountStr, hasSelected } = useTableSelection({weightKey: '중량'});
  // 목적지 데이터
  const [destination, setDestination] = useState(null); // { code: '', name: '', tel: '' }
  // 목적지 변경 데이터
  const [destinationModifyItems, setDestinationModifyItems] = useState([]);

  /**
   * 목적지 적용 핸들러 
   */
  function handleDestinationApply() {
    if(!destination) {
      return alert('목적지를 검색해 주세요.');
    }
    if(!hasSelected) {
      return alert('목적지를 적용할 상품을 선택해 주세요.');
    }

    //
    setDestinationModifyItems(selectedData.map(v => ({ ...v, destination: destination })));
    // 테이블 상에서 목적지 바뀌도록 수정
  }
  
  /**
   * 목적지 승인 요청 핸들러
  */
 function handleDestinationApprovalRequest() {
   if(!destinationModifyItems.length < 1) {
     return alert('목적지를 적용할 상품을 선택해 주세요.');
    }
    
    // 승인 요청
    setDestinationModifyItems([]);
    setDestination(null);
  }

  /**
   * 입금 요청서 발행 함수
   */
  function handleReceiptPrint() {
    // 입금 요청서 발행 함수
  }

  // ERROR SECTION
  if(isError) {
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
            <PageDropdown handleDropdown={handlePageSizeChange}/>
            <Excel getRow={tableRowData} />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <P>목적지</P>
            <CustomInput placeholder="h50" width={60} />
            <CustomInput placeholder="목적지명" width={120} />
            <CustomInput placeholder="도착지 연락처" width={120} />
            <WhiteBlackBtn>찾기</WhiteBlackBtn>
            <TGreyBtn>적용</TGreyBtn>
            <BtnBound />
            <WhiteBlackBtn>목적지 승인 요청</WhiteBlackBtn>
          </div>
        </TCSubContainer>
        {/* 테이블 */}
        <Table getRow={tableRowData} getCol={userOrderDetailsFieldsCols} />
        {/* 페이지네이션 */}
        <CustomPagination pagination={paginationData} onPageChange={p => { handleParamsChange({page: p}) }} />
        <TCSubContainer>
          <div></div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteSkyBtn>입금 요청서 발행</WhiteSkyBtn>
          </div>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default OrderDetail

export const P = styled.p`
  position: relative;
  top: 5px;
`
