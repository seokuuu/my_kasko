import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { GreyBtn } from '../../../../../common/Button/Button'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../../../common/Check/CheckImg'
import { CheckBox } from '../../../../../common/Check/Checkbox'
import { MainSelect } from '../../../../../common/Option/Main'
import {
	ExCheckDiv,
	ExCheckWrap,
	ExInputsWrap,
	FilterLeft,
	Input,
	MiniInput,
	PWRight,
	PartWrap,
	RowWrap,
	Tilde,
} from '../../../../../modal/External/ExternalFilter'
import { blueModalAtom } from '../../../../../store/Layout/Layout'
import useTableSearchFieldData from '../../../../../hooks/useTableSearchFieldData'

/**
 * @description
 * 클레임 제품 목록 검색 필터
 */
const ClaimProductSearchFilter = ({ search, setSearch }) => {
	const checkSales = ['전체', '판매재', '판매제외제']
	const checkSaleType = ['전체', '경매 대상재', '상시 판매 대상재']
	const checkSalePriceType = ['전체', '특가', '일반']
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))
	const [check2, setCheck2] = useState(Array.from({ length: checkSales.length }, () => false))
	const [check3, setCheck3] = useState(Array.from({ length: checkSales.length }, () => false))

	// 규격 약호 모달
	const [isModal, setIsModal] = useAtom(blueModalAtom)

	// 검색 셀렉트 옵션 목록
	const { storageList, supplierList, spartList, makerList, stockStatusList, gradeList, preferThicknessList } =
		useTableSearchFieldData()

	// 셀렉트 박스 핸들러
	function commonSelectHandler(e, name) {
		setSearch((p) => ({ ...p, [name]: e }))
	}

	// 숫자 인풋 핸들러
	function commonNumInputHandler(e) {
		const { name, value } = e.target

		setSearch((p) => ({ ...p, [name]: value }))
	}

	// 규격 약호 모달
	function modalOpen() {
		setIsModal(true)
	}
	return (
		<FilterLeft>
			{/* 1행 */}
			<RowWrap>
				{/* 창고 구분 */}
				<PartWrap>
					<h6>창고 구분</h6>
					<PWRight>
						<MainSelect
							options={storageList}
							defaultValue={storageList[0]}
							name="storage"
							value={search.storage}
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
							name="supplier"
							value={search.supplier}
							onChange={(e) => commonSelectHandler(e, 'supplier')}
						/>
					</PWRight>
				</PartWrap>
				{/* 규격약호 */}
				<PartWrap>
					<h6>규격 약호</h6>
					<Input />
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
							onChange={(e) => commonSelectHandler(e, 'spart')}
						/>
					</PWRight>
					{/* 제조사 */}
					<PWRight>
						<MainSelect
							options={makerList}
							defaultValue={makerList[0]}
							name="maker"
							value={search.maker}
							onChange={(e) => commonSelectHandler(e, 'maker')}
						/>
					</PWRight>
					{/* 재고 상태 */}
					<PWRight>
						<MainSelect
							options={stockStatusList}
							defaultValue={stockStatusList[0]}
							name="stockStatus"
							value={search.stockStatus}
							onChange={(e) => commonSelectHandler(e, 'stockStatus')}
						/>
					</PWRight>
					{/* 등급 */}
					<PWRight>
						<MainSelect
							options={gradeList}
							defaultValue={gradeList[0]}
							name="grade"
							value={search.grade}
							onChange={(e) => commonSelectHandler(e, 'grade')}
						/>
					</PWRight>
					{/* 정척여부 */}
					<PWRight>
						<MainSelect
							options={preferThicknessList}
							defaultValue={preferThicknessList[0]}
							name="preferThickness"
							value={search.preferThickness}
							onChange={(e) => commonSelectHandler(e, 'preferThickness')}
						/>
					</PWRight>
				</PartWrap>
			</RowWrap>
			{/* 3행 */}
			<RowWrap>
				{/* 판매 구분 */}
				<PartWrap>
					<h6>판매 구분</h6>
					<ExCheckWrap>
						{checkSales.map((x, index) => (
							<ExCheckDiv>
								<StyledCheckSubSquDiv
									onClick={() => setCheck1(CheckBox(check1, check1.length, index, true))}
									isChecked={check1[index]}
								>
									<CheckImg2 src="/svg/check.svg" isChecked={check1[index]} />
								</StyledCheckSubSquDiv>
								<p>{x}</p>
							</ExCheckDiv>
						))}
					</ExCheckWrap>
				</PartWrap>
				{/* 판매 유형 */}
				<PartWrap>
					<h6>판매 유형</h6>
					<ExCheckWrap>
						{checkSaleType.map((x, index) => (
							<ExCheckDiv>
								<StyledCheckSubSquDiv
									onClick={() => setCheck2(CheckBox(check2, check2.length, index, true))}
									isChecked={check2[index]}
								>
									<CheckImg2 src="/svg/check.svg" isChecked={check2[index]} />
								</StyledCheckSubSquDiv>
								<p>{x}</p>
							</ExCheckDiv>
						))}
					</ExCheckWrap>
				</PartWrap>
			</RowWrap>
			{/* 4행 */}
			<RowWrap>
				{/* 판매가 유형 */}
				<PartWrap>
					<h6>판매가 유형</h6>
					<ExCheckWrap>
						{checkSalePriceType.map((x, index) => (
							<ExCheckDiv>
								<StyledCheckSubSquDiv
									onClick={() => setCheck3(CheckBox(check3, check3.length, index, true))}
									isChecked={check3[index]}
								>
									<CheckImg2 src="/svg/check.svg" isChecked={check3[index]} />
								</StyledCheckSubSquDiv>
								<p>{x}</p>
							</ExCheckDiv>
						))}
					</ExCheckWrap>
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
						<MiniInput type="number" name="minWidth" value={search.minWidth} onChange={commonNumInputHandler} min={0} />
						<Tilde>~</Tilde>
						<MiniInput type="number" name="maxWidth" value={search.maxWidth} onChange={commonNumInputHandler} min={0} />
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
							name="minFailCount"
							value={search.minFailCount}
							onChange={commonNumInputHandler}
							min={0}
						/>
					</ExInputsWrap>
				</PartWrap>
			</RowWrap>
		</FilterLeft>
	)
}

export default ClaimProductSearchFilter
