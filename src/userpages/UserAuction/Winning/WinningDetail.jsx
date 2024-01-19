import { useAtom } from 'jotai'
import React, { useState, Fragment } from 'react'
import { styled } from 'styled-components'
import { BtnBound, TGreyBtn, WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import Test3 from '../../../pages/Test/Test3'
import { blueModalAtom, toggleAtom } from '../../../store/Layout/Layout'

import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'

import { TableWrap } from '../../../components/MapTable/MapTable'

const WinningDetail = ({}) => {
	const NewDummy = {
		'고객사 명': '(주) 아이덴잇',
		'고객 코드': 'K00-0012',
		'': '',
		'총 수량': '30',
		'총 중량(KG)': '4,612,157',
		'입금 요청 금액 (원)': '45,237,876',
		'제품금액(VAT 포함)': '000',
		'운임비(VAT 포함)': '000',
		ㅤ: 'ㅤ',
	}

	const entries = Object.entries(NewDummy)
	const chunkedEntries = []

	for (let i = 0; i < entries.length; i += 3) {
		chunkedEntries.push(entries.slice(i, i + 3))
	}

	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,
		//   [name]: selectedOption.label,
		// }));
	}
	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
	}

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const [isModal, setIsModal] = useAtom(blueModalAtom)

	console.log('isModal =>', isModal)

	const modalOpen = () => {
		setIsModal(true)
	}

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>낙찰 확인 상세</h1>
				</FilterHeader>
				<FilterTCTop>
					<h6>경매 번호</h6>
					<p>2023041050</p>
				</FilterTCTop>

				<TableWrap style={{ marginTop: '5px' }}>
					<ClaimTable>
						{chunkedEntries.map((chunk, i) => (
							<ClaimRow key={i}>
								{chunk.map(([title, content], j) => (
									<Fragment key={j}>
										<ClaimTitle>{title}</ClaimTitle>
										<ClaimContent>{content}</ClaimContent>
									</Fragment>
								))}
							</ClaimRow>
						))}
					</ClaimTable>
				</TableWrap>
			</div>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown />
						{/*<Excel getRow={getRow} />*/}
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<P>목적지</P>
						<CustomInput placeholder="h50" width={60} />
						<CustomInput placeholder="목적지명" width={120} />
						<CustomInput placeholder="도착지 연락처" width={120} />
						<WhiteBlackBtn>찾기</WhiteBlackBtn>
						<TGreyBtn>적용</TGreyBtn>
						<BtnBound />
						<WhiteBlackBtn>목적지 승인 요청</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<Test3 />
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteSkyBtn>입금 요청서 발행</WhiteSkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
		</FilterContianer>
	)
}

export default WinningDetail

const P = styled.p`
	position: relative;
	top: 5px;
`
