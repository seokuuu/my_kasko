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

const PackageProductSearchFields = ({
	search,
	setSearch,
	commonDropdownButtonHandler,
	commonNumInputHandler,
	onSpecHandler,
}) => {
	const {
		// prettier-ignore
		storageList,
		gradeList,
		preferThicknessList,
	} = useGlobalProductSearchFieldData()

	const setIsKyuModal = useSetAtom(kyuModalAtom)

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, width: '100%' }}>
			<FilterLeft style={{ justifyContent: 'center', flex: 1 }}>
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
						<h6>구분</h6>
						<PWRight>
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
				{/* 2행 */}
				<RowWrap none>
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
			</FilterLeft>
			{useAtomValue(kyuModalAtom) === true && <StandardFind closeFn={onSpecHandler} />}
			<FilterRight style={{ flex: 'inherit' }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
					<ProductNumber
						initialValue={search.productNumberList}
						setState={setSearch}
						valueName={'productNumberList'}
						height="80px"
					/>
					<ProductNumber
						title="패키지 번호"
						initialValue={search.packageNumberList || []}
						setState={setSearch}
						valueName={'packageNumberList'}
						height="80px"
					/>
				</div>
			</FilterRight>
		</div>
	)
}

export default PackageProductSearchFields
