import React from 'react'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
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
import { useAtomValue } from 'jotai/index'
import { authAtom } from '../../../store/Auth/auth'

const RequestSearchFilter = ({ search, setSearch, commonNumInputHandler }) => {
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
						title={'경매 일자'}
						startInitDate={search.auctionStartDate}
						endInitDate={search.auctionEndDate}
						startDateChange={(value) => onChange('auctionStartDate', value)}
						endDateChange={(value) => onChange('auctionEndDate', value)}
					/>
					<DateSearchSelect
						title={'출하 가능 확인 일자'}
						startInitDate={search.shippingStartDate}
						endInitDate={search.shippingEndDate}
						startDateChange={(value) => onChange('shippingStartDate', value)}
						endDateChange={(value) => onChange('shippingEndDate', value)}
					/>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
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

export default RequestSearchFilter
