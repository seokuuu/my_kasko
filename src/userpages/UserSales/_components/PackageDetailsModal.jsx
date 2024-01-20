import React, { Fragment, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useUserPackageProductDetailsListQuery } from '../../../api/user'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	PROD_CATEGORY,
	getUserPackageDetailsFieldsCols,
	userPackageDetailsField,
} from '../../../constants/user/product'
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
	FilterHeader,
	FilterTCTop,
	FilterTopContainer,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import { toggleAtom } from '../../../store/Layout/Layout'
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
	const { data: packageData, isError, isLoading } = useUserPackageProductDetailsListQuery(searchParams) // 상시판매 패키지 목록 조회 쿼리
	// 테이블 데이터, 페이지 데이터, 총 중량
	const { tableRowData, paginationData, totalWeightStr, totalCountStr } = useTableData({
		tableField: userPackageDetailsField,
		serverData: packageData,
		wish: { display: true, key: ['packageNumber'] },
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
	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr, hasSelected } = useTableSelection({
		weightKey: '총 중량',
	})

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
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '98vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>패키지 상세 보기</div>
					<div>
						<WhiteCloseBtn onClick={onClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 30px' }}>
					<FilterContianer>
						<FilterHeader>
							<div style={{ display: 'flex' }}></div>
							{/* 토글 쓰기 */}
							<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
						</FilterHeader>
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
								getCol={getUserPackageDetailsFieldsCols}
								isLoading={isLoading}
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
										products={selectedData}
										buttonType={CART_BUTTON_TYPE.simple}
									/>
									<AddOrderButton
										category={PROD_CATEGORY.package}
										totalWeight={selectedWeight}
										products={selectedData}
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
