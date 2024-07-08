import { useAtomValue } from 'jotai/index'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import styled from 'styled-components'
import { shipmentInvoiceAllListQuery } from '../../../api/shipment'
import { WhiteSkyBtn } from '../../../common/Button/Button'
import { BlueBarHeader, FadeOverlay, ModalContainer, WhiteCloseBtn } from '../../../modal/Common/Common.Styled'
import { FilterContianer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import { selectedRowsAtom } from '../../../store/Layout/Layout'

export default function ReceiptExcelV2() {
	const { simpleAlert } = useAlert()
	const selectedRows = useAtomValue(selectedRowsAtom)
	const [open, setOpen] = useState(false)
	const [data, setData] = useState([])

	// 수취서 데이터 조회
	const getData = async (outUid) => {
		return await shipmentInvoiceAllListQuery(outUid)
	}

	const groupedData = (data, getKey) => {
		return data?.reduce((acc, item) => {
			const key = getKey(item)
			if (!acc[key]) {
				acc[key] = []
			}
			acc[key].push(item)
			return acc
		}, {})
	}

	const handleClick = async () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('출력할 제품을 선택해주세요.')
		}
		if (!selectedRows || selectedRows?.length > 1) {
			return simpleAlert('수취서 출력은 하나만 가능합니다.')
		}
		const selectItem = selectedRows[0]
		const outUid = selectItem['출고 고유번호']

		const rawData = await getData(outUid)
		setData(groupedData(rawData, (item) => `${item.customerCode}`))
		setOpen(true)
	}

	return (
		<>
			{open && <ReceiptForm data={data} closeModal={() => setOpen(false)} />}
			<WhiteSkyBtn onClick={handleClick}>수취서 출력</WhiteSkyBtn>
		</>
	)
}

function ReceiptForm({ data, closeModal }) {
	const containerRef = useRef(null)
	const receiptMode = ['물품수취서', '거래명세서', '거래명세서', '인수증']

	const handleExtract = useReactToPrint({
		content: () => containerRef.current,
		documentTitle: `수취서_${data[Object.keys(data)[0]][0].outNumber}.pdf`,
		onAfterPrint: () => {
			window.location.reload()
		},
	})

	useEffect(() => {
		handleExtract()
	}, [])

	return (
		<>
			<FadeOverlay />
			<ModalContainer
				style={{
					width: '1600px',
					opacity: 0,
					// maxHeight: '90vh',
					height: 740,
					background: '#eef3fb',
					flexDirection: 'column',
					alignItems: 'flex-end',
				}}
			>
				<BlueBarHeader style={{ height: '20px' }}>
					<div></div>
					<div>
						<WhiteCloseBtn onClick={closeModal} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<Container ref={containerRef}>
					{data &&
						Object.keys(data).map((key) => {
							const list = data[key]
							const totalWeight = list
								.map((item) => item.weight)
								.reduce((acc, cur) => Number(acc) + Number(cur), 0)
								.toLocaleString()
							return receiptMode.map((title, index) => (
								<BlueSubContainer2 key={index}>
									<FilterContianer>
										<FormTitle>
											<b>{title}</b>
										</FormTitle>
									</FilterContianer>
									<MyTable>
										<tr>
											<th>창고명</th>
											<td>{list[0].storageName}</td>
										</tr>
										<tr>
											<th>일련번호</th>
											<td>{list[0].outNumber}</td>
											<td colSpan={4} style={{ border: 0, background: '#fff' }}></td>
											{title === '거래명세서' && index === 1 && <td>정문회수용</td>}
											{title === '거래명세서' && index === 2 && <td>공급받는자용</td>}
											{title === '인수증' && <td>회수용</td>}
										</tr>
										<tr>
											<th>출고일자</th>
											<th>거래처</th>
											<th>인도조건</th>
											<th>차량번호</th>
											<th>도착지</th>
											<th>도착지 전화번호</th>
											<th>담당자연락처</th>
										</tr>
										<tr>
											<td>{moment(list[0].outDate).format('YYYY-MM-DD') || ''}</td>
											<td>{list[0].customerName || ''}</td>
											<td>도착도</td>
											<td>{list[0].carNumber}</td>
											<td>{list[0].destinationName}</td>
											<td>{list[0].customerDestinationPhone}</td>
											<td>{list[0].customerDestinationManagerPhone}</td>
										</tr>
										<tr>
											<th>도착지상세주소</th>
											<td colSpan={6}>
												{list[0].customerDestinationAddress || ''}
												{'   '}
												{list[0].customerDestinationAddressDetails || ''}
											</td>
										</tr>
										<tr>
											<th>상차중량(Kg)</th>
											<td>{totalWeight}</td>
											<th>총수량</th>
											<td>{list?.length || 0}</td>
											<th>도착지명</th>
											<td colSpan={2}>{list[0].customerDestinationName || ''}</td>
										</tr>
									</MyTable>
									<div style={{ height: '750px' }}>
										<MyTable style={{ marginTop: '14px' }}>
											<tr>
												<th>NO.</th>
												<th>주문번호</th>
												<th>품명</th>
												<th>제품번호</th>
												<th>규격약호</th>
												<th>등급</th>
												<th>두께</th>
												<th>폭</th>
												<th>길이</th>
												<th>중량</th>
											</tr>
											{list?.map((item, idx) => (
												<tr key={idx}>
													<td>{idx + 1}</td>
													<td>{item.orderNumber}</td>
													<td>{item.spart}</td>
													<td>{item.productNumber}</td>
													<td>{item.spec}</td>
													<td>{item.grade}</td>
													<td>{item.width}</td>
													<td>{item.thickness}</td>
													<td>{item.length}</td>
													<td>{item.weight}</td>
												</tr>
											))}
											<tr>
												<th colSpan={2}>합계</th>
												<td colSpan={7}></td>
												<td>{totalWeight}</td>
											</tr>
										</MyTable>
									</div>

									<DepositRequestBottom>
										<div style={{ width: '33%' }}>
											<img src="/img/logo.png" width={48} height={40} />
										</div>
										<PageText>
											{index + 1} / {receiptMode.length}
										</PageText>
										<MyTable style={{ marginTop: '14px', width: '400px' }}>
											<tr>
												<th rowSpan={2}>인수확인</th>
												<td>
													월 {'    '} 일 {'    '} (인)
												</td>
											</tr>
											<tr>
												<td>도착제품이 이상없을 확인합니다.</td>
											</tr>
										</MyTable>
									</DepositRequestBottom>
								</BlueSubContainer2>
							))
						})}
				</Container>
			</ModalContainer>
		</>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	margin: 0;

	@media print {
		@page {
			size: A4;
			margin: 0;
		}
		body {
			margin: 0;
			padding: 0;
			width: 210mm;
			height: 297mm;
		}
	}
`

const FormTitle = styled.h1`
	font-size: 30px;
	padding: 20px;
	text-align: center;
`
const MyTable = styled.table`
	border-collapse: collapse;
	width: 100%;
	font-size: 17px;

	& th {
		padding: 6px;
		font-weight: 500;
		border: 1px solid #c8c8c8;
		background-color: #dbe2f0;
	}
	& td {
		padding: 6px;
		font-weight: 500;
		border: 1px solid #c8c8c8;
		background-color: #fff;
		text-align: center;
	}
`

const DepositRequestBottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: end;
	z-index: 9999;
	width: 100%;
	height: 70px;
`

const PageText = styled.div`
	width: 33%;
	text-align: center;
	font-size: 18px;
	font-weight: 500;
`

const BlueSubContainer2 = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 30px;
	width: 210mm;
	height: 297mm;
`
