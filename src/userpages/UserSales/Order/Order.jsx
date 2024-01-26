import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_URL, useUserOrderCancelMutaion, useUserOrderListQuery } from '../../../api/user'
import { WhiteRedBtn } from '../../../common/Button/Button'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { userOrderListField, userOrderListFieldsCols } from '../../../constants/user/orderTable'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TCSubContainer,
	TableContianer
} from '../../../modal/External/ExternalFilter'
import TableV2 from '../../../pages/Table/TableV2'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import useAlert from '../../../store/Alert/useAlert'
import { toggleAtom } from '../../../store/Layout/Layout'
import { getValidParams } from '../../../utils/parameters'
import { PackageViewerDispatchContext } from '../_layouts/UserSalesWrapper'
import OrderSearchFields from './OrderSearchFields'
import TableV2ExcelDownloader from '../../../pages/Table/TableV2ExcelDownloader'

/**
 * @constant 기본 페이지 검색 값
 */
const initialPageParams = {
	pageNum: 1, // 페이지 번호
	pageSize: 50, // 페이지 갯수
}

/**
 * @constant 주문 고유번호 키
 */
const UID_KEY = '주문 고유 번호'

/**
 * (사용자)상시판매 주문확인 목록
 * @todo
 * - 필터 초기화시 주문일자 변경되지 않음
 */
const Order = ({}) => {
	const [searchParams, setSearchParams] = useState({ ...initialPageParams })
	const [pageParams, setPageParams] = useState({ ...initialPageParams })
	const { data: orderData, isLoading } = useUserOrderListQuery(searchParams) // 주문확인 목록 조회 쿼리
	const { mutate: requestCancel, loading: isCancelLoading } = useUserOrderCancelMutaion() // 주문취소 뮤테이션
	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: userOrderListField,
		serverData: orderData,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true }
	})
	// 선택 항목
	const { selectedData, selectedWeightStr, selectedCountStr, hasSelected } = useTableSelection({ weightKey: '총 중량' })
	// 패키지 상세보기
	const { setPackageReadOnlyViewer } = useContext(PackageViewerDispatchContext)
	// NAVIGATION
	const navigate = useNavigate()
	// ALERT
	const { simpleAlert } = useAlert()

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
	 * 선택 항목 주문 취소 핸들러
	 */
	function handleOrderCancel(e) {
		e.preventDefault()

		if (!hasSelected) {
			return simpleAlert('주문 취소할 제품을 선택해 주세요.')
		}

		const cancelData = selectedData.map((v) => ({ uid: v[UID_KEY], saleType: '상시 판매 대상재' }))

		requestCancel({ requestList: cancelData })
	}

	/**
	 * 테이블 열 클릭 핸들러
	 */
	function handleTableRowClick(row) {
		const uid = row?.data['상시판매 번호']
		const packageNumClick = false;
		console.log(row.event.target, 'row');
		if (uid) {
			navigate(`/userpage/salesorder/${uid}`)
		}
	}

	/**
	 * UI COMMONT PROPERTIES
	 * @description 페이지 내 공통 UI 처리 함수입니다.
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
					<h1>주문 확인</h1>
				</div>
				{/* 검색필터 ON|OFF */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{/* 공지사항 */}
			<CautionBox category={CAUTION_CATEGORY.singleProduct} />
			{/* 검색 필터 */}
			{exFilterToggle && (
				<FilterWrap>
					<GlobalProductSearch
						param={searchParams}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <OrderSearchFields {...props} />}
						globalProductSearchOnClick={handleFilterSearch}
						globalProductResetOnClick={handleFilterReset}
					/>
				</FilterWrap>
			)}
			{/* 테이블 */}
			<TableContianer>
				{/* 선택항목 정보 | 조회갯수 | 엑셀다운로드 */}
				<TCSubContainer bor>
					<div style={{flex: 1}}>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handlePageSizeChange} />
						<TableV2ExcelDownloader
							requestUrl={USER_URL.orderList} 
							requestCount={totalCount}
							field={userOrderListField} 
						/>
					</div>
				</TCSubContainer>
				{/* 선택항목 중량 | 주문 취소 */}
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={handleOrderCancel} disabled={isCancelLoading}>
							주문 취소
						</WhiteRedBtn>
					</div>
				</TCSubContainer>
				{/* 테이블 */}
				<TableV2
					getRow={tableRowData}
					getCol={userOrderListFieldsCols(setPackageReadOnlyViewer)}
					loading={isLoading}
					isRowClickable
					handleOnRowClicked={handleTableRowClick}
					tablePagination={paginationData}
					onPageChange={(p) => {
						handlePageNumChange(p)
					}}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default Order
