import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { FilterLeft, FilterRight, PWRight, PartWrap, RowWrap } from '../../../modal/External/ExternalFilter'

import { useState } from 'react'
import { CustomerSearch, DateSearchSelect, RadioSearchButton } from '../../../components/Search'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'

const WinningSearchFields = ({
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

	const init = {
		customerCode: '',
		customerName: '',
		destinationCode: '',
		destinationName: '',
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
						<h6>창고 구분</h6>
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
					<PartWrap>
						<CustomerSearch search={search} setSearch={setSearch} />
					</PartWrap>
				</RowWrap>
				{/* 2행 */}
				<RowWrap>
					{/* 구분 */}
					<PartWrap first>
						<h6>구분</h6>
						{/* 제품군 */}
						<PWRight>
							<MainSelect
								options={spartList}
								defaultValue={spartList[0]}
								value={search.spart}
								name="spart"
								onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
							/>
						</PWRight>
					</PartWrap>
					<PartWrap first>
						<h6>낙찰 상태</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: null },
								{ label: '낙찰', value: '낙찰' },
								{ label: '낙찰 취소', value: '낙찰 취소' },
								{ label: '낙찰 확정', value: '낙찰 확정' },
							]}
							value={search.biddingStatus}
							onChange={(value) => onChange('biddingStatus', value)}
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap style={{ borderBottom: '0px' }}>
					<DateSearchSelect
						title={'확정 전송 일자'}
						startInitDate={search.startSendDate}
						endInitDate={search.endSendDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'startSendDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'endSendDate')}
					/>
					<DateSearchSelect
						title={'경매일시'}
						startInitDate={search.auctionStartDate}
						endInitDate={search.auctionEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
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

export default WinningSearchFields
