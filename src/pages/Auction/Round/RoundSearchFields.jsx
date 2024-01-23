import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	PWRight,
	PartWrap,
	RowWrap,
} from '../../../modal/External/ExternalFilter'

import { useState } from 'react'
import { CustomerSearch, DateSearchSelect, InputSearch, RadioSearchButton } from '../../../components/Search'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import DateGrid from '../../../components/DateGrid/DateGrid'

const RoundSearchFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	const {
		// prettier-ignore
		storageList,
		supplierList,
		spartList,
		makerList,
		stockStatusList,
		gradeList,
		preferThicknessList,
	} = useGlobalProductSearchFieldData()

	/**
	 * @description
	 * 경매 일자 auctionStartDate, auctionEndDate
	 * 경매 회차 번호 auctionEndDate
	 * 진행 상태 ?
	 * 제품 번호 auctionEndDate
	 */

	const init = {
		pageNum: 1,
		pageSize: 50,
	}

	const [param, setParam] = useState(init)

	return (
		<>
			<FilterLeft>
				<RowWrap>
					{/* 창고 구분 */}
					<PartWrap first>
						<DateSearchSelect
							title={'경매 일자'}
							startInitDate={search.auctionStartDate}
							endInitDate={search.auctionEndDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
						/>
					</PartWrap>
					<PartWrap>
						<h6>경매 회차 번호</h6>
						<ExInputsWrap>
							{/* minFailCount 변경해야 함. */}
							<Input name="minFailCount" value={search.minFailCount} onChange={commonNumInputHandler} />
						</ExInputsWrap>
					</PartWrap>
					{/* 규격약호 */}
				</RowWrap>
				<RowWrap>
					{/* 제목 수정하기 !! */}
					<RadioSearchButton
						title={'진행 상태 '}
						options={[
							{ label: '전체', value: '' },
							{ label: 'Y', value: true },
							{ label: 'N', value: false },
						]}
						value={param.dockStatus}
						onChange={(value) => commonDropdownButtonHandler('dockStatus', value)}
					/>
				</RowWrap>
			</FilterLeft>
			<FilterRight>
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

export default RoundSearchFields
