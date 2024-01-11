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
import { add_element_field } from '../../../lib/tableHelpers'
import {
  CustomInput,
  FilterContianer,
  FilterHeader,
  FilterTCTop,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import useTableSelection from '../../../hooks/useTableSelection'

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
  const [searchParam, setSearchParam] = useState({ auctionNumber: salesNumber, pageNum: 1, pageSize: 50 }); // 테이블 조회 파라미터
  // API
  const { data: orderData, isLoading, isError, isSuccess } = useUserOrderDetailsQuery(searchParam);
  // 인포테이블 데이터
  const infoData = useMemo(() => getInfoRows(orderData?.list || [], salesNumber), [orderData, salesNumber]);
  // 테이블 데이터
  const tableDisplayData = useMemo(() => {
    if(!orderData || !orderData.list) {
      return [];
    }
    const rowData = orderData.list;
    const displayData = add_element_field(rowData.map((v, idx) => ({...v, index: idx + 1})), userOrderDetailsField);
    return displayData;
  }, [orderData]); // 테이블 노출 데이터
  // 페이지 데이터
  const paginationData = useMemo(() => {
    let initialData = { pageNum: 1, startPage: 1, endPage: 1, maxPage: 1, listCount: 0 };
    if(orderData && orderData.pagination) {
      initialData = orderData.pagination;
      initialData.endPage = Math.max(orderData.pagination.endPage, 1);
    }
    return initialData;
  }, [orderData]);
  // 선택항목 데이터
  const { selectedData, selectedWeight, selectedWeightStr, selectedCount, selectedCountStr, hasSelected } = useTableSelection();


  /**
   * 필터 핸들러
   * @param {object} param 파라미터 객체
   */
    function handleSearchParamChange(newParam) {
      setSearchParam(prevParam => ({
        ...prevParam,
        ...newParam,
        ...(!newParam['page']&& { page: 1 })
      }));
    }
  
    /**
     * 조회갯수 변경 핸들러
     * @param {number} searchSize 1페이지당 조회 갯수 
     */
    function handleSearchSizeChange(e) {
      const newSize = e.target.value;
  
      if(newSize !== searchParam.pageSize && !isNaN(newSize)) {
        handleSearchParamChange({ pageSize: newSize });
      }
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
            조회 목록 (선택 <span>2</span> / 50개 )
            <Hidden />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <PageDropdown handleDropdown={handleSearchSizeChange}/>
            <Excel getRow={tableDisplayData} />
          </div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {0} (kg)
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
        <Table getRow={tableDisplayData} getCol={userOrderDetailsFieldsCols} />
        {/* 페이지네이션 */}
        <CustomPagination pagination={paginationData} onPageChange={p => { handleSearchParamChange({page: p}) }} />
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
