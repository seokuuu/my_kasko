import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { useUserCartListQuery, useUserOrderMutaion } from '../../../api/user'
import { SkyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import CustomPagination from '../../../components/pagination/CustomPagination'
import {
  userCartListPackageField,
  userCartListPackageFieldCols,
  userCartListSingleField,
  userCartListSingleFieldsCols,
} from '../../../constants/user/cart'
import useTableData from '../../../hooks/useTableData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import {
  FilterContianer,
  FilterHeader,
  SubTitle,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { destiDelPopupAtom, popupObject } from '../../../store/Layout/Layout'

/**
 * @constant 최소 주문 중량(25톤/단위kg)
 */
const MIN_ORDER_WEIGHT = 25_000

/**
 * @constant 상품 카테고리(단일|패키지)
 */
const CATEGORY = {
  single: 'SINGLE',
  package: 'PACKAGE',
}

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
  category: CATEGORY.single,
  pageNum: 1,
  pageSize: 50,
}

/**
 * 사용자 장바구니 페이지
 * @description
 * [1] 장바구니 목록을 조회합니다.
 * [2] 선택 제품을 주문합니다.
 */
const Cart = ({}) => {
  // API 파라미터
  const { searchParams, handleParamsChange, handlePageSizeChange } = useTableSearchParams(initialSearchParams)
  // API
  const { data: cartData, isLoading, isError } = useUserCartListQuery(searchParams) // 카트 목록 조회 쿼리
  const { mutate: requestOrder, loading: isOrderLoading } = useUserOrderMutaion() // 주문하기 뮤테이션
  // 카테고리
  const isSingleCategory = useMemo(() => searchParams.category === CATEGORY.single, [searchParams])
  // 테이블 데이터, 페이지 데이터, 총 중량
  const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
    tableField: isSingleCategory ? userCartListSingleField : userCartListPackageField,
    serverData: cartData,
  })
  // 선택 항목
  const { selectedData, selectedWeight, selectedWeightStr, selectedCountStr, selectedCount } = useTableSelection({
    weightKey: isSingleCategory ? '중량' : '패키지 상품 총 중량',
  })
  // POPUP
  const [popupSwitch, setPopupSwitch] = useAtom(destiDelPopupAtom) // 팝업 스위치
  const [_, setNowPopup] = useAtom(popupObject)

  /**
   * 선택 항목 주문 핸들러
   */
  function handleSelectOrder(e) {
    e.preventDefault()

    if (selectedCount < 1) {
      setPopupSwitch(true)
      setNowPopup({
        num: '1',
        content: '상품을 선택해 주세요.',
      })
      return
    }

    // 25톤 이상 주문건만 주문 가능
    if (selectedWeight < MIN_ORDER_WEIGHT) {
      setPopupSwitch(true)
      setNowPopup({
        num: '1',
        content: '25톤 이상 부터 주문이 가능합니다.\n확인하시고 다시 시도해 주세요.',
      })
      return
    }

    requestOrder({
      type: searchParams.category === CATEGORY.single ? 'normal' : 'package',
      orderList: selectedData.map((v) =>
        isSingleCategory
          ? {
              productUid: v['고유 번호'] || '',
              salePrice: v['상시판매가'] || 0,
            }
          : {
              packageNumber: v['패키지 번호'] || 0,
              salePrice: v['패키지 상품 총 중량'] || 0,
            },
      ),
    })
  }

  // ERROR SECTION
  if (isError) {
    return <div>ERROR</div>
  }

  return (
    <FilterContianer>
      {/* 섹션 | 카테고리 */}
      <div>
        <FilterHeader>
          <div style={{ display: 'flex' }}>
            <h1>장바구니</h1>
            <SubTitle>
              {[
                { text: '단일', value: CATEGORY.single },
                { text: '패키지', value: CATEGORY.package },
              ].map((v) => (
                <a
                  role="button"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    handleParamsChange({ category: v.value })
                  }}
                >
                  {v.value === searchParams.category ? <h5>{v.text}</h5> : <h6>{v.text}</h6>}
                </a>
              ))}
            </SubTitle>
          </div>
        </FilterHeader>
      </div>
      <TableContianer>
        {/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount.toLocaleString()}개 )
            <Hidden />
          </div>
          <div>
            <PageDropdown handleDropdown={handlePageSizeChange} />
            <Excel getRow={tableRowData} />
          </div>
        </TCSubContainer>
        {/* 선택항목 중량 */}
        <TCSubContainer style={{ justifyContent: 'flex-start' }}>
          선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeight.toLocaleString()} (kg)
        </TCSubContainer>
        {/* 테이블 */}
        <Table
          getCol={isSingleCategory ? userCartListSingleFieldsCols : userCartListPackageFieldCols}
          getRow={tableRowData}
        />
        {/* 페이지네이션 */}
        <CustomPagination
          pagination={paginationData}
          onPageChange={(p) => {
            handleParamsChange({ page: p })
          }}
        />
        {/* 테이블 액션 */}
        <TCSubContainer style={{ width: '100%', justifyContent: 'flex-end' }}>
          <SkyBtn disabled={isOrderLoading} onClick={handleSelectOrder}>
            선택 제품 주문
          </SkyBtn>
        </TCSubContainer>
      </TableContianer>
      {/* 팝업 */}
      {popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
    </FilterContianer>
  )
}

export default Cart
