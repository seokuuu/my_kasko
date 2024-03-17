import React, { useEffect, useRef, useState } from 'react'
import { WhiteSkyBtn } from '../../common/Button/Button'
import { useShipmentInvoiceListQuery } from '../../api/shipment'
import {
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../modal/Common/Common.Styled'
import { FilterContianer, TableContianer } from '../../modal/External/ExternalFilter'
import styled from 'styled-components'
import html2pdf from 'html2pdf.js'
import moment from 'moment'
import { formatWeight } from '../../utils/utils'
import useAlert from '../../store/Alert/useAlert'
import useTableSelection from '../../hooks/useTableSelection'

const ShippingInvoiceView = ({ customerCode, outNumber }) => {
	const { simpleAlert } = useAlert()

	const [open, setOpen] = useState(false)
	const { data } = useShipmentInvoiceListQuery({ customerCode, outNumber })

	const openInvoice = () => {
		if (customerCode && outNumber) {
			setOpen(true)
		} else {
			simpleAlert('출력할 항목을 선택해주세요.')
		}
	}

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			<WhiteSkyBtn onClick={openInvoice}>거래 명세서 출력</WhiteSkyBtn>
			{open && <InvoiceView data={data} closeModal={() => setOpen(false)} />}
		</div>
	)
}

export const ShippingInvoiceUserView = () => {
	const { simpleAlert } = useAlert()
	const { selectedData, hasSelected } = useTableSelection({
		weightKey: '중량',
	})

	const [param, setParam] = useState({
		customerCode: null,
		outNumber: null,
	})
	const [open, setOpen] = useState(false)

	const { data } = useShipmentInvoiceListQuery(param)

	const openInvoice = () => {
		if (!hasSelected) {
			simpleAlert('출력할 항목을 선택해주세요.')
			return
		}

		const customerCodes = [...new Set(selectedData.map((item) => item['고객코드']))]
		const outNumbers = [...new Set(selectedData.map((item) => item['출고 번호']))]

		if (outNumbers?.length > 1) {
			simpleAlert('거래명세서는 하나의 출고번호만 출력가능합니다.')
			return
		}

		const newParam = { customerCode: customerCodes[0], outNumber: outNumbers[0] }
		setParam(newParam)

		setTimeout(() => {
			setOpen(true)
		}, [500])
	}

	return (
		<div style={{ display: 'flex', gap: '10px' }}>
			<WhiteSkyBtn onClick={openInvoice}>거래 명세서 출력</WhiteSkyBtn>
			{open && <InvoiceView data={data} closeModal={() => setOpen(false)} />}
		</div>
	)
}

