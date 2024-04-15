import { MainSelect } from '../../../common/Option/Main'
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

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import React from 'react'
import { GreyBtn } from '../../../common/Button/Button'
import ProductNumber from '../../../components/GlobalProductSearch/SearchFields/ProductNumber'
import { RadioSearchButton } from '../../../components/Search'
import StandardFind from '../../../modal/Multi/StandardFind'
import { kyuModalAtom } from '../../../store/Layout/GlobalProductSearch'
import { useLocation } from 'react-router-dom'
import { userPackBiddingSearch } from '../../../store/Layout/Layout'

const UserBiddingSearchFields = ({
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
		spartList,
		gradeList,
	} = useGlobalProductSearchFieldData()

	const location = useLocation()

	const onChange = (key, value) => setSearch((prev) => ({ ...prev, [key]: value, pageNum: 1 }))

	const [isUserPackBiddingSearch, setIsUserPackBiddingSearch] = useAtom(userPackBiddingSearch)

	const onChangeRadio = (key, value) => {
		if (['/userpage/auctionpackage'].includes(location.pathname) && value === '관심제품') {
			setIsUserPackBiddingSearch(true)
		} else setSearch((p) => ({ ...p, [key]: value }))
	}

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
						<h6>진행 상태</h6>
						<RadioSearchButton
							options={[
								{ label: '전체', value: null },
								{ label: '관심제품', value: '관심제품' },
								{ label: '응찰', value: '응찰' },
								{ label: '미응찰', value: '미응찰' },
							]}
							value={search.biddingStatus}
							onChange={(value) => onChangeRadio('biddingStatus', value)}
						/>
					</PartWrap>
				</RowWrap>
				{/* 2행 */}
				<RowWrap>
					{/* 구분 */}
					<PartWrap first>
						<h6>구분</h6>
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
					value={search.productNumberList}
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

export default UserBiddingSearchFields
