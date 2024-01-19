import React from 'react'
import { MainSelect } from '../../../../../common/Option/Main'
import ProductNumber from '../../../../../components/ProductNumber/ProductNumber'
import DateSearchSelect from '../../../../../components/Search/DateSearchSelect'
import { FilterLeft, FilterRight, PartWrap, RowWrap } from '../../../../../modal/External/ExternalFilter'
import { claimSearchCategoryOptions } from '../../../constants'

/**
 * @description
 * 클레임 관리 검색 필터입니다.
 */
const ClaimSearchFields = ({
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	// 검색 필터 날짜 핸들러
	function dateHandler(date, name) {
		setSearch((p) => ({ ...p, [name]: date }))
	}
	return (
		<>
			<FilterLeft>
				<RowWrap first>
					<DateSearchSelect
						title={'작성일자'}
						startInitDate={search.startDate}
						endInitDate={search.endDate}
						startDateChange={(date) => dateHandler(date, 'startDate')}
						endDateChange={(date) => dateHandler(date, 'endDate')}
					/>

					<PartWrap style={{ marginLeft: '20px' }}>
						<h6>제품 상태</h6>
						<MainSelect
							options={claimSearchCategoryOptions}
							defaultValue={claimSearchCategoryOptions[0]}
							name="claimStatus"
							value={search.claimStatus}
							onChange={(e) => commonDropdownButtonHandler(e, 'claimStatus')}
						/>
					</PartWrap>
					<PartWrap />
				</RowWrap>
			</FilterLeft>
			<FilterRight>
				{/* 제품 번호 */}
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
			</FilterRight>
		</>
	)
}

export default ClaimSearchFields
