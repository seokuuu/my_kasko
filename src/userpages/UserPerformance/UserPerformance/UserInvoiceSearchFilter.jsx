import React from 'react'
import { CustomerSearch, DateSearchSelect } from '../../../components/Search'
import { FilterLeft, RowWrap, SearchContainer } from '../../../modal/External/ExternalFilter'

const UserInvoiceSearchFilter = ({ search, setSearch }) => {
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<SearchContainer>
			<FilterLeft>
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
export default UserInvoiceSearchFilter
