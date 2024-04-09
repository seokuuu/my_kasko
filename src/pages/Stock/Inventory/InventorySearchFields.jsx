import { useAtomValue, useSetAtom } from 'jotai'
import { GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
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
import StandardFind from '../../../modal/Multi/StandardFind'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'

import DateSearchSelect from '../../../components/Search/DateSearchSelect'

const InventorySearchFields = ({
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
		stockStatusList,
		gradeList,
		preferThicknessList,
	} = useGlobalProductSearchFieldData()

	const setIsKyuModal = useSetAtom(kyuModalAtom)

	return (
		<>
			<FilterLeft>
				<RowWrap>
					{/* 창고 구분 */}
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
					{/* 규격약호 */}
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
						<DateSearchSelect
							title={'입고일자'}
							startInitDate={search.startSendDate}
							endInitDate={search.endSendDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'startSendDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'endSendDate')}
						/>
					</PartWrap>

					<PartWrap>
						<DateSearchSelect
							title={'출고일자'}
							startInitDate={search.shipmentStartDate}
							endInitDate={search.shipmentEndDate}
							startDateChange={(value) => commonDropdownButtonHandler(value, 'shipmentStartDate')}
							endDateChange={(value) => commonDropdownButtonHandler(value, 'shipmentEndDate')}
						/>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
						<h6>판매 구분</h6>
						<CustomCheckBox
							initOptions={[
								{
									checked: false,
									text: '판매재',
									value: '판매재',
								},
								{
									checked: false,
									text: '판매 제외재',
									value: '판매 제외재',
								},
							]}
							setState={setSearch}
							stateKey="saleCategoryList"
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>

				<RowWrap>
					<PartWrap>
						<PartWrap first>
							<h6>출하 상태</h6>
							<CustomCheckBox
								initOptions={[
									{
										checked: false,
										text: '출하 대기',
										value: '출하 대기',
									},
									{
										checked: false,
										text: '출하 완료',
										value: '출하 완료',
									},
									{
										checked: false,
										text: '출고 지시',
										value: '출고 지시',
									},
									{
										checked: false,
										text: '출고 완료',
										value: '출고 완료',
									},
									{
										checked: false,
										text: '운송 완료',
										value: '운송 완료',
									},
								]}
								setState={setSearch}
								stateKey="shipmentStatusList"
								stateType="object"
							/>
						</PartWrap>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					{/* 구분 */}
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
						{/* 재고 상태 */}
						<PWRight>
							<MainSelect
								options={stockStatusList}
								defaultValue={stockStatusList[0]}
								value={search.stockStatus}
								name="stockStatus"
								onChange={(e) => commonDropdownButtonHandler(e, 'stockStatus')}
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
						{/* 정척여부 */}
						<PWRight>
							<MainSelect
								options={preferThicknessList}
								defaultValue={preferThicknessList[0]}
								value={search.preferThickness}
								name="preferThickness"
								onChange={(e) => commonDropdownButtonHandler(e, 'preferThickness')}
							/>
						</PWRight>
					</PartWrap>
				</RowWrap>

				<RowWrap>
					<PartWrap first>
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

				<RowWrap none>
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
			{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
		</>
	)
}

export default InventorySearchFields
