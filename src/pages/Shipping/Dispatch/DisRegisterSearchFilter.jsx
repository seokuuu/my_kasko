import {
	FilterLeft,
	FilterRight,
	PartWrap,
	PWRight,
	RowWrap,
	SearchContainer,
} from '../../../modal/External/ExternalFilter'
import { CustomerSearch, DateSearchSelect, DestinationSearch, RadioSearchButton } from '../../../components/Search'
import React from 'react'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'

const DisRegisterSearchFilter = ({ search, setSearch }) => {
	const { storageList, spartList } = useGlobalProductSearchFieldData()
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<SearchContainer>
			<FilterLeft>
				<RowWrap none>
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
					<CustomerSearch
						name={search.customerName}
						code={search.customerCode}
						setName={(value) => onChange('customerName', value)}
						setCode={(value) => onChange('customerCode', value)}
					/>
				</RowWrap>
				<RowWrap>
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
				</RowWrap>
				<RowWrap>
					<DateSearchSelect
						title={'출고 요청 일자'}
						startInitDate={search.shipmentRequestStartDate}
						endInitDate={search.shipmentRequestEndDate}
						startDateChange={(value) => onChange('shipmentRequestStartDate', value)}
						endDateChange={(value) => onChange('shipmentRequestEndDate', value)}
					/>
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
				<RowWrap none>
					<PartWrap first>
						<h6>배차 여부</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '' },
								{ label: 'Y', value: true },
								{ label: 'N', value: false },
							]}
							value={search.driverStatus}
							onChange={(value) => onChange('driverStatus', value)}
						/>
					</PartWrap>
					<PartWrap>
						<h6>상차도 여부</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '' },
								{ label: 'Y', value: true },
								{ label: 'N', value: false },
							]}
							value={search.dockStatus}
							onChange={(value) => onChange('dockStatus', value)}
						/>
					</PartWrap>
					<PartWrap>
						<h6>합짐 여부</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: '' },
								{ label: 'Y', value: true },
								{ label: 'N', value: false },
							]}
							value={search.mergeStatus}
							onChange={(value) => onChange('mergeStatus', value)}
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
		</SearchContainer>
	)
}

export default DisRegisterSearchFilter
