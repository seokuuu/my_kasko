import { useContext, useState } from 'react'
import { USER_URL, useUserPackageProductListQuery } from '../../../api/user'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { PROD_CATEGORY, PROD_COL_NAME } from '../../../constants/user/constantKey'
import { getUserPackageProductFieldsCols, userPackageProductField } from '../../../constants/user/productTable'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import TableV2 from '../../../pages/Table/TableV2'
import Table from '../../../pages/Table/Table'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import { toggleAtom } from '../../../store/Layout/Layout'
import { getValidParams } from '../../../utils/parameters'
import AddCartButton from '../_components/AddCartButton'
import AddOrderButton from '../_components/AddOrderButton'
import AddWishButton from '../_components/AddWishButton'
import { PackageViewerDispatchContext } from '../_layouts/UserSalesWrapper'
import PackageSearchFields from './PackageSearchFields'
import TableV2ExcelDownloader from '../../../pages/Table/TableV2ExcelDownloader'

/**
 * @constant 기본 페이지 검색 값
 */
const initialPageParams = {
	pageNum: 1, // 페이지 번호
	pageSize: 50, // 페이지 갯수
	saleType: '상시판매 대상재',
}

/**
 * (사용자)상시판매 패키지
 */
const Package = ({}) => {
	const [searchParams, setSearchParams] = useState({ ...initialPageParams })
	const [pageParams, setPageParams] = useState({ ...initialPageParams })
	// API
	const { data: packageData, isLoading } = useUserPackageProductListQuery(searchParams) // 상시판매 패키지 목록 조회 쿼리
	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: userPackageProductField,
		serverData: packageData,
		wish: { display: true },
		best: { display: true },
	})
	// 선택 항목
	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량 합계',
	})
	// 패키지 상세보기
	const { setPackageActionViewer } = useContext(PackageViewerDispatchContext)
	/**
	 * 필터 검색 핸들러
	 */
	function handleFilterSearch(params) {
		const validParams = getValidParams(params)
		setSearchParams({ ...validParams, ...pageParams, pageNum: 1 })
	}

	/**
	 * 초기화 핸들러
	 */
	function handleFilterReset() {
		setSearchParams({ ...initialPageParams })
	}

	/**
	 * 페이지넘버 핸들러
	 */
	function handlePageNumChange(num) {
		const newPageParams = { ...pageParams, pageNum: num }
		setPageParams(newPageParams)
		setSearchParams((prev) => ({ ...prev, ...newPageParams }))
	}

	/**
	 * 페이지사이즈 핸들러
	 */
	function handlePageSizeChange(e) {
		const num = e.target.value
		const newPageParams = { pageSize: num, pageNum: 1 }
		setPageParams(newPageParams)
		setSearchParams((prev) => ({ ...prev, ...newPageParams }))
	}

	/**
	 * UI COMMONT PROPERTIES
	 * @description 페이지 내 공통 UI 처리 함수입니다.
	 * @todo 테이블 공통 컴포넌트로 전환
	 */
	/* ============================== COMMON start ============================== */
	// FILTER ON TOGGLE
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
	/* ============================== COMMON end ============================== */

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>패키지</h1>
				</div>
				{/* 검색필터 ON|OFF */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{/* 공지사항 */}
			<CautionBox category={CAUTION_CATEGORY.packageProduct} />
			{/* 검색 필터 */}
			{exFilterToggle && (
				<FilterWrap>
					<GlobalProductSearch
						param={searchParams}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <PackageSearchFields {...props} />}
						globalProductSearchOnClick={handleFilterSearch}
						globalProductResetOnClick={handleFilterReset}
					/>
				</FilterWrap>
			)}
			<TableContianer>
				{/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
				<TCSubContainer bor>
					<div style={{ flex: 1 }}>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handlePageSizeChange} />
						<TableV2ExcelDownloader
							requestUrl={USER_URL.packageProductList}
							requestCount={totalCount}
							field={userPackageProductField}
						/>
					</div>
				</TCSubContainer>
				{/* 선택항목 중량 | 관심상품 등록 */}
				<TCSubContainer bor>
					<div>
						선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<AddWishButton products={selectedData} productNumberKey={PROD_COL_NAME.packageNumber} />
				</TCSubContainer>
				{/* 테이블 */}
				<TableV2
					getRow={tableRowData}
					getCol={getUserPackageProductFieldsCols(setPackageActionViewer)}
					loading={isLoading}
					tablePagination={paginationData}
					onPageChange={(p) => {
						handlePageNumChange(p)
					}}
				/>
				{/* 테이블 액션 */}
				<TCSubContainer style={{ width: '100%', justifyContent: 'flex-end', gap: 8 }}>
					<AddCartButton category={PROD_CATEGORY.package} products={selectedData} />
					<AddOrderButton category={PROD_CATEGORY.package} totalWeight={selectedWeight} products={selectedData} />
				</TCSubContainer>
			</TableContianer>
		</FilterContianer>
	)
}

export default Package
