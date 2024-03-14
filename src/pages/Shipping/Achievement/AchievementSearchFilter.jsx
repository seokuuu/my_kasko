import React from 'react'
import { MainSelect } from '../../../common/Option/Main'
import { CustomerSearch, DateSearchSelect, DestinationSearch } from '../../../components/Search'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	MiniInput,
	PartWrap,
	PWRight,
	RowWrap,
	SearchContainer,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'

const AchievementSearchFilter = ({ search, setSearch, commonNumInputHandler }) => {
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
					<CustomerSearch search={search} setSearch={setSearch} />

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
				<RowWrap none>
					{/* 두깨 */}
					<PartWrap first>
						<h6>두께(MM)</h6>
						<ExInputsWrap>
							<MiniInput
								type="number"
								name="minThickness"
								value={search.minThickness}
								onChange={commonNumInputHandler}
								min={0}
							/>
							<Tilde>~</Tilde>
							<MiniInput
								type="number"
								name="maxThickness"
								value={search.maxThickness}
								onChange={commonNumInputHandler}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
					{/* 폭 */}
					<PartWrap>
						<h6>폭(MM)</h6>
						<ExInputsWrap>
							<MiniInput
								type="number"
								name="minWidth"
								value={search.minWidth}
								onChange={commonNumInputHandler}
								min={0}
							/>
							<Tilde>~</Tilde>
							<MiniInput
								type="number"
								name="maxWidth"
								value={search.maxWidth}
								onChange={commonNumInputHandler}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
					{/* 길이 */}
					<PartWrap>
						<h6>길이(MM)</h6>
						<ExInputsWrap>
							<MiniInput
								type="number"
								name="minLength"
								value={search.minLength}
								onChange={commonNumInputHandler}
								min={0}
							/>
							<Tilde>~</Tilde>
							<MiniInput
								type="number"
								name="maxLength"
								value={search.maxLength}
								onChange={commonNumInputHandler}
								min={0}
							/>
						</ExInputsWrap>
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
export default AchievementSearchFilter
