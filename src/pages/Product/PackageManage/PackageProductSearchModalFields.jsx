import { useAtomValue, useSetAtom } from 'jotai'
import { BlackBtn, GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
	ExInputsWrap,
	FilterRight,
	FilterLeft,
	Input,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
	FilterSubcontianer,
	ExCheckWrap,
} from '../../../modal/External/ExternalFilter'
import StandardFind from '../../../modal/Multi/StandardFind'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'

import CustomCheckBox from '../../Operate/UI/CustomCheckBox/CustomCheckBox'

const PackageProductSearchModalFields = ({
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
			<FilterSubcontianer>
				<FilterLeft>
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
						<PartWrap>
							<h6>유찰 횟수</h6>
							<ExInputsWrap>
								<Input /> <Tilde>~</Tilde>
								<Input />
							</ExInputsWrap>
						</PartWrap>
					</RowWrap>
					<RowWrap>
						{/* 구분 */}
						<PartWrap>
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
										text: '판매제외제',
										value: '판매제외제',
									},
									{
										checked: false,
										text: '판매완료제',
										value: '판매완료제',
									},
								]}
								setState={setSearch}
								stateKey="saleCategoryList"
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

					<RowWrap style={{ border: '0px' }}>
						<PartWrap first>
							<h6>판매가 유형</h6>
							<CustomCheckBox
								initOptions={[
									{
										checked: false,
										text: '특가',
										value: '특가',
									},
									{
										checked: false,
										text: '할인',
										value: '할인',
									},
								]}
								setState={setSearch}
								stateKey="salePriceTypeList"
								stateType="object"
							/>
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
			</FilterSubcontianer>
		</>
	)
}

export default PackageProductSearchModalFields
