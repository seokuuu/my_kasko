import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	MiniInput,
	PartWrap,
	PWRight,
	RowWrap,
	SearchContainer,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import { CustomerSearch, DateSearchSelect } from '../../../components/Search'
import React from 'react'
import { GreyBtn } from '../../../common/Button/Button'
import { useAtomValue, useSetAtom } from 'jotai/index'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { MainSelect } from '../../../common/Option/Main'
import StandardFind from '../../../modal/Multi/StandardFind'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'

const UserPerformanceFilter = ({ search, setSearch, commonNumInputHandler, onSpecHandler }) => {
	const setIsKyuModal = useSetAtom(kyuModalAtom)
	const { storageList, spartList, gradeList } = useGlobalProductSearchFieldData()
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
	return (
		<SearchContainer>
			<FilterLeft>
				<RowWrap>
					<DateSearchSelect
						title={'경매 일자'}
						startInitDate={search.auctionStartDate}
						endInitDate={search.auctionEndDate}
						startDateChange={(value) => onChange('auctionStartDate', value)}
						endDateChange={(value) => onChange('auctionEndDate', value)}
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
					<PartWrap>
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
						<h6>규격 약호</h6>
						<Input readOnly={true} value={search.spec} />
						<GreyBtn
							style={{ width: '70px' }}
							height={35}
							margin={10}
							fontSize={17}
							onClick={() => setIsKyuModal(true)}
						>
							찾기
						</GreyBtn>
					</PartWrap>
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
						{/* 등급 */}
						<MainSelect
							options={gradeList}
							defaultValue={gradeList[0]}
							value={search.grade}
							name="grade"
							onChange={(e) => onChange('grade', e)}
						/>
					</PartWrap>
					<PartWrap>
						<CustomerSearch
							name={search.customerName}
							code={search.customerCode}
							setName={(value) => onChange('customerName', value)}
							setCode={(value) => onChange('customerCode', value)}
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap none>
					{/* 두깨 */}
					<PartWrap>
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
				{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
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

export default UserPerformanceFilter
