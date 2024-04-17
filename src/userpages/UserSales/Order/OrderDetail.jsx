import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { styled } from 'styled-components'
import { USER_URL, useUserDestinationUpdateRequestMutation, useUserOrderDetailsQuery } from '../../../api/user'
import { BlackBtn, BtnBound, NewBottomBtnWrap, TGreyBtn, WhiteBlackBtn } from '../../../common/Button/Button'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { userOrderDetailsField, userOrderDetailsFieldsCols } from '../../../constants/user/orderTable'
import useTableData from '../../../hooks/useTableData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
import {
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import DestinationChange from '../../../modal/Multi/DestinationChange'
import TableV2 from '../../../pages/Table/TableV2'
import TableV2ExcelDownloader from '../../../pages/Table/TableV2ExcelDownloader'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import useAlert from '../../../store/Alert/useAlert'
import PrintDepositRequestButton from '../_components/PrintDepositRequestButton'
import { PackageViewerDispatchContext } from '../_layouts/UserSalesWrapper'
import { numberDeleteComma } from '../../../utils/utils'
import { useNavigate } from 'react-router-dom'

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
const INFO_COLUMNS = ['주문 번호', '고객사', '고객코드', '총 수량', '총 중량(KG)', '입금 요청 금액(원)']

/**
 * @constant 제품번호 한글 키
 */
const UID_KEY = '고유 번호'

/**
 * 주분 정보 테이블 로우 반환 함수
 * @param {*} data 주문상세목록 데이터
 * @return {array<string>}
 */
const getInfoRows = (data, salesNumber) => {
	const initialData = [salesNumber, '-', '-', 0, 0, 0]
	if (data) {
		initialData[1] = data[0]?.customerName || '-' // 고객사
		initialData[2] = data[0]?.customerCode || '-' // 고객코드
		data.forEach((v) => {
			initialData[3] += Number(numberDeleteComma(v?.quantity || 1)) || 0 // 총 수량
			initialData[4] += Number(numberDeleteComma(v?.totalWeight || v?.weight)) || 0 // 총 중량
			initialData[5] += Number(numberDeleteComma(v?.totalPrice)) || 0 // 입금 요청 금액
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
const OrderDetail = ({ salesNumber, status, packageNumber }) => {
	const navigate = useNavigate()
	// API 파라미터
	const { searchParams, handleParamsChange, handlePageSizeChange } = useTableSearchParams({
		...initialSearchParams,
		auctionNumber: salesNumber,
		saleStatus: status,
		packageNumber: packageNumber === null ? null : packageNumber,
	})
	// API
	const { data: orderData, isError, isLoading } = useUserOrderDetailsQuery(searchParams)
	const [serverData, setServerData] = useState({ list: [], pagination: {} })

	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: userOrderDetailsField,
		serverData: serverData,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})
	// 인포테이블 데이터
	const infoData = useMemo(() => getInfoRows(orderData?.list || [], salesNumber), [orderData, salesNumber])
	// 선택항목 데이터
	const { selectedData, selectedWeightStr, selectedCountStr, hasSelected } = useTableSelection({ weightKey: '중량' })
	// 목적지 데이터 || 목적지 변경 항목 데이터
	const [destination, setDestination] = useState(null) // { code: '', name: '', tel: '' }
	const [destinationUpdateItems, setDestinationUpdateItems] = useState([])
	// 목적지 변경 API
	const { mutate: requestDestinationUpdate, isLoaidng: isRequstLoading } = useUserDestinationUpdateRequestMutation()

	// ALERT
	const { simpleAlert } = useAlert()
	// 패키지 상세보기
	const { setPackageReadOnlyViewer } = useContext(PackageViewerDispatchContext)

	/**
	 * 목적지 적용 핸들러
	 * @description 서버 요청 하지 않으며, 테이블에 노출되는 데이터에만 적용합니다.
	 */
	function handleDestinationApply() {
		if (!destination) {
			return simpleAlert('목적지를 검색해 주세요.')
		}
		if (!hasSelected) {
			return simpleAlert('목적지를 적용할 상품을 선택해 주세요.')
		}

		setDestinationUpdateItems(selectedData.map((v) => ({ ...v, destination: destination })))
	}

	/**
	 * 목적지 승인 요청 핸들러
	 * @description 서버에 승인을 요청합니다.
	 */
	function handleDestinationApprovalRequest() {
		if (!destination) {
			return simpleAlert('적용할 목적지를 선택해 주세요.')
		}

		if (destinationUpdateItems.length < 1) {
			return simpleAlert('변경할 목적지를 적용한 상품이 없습니다.')
		}

		const selectedUids = selectedData.map((v) => v[UID_KEY])
		const selectedUpdateList = destinationUpdateItems
			.filter((v) => selectedUids.includes(v[UID_KEY]))
			.map((v) => ({
				uid: v[UID_KEY],
				requestCustomerDestinationUid: destination.uid,
			}))

		if (selectedUpdateList.length < 1) {
			return simpleAlert('목적지 승인 요청할 상품을 선택해 주세요.')
		}

		requestDestinationUpdate({ updateList: selectedUpdateList })
		setDestinationUpdateItems([])
		setDestination(null)
	}

	// 목적지 변경항목 반영 테이블 데이터
	useEffect(() => {
		if (destinationUpdateItems.length > 0) {
			const destinationItemUids = destinationUpdateItems.map((v) => v[UID_KEY])
			const newRowData = serverData?.list?.map((item) => {
				if (destinationItemUids.includes(item.orderUid)) {
					item.requestDestinationName = destination.name
					item.requestDestinationCode = destination.code
					item.requestCustomerDestinationAddress = destination.address
					item.requestCustomerDestinationPhone = destination.phone
				}
				return item
			})
			setServerData({
				list: newRowData,
				pagination: serverData.pagination,
			})
		}
	}, [destinationUpdateItems])

	useEffect(() => {
		if (orderData) {
			setServerData({ list: orderData.list, pagination: orderData.pagination })
		}

		if (isError) {
			simpleAlert('요청중 오류가 발생했습니다.\n다시 시도해 주세요.')
		}
	}, [orderData, isError])

	return (
		<FilterContianer>
			<div>
				{/* 경매 번호 */}
				<FilterHeader>
					<h1>주문 확인 상세</h1>
				</FilterHeader>
				<FilterTCTop>
					<h6>상시판매 번호</h6>
					<p>{salesNumber}</p>
				</FilterTCTop>
				{/* 경매 정보 */}
				<TableWrap>
					<ClaimTable>
						{[0, 1].map((index) => (
							<ClaimRow key={index}>
								{INFO_COLUMNS.slice(index * 3, index * 3 + 3).map((title, idx) => (
									<Fragment key={title}>
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
					<div style={{ flex: 1 }}>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handlePageSizeChange} />
						<TableV2ExcelDownloader
							requestUrl={USER_URL.orderDetail}
							requestParam={{ auctionNumber: salesNumber }}
							requestCount={totalCount}
							field={userOrderDetailsField}
							sheetName={`주문확인상세(${salesNumber})`}
						/>
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
							onSubmit={(d) => {
								setDestination(d)
							}}
						/>
						<TGreyBtn onClick={handleDestinationApply}>적용</TGreyBtn>
						<BtnBound />
						<WhiteBlackBtn disabled={isRequstLoading} onClick={handleDestinationApprovalRequest}>
							목적지 승인 요청
						</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				{/* 테이블 */}
				<TableV2
					getRow={tableRowData}
					getCol={userOrderDetailsFieldsCols(setPackageReadOnlyViewer)}
					loading={isLoading}
					paginationData={paginationData}
					onPageChange={(p) => {
						handleParamsChange({ page: p })
					}}
				/>
				<TCSubContainer>
					<div></div>
					{/* 입금 확인 요청서 */}
					<div style={{ display: 'flex', gap: '8px' }}>
						<PrintDepositRequestButton
							auctionNumber={salesNumber}
							salesDeposit
							saleStatus={serverData?.list && serverData?.list[0]?.saleStatus}
							packageNumber={packageNumber}
						/>
					</div>
				</TCSubContainer>
				<NewBottomBtnWrap>
					<BlackBtn
						width={13}
						height={40}
						onClick={() => {
							navigate(-1)
						}}
					>
						돌아가기
					</BlackBtn>
				</NewBottomBtnWrap>
			</TableContianer>
		</FilterContianer>
	)
}

export default OrderDetail

export const P = styled.p`
	position: relative;
	top: 5px;
`
