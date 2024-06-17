import React from 'react'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { CustomerSearch, DateSearchSelect, DestinationSearch, RadioSearchButton } from '../../../components/Search'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	FilterLeft,
	FilterRight,
	PWRight,
	PartWrap,
	RowWrap,
	SearchContainer,
} from '../../../modal/External/ExternalFilter'
import { useAtomValue } from 'jotai/index'
import { authAtom } from '../../../store/Auth/auth'

const DisRegisterSearchFilter = ({ search, setSearch }) => {
	const { storageList, spartList } = useGlobalProductSearchFieldData()
	const auth = useAtomValue(authAtom)
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<SearchContainer>
			<FilterLeft>
				<RowWrap none>
					{auth.role === '카스코철강' && (
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
					)}
					<CustomerSearch search={search} setSearch={setSearch} />
				</RowWrap>
				<RowWrap>
					<DestinationSearch
						name={search.destinationName}
						code={search.destinationCode}
						setName={(value) => onChange('destinationName', value)}
						setCode={(value) => onChange('destinationCode', value)}
					/>
					<DestinationSearch
						name={search.destinationName2}
						code={search.destinationCode2}
						setName={(value) => onChange('destinationName2', value)}
						setCode={(value) => onChange('destinationCode2', value)}
					/>
				</RowWrap>
				<RowWrap>
					<DestinationSearch
						name={search.destinationName3}
						code={search.destinationCode3}
						setName={(value) => onChange('destinationName3', value)}
						setCode={(value) => onChange('destinationCode3', value)}
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
					{/*<PartWrap first>*/}
					{/*	<h6>배차 여부</h6>*/}
					{/*	<RadioSearchButton*/}
					{/*		options={[*/}
					{/*			{ label: '전체', value: '' },*/}
					{/*			{ label: 'Y', value: 1 },*/}
					{/*			{ label: 'N', value: 0 },*/}
					{/*		]}*/}
					{/*		value={search.driverStatus}*/}
					{/*		onChange={(value) => onChange('driverStatus', value)}*/}
					{/*	/>*/}
					{/*</PartWrap>*/}
					<PartWrap first>
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
