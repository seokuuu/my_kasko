import { useAtomValue, useSetAtom } from 'jotai'
// import { MainSelect } from '../../common/Option/Main'
import { GreyBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { DateSearchSelect } from '../../../components/Search'
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
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'

const IncomingSearchFields = ({
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
	const onChange = (key, value) => {
		setSearch((p) => ({ ...p, [key]: value }))
	}
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
						<PWRight>
							<DateSearchSelect
								title={'입고 일자'}
								startInitDate={search.startDate}
								endInitDate={search.endDate}
								startDateChange={(value) => onChange('startDate', value)}
								endDateChange={(value) => onChange('endDate', value)}
							/>
						</PWRight>
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
		</>
	)
}

export default IncomingSearchFields
