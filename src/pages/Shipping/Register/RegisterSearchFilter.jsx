import React from 'react'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { CustomerSearch, DateSearchSelect, DestinationSearch } from '../../../components/Search'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	FilterLeft,
	FilterRight,
	PWRight,
	PartWrap,
	RowWrap,
	SearchContainer,
} from '../../../modal/External/ExternalFilter'

const RegisterSearchFilter = ({ search, setSearch }) => {
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
					<CustomerSearch search={search} setSearch={setSearch} />
				</RowWrap>
				<RowWrap>
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
				</RowWrap>
				<RowWrap style={{ borderBottom: '0px' }}>
					<DateSearchSelect
						title={'주문 일자'}
						startInitDate={search.orderStartDate}
						endInitDate={search.orderEndDate}
						startDateChange={(value) => onChange('orderStartDate', value)}
						endDateChange={(value) => onChange('orderEndDate', value)}
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

export default RegisterSearchFilter
