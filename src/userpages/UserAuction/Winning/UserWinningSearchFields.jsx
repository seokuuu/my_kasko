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
import { CustomerSearch, DateSearchSelect, RadioSearchButton } from '../../../components/Search'
import { MainSelect } from '../../../common/Option/Main'

const UserWinningSearchFields = ({
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
					<PartWrap first>
						<h6>창고 구분 </h6>
						<PWRight>
							<MainSelect
								options={storageList}
								// defaultValue={storageList[0]}
								value={search.storage}
								name="storage"
								onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
							/>
						</PWRight>
					</PartWrap>
					{/* 규격약호 */}
				</RowWrap>
				<RowWrap>
					<CustomerSearch search={search} setSearch={setSearch} />
					{/* driverStatus 수정하기 !! */}
					<PartWrap first>
						<h6>진행 상태</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '' },
								{ label: '낙찰', value: false },
								{ label: '낙찰 취소', value: false },
								{ label: '낙찰 확정', value: false },
							]}
							value={search.driverStatus}
							onChange={(value) => onChange('driverStatus', value)}
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

export default UserWinningSearchFields
