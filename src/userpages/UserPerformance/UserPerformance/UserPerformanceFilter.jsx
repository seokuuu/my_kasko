import {
	FilterSubcontianer,
	ExInputsWrap,
	FilterRight,
	FilterLeft,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import { CustomerSearch, DateSearchSelect, ProductNumberListSearch } from '../../../components/Search'
import React from 'react'
import { GreyBtn } from '../../../common/Button/Button'
import { useAtom, useAtomValue, useSetAtom } from 'jotai/index'
import { claimProductModalAtom } from '../../../store/Layout/Layout'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import { MainSelect } from '../../../common/Option/Main'
import StandardFind from '../../../modal/Multi/StandardFind'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'

const UserPerformanceFilter = ({
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	const setIsKyuModal = useSetAtom(kyuModalAtom)
	const { storageList, spartList, gradeList } = useGlobalProductSearchFieldData()

	return (
		<FilterSubcontianer>
			<FilterLeft>
				<RowWrap>
					<DateSearchSelect
						title={'경매 일자'}
						startInitDate={search.auctionStartDate}
						endInitDate={search.auctionEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'auctionStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'auctionEndDate')}
					/>
					<DateSearchSelect
						title={'출고 일자'}
						startInitDate={search.shipmentStartDate}
						endInitDate={search.shipmentEndDate}
						startDateChange={(value) => commonDropdownButtonHandler(value, 'shipmentStartDate')}
						endDateChange={(value) => commonDropdownButtonHandler(value, 'shipmentEndDate')}
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
								onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
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
							onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
						/>
						{/* 등급 */}
						<MainSelect
							options={gradeList}
							defaultValue={gradeList[0]}
							value={search.grade}
							name="grade"
							onChange={(e) => commonDropdownButtonHandler(e, 'grade')}
						/>
					</PartWrap>
					<PartWrap>
						<CustomerSearch
							name={search.customerName}
							code={search.customerCode}
							setName={(value) => commonDropdownButtonHandler(value, 'customerName')}
							setCode={(value) => commonDropdownButtonHandler(value, 'customerCode')}
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
		</FilterSubcontianer>
	)
}

export default UserPerformanceFilter
