import { useState } from 'react'
import {
	BlueBarHeader,
	BlueBlackBtn,
	BlueBtnWrap,
	BlueMainDiv,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	ResultCell,
	ResultContainer,
	ResultHead,
	ResultRow,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'

import { GreyBtn } from '../../../common/Button/Button'
import { TxtInput } from '../../../common/Input/Input'

import styled from 'styled-components'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../../common/Check/RadioImg'
import useReactQuery from '../../../hooks/useReactQuery'
import { getCustomerFind } from '../../../service/admin/Auction'

// 고객사 찾기
const ClientDestiCustomerFind = ({
	title,
	setFindModal,
	setCustomerFindResult,
	customerNameInput,
	setCustomerNameInput,
}) => {
	const matchData = { name: '고객명', code: '고객사 코드', businessNumber: '사업자번호', ceoName: '대표자' }

	const { data } = useReactQuery('', 'getCustomerFind', getCustomerFind)

	const customerGetData = data?.data?.data

	const [searchTerm, setSearchTerm] = useState('')
	const [result, setResult] = useState([])
	const [clickedResult, setClickedResult] = useState()
	const [selectedUid, setSelectedUid] = useState(null)

	const modalClose = () => {
		setFindModal(false)
	}

	const handleSearch = () => {
		const filteredResult = customerGetData?.filter((item) => {
			const searchTermsLowerCase = searchTerm.toLowerCase()
			return (
				item.code.toLowerCase().includes(searchTermsLowerCase) ||
				item.name.toLowerCase().includes(searchTermsLowerCase) ||
				item.businessNumber.toLowerCase().includes(searchTermsLowerCase) ||
				item.ceoName.toLowerCase().includes(searchTermsLowerCase)
			)
		})

		// 검색어가 없을 때는 모든 데이터를 보여줌
		if (!searchTerm) {
			setResult(customerGetData || [])
		} else {
			// 검색 로직을 수행하고 결과를 상태에 업데이트
			setResult(filteredResult || [])
		}
	}

	const handleCellClick = (uid, name, code, businessNumber, ceoName) => {
		setClickedResult({ uid, name, code, businessNumber })
		setSelectedUid(uid) // 클릭한 셀의 uid를 저장
		setCustomerFindResult({
			uid,
			name,
			ceoName,
			code,
		})
		if (setCustomerNameInput) {
			setCustomerNameInput({
				...customerNameInput,
				customerName: name,
				customerCode: code,
			})
		}
	}

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '600px', height: '70vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>고객사 찾기</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer>
					<div>
						<BlueMainDiv style={{ fontSize: '18px' }}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<BMDTitle style={{ width: '90px' }}>검색</BMDTitle>
								<TxtInput
									placeholder="고객사 코드 : K00000, 대소문자에 유의"
									textarea="회사명"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleSearch()
										}
									}}
								/>
								<GreyBtn height={40} width={15} margin={5} onClick={handleSearch}>
									찾기
								</GreyBtn>
							</div>
						</BlueMainDiv>
						<BlueMainDiv style={{ padding: '0px' }}>
							<ResultContainer>
								<ResultHead>
									<ResultCell wid={50}>선택</ResultCell>
									<ResultCell>{matchData.name}</ResultCell>
									<ResultCell>{matchData.code}</ResultCell>
									<ResultCell wid={130}>{matchData.businessNumber}</ResultCell>
									<ResultCell>{matchData.ceoName}</ResultCell>
								</ResultHead>
								{result &&
									result.map((item, index) => (
										<ResultRow
											key={item.uid}
											onClick={() => handleCellClick(item.uid, item.name, item.code, item.businessNumber, item.ceoName)}
										>
											<ResultCell wid={50}>
												<RadioMainDiv key={index}>
													<RadioCircleDiv
														isChecked={item.uid === selectedUid}
														onClick={(event) => {
															event.stopPropagation() // 상위 요소의 onClick 이벤트 막기
															handleCellClick(item.uid, item.name, item.code, item.businessNumber) // 셀 클릭 이벤트 처리
														}}
													>
														<RadioInnerCircleDiv isChecked={item.uid === selectedUid} />
													</RadioCircleDiv>
												</RadioMainDiv>
											</ResultCell>
											<ResultCell>{item.name}</ResultCell>
											<ResultCell>{item.code}</ResultCell>
											<ResultCell wid={150}>{item.businessNumber}</ResultCell>
											<ResultCell>{item.ceoName}</ResultCell>
										</ResultRow>
									))}
							</ResultContainer>
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn
							onClick={() => {
								setFindModal(false)
							}}
						>
							적용
						</BlueBlackBtn>
					</BlueBtnWrap>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default ClientDestiCustomerFind

export const BMDTitle = styled.div`
	display: flex;
	justify-content: center;
`
