import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { ExInputsWrap, FilterLeft, FilterRight, Input, PartWrap, RowWrap } from '../../../modal/External/ExternalFilter'

import { useState } from 'react'
import { DateSearchSelect, RadioSearchButton } from '../../../components/Search'
import ProductNumber from '../../../components/ProductNumber/ProductNumber'

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

	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
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
						{/* minFailCount 수정하기 !! */}
						<h6>경매 회차 번호</h6>
						<ExInputsWrap>
							{/* minFailCount 변경해야 함. */}
							<Input name="minFailCount" value={search.minFailCount} onChange={commonNumInputHandler} />
						</ExInputsWrap>
					</PartWrap>
					{/* 규격약호 */}
				</RowWrap>
				<RowWrap>
					{/* driverStatus 수정하기 !! */}
					<PartWrap first>
						<h6>진행 상태</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '' },
								{ label: '대기', value: '대기' },
								{ label: '진행중', value: '진행중' },
								{ label: '종료', value: '종료' },
							]}
							value={search.status}
							onChange={(value) => onChange('status', value)}
						/>
					</PartWrap>
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
