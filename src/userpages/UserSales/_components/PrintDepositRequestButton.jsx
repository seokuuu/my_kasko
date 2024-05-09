import { useQuery } from '@tanstack/react-query'
import moment from 'moment/moment'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import styled from 'styled-components'
import { client } from '../../../api'
import { BlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import { BlueSubContainer, WhiteCloseBtn } from '../../../modal/Common/Common.Styled'
import { FilterContianer, FilterHeaderAlert, TableContianer } from '../../../modal/External/ExternalFilter'
import { OutSide } from '../../../modal/Multi/SingleAllProduct'
import useAlert from '../../../store/Alert/useAlert'
import {
	calculateOrderPrice,
	calculateOrderRefundPrice,
	calculateOrderTotalPrice,
	calculateProductSplitPrice,
} from '../../../utils/orderPrice'

/**
 * @constant 입금요청서 요청 URL
 * @description auction:경매, salesDeposit:상시판매
 */
const REQUEST_DEPOSIT_URL = {
	aution: '/auction/successfulBid/deposit',
	salesDeposit: '/sale-product/order/deposit-request',
}

/**
 * @constant 총계 초기화 데이터
 */
const TOTAL_DATA = {
	price: 0, // 낙찰금액
	weight: 0, // 낙찰 중량
	orderPrice: 0, // 제품대(공급가액)
	freightCost: 0, // 운송비(공급가액)
	sumCost: 0, // 총합(공급가액)
	orderPriceVat: 0, // 제품대(VAT)
	freightCostVat: 0, // 운송비(VAT)
	sumCostVat: 0, // 총합(VAT)
	sum: 0, // 총계
}

/**
 * 총계 데이터 반환 함수
 * @param {object} serverData 서버 데이터
 * @returns {object} 총계 데이터
 */
function getTotalData(serverData) {
	const data = { ...TOTAL_DATA }
	if (serverData && Array.isArray(serverData.list)) {
		const splitProducts = []
		// 절단된 제품과 절단 하기 전 리스트
		const splitProductNumbers = serverData.list
			.filter((item) => item.splitStatus === 'Y')
			.map((item) => item.productNumber)
		if (splitProductNumbers.length > 0) {
			for (let number of splitProductNumbers) {
				const spiltList = serverData.list.filter((item) => item.productNumber.includes(number + '-'))
				splitProducts.push(...spiltList)
			}
		}
		const afterSplitProductNumber = splitProducts.map((item) => item.productNumber)
		const isSplitProduct = afterSplitProductNumber.length > 0

		for (const v of serverData.list) {
			const isSplitProductIn = isSplitProduct && afterSplitProductNumber.includes(v.productNumber)

			data.price += Number(v.totalPrice)
			data.weight += isSplitProduct && v.splitStatus === 'Y' ? 0 : Number(v.weight)

			const orderPrice = isSplitProductIn ? 0 : Number(v.orderPrice)
			const freightCost = isSplitProduct && v.splitStatus === 'Y' ? 0 : Number(v.freightCost)
			data.orderPrice += orderPrice
			data.freightCost += freightCost
			data.sumCost += Number(orderPrice + freightCost)

			const orderPriceVat = isSplitProductIn ? 0 : Number(v.orderPriceVat)
			const freightCostVat = isSplitProduct && v.splitStatus === 'Y' ? 0 : Number(v.freightCostVat)
			data.orderPriceVat += orderPriceVat
			data.freightCostVat += freightCostVat
			data.sumCostVat += Number(orderPriceVat + freightCostVat)

			data.sum += Number(orderPrice + freightCost + orderPriceVat + freightCostVat)
		}
	}
	for (const key in data) {
		data[key] = data[key].toLocaleString()
	}
	return data
}

/**
 * 상시판매|경매 입금 요청서 버튼 + 모달
 * @param {string} param.salesDeposit 상시판매 여부
 * @param {string} param.auctionNumber 경매번호|상시판매 번호 (경매|상시판매)
 * @param {string} param.storage 창고 (경메)
 * @param {string} param.customerDestinationUid 고객사 목적지 고유번호 (경매)
 * @param {string} param.biddingStatus 낙찰상태 (경매)
 */
export const PrintDepositRequestButton = ({
	salesDeposit = false,
	auctionNumber,
	storage = '',
	customerDestinationUid = '',
	biddingStatus = '',
	packagerNumber = '',
	saleStatus = '',
	packageNumber = '',
}) => {
	const containerRef = useRef(null)
	// pdf 추출

	const [checkModal, setCheckModal] = useState(false)
	const checkTypeOnClickHandler = () => {
		handleExtract()
	}

	const radioDummy = ['가로', '세로']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))
	const [checkRadioValue, setCheckRadioValue] = useState(Array.from({ length: radioDummy.length }, () => ''))

	useEffect(() => {
		const update = radioDummy.map((value, idx) => {
			return checkRadio[idx] ? value : ''
		})
		const filteredCheck = update.filter((item) => item !== '')
		setCheckRadioValue(filteredCheck)
	}, [checkRadio])

	// const handleExtract = () => {
	// 	const element = containerRef.current
	// 	const orientation = checkRadioValue[0] === '가로' ? 'landscape' : 'portrait'
	// 	html2pdf(element, {
	// 		filename: `입금요청서_${auctionDate}.pdf`, // default : file.pdf
	// 		html2canvas: { scale: 3 }, // 캡처한 이미지의 크기를 조절, 값이 클수록 더 선명하다.
	// 		jsPDF: {
	// 			format: 'a4', // 종이 크기 형식
	// 			orientation: orientation, // or landscape : 가로
	// 		},
	// 		callback: setCheckModal(false),
	// 	})
	// }

	// 경매|상시판매 번호
	const oneAuctionNumber = useRef('')
	// 입금요청서 발행 모드
	const [receiptPrint, setReceiptPrint] = useState(false)
	// 데이터

	const {
		data: infoData,
		refetch: requestData,
		isLoading,
		isSuccess,
		error,
	} = useQuery({
		queryKey: ['deposit-request'],
		queryFn: async () => {
			const requestUrl = salesDeposit ? REQUEST_DEPOSIT_URL.salesDeposit : REQUEST_DEPOSIT_URL.aution
			const { data } = salesDeposit
				? await client.get(
						`${requestUrl}/${oneAuctionNumber.current}?saleStatus=${saleStatus}&packageNumber=${packageNumber}`,
				  )
				: await client.post(requestUrl, {
						auctionNumber: oneAuctionNumber.current,
						storage: storage,
						customerDestinationUid: customerDestinationUid,
						biddingStatus: biddingStatus,
						packageNumber: packagerNumber,
				  })
			return data.data
		},
		enabled: Boolean(oneAuctionNumber.current),
		retry: false,
	})

	// 총계 데이터
	const totalData = useMemo(() => getTotalData(infoData), [infoData])
	// 일자 데이터
	const auctionDate = useMemo(
		() => (!infoData || !infoData.auctionDate ? null : moment(infoData.auctionDate).format('YYYY.MM.DD')),
		[infoData],
	)
	// ALERT
	const { simpleAlert } = useAlert()

	// 요청서 열기
	function handlePrint(num) {
		oneAuctionNumber.current = num
		requestData()
		setReceiptPrint(true)
	}

	// 버튼 클릭 핸들러
	function handlePrintClick(e) {
		if (receiptPrint) {
			setReceiptPrint(false)
			return
		}

		let num = auctionNumber

		if (Array.isArray(auctionNumber)) {
			if (auctionNumber.length === 1) {
				num = auctionNumber[0]
			} else {
				return simpleAlert('입금요청서를 발행할 주문건을 1개 선택해주세요.')
			}
		} else if (typeof num !== 'string' || num.length < 1) {
			return simpleAlert('입금요청서를 발행할 수 없습니다.')
		}

		handlePrint(num)
	}

	const handleExtract = useReactToPrint({
		content: () => containerRef.current,
		documentTitle: `${salesDeposit ? '상시 판매 입금 요청서' : '경매 입금 요청서'}_${auctionDate}.pdf`,
		// onAfterPrint: () => alert('파일 다운로드 후 알림창 생성 가능'),
	})

	return (
		<>
			<WhiteSkyBtn onClick={handlePrintClick}>입금 요청서 발행</WhiteSkyBtn>
			{receiptPrint && (
				<>
					<OutSide />
					<OutSideInner>
						<BlueBarHeader2 style={{ height: '20px' }}>
							<div>
								<WhiteCloseBtn
									onClick={(e) => {
										setReceiptPrint(false)
									}}
									src="/svg/white_btn_close.svg"
								/>
							</div>
						</BlueBarHeader2>
						<NewContainer style={{ padding: '0px 50px' }}>
							<BlueSubContainer ref={containerRef} style={{ width: '100%' }}>
								<FilterContianer>
									{/* 요청서 제목 | 일자 */}
									<FormTitle>
										<b>
											{salesDeposit ? '상시 판매' : '경매'} 입금 요청서 ({auctionDate || '-'} 일자
										</b>
										)
									</FormTitle>
									{/* 입금 정보 공지 */}
									<FilterHeaderAlert>
										<FormContentMainWrap style={{ display: 'flex' }}>
											<ImgWrap
												style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}
											>
												<img src="/img/notice.png" />
											</ImgWrap>
											<FormContentWrap>
												<div>
													<b>· 연락처 : </b>070-8889-3456{' '}
												</div>
												<div>
													<b>· 입금계좌번호 : </b> 우리은행 1005-301-817070, 신한은행 140-013-498612, 기업은행
													070-8889-3456, 예금주 : 카스코철강
												</div>
												<div>
													<b>· 입금 기한 : </b> 경매일 익영업일 12시 限
												</div>
											</FormContentWrap>
										</FormContentMainWrap>
									</FilterHeaderAlert>
									{/* 인사글 */}
									<Text>
										<div>
											<b>저희 주식회사 카스코철강 제품을 구매해 주시는 귀사에 항상 감사드립니다.</b>
										</div>
										<div>
											<b>
												해당 거래에 대해 귀사가 입금하셔야 할 {salesDeposit ? '상시판매 금액' : '낙찰 금액'}은 아래와
												같사오니, 확인하신 후 입금해 주시기 바랍니다.
											</b>
										</div>
									</Text>

									{!isSuccess ? (
										<p
											style={{
												width: '100%',
												height: 280,
												padding: '230px 20px',
												background: 'white',
												textAlign: 'center',
												wordBreak: 'keep-all',
											}}
										>
											{isLoading
												? '입금요청서 데이터를 불러오고 있습니다.'
												: '입금요청서 데이터를 불러올 수 없습니다.' +
												  (error?.data?.message ? `\n(${error.data.message})` : '')}
										</p>
									) : (
										<TableContianer>
											<ClaimTable style={{ margin: '20px 0px' }}>
												<ClaimRow>
													<ClaimTitle>{salesDeposit ? '상시판매 일자' : '경매일자'}</ClaimTitle>
													<ClaimContent>{infoData?.auctionDate}</ClaimContent>
													<ClaimTitle>고객명</ClaimTitle>
													<ClaimContent>{infoData?.customerName}</ClaimContent>
													<ClaimTitle>{salesDeposit ? '총 중량' : '낙찰 중량'}</ClaimTitle>
													<ClaimContent bold>{totalData.weight}</ClaimContent>
													<ClaimTitle>{salesDeposit ? '상시판매 금액' : '낙찰 금액'}</ClaimTitle>
													<ClaimContent bold>{calculateOrderPrice(infoData?.list)?.toLocaleString()}</ClaimContent>
												</ClaimRow>
											</ClaimTable>
											<TableContainer>
												<Table>
													<Thead>
														<tr>
															<Th rowSpan="2">제품 정보</Th>
															<Th rowSpan="2">품명</Th>
															<Th rowSpan="2">규격 약호</Th>
															<Th rowSpan="2">제품 사양</Th>
															<Th rowSpan="2">중량</Th>
															<Th colSpan="3">공급가액</Th>
															<Th colSpan="3">VAT</Th>
															<Th rowSpan="2">총계</Th>
														</tr>
														<tr>
															<Th>제품대</Th>
															<Th>운송비</Th>
															<Th>총합</Th>
															<Th>제품대</Th>
															<Th>운송비</Th>
															<Th>총합</Th>
														</tr>
													</Thead>
													<Tbody>
														{/* 테이블 내용 추가 */}
														{infoData?.list &&
															infoData.list.map((v) => (
																<tr key={v.uid}>
																	<Td>{v.productNumber}</Td>
																	<Td>{v.productName}</Td>
																	<Td>{v.productSpec}</Td>
																	<Td>{v.productWdh}</Td>
																	<Td>{parseInt(v.weight).toLocaleString()}</Td>

																	<Td>{v.orderPrice.toLocaleString()}</Td>
																	<Td>{v.freightCost.toLocaleString()}</Td>
																	<Td>{(v.orderPrice + v.freightCost).toLocaleString()}</Td>
																	<Td>{v.orderPriceVat.toLocaleString()}</Td>
																	<Td>{v.freightCostVat.toLocaleString()}</Td>
																	<Td>{(v.orderPriceVat + v.freightCostVat).toLocaleString()}</Td>
																	<Td>{v.totalPrice.toLocaleString()}</Td>
																</tr>
															))}
														{/* 총계 */}
														<tr style={{ border: '2px solid #c8c8c8' }}>
															<Th colSpan="4">총계</Th>
															<Td blue bold>
																{totalData.weight}
															</Td>
															<Td>{totalData.orderPrice}</Td>
															<Td>{totalData.freightCost}</Td>
															<Td>{totalData.sumCost}</Td>
															<Td>{totalData.orderPriceVat}</Td>
															<Td>{totalData.freightCostVat}</Td>
															<Td>{totalData.sumCostVat}</Td>
															<Td>{calculateOrderPrice(infoData?.list)?.toLocaleString()}</Td>
														</tr>
														<tr style={{ border: '2px solid #c8c8c8' }}>
															<Th colSpan="4">절단비</Th>
															<Td colSpan="8">{calculateProductSplitPrice(infoData?.list)?.toLocaleString()}</Td>
														</tr>
														<tr style={{ border: '2px solid #c8c8c8' }}>
															<Th colSpan="4">환불비</Th>
															<Td colSpan="8">- {calculateOrderRefundPrice(infoData?.list)?.toLocaleString()}</Td>
														</tr>
														<tr style={{ border: '2px solid #c8c8c8' }}>
															<Th colSpan="4">총 금액</Th>
															<Td colSpan="8">{calculateOrderTotalPrice(infoData?.list).toLocaleString()}</Td>
														</tr>
													</Tbody>
												</Table>
											</TableContainer>
										</TableContianer>
									)}
								</FilterContianer>
								<LogoDiv>
									<img src="/img/logo.png" style={{ width: '50px', height: '35px', marginTop: '10px' }} />
								</LogoDiv>
							</BlueSubContainer>
							<DepositRequestBottom>
								<div></div>
								<BlackBtn width={12} height={45} onClick={checkTypeOnClickHandler} style={{ cursor: 'pointer' }}>
									출력하기
								</BlackBtn>
								<div></div>
							</DepositRequestBottom>
						</NewContainer>
					</OutSideInner>

					{/* {checkModal && (
						<PrintType
							checkRadio={checkRadio}
							setCheckRadio={setCheckRadio}
							checkRadioValue={checkRadioValue}
							setCheckRadioValue={setCheckRadioValue}
							setCheckModal={setCheckModal}
							radioDummy={radioDummy}
							handleExtract={handleExtract}
						/>
					)} */}
				</>
			)}
		</>
	)
}

