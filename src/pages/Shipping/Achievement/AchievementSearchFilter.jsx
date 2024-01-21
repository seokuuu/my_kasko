import React from 'react'
import {
	FilterLeft,
	FilterRight,
	PartWrap,
	PWRight,
	RowWrap,
	SearchContainer,
} from '../../../modal/External/ExternalFilter'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	CustomerSearch,
	DateSearchSelect,
	DestinationSearch,
	ProductNumberListSearch,
} from '../../../components/Search'
import { MainSelect } from '../../../common/Option/Main'

const AchievementSearchFilter = ({ search, setSearch }) => {
	const { storageList, spartList } = useGlobalProductSearchFieldData()
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<SearchContainer>
			<FilterLeft>
				<RowWrap>
					<PartWrap first>
						<h6>창고 구분</h6>
						<PWRight>
							<MainSelect
								options={storageList}
								// defaultValue={storageList[0]}
								value={search.storage}
								name="storage"
								onChange={(e) => onChange('storage', e)}
							/>
						</PWRight>
					</PartWrap>
					<PartWrap>
						<h6>구분</h6>
						{/* 제품군 */}
						<MainSelect
							options={spartList}
							defaultValue={spartList[0]}
							value={search.spart}
							name="spart"
							onChange={(e) => onChange('spart', e)}
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<CustomerSearch
						name={search.customerName}
						code={search.customerCode}
						setName={(value) => onChange('customerName', value)}
						setCode={(value) => onChange('customerCode', value)}
					/>
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
				</RowWrap>
				<RowWrap>
					<DateSearchSelect
						title={'주문 일자'}
						startInitDate={search.orderStartDate}
						endInitDate={search.orderEndDate}
						startDateChange={(value) => onChange('orderStartDate', value)}
						endDateChange={(value) => onChange('orderEndDate', value)}
					/>
					<DateSearchSelect
						title={'출고 일자'}
						startInitDate={search.shipmentStartDate}
						endInitDate={search.shipmentEndDate}
						startDateChange={(value) => onChange('shipmentStartDate', value)}
						endDateChange={(value) => onChange('shipmentEndDate', value)}
					/>
				</RowWrap>
				<RowWrap>
					<DateSearchSelect
						title={'경매 일자'}
						startInitDate={search.auctionStartDate}
						endInitDate={search.auctionEndDate}
						startDateChange={(value) => onChange('auctionStartDate', value)}
						endDateChange={(value) => onChange('auctionEndDate', value)}
					/>
					<DateSearchSelect
						title={'상시 판매 일자'}
						startInitDate={search.orderStartDate}
						endInitDate={search.orderEndDate}
						startDateChange={(value) => onChange('orderStartDate', value)}
						endDateChange={(value) => onChange('orderEndDate', value)}
					/>
				</RowWrap>
			</FilterLeft>
			<FilterRight>
				<ProductNumberListSearch
					value={search.productNumberList}
					onChange={(e) => onChange('productNumberList', e.target.value)}
				/>
			</FilterRight>
		</SearchContainer>
	)
}
export default AchievementSearchFilter
