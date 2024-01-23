import { useContext, useMemo } from 'react'
import { useUserCartListQuery } from '../../../api/user'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
  userCartListPackageField,
  userCartListPackageFieldCols,
  userCartListSingleField,
  userCartListSingleFieldsCols,
} from '../../../constants/user/cartTable'
import { PROD_CATEGORY } from '../../../constants/user/constantKey'
import useTableData from '../../../hooks/useTableData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
import {
  FilterContianer,
  FilterHeader,
  SubTitle,
  TCSubContainer,
  TableContianer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import AddOrderButton from '../_components/AddOrderButton'
import { PackageViewerDispatchContext } from '../_layouts/UserSalesWrapper'

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
  category: PROD_CATEGORY.single,
  pageNum: 1,
  pageSize: 50,
}

/**
 * (사용자)사용자 장바구니 페이지
 */
const Cart = ({}) => {
  // API 파라미터
  const { searchParams, handleParamsChange, handlePageSizeChange } = useTableSearchParams(initialSearchParams)
  // API
  const { data: cartData, isLoading, isError } = useUserCartListQuery(searchParams) // 카트 목록 조회 쿼리
  // 카테고리 (단일| 패키지)
  const isSingleCategory = useMemo(() => searchParams.category === PROD_CATEGORY.single, [searchParams])
  // 테이블 데이터, 페이지 데이터, 총 중량
  const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
    tableField: isSingleCategory ? userCartListSingleField : userCartListPackageField,
    serverData: cartData,
    wish: { display: true, key: ['number', 'packageNumber']}
  })
  // 선택 항목
  const { selectedData, selectedWeight, selectedWeightStr, selectedCountStr, selectedCount } = useTableSelection({
    weightKey: isSingleCategory ? '중량' : '패키지 상품 총 중량',
  });
  // 패키지 상세보기
  const { setPackageReadOnlyViewer } = useContext(PackageViewerDispatchContext);

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
                { text: '단일', value: PROD_CATEGORY.single },
                { text: '패키지', value: PROD_CATEGORY.package },
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
          getCol={isSingleCategory ? userCartListSingleFieldsCols : userCartListPackageFieldCols(setPackageReadOnlyViewer)}
          getRow={tableRowData}
          tablePagination={paginationData}
          onPageChange={(p) => {
            handleParamsChange({ page: p })
          }}
        />
        {/* 테이블 액션 */}
        <TCSubContainer style={{ width: '100%', justifyContent: 'flex-end' }}>
          <AddOrderButton category={searchParams.category} totalWeight={selectedWeight} products={selectedData} />
        </TCSubContainer>
      </TableContianer>
    </FilterContianer>
  )
}

export default Cart
