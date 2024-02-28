import { MainSelect } from '../../../common/Option/Main'
import useGlobalProductSearchFieldData from '../../../hooks/useGlobalProductSearchFieldData'
import {
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

import { useAtomValue, useSetAtom } from 'jotai'
import { GreyBtn } from '../../../common/Button/Button'

import StandardFind from '../../../modal/Multi/StandardFind'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import ProductNumber from '../../../components/ProductNumber/ProductNumber'

const BiddingSearchFields = ({
	// prettier-ignore
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
	type,
}) => {
	const {
		// prettier-ignore
		storageList,
		spartList,
		gradeList,
		preferThicknessList,
	} = useGlobalProductSearchFieldData()

	// const init = {
	// 	customerCode: '',
	// 	customerName: '',
	// 	destinationCode: '',
	// 	destinationName: '',
	// }
	// const [param, setParam] = useState(init)
	const onChange = (key, value) => setSearch((prev) => ({ ...prev, [key]: value, pageNum: 1 }))

	const setIsKyuModal = useSetAtom(kyuModalAtom)

	return (
		<>
			<FilterLeft>
				<RowWrap>
					{/* 창고 구분 */}
					<PartWrap first>
						<h6>창고 구분 </h6>
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
				{/* 2행 */}
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
							<MainSelect
								options={gradeList}
								defaultValue={gradeList[0]}
								value={search.grade}
								name="grade"
								onChange={(e) => commonDropdownButtonHandler(e, 'grade')}
							/>
						</PWRight>
					</PartWrap>
					{type === '낙찰 생성' && (
						<>
							<PartWrap>
								<h6>구분</h6>
								{/* 제품군 */}
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
						</>
					)}
				</RowWrap>
				<RowWrap>
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
			{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
			<FilterRight>
				<ProductNumber
					initialValue={search.productNumberList}
					setState={setSearch}
					valueName={'productNumberList'}
					height="100%"
				/>
				{/* <ProductNumberListSearch
					value={search.productNumberList}
					onChange={(e) => onChange('productNumberList', e.target.value)}
				/> */}
			</FilterRight>
		</>
	)
}

export default BiddingSearchFields
