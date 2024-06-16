import { GlobalFilterHeader } from '../../../components/Filter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import React, { useEffect, useState } from 'react'
import { FilterContianer, TableContianer } from '../../../modal/External/ExternalFilter'
import { useAtomValue } from 'jotai/index'
import { toggleAtom } from '../../../store/Layout/Layout'
import { isEqual } from 'lodash'
import ShipmentInvoiceSearchFilter from './ShipmentInvoiceSearchFilter'
import { BlackBtn, NewBottomBtnWrap } from '../../../common/Button/Button'
import { useNavigate } from 'react-router-dom'
import { shipmentInvoiceListQueryV2 } from '../../../api/shipment'
import { delay, formatWeight } from '../../../utils/utils'
import styled from 'styled-components'
import ShippingInvoiceViewV2 from '../../../components/shipping/ShippingInvoiceViewV2'

const initData = {}

const calculationNumber = (key) => {
	const tableCols = document.querySelectorAll(`.${key}`)
	if (tableCols.length > 0) {
		const values = Array.from(tableCols).map((element) => {
			return parseInt(element.textContent.replace(/,/g, ''))
		})
		return values.reduce((acc, cur) => Number(acc) + Number(cur), 0).toLocaleString()
	}
}

const NewShipmentInvoice = () => {
	const navigate = useNavigate()

	const exFilterToggle = useAtomValue(toggleAtom)

	const [param, setParam] = useState(initData)
	const [data, setData] = useState([]) // 묶음 데이터
	const [invoiceData, setInvoiceData] = useState([]) // 원본데이터
	const [theEnd, setTheEnd] = useState(false)

	const resetOnClick = () => setParam(initData)

	const searchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	useEffect(() => {
		const get = async () => {
			const isEnabled = (param.shipmentStartDate && param.shipmentEndDate) || param.customerCode

			if (!isEnabled) return

			setTheEnd(false)

			return await shipmentInvoiceListQueryV2(param)
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
		get()
			.then((data) => {
				if (data) {
					setData(groupedData(data, (item) => `${item.outNumber}_${item.customerCode}`))
					setInvoiceData(groupedData(data, (item) => `${item.customerCode}`))
				}
			})
			.catch((e) => console.error(e))
	}, [param])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'거래명세서'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					setParam={setParam}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <ShipmentInvoiceSearchFilter {...props} />}
				/>
			)}
			<TableContianer>
				<MyTable>
					<tr>
						<th>경매번호</th>
						<th>출고번호</th>
						<th>주문번호</th>
						<th>고객사명</th>
						{/*<th>고객사코드</th>*/}
						<th>창고</th>
						<th>제품번호</th>
						<th>등급</th>
						<th>중량</th>
						<th>두께</th>
						<th>폭</th>
						<th>길이</th>
						<th>규격약호</th>
						<th>낙찰가</th>
						<th>제품공급가</th>
						<th>제품부가세</th>
						<th>운임비공급가</th>
						<th>운임비부가세</th>
						<th>총합계금액</th>
					</tr>
					{data &&
						Object.keys(data).map((key, index) => {
							if (index === Object.keys(data).length - 1) {
								delay(300).then(() => setTheEnd(true))
							}
							return (
								<React.Fragment key={index}>
									{data[key].map((item, index) => {
										const totalAmount =
											Number(item.orderPrice) +
											Number(item.orderPriceVat) +
											Number(item.freightCost) +
											Number(item.freightCostVat)
										return (
											<tr key={index}>
												<td>{item.auctionNumber || ''}</td>
												<td>{item.outNumber || ''}</td>
												<td>{item.orderNumber || ''}</td>
												<td>{item.customerName || ''}</td>
												{/*<td>{item.customerCode || ''}</td>*/}
												<td>{item.storageName || ''}</td>
												<td>{item.productNumber || ''}</td>
												<td>{item.grade || ''}</td>
												<td>{formatWeight(Number(item.weight)) || ''}</td>
												<td>{item.thickness || ''}</td>
												<td>{formatWeight(Number(item.width)) || ''}</td>
												<td>{formatWeight(Number(item.length)) || ''}</td>
												<td>{item.spec || ''}</td>
												<td>{formatWeight(Number(item.biddingPrice) / 1000) || ''}</td>
												<td className={'orderPrice'}>{formatWeight(Number(item.orderPrice)) || ''}</td>
												<td className={'orderPriceVat'}>{formatWeight(Number(item.orderPriceVat)) || ''}</td>
												<td className={'freightCost'}>{formatWeight(Number(item.freightCost)) || ''}</td>
												<td className={'freightCostVat'}>{formatWeight(Number(item.freightCostVat)) || ''}</td>
												<td className={'totalAmount'}>{formatWeight(totalAmount)}</td>
											</tr>
										)
									})}
									{data[key][0]?.extraCost && (
										<tr>
											<td colSpan={11}></td>
											<td>추가비</td>
											<td></td>
											<td></td>
											<td></td>
											<td className={'freightCost'}>
												{data[key][0]?.extraType === '추가' ? '' : '-'}
												{formatWeight(data[key][0]?.extraCost)}
											</td>
											<td className={'freightCostVat'}>
												{data[key][0]?.extraType === '추가' ? '' : '-'}
												{formatWeight(data[key][0]?.extraCost * 0.1)}
											</td>
											<td></td>
										</tr>
									)}
									{data[key][0]?.extraFreightCost && (
										<tr>
											<td colSpan={11}></td>
											<td>공차비</td>
											<td></td>
											<td></td>
											<td></td>
											<td className={'freightCost'}>{formatWeight(data[key][0]?.extraFreightCost)}</td>
											<td className={'freightCostVat'}>{formatWeight(data[key][0]?.extraFreightCost * 0.1)}</td>
											<td></td>
										</tr>
									)}
								</React.Fragment>
							)
						})}
					{data && Object.keys(data)?.length > 0 && theEnd && (
						<tr>
							<td colSpan={13}>총 금액</td>
							<td>{calculationNumber('orderPrice')}</td>
							<td>{calculationNumber('orderPriceVat')}</td>
							<td>{calculationNumber('freightCost')}</td>
							<td>{calculationNumber('freightCostVat')}</td>
							<td>{calculationNumber('totalAmount')}</td>
						</tr>
					)}
				</MyTable>
			</TableContianer>
			{invoiceData &&
				Object.keys(invoiceData).map((key, index) => {
					return (
						<div style={{ display: 'none' }} key={index}>
							<ShippingInvoiceViewV2 list={invoiceData[key]} />
						</div>
					)
				})}
			<NewBottomBtnWrap style={{ margin: '48px 0', border: 0 }}>
				<BlackBtn
					width={13}
					height={40}
					style={{ border: '1px solid #333', background: '#fff', color: '#333' }}
					onClick={() => navigate('/shipping/achievement')}
				>
					돌아가기
				</BlackBtn>
				<BlackBtn
					width={13}
					height={40}
					onClick={async () => {
						const buttons = document.querySelectorAll('.shipment_invoice')
						for (const element of buttons) {
							await new Promise((resolve) => {
								element.click()
								setTimeout(resolve, 3000)
							})
						}
					}}
				>
					출력
				</BlackBtn>
			</NewBottomBtnWrap>
		</FilterContianer>
	)
}

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

export default NewShipmentInvoice
