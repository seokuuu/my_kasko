import { useAtom } from 'jotai'
import { useState } from 'react'
import { blueModalAtom, invenCustomerData, invenDestinationData, winningDestiData } from '../../store/Layout/Layout'
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
} from '../Common/Common.Styled'

import { GreyBtn } from '../../common/Button/Button'
import { TxtInput } from '../../common/Input/Input'

import styled from 'styled-components'
import { RadioCircleDiv, RadioInnerCircleDiv, RadioMainDiv } from '../../common/Check/RadioImg'

// 고객사 찾기

const InventoryFind = ({ title, setSwitch, data, type, setPropsUid, handleButtonOnClick }) => {

	const matchData = { name: '고객명', code: '고객사 코드', businessNumber: '사업자번호' }
	const destinationData = { name: '목적지', code: '목적지 코드' }

	// const { isLoading, isError, data, isSuccess } = useReactQuery('', 'getCustomerFind', getCustomerFind)

	const customerGetData = data?.data?.data

	console.log('customerGetData', customerGetData)

	const [isModal, setIsModal] = useAtom(blueModalAtom)
	const [searchTerm, setSearchTerm] = useState('')
	const [result, setResult] = useState([])
	const [clickedResult, setClickedResult] = useState()
	const [selectedUid, setSelectedUid] = useState(null)
	const [selectedUids, setSelectedUids] = useState([])

	console.log('selectedUid', selectedUid)

	console.log('clickedResult', clickedResult)

	console.log('searchTerm !!!', searchTerm)
	console.log('result !!!', result)

	const modalClose = () => {
		setSwitch(false)
	}

	const handleSearch = () => {
		const filteredResult = customerGetData?.filter((item) => {
			const searchTermsLowerCase = searchTerm.toLowerCase()
			return (
				item.code.toLowerCase().includes(searchTermsLowerCase) ||
				item.name.toLowerCase().includes(searchTermsLowerCase) ||
				item.businessNumber.toLowerCase().includes(searchTermsLowerCase)
			)
		})

		// 검색어가 없을 때는 모든 데이터를 보여줌
		if (!searchTerm) {
			setResult(customerGetData)
		} else {
			// 검색 로직을 수행하고 결과를 상태에 업데이트
			setResult(filteredResult || [])
		}
	}
	const handleSearch2 = () => {
		const filteredResult = customerGetData?.filter((item) => {
			const searchTermsLowerCase = searchTerm
			return (
				item.code.includes(searchTermsLowerCase) || item.name.includes(searchTermsLowerCase)
				// item.businessNumber.includes(searchTermsLowerCase)
			)
		})

		// 검색어가 없을 때는 모든 데이터를 보여줌
		if (!searchTerm) {
			setResult(customerGetData)
		} else {
			// 검색 로직을 수행하고 결과를 상태에 업데이트
			setResult(filteredResult || [])
		}
	}
	const handleCellClick = (uid, name, code, businessNumber, destinationName, phone, address) => {
		console.log('클릭한 셀 데이터:', { uid, name, code, businessNumber })
		if (type === '낙찰 생성') {
			setClickedResult({ code, destinationName, name, phone, address })
			setPropsUid(uid)
		} else {
			setClickedResult({ uid, name, code, businessNumber })
		}

		setSelectedUid(uid) // 클릭한 셀의 uid를 저장
	}

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '30%', height: '70vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>{title}</div>
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
								/>
								<GreyBtn
									height={40}
									width={15}
									margin={5}
									onClick={title == '고객사 찾기' ? handleSearch : handleSearch2}
								>
									찾기
								</GreyBtn>
							</div>
						</BlueMainDiv>
						<BlueMainDiv style={{ padding: '0px' }}>
							<ResultContainer>
								<ResultHead>
									<ResultCell wid={50}>선택</ResultCell>
									{title == '고객사 찾기' && (
										<>
											<ResultCell>{matchData.name}</ResultCell>
											<ResultCell>{matchData.code}</ResultCell>
											<ResultCell wid={130}>{matchData.businessNumber}</ResultCell>
										</>
									)}
									{title == '목적지 찾기' && (
										<>
											<ResultCell>{destinationData.name}</ResultCell>
											<ResultCell>{destinationData.code}</ResultCell>
											{/* <ResultCell wid={130}>{matchData.businessNumber}</ResultCell> */}
										</>
									)}
								</ResultHead>
								{result &&
									result.map((item, index) => (
										<ResultRow
											key={item.uid}
											onClick={() =>
												handleCellClick(
													item.uid,
													item.name,
													item.code,
													item.businessNumber,
													item.code,
													item.destinationName,
													item.name,
													item.phone,
													item.address,
												)
											}
										>
											<ResultCell wid={50}>
												<RadioMainDiv key={index}>
													<RadioCircleDiv
														isChecked={item.uid === selectedUid}
														onClick={(event) => {
															event.stopPropagation() // 상위 요소의 onClick 이벤트 막기
															handleCellClick(
																item.uid,
																item.name,
																item.code,
																item.businessNumber,
																item.code,
																item.destinationName,
																item.name,
																item.phone,
																item.address,
															) // 셀 클릭 이벤트 처리
														}}
													>
														<RadioInnerCircleDiv isChecked={item.uid === selectedUid} />
													</RadioCircleDiv>
												</RadioMainDiv>
											</ResultCell>
											<ResultCell>{item.name}</ResultCell>
											<ResultCell>{item.code}</ResultCell>
											{title == '고객사 찾기' && (
												<>
													<ResultCell wid={130}>{item.businessNumber}</ResultCell>
												</>
											)}
										</ResultRow>
									))}
							</ResultContainer>
						</BlueMainDiv>
					</div>
					<BlueBtnWrap>
						<BlueBlackBtn
							onClick={() => {
								setSwitch(false)

								handleButtonOnClick(clickedResult)

								return title === '고객사 찾기'
									? Object.assign(invenCustomerData.init, clickedResult)
									: type === '낙찰 생성'
									? Object.assign(winningDestiData.init, clickedResult)
									: Object.assign(invenDestinationData.init, clickedResult)
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

export default InventoryFind

export const BMDTitle = styled.div`
	display: flex;
	justify-content: center;
`
