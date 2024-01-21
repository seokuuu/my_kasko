import {
	FilterLeft,
	FilterRight,
	PartWrap,
	PWRight,
	RowWrap,
	SearchContainer,
} from '../../../modal/External/ExternalFilter'
import { CustomerSearch, DateSearchSelect, DestinationSearch } from '../../../components/Search'
import React from 'react'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { MainSelect } from '../../../common/Option/Main'

const RequestAddModalSerarchFilter = ({ search, setSearch }) => {
	const { storageList } = useGlobalProductSearchFieldData()
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<SearchContainer>
			<FilterLeft>
				<RowWrap modal>
					<DateSearchSelect
						title={'출하 지시 일자'}
						startInitDate={search.shippingStartDate}
						endInitDate={search.shippingEndDate}
						startDateChange={(value) => onChange('shippingStartDate', value)}
						endDateChange={(value) => onChange('shippingEndDate', value)}
					/>
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
				</RowWrap>
				<RowWrap modal none>
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

export default RequestAddModalSerarchFilter
