import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
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
} from '../../../modal/External/ExternalFilter'

import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'
import React from 'react'

const PackageProductSearchFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
}) => {
	const {
		// prettier-ignore
		storageList,
		spartList,
		stockStatusList,
		gradeList,
		preferThicknessList,
	} = useGlobalProductSearchFieldData()

	return (
		<>
			<FilterLeft>
				<RowWrap>
					<PartWrap first>
						<h6>창고 구분</h6>
						<PWRight>
							<MainSelect
								options={storageList}
								defaultValue={storageList[0]}
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
					<PartWrap>
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
							stateType="object"
						/>
					</PartWrap>
					<PartWrap>
						<h6>판매 유형</h6>
						<ExCheckWrap>
							<CustomCheckBox
								initOptions={[
									{
										checked: false,
										text: '경매대상재',
										value: '경매대상재',
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
						</ExCheckWrap>
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

export default PackageProductSearchFields
