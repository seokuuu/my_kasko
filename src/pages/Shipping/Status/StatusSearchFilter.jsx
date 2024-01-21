import { FilterLeft, PartWrap, PWRight, RowWrap, SearchContainer } from '../../../modal/External/ExternalFilter'
import { CustomerSearch, DateSearchSelect, DestinationSearch } from '../../../components/Search'
import React from 'react'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { MainSelect } from '../../../common/Option/Main'

const StatusSearchFilter = ({ search, setSearch }) => {
	const { storageList } = useGlobalProductSearchFieldData()
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
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
					<CustomerSearch
						name={search.customerName}
						code={search.customerCode}
						setName={(value) => onChange('customerName', value)}
						setCode={(value) => onChange('customerCode', value)}
					/>
				</RowWrap>

				<RowWrap none>
					<DateSearchSelect
						title={'출하 지시 일자'}
						startInitDate={search.shippingStartDate}
						endInitDate={search.shippingEndDate}
						startDateChange={(value) => onChange('shippingStartDate', value)}
						endDateChange={(value) => onChange('shippingEndDate', value)}
					/>

					<DateSearchSelect
						title={'출고 요청 일자'}
						startInitDate={search.shipmentRequestStartDate}
						endInitDate={search.shipmentRequestEndDate}
						startDateChange={(value) => onChange('shipmentRequestStartDate', value)}
						endDateChange={(value) => onChange('shipmentRequestEndDate', value)}
					/>
				</RowWrap>
				<RowWrap none>
					<DateSearchSelect
						title={'출고 일자'}
						startInitDate={search.shipmentStartDate}
						endInitDate={search.shipmentEndDate}
						startDateChange={(value) => onChange('shipmentStartDate', value)}
						endDateChange={(value) => onChange('shipmentEndDate', value)}
					/>
				</RowWrap>
			</FilterLeft>
		</SearchContainer>
	)
}

export default StatusSearchFilter
