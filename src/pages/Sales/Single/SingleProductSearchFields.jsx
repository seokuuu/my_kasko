import { useAtom } from 'jotai'
import { GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import useTableSearchFieldData from '../../../hooks/useTableSearchFieldData'
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
import { claimProductModalAtom } from '../../../store/Layout/Layout'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'

const SingleProductSearchFields = ({ search, setSearch }) => {
	const [isModal, setIsModal] = useAtom(claimProductModalAtom)

	const {
		// prettier-ignore
		storageList,
		supplierList,
		spartList,
		makerList,
		stockStatusList,
		gradeList,
		preferThicknessList,
	} = useTableSearchFieldData()

	// 셀렉트 박스 핸들러
	function commonSelectHandler(e, name) {
		setSearch((p) => ({ ...p, [name]: e }))
	}

	// 숫자 인풋 핸들러
	function commonNumInputHandler(e) {
		const { name, value } = e.target

		setSearch((p) => ({ ...p, [name]: value }))
	}

	// 규격 약호 핸들러
	function onSpecHandler(e, text) {
		const { tagName } = e.target
		if (tagName === 'IMG') {
			setIsModal(false)
		} else {
			setSearch((p) => ({ ...p, spec: text }))
			setIsModal(false)
		}
	}

	// 규격 약호 모달
	function modalOpen() {
		setIsModal(true)
	}

	return (
		<>
			<FilterLeft>
				<RowWrap>
					{/* 창고 구분 */}
					<PartWrap>
						<h6>창고 구분</h6>
						<PWRight>
							<MainSelect
								options={storageList}
								// defaultValue={storageList[0]}
								value={search.storage}
								name="storage"
								onChange={(e) => commonSelectHandler(e, 'storage')}
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
								onChange={(e) => commonSelectHandler(e, 'supplier')}
							/>
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
								value={search.spart}
								name="spart"
								onChange={(e) => commonSelectHandler(e, 'spart')}
							/>
						</PWRight>
						{/* 제조사 */}
						<PWRight>
							<MainSelect
								options={makerList}
								defaultValue={makerList[0]}
								value={search.maker}
								name="maker"
								onChange={(e) => commonSelectHandler(e, 'maker')}
							/>
						</PWRight>
						{/* 재고 상태 */}
						<PWRight>
							<MainSelect
								options={stockStatusList}
								defaultValue={stockStatusList[0]}
								value={search.stockStatus}
								name="stockStatus"
								onChange={(e) => commonSelectHandler(e, 'stockStatus')}
							/>
						</PWRight>
						{/* 등급 */}
						<PWRight>
							<MainSelect
								options={gradeList}
								defaultValue={gradeList[0]}
								value={search.grade}
								name="grade"
								onChange={(e) => commonSelectHandler(e, 'grade')}
							/>
						</PWRight>
						{/* 정척여부 */}
						<PWRight>
							<MainSelect
								options={preferThicknessList}
								defaultValue={preferThicknessList[0]}
								value={search.preferThickness}
								name="preferThickness"
								onChange={(e) => commonSelectHandler(e, 'preferThickness')}
							/>
						</PWRight>
					</PartWrap>
				</RowWrap>
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
							<Input
								type="number"
								name="minFailCount"
								value={search.minFailCount}
								onChange={commonNumInputHandler}
								min={0}
							/>
							<Tilde>~</Tilde>
							<Input
								type="number"
								name="maxFailCount"
								value={search.maxFailCount}
								onChange={commonNumInputHandler}
								min={0}
							/>
						</ExInputsWrap>
					</PartWrap>
				</RowWrap>
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

export default SingleProductSearchFields