const InvoiceView = ({ data, closeModal }) => {
	const containerRef = useRef(null)
	const newDate = new Date()

	const totalWeight = data
		.map((item) => item.weight)
		.reduce((acc, cur) => Number(acc) + Number(cur), 0)
		.toLocaleString()

	const totalBiddingPrice = data
		.map((item) => item.totalOrderPrice)
		.reduce((acc, cur) => Number(acc) + Number(cur), 0)
		.toLocaleString()

	const getAmount = (item) => {
		return (item.totalOrderPrice + item.totalFreightCost + item.extraCost + item.extraFreightCost).toLocaleString()
	}

	const calculatePrice = () => {
		const productCost = data?.map((item) => item.totalOrderPrice).reduce((acc, cur) => acc + cur, 0)
		const freightCost = data?.map((item) => item.totalFreightCost).reduce((acc, cur) => acc + cur, 0)
		return productCost + freightCost
	}

	const calculateTotalPrice = () => {
		const totalPrice = calculatePrice()
		const extraCost = data[0]?.extraCost
		const extraFreightCost = data[0]?.extraFreightCost
		return totalPrice + extraCost + extraFreightCost
	}

	const handleExtract = () => {
		const element = containerRef.current
		html2pdf(element, {
			filename: `거래명세서_${data[0].outNumber}.pdf`, // default : file.pdf
			margin: [15, 0, 15, 0],
			html2canvas: {
				scrollY: 0, // 스크롤 이슈 때문에 필수,
				scale: 3, // 캡처한 이미지의 크기를 조절, 값이 클수록 더 선명하다.
			},
			jsPDF: {
				format: 'a2', // 종이 크기 형식
				orientation: 'portrait', // or landscape : 가로
			},
			callback: () => {
				console.log('PDF 다운로드 완료')
			},
		})
		closeModal()
	}

	useEffect(() => {
		handleExtract()
	}, [])

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '1400px', height: '90vh', background: '', opacity: 0 }}>
				<BlueBarHeader style={{ height: '20px' }}>
					<div></div>
					<div>
						<WhiteCloseBtn onClick={closeModal} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 30px' }} ref={containerRef}>
					<FilterContianer>
						<FormTitle>
							<b>거래명세서</b>
						</FormTitle>

						<Text style={{ alignItems: 'normal', justifyContent: 'left' }}>
							<div>
								<b style={{ fontSize: '18px' }}>발행일자 : {moment(newDate).format('DD/MM/YY')}</b>
							</div>
						</Text>
						<TableContianer>
							<InvoiceIOWrap>
								<InvoiceIO>
									<InvoiceIOHeadBodyWrap top>공급자</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>사업자 번호</InvoiceHead>
										<InvoiceBody>120-87-64328</InvoiceBody>
									</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>사업장 명</InvoiceHead>
										<InvoiceBody>주식회사 카스코철강</InvoiceBody>
									</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>성명</InvoiceHead>
										<InvoiceBody>강대수</InvoiceBody>
										<Seal style={{ minWidth: '150px', flex: '0' }}>
											<img src="/img/seal.png" />
										</Seal>
									</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>주소</InvoiceHead>
										<InvoiceBody>경기도 성남시 분당구 황새울로 200번길 28, 6층 602호 (수내동 오너스타워)</InvoiceBody>
									</InvoiceIOHeadBodyWrap>
								</InvoiceIO>
								<InvoiceIO>
									<InvoiceIOHeadBodyWrap top>공급받는자</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>사업자 번호</InvoiceHead>
										<InvoiceBody>
											{data[0].customerBusinessNumber?.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')}
										</InvoiceBody>
									</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>사업장 명</InvoiceHead>
										<InvoiceBody>{data[0].customerName}</InvoiceBody>
									</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>성명</InvoiceHead>
										<InvoiceBody>{data[0].ceoName}</InvoiceBody>
									</InvoiceIOHeadBodyWrap>
									<InvoiceIOHeadBodyWrap>
										<InvoiceHead>주소</InvoiceHead>
										<InvoiceBody>{data[0].customerAddress}</InvoiceBody>
									</InvoiceIOHeadBodyWrap>
								</InvoiceIO>
							</InvoiceIOWrap>
							<TableContainer>
								<Table>
									<thead>
										<SubheaderRow>
											<Th2>월</Th2>
											<Th2>일</Th2>
											<Th2>제품번호</Th2>
											<Th2>두께</Th2>
											<Th2>폭</Th2>
											<Th2>길이</Th2>
											<Th2>등급</Th2>
											<Th2>수량</Th2>
											<Th2>단가</Th2>
											<Th2>금액</Th2>
										</SubheaderRow>
									</thead>
									<tbody>
										{/* 테이블 내용 추가 */}
										{data?.map((item, idx) => (
											<tr key={idx}>
												<Td>{moment(item.orderDate).format('MM')}</Td>
												<Td>{moment(item.orderDate).format('DD')}</Td>
												<Td>{item.productNumber}</Td>
												<Td>{item.thickness}</Td>
												<Td>{item.width}</Td>
												<Td>{item.length}</Td>
												<Td>{item.grade}</Td>
												<Td>{item.weight}</Td>
												<Td>{item.totalOrderPrice.toLocaleString()}</Td>
												<Td>{getAmount(item)}</Td>
											</tr>
										))}
										{/* 다른 제품 추가 */}

										<tr style={{ border: '2px solid #c8c8c8' }}>
											<Th2 overall colSpan="7">
												총계
											</Th2>
											<Td blue bold>
												{totalWeight}
											</Td>
											<Td>{totalBiddingPrice}</Td>
											<Td blue bold>
												{formatWeight(calculateTotalPrice())}
											</Td>
										</tr>
									</tbody>
								</Table>
							</TableContainer>
						</TableContianer>
					</FilterContianer>
					<div style={{ float: 'right', padding: '20px 30px' }}>
						<img src="/img/logo.png" />
					</div>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

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
	margin-top: 20px;
`

const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	font-size: 17px;
`

const Th2 = styled.th`
	height: ${({ overall }) => (overall ? '' : '80px')};
	border: 1px solid #ddd;
	background-color: #f2f2f2;
	padding: 5.5px;
	font-weight: 500;
	border: 1px solid #c8c8c8;
	background-color: #dbe2f0;
	min-width: 120px;
`

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

const InvoiceIOWrap = styled.div`
	width: 100%;

	display: flex;
	gap: 16px;
`

const InvoiceIO = styled.div`
	width: 50%;
	height: 230px;
	display: flex;
	flex-direction: column; /* 추가된 부분 */
	flex: 1 1 1;
`
const InvoiceIOHeadBodyWrap = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	font-weight: ${({ top }) => (top ? 'bold' : 'none')};
	color: ${({ top }) => (top ? '#17479e' : 'none')};
	background-color: ${({ top }) => (top ? '#dbe2f0' : 'none')};
	border-collapse: collapse;
	flex: 1; /* 추가된 부분 */
`

const InvoiceHead = styled.div`
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
	width: 25%;
	border: 1px solid #6363633c;
	background-color: #dbe2f0;
`

const InvoiceBody = styled.div`
	display: flex;
	height: 100%;
	padding: 0px 90px;
	text-align: center;
	justify-content: center;
	align-items: center;
	border: 1px solid #6363633c;
	flex: 1 0 0;
`

const Seal = styled.div`
	display: flex;
	height: 100%;
	padding: 0px 40px;
	text-align: center;
	justify-content: center;
	align-items: center;

	img {
		position: absolute;
	}
`

export default ShippingInvoiceView
