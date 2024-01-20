import { useAtomValue, useSetAtom } from 'jotai'
import { GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	ExRadioWrap,
	FilterLeft,
	FilterRight,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../../modal/External/ExternalFilter'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import StandardFind from '../../../modal/Multi/StandardFind'
import CustomerSearch from '../../../components/Search/CustomerSearch'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import { useState } from 'react'
import { CheckBox } from '../../../common/Check/Checkbox'
import DateSearchSelect from '../../../components/Search/DateSearchSelect'

/**
 * @constant 주문 상태
 */
const ORDER_STATUS_LIST = ['전체', '주문요청', '주문취소', '주문확정']

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
		<>
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
								onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
							/>
						</PWRight>
					</PartWrap>
					{/* 매입처 */}
					<PartWrap>
						<h6>매입처</h6>
						<PWRight>
							<MainSelect
								options={supplierList}
								defaultValue={supplierList[0]}
								value={search.supplier}
								name="supplier"
								onChange={(e) => commonDropdownButtonHandler(e, 'supplier')}
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
				{/* 고객사 찾기 */}
				<RowWrap>
					<CustomerSearch
						name={search.customerName || ''}
						code={search.customerCode || ''}
						setName={(n) => {
							setSearch((prev) => ({ ...prev, customerName: n }))
						}}
						setCode={(c) => {
							setSearch((prev) => ({ ...prev, customerCode: c }))
						}}
					/>
				</RowWrap>
				{/* 구분 */}
				<RowWrap>
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
						{/* 제조사 */}
						<PWRight>
							<MainSelect
								options={makerList}
								defaultValue={makerList[0]}
								value={search.maker}
								name="maker"
								onChange={(e) => commonDropdownButtonHandler(e, 'maker')}
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
				</RowWrap>
				{/* 두께 |  폭 | 길이 */}
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
				</RowWrap>
				<RowWrap none>
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
					{/* 진행상태 */}
					<PartWrap first>
						<h6>진행 상태</h6>
						<ExRadioWrap>
							{ORDER_STATUS_LIST.map((text, index) => (
								<RadioMainDiv key={index}>
									<RadioCircleDiv
										isChecked={checkRadio[index]}
										onClick={() => {
											setCheckRadio(CheckBox(checkRadio, checkRadio.length, index))
											setSearch((prev) => ({ ...prev, orderStatusList: text === '전체' ? '' : text }))
										}}
									>
										<RadioInnerCircleDiv isChecked={checkRadio[index]} />
									</RadioCircleDiv>
									<div style={{ display: 'flex', marginLeft: '5px' }}>{text}</div>
								</RadioMainDiv>
							))}
						</ExRadioWrap>
					</PartWrap>
				</RowWrap>
			</FilterLeft>
			{/* 제품 번호 */}
			<FilterRight>
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
			</FilterRight>
			{/* 규격 약호 */}
			{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
		</>
	)
}

export default OrderSearchFields