export default PrintDepositRequestButton

const FormTitle = styled.h1`
	font-size: 30px;
	padding: 40px;
	text-align: center;
`

const FormContentWrap = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 10px;
	padding: 0px 20px;

	@media print {
		font-size: 12px;
	}
`

const Text = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	color: ${(props) => props.theme.colors.PriStrong};
	font-size: 16px;
	padding: 20px 0px;
	gap: 5px;
	letter-spacing: -0.32px;
`
const TableContainer = styled.div`
	min-width: 100%;
	max-width: 100%;
	margin-top: 20px;
`

const Table = styled.table`
	border-collapse: collapse;
	min-width: 100%;
	max-width: 100%;
	font-size: 17px;

	@media print {
		font-size: 8px;
		width: 800px;
	}
`

const Th = styled.th`
	border: 1px solid #ddd;
	background-color: #f2f2f2;
	padding: 5.5px;
	font-weight: 500;
	border: 1px solid #c8c8c8;
	background-color: #dbe2f0;
`

const Thead = styled.thead``

const Tbody = styled.tbody``

const Td = styled.td`
	text-align: ${({ right }) => (right ? 'end' : 'center')};
	border: 1px solid #ddd;
	padding: 8px;
	color: ${({ theme, blue }) => (blue ? theme.colors.PriNormal : 'none')};
	font-weight: ${({ bold }) => (bold ? 900 : 'none')};
`

const SubheaderRow = styled.tr`
	background-color: #d9d9d9;
`
const DepositRequestBottom = styled.div`
	display: flex;
	justify-content: space-between;
	z-index: 9999;
	width: 100%;
	padding: 15px 30px;
`

const NewContainer = styled.div`
	top: 50%;
	left: 53%;
	background-color: #eef3fb;
	width: ${(props) => props.width}px;
	width: 1500px;
	height: 900px;
	overflow-y: scroll;
	z-index: 9998;
`

const OutSideInner = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 9999;
	display: flex;
	flex-direction: column;
`

const BlueBarHeader2 = styled.div`
	top: 5px;
	height: 70px;
	background-color: ${(props) => props.theme.colors.PriHeavy};
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
	color: white;
	z-index: 9999;
`

const FormContentMainWrap = styled.div``

const ImgWrap = styled.div`
	@media print {
		padding: 5px;
	}
`

const LogoDiv = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row-reverse;

	@media print {
		width: 97%;
	}
`
