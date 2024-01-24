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
import { DateSearchSelect, DestinationSearch, RadioSearchButton } from '../../../components/Search'
import { MainSelect } from '../../../common/Option/Main'

const TransportSearchFilter = ({
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

	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}

	const [param, setParam] = useState(init)

	return (
		<>
			<FilterLeft>
				<RowWrap style={{ gap: '20px' }}>
					<PartWrap>
						{/* !!! 수정 */}
						<h6>출발지</h6>
						<MainSelect
							options={supplierList}
							defaultValue={supplierList[0]}
							value={search.supplier}
							name="supplier"
							onChange={(e) => commonDropdownButtonHandler(e, 'supplier')}
						/>
					</PartWrap>
					<DestinationSearch
						short={true}
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
					<PartWrap>
						<DateSearchSelect
							title={'경매 일자'}
							startInitDate={search.auctionStartDate}
							endInitDate={search.auctionEndDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
						/>
					</PartWrap>
					{/* !!! 수정 */}
					<PartWrap>
						<h6>제품구분</h6>
						<MainSelect
							options={supplierList}
							defaultValue={supplierList[0]}
							value={search.supplier}
							name="supplier"
							onChange={(e) => commonDropdownButtonHandler(e, 'supplier')}
						/>
					</PartWrap>
				</RowWrap>
			</FilterLeft>
			<FilterRight></FilterRight>
		</>
	)
}

export default TransportSearchFilter
