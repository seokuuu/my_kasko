import { useAtomValue, useSetAtom } from 'jotai'
import { useState } from 'react'
import { GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import DateSearchSelect from '../../../components/Search/DateSearchSelect'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import StandardFind from '../../../modal/Multi/StandardFind'
import CustomCheckBox from '../../../pages/Operate/UI/CustomCheckBox/CustomCheckBox'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'

/**
 * @constant 주문 상태
 */
const ORDER_STATUS_LIST = [
	{ label: '전체', value: '' },
	{ label: '주문 요청', value: '주문 요청' },
	{ label: '주문 취소', value: '주문 취소' },
	{ label: '주문 확정', value: '주문 확정' },
]

const OrderSearchFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	const {
		// prettier-ignore
		storageList,
		supplierList,
		spartList,
		makerList,
		gradeList,
	} = useGlobalProductSearchFieldData()

	const setIsKyuModal = useSetAtom(kyuModalAtom)

	/* ============================== COMMON start ============================== */
	// CHECKS
	const [checkRadio, setCheckRadio] = useState(
		Array.from({ length: ORDER_STATUS_LIST.length }, (_, index) => index === 0),
	)
	/* ============================== COMMON end ============================== */

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, width: '100%' }}>
			<FilterLeft style={{ flex: 1 }}>
				<RowWrap>
					<PartWrap first>
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
					{/* 규격약호 찾기 */}
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
				<RowWrap style={{ width: '100%', flexWrap: 'nowrap' }}>
					<PartWrap first>
						<h6>구분</h6>
						{/* 제품군 */}
						<PWRight>
							<MainSelect
								options={spartList}
								defaultValue={spartList[0]}
								value={search.spart}
								name="spart"
								onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
							/>
						</PWRight>
						{/* 등급 */}
						<PWRight>
							<MainSelect
								options={gradeList}
								defaultValue={gradeList[0]}
								value={search.grade}
								name="grade"
								onChange={(e) => commonDropdownButtonHandler(e, 'grade')}
							/>
						</PWRight>
					</PartWrap>
					<PartWrap>
						<h6>매입처</h6>
						<PWRight>
							<Input name="supplier" value={search.supplier} onChange={commonNumInputHandler} />
						</PWRight>
					</PartWrap>
					<PartWrap>
						<h6>제조사</h6>
						<PWRight>
							<Input name="maker" value={search.maker} onChange={commonNumInputHandler} />
						</PWRight>
					</PartWrap>
				</RowWrap>
				{/* 두께 |  폭 | 길이 */}
				<RowWrap>
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
				<RowWrap none>
					<PartWrap first>
						{/* 주문 일자 */}
						<DateSearchSelect
							title="주문일자"
							startInitDate={search.orderStartDate ? new Date(search.orderStartDate) : ''}
							endInitDate={search.orderEndDate ? new Date(search.orderEndDate) : ''}
							startDateChange={(v) => {
								setSearch((prev) => ({ ...prev, orderStartDate: v }))
							}}
							endDateChange={(v) => {
								setSearch((prev) => ({ ...prev, orderEndDate: v }))
							}}
						/>
					</PartWrap>
					{/* 진행상태 */}
					<PartWrap>
						<h6>상시판매 상태</h6>
						<CustomCheckBox
							initOptions={[
								{
									checked: false,
									text: '주문요청',
									value: '주문 요청',
								},
								{
									checked: false,
									text: '주문확정',
									value: '주문 확정',
								},
								{
									checked: false,
									text: '주문취소',
									value: '주문 취소',
								},
							]}
							setState={setSearch}
							stateKey="orderStatusList"
							isExistEntireValue={true}
						/>
						{/*<ExRadioWrap>*/}
						{/*	<RadioSearchButton*/}
						{/*		options={ORDER_STATUS_LIST}*/}
						{/*		value={Array.isArray(search.orderStatusList) ? search.orderStatusList[0] || '' : search.orderStatusList}*/}
						{/*		onChange={(value) => setSearch((prev) => ({ ...prev, orderStatusList: value === '전체' ? '' : value }))}*/}
						{/*	/>*/}
						{/*</ExRadioWrap>*/}
					</PartWrap>
				</RowWrap>
			</FilterLeft>
			{/* 제품 번호 */}
			<FilterRight style={{ flex: 'inherit' }}>
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
			</FilterRight>
			{/* 규격 약호 */}
			{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
		</div>
	)
}

export default OrderSearchFields
