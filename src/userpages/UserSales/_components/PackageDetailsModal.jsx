import React, { Fragment, useMemo } from 'react'
import styled from 'styled-components'
import { useUserPackageProductDetailsListQuery } from '../../../api/user'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { PROD_CATEGORY, PROD_COL_NAME } from '../../../constants/user/constantKey'
import {
	userPackageDetailsField,
	userPackageDetailsFieldsCols,
} from '../../../constants/user/productTable'
import useTableData from '../../../hooks/useTableData'
import useTableSearchParams from '../../../hooks/useTableSearchParams'
import useTableSelection from '../../../hooks/useTableSelection'
import {
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import {
	FilterContianer,
	FilterTCTop,
	FilterTopContainer,
	TCSubContainer,
	TableContianer
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import AddCartButton, { CART_BUTTON_TYPE } from './AddCartButton'
import AddOrderButton, { ORDER_BUTTON_TYPE } from './AddOrderButton'

/**
 * @constant 기본 검색 값
 */
const initialSearchParams = {
	pageNum: 1, // 페이지 번호
	pageSize: 50, // 페이지 갯수
}

const TITLE_DATA = ['패키지 명', '수량', '시작가']

// 패키지 상세보기 (경매)
const PackageDetailsModal = ({ packageNumber, action, onClose }) => {
	// API 파라미터
	const { searchParams, handleParamsChange, handlePageSizeChange } = useTableSearchParams({
		...initialSearchParams,
		packageNumber: packageNumber,
	})
	// API
	const { data: packageData, isLoading } = useUserPackageProductDetailsListQuery(searchParams) // 상시판매 패키지 목록 조회 쿼리
	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalWeight } = useTableData({
		tableField: userPackageDetailsField,
		serverData: packageData,
		wish: { display: true, key: ['packageNumber'] },
	})
	// 장바구니, 주문하기 데이터
	const cartOrderDatas = useMemo(() => {
		if (tableRowData.length < 1) {
			return [];
		}
		const targetData = tableRowData[0];
		console.log(targetData);
		return [{
			[PROD_COL_NAME.packageUid]: targetData[PROD_COL_NAME.packageUid],
			[PROD_COL_NAME.packageNumber]: packageNumber,
			[PROD_COL_NAME.salePrice]: targetData[PROD_COL_NAME.salePrice],
		}];
	})
	// 요약정보 데이터
	const infoData = useMemo(() => {
		if (tableRowData.length < 1) {
			return ['-', '-', '-']
		}
		const targetData = tableRowData[0]
		return [targetData['패키지 명'], totalCountStr, targetData['상시판매 시작가']]
	}, [tableRowData, totalCountStr])
	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '총 중량',
	})

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', maxHeight: '98vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>패키지 상세 보기</div>
					<div>
						<WhiteCloseBtn onClick={onClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '20px 30px' }}>
					<FilterContianer>
						<FilterTopContainer>
							<FilterTCTop>
								<h6>패키지 번호</h6>
								<p>{packageNumber}</p>
							</FilterTCTop>
						</FilterTopContainer>
						<ClaimTable style={{ marginBottom: '30px' }}>
							{[0].map((index) => (
								<ClaimRow key={index}>
									{TITLE_DATA.slice(index * 3, index * 3 + 3).map((title, idx) => (
										<Fragment agmentkey={title}>
											<ClaimTitle>{title}</ClaimTitle>
											<ClaimContent>{infoData[index * 3 + idx]}</ClaimContent>
										</Fragment>
									))}
								</ClaimRow>
							))}
						</ClaimTable>
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
							{/* 선택항목 중량 | 관심상품 등록 */}
							<TCSubContainer bor>
								<div>
									선택중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
								</div>
							</TCSubContainer>
							{/* 테이블 */}
							<Table
								getRow={tableRowData}
								getCol={userPackageDetailsFieldsCols}
								loading={isLoading}
								tablePagination={paginationData}
								onPageChange={(p) => {
									handleParamsChange({ page: p })
								}}
							/>
							{/* 패키지 상세 액션 */}
							{action && (
								<Bottom style={{ display: 'flex', marginTop: 30 }}>
									<AddCartButton
										category={PROD_CATEGORY.package}
										products={cartOrderDatas}
										buttonType={CART_BUTTON_TYPE.simple}
									/>
									<AddOrderButton
										category={PROD_CATEGORY.package}
										totalWeight={totalWeight}
										products={cartOrderDatas}
										buttonType={ORDER_BUTTON_TYPE.simple}
									/>
								</Bottom>
							)}
						</TableContianer>
					</FilterContianer>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default PackageDetailsModal

const Bottom = styled.div`
	padding-top: 20px;
	justify-content: center;
	align-items: center;
	gap: 8px;
`
