import { useAtom } from 'jotai'
import React from 'react'
import { GreyBtn } from '../../../../../common/Button/Button'
import { MainSelect } from '../../../../../common/Option/Main'
import ProductNumber from '../../../../../components/ProductNumber/ProductNumber'
import useGlobalProductSearchFieldData from '../../../../../hooks/useGlobalProductSearchFieldData'
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
} from '../../../../../modal/External/ExternalFilter'
import StandardFind from '../../../../../modal/Multi/StandardFind'
import { kyuModalAtom } from '../../../../../store/Layout/GlobalProductSearch'
import CustomCheckBox from '../../../UI/CustomCheckBox/CustomCheckBox'

const ClaimProductSearchFields = ({
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	// 규격 약호 모달
	const [isModal, setIsModal] = useAtom(kyuModalAtom)

	const { storageList, supplierList, spartList, makerList, stockStatusList, gradeList, preferThicknessList } =
		useGlobalProductSearchFieldData()

	// 규격 약호 모달
	function modalOpen() {
		setIsModal(true)
	}
	return (
		<>
			<FilterLeft>
				{/* 1행 */}
				<RowWrap>
					{/* 창고 구분 */}
					<PartWrap first>
						<h6>창고 구분</h6>
						<PWRight>
							<MainSelect
								options={storageList}
								// defaultValue={storageList[0]}
								name="storage"
								value={search.storage}
								onChange={(e) => commonDropdownButtonHandler(e, 'storage')}
							/>
						</PWRight>
					</PartWrap>
					{/* 매입처 */}
					<PartWrap>
						<h6>매입처</h6>
						{/*<PWRight>
							<MainSelect
								options={supplierList}
								defaultValue={supplierList[0]}
								name="supplier"
								value={search.supplier}
								onChange={(e) => commonDropdownButtonHandler(e, 'supplier')}
							/>
						</PWRight>*/}
						<PWRight>
							<Input name="supplier" value={search.supplier} onChange={commonNumInputHandler} />
						</PWRight>
					</PartWrap>
					{/* 규격약호 */}
					<PartWrap>
						<h6>규격 약호</h6>
						<Input readOnly={true} value={search.spec} />
						<GreyBtn style={{ width: '70px' }} height={35} margin={10} fontSize={17} onClick={modalOpen}>
							찾기
						</GreyBtn>
					</PartWrap>
				</RowWrap>
				{/* 2행 */}
				<RowWrap>
					{/* 구분 */}
					<PartWrap>
						<h6>구분</h6>
						{/* 제품군 */}
						<PWRight>
							<MainSelect
								options={spartList}
								defaultValue={spartList[0]}
								name="spart"
								value={search.spart}
								onChange={(e) => commonDropdownButtonHandler(e, 'spart')}
							/>
						</PWRight>
						{/* 제조사 */}
						<PWRight>
							<Input
								style={{ marginRight: '5px' }}
								name="maker"
								value={search.maker}
								onChange={commonNumInputHandler}
							/>
						</PWRight>
						{/* 재고 상태 */}
						<PWRight>
							<MainSelect
								options={stockStatusList}
								defaultValue={stockStatusList[0]}
								name="stockStatus"
								value={search.stockStatus}
								onChange={(e) => commonDropdownButtonHandler(e, 'stockStatus')}
							/>
						</PWRight>
						{/* 등급 */}
						<PWRight>
							<MainSelect
								options={gradeList}
								defaultValue={gradeList[0]}
								name="grade"
								value={search.grade}
								onChange={(e) => commonDropdownButtonHandler(e, 'grade')}
							/>
						</PWRight>
						{/* 정척여부 */}
						<PWRight>
							<MainSelect
								options={preferThicknessList}
								defaultValue={preferThicknessList[0]}
								name="preferThickness"
								value={search.preferThickness}
								onChange={(e) => commonDropdownButtonHandler(e, 'preferThickness')}
							/>
						</PWRight>
					</PartWrap>
				</RowWrap>
				{/* 3행 */}
				<RowWrap>
					{/* 판매 구분 */}
					<PartWrap>
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
									text: '판매제외재',
									value: '판매제외재',
								},
								{
									checked: false,
									text: '판매완료재',
									value: '판매완료재',
								},
							]}
							setState={setSearch}
							stateKey="saleCategoryList"
						/>
					</PartWrap>
					{/* 판매 유형 */}
					<PartWrap>
						<h6>판매 유형</h6>
						<CustomCheckBox
							initOptions={[
								{
									checked: false,
									text: '경매 대상재',
									value: '경매 대상재',
								},
								{
									checked: false,
									text: '상시 판매 대상재',
									value: '상시 판매 대상재',
								},
							]}
							setState={setSearch}
							stateKey="saleTypeList"
						/>
					</PartWrap>
				</RowWrap>
				{/* 4행 */}
				<RowWrap>
					{/* 판매가 유형 */}
					<PartWrap>
						<h6>판매가 유형</h6>
						<CustomCheckBox
							initOptions={[
								{
									checked: false,
									text: '일반',
									value: '일반',
								},
								{
									checked: false,
									text: '특가',
									value: '특가',
								},
								{
									checked: false,
									text: '특판',
									value: '특판',
								},
							]}
							setState={setSearch}
							stateKey="salePriceTypeList"
							stateType={'object'}
						/>
					</PartWrap>
				</RowWrap>
				{/* 5행 */}
				<RowWrap>
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
				{/* 6 행 */}
				<RowWrap none>
					<PartWrap first>
						<h6>유찰 횟수</h6>
						<ExInputsWrap>
							<MiniInput
								type="number"
								name="minFailCount"
								value={search.minFailCount}
								onChange={commonNumInputHandler}
								min={0}
							/>
							<Tilde>~</Tilde>
							<MiniInput
								type="number"
								name="maxFailCount"
								value={search.maxFailCount}
								onChange={commonNumInputHandler}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
				</RowWrap>
				{/* <CustomCheckBox /> */}
				{isModal === true && <StandardFind closeFn={onSpecHandler} />}
			</FilterLeft>
			<FilterRight>
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
			</FilterRight>
		</>
	)
}

export default ClaimProductSearchFields
