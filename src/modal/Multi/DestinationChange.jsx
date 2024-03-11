import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useUserDestinationQuery } from '../../api/user'
import { BlackBtn, WhiteBlackBtn } from '../../common/Button/Button'
import { CustomInput, FilterContianer, TCSubContainer, TableContianer } from '../../modal/External/ExternalFilter'
import { BlueBarHeader, BlueSubContainer, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../Common/Common.Styled'

/**
 * 테이블 스타일
 */
const STable = {
	Wrapper: styled.div`
		z-index: 10;
		position: relative;
		width: 100%;
		max-height: 240px;
		overflow-y: auto;
		overflow-x: hidden;
	`,
	Table: styled.table`
		max-width: 870px;
		min-width: 100%;
		border: 1px solid #c8c8c8;
		border-bottom: 0;
		border-spacing: 0;

		thead {
			z-index: 10;
			position: sticky;
			top: 0;
			left: 0;
		}

		tr {
			height: 30px;
			line-height: 30px;
		}

		th {
			background-color: #dbe2f0;
			font-weight: 500;
			padding: 0;
			border-bottom: 1px solid #c8c8c8;
		}

		td {
			text-align: center;
			font-size: 15px;
			padding: 0;
			border-bottom: 1px solid #c8c8c8;
		}

		th,
		td {
			padding: 0 4px;
			&:not(:last-child) {
				border-right: 1px solid #c8c8c8;
			}
		}
	`,
	Input: styled.div`
		z-index: 1;
		position: relative;
		label {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		input {
			position: absolute;
			top: 0;
			left: 0;
			width: 0;
			height: 0;
			opacity: 0;
		}
	`,
}

/**
 * 목적지 변경 모달
 * @param {*} param.value 현재 선택 값
 * @param {*} param.onSubmit 선택값 적용 핸들러
 */
const DestinationChange = ({ customerName, customerCode, value, onSubmit }) => {
	const [popupOn, setPopupOn] = useState(false)
	const [destination, setDestination] = useState(null)
	const { data: destinationData, isSuccess } = useUserDestinationQuery(customerCode)

	function handleSubmit(e) {
		e.preventDefault()
		if (!destination) {
			return alert('목적지를 선택해 주세요.')
		}
		onSubmit(destination)
		setPopupOn(false)
	}

	useEffect(() => {
		if (value && value?.uid && destinationData) {
			const matchedDestination = destinationData.find((v) => v?.uid === value.uid)
			setDestination(matchedDestination || null)
		} else {
			setDestination(null)
		}
	}, [value, destinationData])

	return (
		<>
			<CustomInput readOnly placeholder="h50" width={60} value={destination ? destination.code : ''} />
			<CustomInput readOnly placeholder="목적지명" width={120} value={destination ? destination.name : ''} />
			{/* 도착지 연락처에 바인딩할 데이터 불분명 */}
			{/* <CustomInput readOnly placeholder="도착지 연락처" width={120} /> */}
			<WhiteBlackBtn
				onClick={(v) => {
					setPopupOn(true)
				}}
			>
				찾기
			</WhiteBlackBtn>
			{popupOn && (
				<>
					<FadeOverlay />
					<ModalContainer style={{ width: '75%', maxHeight: '73%' }}>
						<BlueBarHeader style={{ height: '60px' }}>
							<div>목적지 변경</div>
							<div>
								<WhiteCloseBtn
									onClick={() => {
										setPopupOn(false)
									}}
									src="/svg/white_btn_close.svg"
								/>
							</div>
						</BlueBarHeader>
						<BlueSubContainer style={{ padding: '60px 50px 20px 50px' }}>
							<FilterContianer>
								<TableContianer>
									<TCSubContainer bor style={{ justifyContent: 'normal', gap: '20px' }}>
										<div>고객사 : {customerName}</div>
										<div>고객 코드 : {customerCode}</div>
									</TCSubContainer>
									<TCSubContainer>
										<TCSDiv>고객사 목적지 목록</TCSDiv>
									</TCSubContainer>
									{isSuccess && !destinationData && <div>고객사 목적지가 없습니다.</div>}
									{isSuccess && destinationData && (
										<STable.Wrapper>
											<STable.Table>
												<thead>
													<tr>
														<th>
															<STable.Input>
																<input type="radio" id="all" value="" readOnly />
																<label htmlFor="all">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="24"
																		height="24"
																		viewBox="0 0 24 24"
																		fill="#DBE2F0"
																	>
																		<rect x="3.5" y="3.5" width="17" height="17" rx="0.5" stroke="#C8C8C8" />
																	</svg>
																</label>
															</STable.Input>
														</th>
														<th>고객코드</th>
														<th>비고</th>
														<th>목적지 코드</th>
														<th>목적지명</th>
														<th>하차지 명</th>
														<th>담당자 연락처</th>
														<th>하차지 연락처</th>
														<th>상세주소</th>
													</tr>
												</thead>
												<tbody>
													{destinationData?.map((v, idx) => (
														<tr key={v?.uid || idx}>
															<td>
																<STable.Input>
																	<input
																		type="radio"
																		id={`des-${idx}`}
																		checked={destination && destination?.uid === v?.uid}
																		onChange={(e) => {
																			if (e.target.checked) setDestination(v)
																		}}
																	/>
																	<label htmlFor={`des-${idx}`}>
																		{destination && destination?.uid === v?.uid ? (
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="24"
																				height="24"
																				viewBox="0 0 24 24"
																				fill="none"
																			>
																				<rect x="3" y="3" width="18" height="18" rx="1" fill="#4C83D6" />
																				<path
																					d="M7 12.3636L11.1667 16L17 8"
																					stroke="white"
																					stroke-width="2"
																					stroke-linecap="round"
																					stroke-linejoin="round"
																				/>
																			</svg>
																		) : (
																			<svg
																				xmlns="http://www.w3.org/2000/svg"
																				width="24"
																				height="24"
																				viewBox="0 0 24 24"
																				fill="none"
																			>
																				<rect x="3.5" y="3.5" width="17" height="17" rx="0.5" stroke="#C8C8C8" />
																			</svg>
																		)}
																	</label>
																</STable.Input>
															</td>
															<td>{v?.code}</td>
															<td>{v?.represent ? '대표 목적지' : '-'}</td>
															<td>{v?.code}</td>
															<td>{v?.name}</td>
															<td>하차지명</td>
															<td>{v?.managerPhone}</td>
															<td>{v?.phone}</td>
															<td>{v?.address}</td>
														</tr>
													))}
												</tbody>
											</STable.Table>
										</STable.Wrapper>
									)}
								</TableContianer>
							</FilterContianer>
						</BlueSubContainer>
						<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
							<BlackBtn width={13} height={40} onClick={handleSubmit}>
								변경
							</BlackBtn>
						</div>
					</ModalContainer>
				</>
			)}
		</>
	)
}

export default DestinationChange

const TCSDiv = styled.div`
	padding: 15px 0px;
	font-weight: 700;
`
