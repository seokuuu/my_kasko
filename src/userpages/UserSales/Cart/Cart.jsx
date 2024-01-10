import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'
import { useUserCartListQuery, useUserOrderMutaion } from '../../../api/user'
import {
  SkyBtn
} from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { userCartListSingleField, userCartListSingleFieldsCols } from '../../../constants/user/cart'
import { add_element_field } from '../../../lib/tableHelpers'
import {
  FilterContianer,
  FilterHeader,
  SubTitle,
  TCSubContainer,
  TableContianer
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { selectedRowsAtom } from '../../../store/Layout/Layout'

/**
 * @constant 최소 주문 중량(25톤/단위kg)
 */
const MIN_ORDER_WEIGHT = 25_000;

/**
 * @constant 상품 카테고리(단일|패키지)
 */
const CATEGORY = {
  single: 'SINGLE',
  package: 'PACKAGE'
};

/**
 * 사용자 장바구니 페이지
 * @description
 * [1] 장바구니 목록을 조회합니다.
 * [2] 선택 제품을 주문합니다.
 */
const Cart = ({}) => {
  const [category, setCategory] = useState(CATEGORY.single);
  const [searchParam, setSearchParam] = useState({ pageNum: 1, pageSize: 50 }); // 테이블 조회 파라미터
  const { data: cartData, isLoading, isError } = useUserCartListQuery(category, searchParam); // 카트 목록 조회 쿼리
  const { mutate: requestOrder, loading: isOrderLoading } = useUserOrderMutaion(); // 주문하기 뮤테이션
  // 테이블 데이터
  const tableDisplayData = useMemo(() => {
    if(!cartData || !cartData.list) {
      return [];
    }
    const rowData = cartData.list.map(v => category === CATEGORY.single? v.product : v.packaging );
    const displayData = add_element_field(rowData.map((v, idx) => ({...v, index: idx + 1})), userCartListSingleField);
    return displayData;
  }, [cartData, category]); // 테이블 노출 데이터
  // 선택 항목
  const selectedData = useAtomValue(selectedRowsAtom);
  // 갯수
  const totalCount = useMemo(() => (cartData && cartData.pagination)? cartData.pagination.listCount || 0 : 0 , [cartData]);
  // 중량
  const totalWeight = useMemo(() => (cartData && cartData.pagination)? cartData.pagination.totalWeight || 0 : 0 , [cartData]); // 총 중량
  const selectedTotalWeight = useMemo(() => {
    if(!selectedData || selectedData.length < 1) {
      return 0;
    }
    const sums = selectedData.reduce((sum, item) => item['중량']? sum + Number(item['중량']) : 0, 0);
    return sums;
  }, [selectedData]); // 총 선택 항목 중량

  /**
   * 조회갯수 변경 핸들러
   * @param {number} searchSize 1페이지당 조회 갯수 
   */
  function handleSearchSizeChange(e) {
    const newSize = e.target.value;

    if(newSize !== searchParam.pageSize) {
      setSearchParam({
        pageNum: 1,
        pageSize: newSize
      });
    }
  }
  
  /**
   * 페이지 변경 핸들러
   * @param {number} page 이동할 페이지 
   * @todo 페이지 변경 함수 연동
   */
  function handlePageChange(page) {
    setSearchParam(param => ({
      pageNum: page,
      pageSize: param.pageSize
    }));
  }

  /**
   * 선택 항목 주문 핸들러
   * @todo 주문하기 연동
   */
  function handleSelectOrder(e) {
    e.preventDefault();

    if(!selectedData || selectedData.length < 1) {
      return alert('주문할 제품을 선택해 주세요.');
    }
    
    if(selectedTotalWeight < MIN_ORDER_WEIGHT) {
      return alert('25톤 이상 부터 주문이 가능합니다.');
    }

    requestOrder({
      type: category,
      orderList: category === CATEGORY.single
                ? selectedData.map(v => ({productUid: v?.uid || '', salesPrice: v?.salesPrice || 0 }))
                : selectedData.map(v => ({packageNumber: v?.uid || '', salesPrice: v?.salesPrice || 0 }))
    });
  }

  // ERROR SECTION
  if(isError) {
    return <div>ERROR</div>
  }

  // LOADING SECTION
  if(isLoading) {
    return <div>Loading</div>
  }

  // DATA SECTION
  return (
    <FilterContianer>
      {/* 섹션 | 카테고리 */}
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>            
            <h1>장바구니</h1>
            <SubTitle>
              {
                [{ text: '단일', value: CATEGORY.single }, { text: '패키지', value: CATEGORY.package }]
                .map(v => (
                  <a role="button" style={{cursor: 'pointer'}} onClick={() => { setCategory(v.value) }}>
                    {
                      v.value === category? <h5>{v.text}</h5> : <h6>{v.text}</h6>
                    }
                  </a>
                ))
              }
          </SubTitle>
          </div>
        </FilterHeader>
      </div>
      <TableContianer>
        {/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{ selectedData? selectedData.length.toLocaleString() : 0}</span> / {totalCount.toLocaleString()}개 )
            <Hidden />
          </div>
          <div>
            <PageDropdown handleDropdown={handleSearchSizeChange} />
            <Excel getRow={tableDisplayData}/>
          </div>
        </TCSubContainer>
        {/* 선택항목 중량 */}
        <TCSubContainer style={{justifyContent: 'flex-start'}}>
            선택중량 <span> {selectedTotalWeight.toLocaleString()} </span> (kg) / 총 중량 {totalWeight.toLocaleString()} (kg)
        </TCSubContainer>
        {/* 테이블 */}
        <Table getCol={userCartListSingleFieldsCols} getRow={tableDisplayData} />
        {/* 테이블 액션 */}
        <TCSubContainer style={{width: '100%', justifyContent: 'flex-end'}}>
            <SkyBtn disabled={isOrderLoading} onClick={handleSelectOrder}>선택 제품 주문</SkyBtn>
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
};

export default Cart;
