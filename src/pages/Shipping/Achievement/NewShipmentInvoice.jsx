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
import ShippingInvoiceView from '../../../components/shipping/ShippingInvoiceView'
import { shipmentInvoiceListQueryV2 } from '../../../api/shipment'
import { formatWeight } from '../../../utils/utils'
import styled from 'styled-components'

const initData = {}

const NewShipmentInvoice = () => {
	const navigate = useNavigate()

	const exFilterToggle = useAtomValue(toggleAtom)

	const [param, setParam] = useState(initData)
	const [data, setData] = useState([])

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
			return await shipmentInvoiceListQueryV2(param)
		}
		const groupedData = (data) => {
			return data?.reduce((acc, item) => {
				const key = `${item.outNumber}_${item.customerCode}`
				if (!acc[key]) {
					acc[key] = []
				}
				acc[key].push(item)
				return acc
			}, {})
		}
		get()
			.then((res) => {
				res && setData(groupedData(res))
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
						<th>출고번호</th>
						<th>주문번호</th>
						<th>고객사명</th>
						<th>고객사코드</th>
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
					</tr>
					{data &&
						Object.keys(data).map((key, index) => {
							return (
								<React.Fragment key={index}>
									{data[key].map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.outNumber || ''}</td>
												<td>{item.orderNumber || ''}</td>
												<td>{item.customerName || ''}</td>
												<td>{item.customerCode || ''}</td>
												<td>{item.storageName || ''}</td>
												<td>{item.productNumber || ''}</td>
												<td>{item.grade || ''}</td>
												<td>{formatWeight(Number(item.weight)) || ''}</td>
												<td>{item.thickness || ''}</td>
												<td>{formatWeight(Number(item.width)) || ''}</td>
												<td>{formatWeight(Number(item.length)) || ''}</td>
												<td>{item.spec || ''}</td>
												<td>{formatWeight(Number(item.biddingPrice)) || ''}</td>
												<td>{formatWeight(Number(item.orderPrice)) || ''}</td>
												<td>{formatWeight(Number(item.orderPriceVat)) || ''}</td>
												<td>{formatWeight(Number(item.freightCost)) || ''}</td>
												<td>{formatWeight(Number(item.freightCostVat)) || ''}</td>
											</tr>
										)
									})}
									{data[key][0]?.extraCost && data[key][0]?.extraFreightCost && (
										<tr>
											<td colSpan={9}>추가비 + 공차비</td>
											<td colSpan={8}>
												{data[key][0]?.extraType === '추가' ? '+' : '-'}
												{formatWeight(data[key][0]?.extraCost + data[key][0]?.extraFreightCost)}
											</td>
										</tr>
									)}
									<div style={{ display: 'none' }}>
										<ShippingInvoiceView customerCode={data[key][0].customerCode} outNumber={data[key][0].outNumber} />
									</div>
								</React.Fragment>
							)
						})}
				</MyTable>
			</TableContianer>
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
						for (let i = 0; i < buttons.length; i++) {
							await new Promise((resolve) => {
								buttons[i].click()
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
