import { useContext, useEffect, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useUserCartListQuery } from '../../../api/user'
import Excel from '../../../components/TableInner/Excel'
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
import TableV2 from '../../../pages/Table/TableV2'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import AddOrderButton from '../_components/AddOrderButton'
import { PackageViewerDispatchContext } from '../_layouts/UserSalesWrapper'

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
  pageNum: 1,
  pageSize: 50,
}

/**
 * @constant 사용자 카트 URL
 */
const USER_CART_URL = '/userpage/salescart';

/**
 * (사용자)사용자 장바구니 페이지
 */
const Cart = ({}) => {
  // PATH 파라미터
  const { product: productType } = useParams();
  // API 파라미터
  const initialParams = useMemo(() => ({...initialSearchParams, category: productType || PROD_CATEGORY.single }), [productType]);
  const { searchParams, handleParamsChange, handlePageSizeChange } = useTableSearchParams(initialParams)
  // API
  const { data: cartData, isLoading, isError } = useUserCartListQuery(searchParams) // 카트 목록 조회 쿼리
  // 카테고리 (단일| 패키지)
  const isSingleCategory = useMemo(() => searchParams.category === PROD_CATEGORY.single, [searchParams])
  // 테이블 데이터, 페이지 데이터, 총 중량
  const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
    tableField: isSingleCategory ? userCartListSingleField : userCartListPackageField,
    serverData: cartData,
    wish: { display: true, key: ['number', 'packageNumber']},
    best: { display: true }
  })
  // 선택 항목
  const { selectedData, selectedWeight, selectedWeightStr, selectedCountStr, selectedCount } = useTableSelection({
    weightKey: isSingleCategory ? '중량' : '패키지 상품 총 중량',
  });
  // 패키지 상세보기
  const { setPackageReadOnlyViewer } = useContext(PackageViewerDispatchContext);
  // navigate
  const navigate =useNavigate();

  useEffect(() => {
    if(!productType || !Object.values(PROD_CATEGORY).includes(productType)) {
      navigate(`${USER_CART_URL}/${PROD_CATEGORY.single}`);
    } else {
      handleParamsChange({...initialParams, category: productType })
    }
  }, [productType])

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
                <Link
                  role="button"
                  style={{ cursor: 'pointer' }}
                  to={`${USER_CART_URL}/${v.value}`}
                >
                  {v.value === searchParams.category ? <h5>{v.text}</h5> : <h6>{v.text}</h6>}
                </Link>
              ))}
            </SubTitle>
          </div>
        </FilterHeader>
      </div>
      <TableContianer>
        {/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
        <TCSubContainer bor>
          <div style={{flex: 1}}>
            조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount.toLocaleString()}개 )
            <TableV2HiddenSection />
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
        <TableV2
          getCol={isSingleCategory ? userCartListSingleFieldsCols : userCartListPackageFieldCols(setPackageReadOnlyViewer)}
          getRow={tableRowData}
          tablePagination={paginationData}
          loading={isLoading}
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
