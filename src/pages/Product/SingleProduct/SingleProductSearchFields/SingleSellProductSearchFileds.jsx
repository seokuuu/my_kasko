import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { GreyBtn } from '../../../../common/Button/Button'
import { MainSelect } from '../../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../../hooks/useGlobalProductSearchFieldData'
import {
	DoubleWrap,
	ExCheckWrap,
	ExInputsWrap,
	FilterLeft,
	FilterRight,
	Input,
	MiniInput,
	PartWrap,
	PWRight,
	RowWrap,
	Tilde,
} from '../../../../modal/External/ExternalFilter'
import StandardFind from '../../../../modal/Multi/StandardFind'
import ProductNumber from '../../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { kyuModalAtom, proNoModalAtom } from '../../../../store/Layout/GlobalProductSearch'
import CustomCheckBox from '../../../Operate/UI/CustomCheckBox/CustomCheckBox'
import ProNoFindModal from '../../../../modal/Multi/ProNoFindModal'
import React from 'react'

const SingleSellProductSearchFields = ({
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
	const [productModalAtom, setProNoModalAtom] = useAtom(proNoModalAtom)

	return (
		<>
			<FilterLeft>
				<RowWrap none>
					<PartWrap first>
						<h6>ProNo.</h6>
						<Input readOnly={true} value={search.proNo} />
						<GreyBtn
							style={{ width: '70px' }}
							height={35}
							margin={10}
							fontSize={17}
							onClick={() => setProNoModalAtom(true)}
						>
							찾기
						</GreyBtn>
					</PartWrap>
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
						<h6>매입처</h6>
						<PWRight>
							<Input name="supplier" value={search.supplier} onChange={commonNumInputHandler} />
						</PWRight>
					</PartWrap>
				</RowWrap>
				<RowWrap>
					<PartWrap first>
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
					<PartWrap first>
						<h6>제조사</h6>
						<PWRight>
							<Input name="maker" value={search.maker} onChange={commonNumInputHandler} />
						</PWRight>
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
						<h6>판매 구분</h6>
						<ExCheckWrap>
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
									{
										checked: false,
										text: '판매 완료재',
										value: '판매 완료재',
									},
								]}
								setState={setSearch}
								stateKey="saleCategoryList"
							/>
						</ExCheckWrap>
					</PartWrap>
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
									text: '상시판매 대상재',
									value: '상시판매 대상재',
								},
							]}
							setState={setSearch}
							stateKey="saleTypeList"
							stateType="object"
						/>
					</PartWrap>
				</RowWrap>

				<RowWrap>
					<PartWrap first>
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
				{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
				{!!productModalAtom && <ProNoFindModal setData={(value) => commonDropdownButtonHandler(value, 'proNo')} />}
			</FilterLeft>
			<FilterRight>
				<DoubleWrap>
					<ProductNumber
						initialValue={search.productNumberList}
						setState={setSearch}
						valueName={'productNumberList'}
						height="100%"
					/>
				</DoubleWrap>
			</FilterRight>
		</>
	)
}

export default SingleSellProductSearchFields
