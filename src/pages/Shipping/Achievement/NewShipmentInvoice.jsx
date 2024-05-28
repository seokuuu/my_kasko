import { GlobalFilterHeader } from '../../../components/Filter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import React, { useEffect, useState } from 'react'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { useAtomValue } from 'jotai/index'
import { toggleAtom } from '../../../store/Layout/Layout'
import { isEqual } from 'lodash'
import ShipmentInvoiceSearchFilter from './ShipmentInvoiceSearchFilter'
import TableV2 from '../../Table/TableV2'
import { BlackBtn, NewBottomBtnWrap } from '../../../common/Button/Button'
import { useNavigate } from 'react-router-dom'
import { ShippingInvoiceFields, ShippingInvoiceFieldsCols } from '../../../constants/admin/Shipping'
import ShippingInvoiceView from '../../../components/shipping/ShippingInvoiceView'
import { shipmentInvoiceListQueryV2 } from '../../../api/shipment'
import { add_element_field } from '../../../lib/tableHelpers'
import { ClaimContent2, ClaimRow, ClaimTable, ClaimTitle } from '../../../components/MapTable/MapTable'
import { formatWeight } from '../../../utils/utils'

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
			return data.reduce((acc, item) => {
				const key = `${item.outNumber}_${item.customerCode}_${item.customerDestinationAddress}`
				if (!acc[key]) {
					acc[key] = []
				}
				acc[key].push(item)
				return acc
			}, {})
		}
		get()
			.then((res) => {
				setData(groupedData(res))
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
				{Object.keys(data).map((key, index) => {
					const headerHeight = index !== 0 ? 0 : 30
					const tableHeight = 46 * data[key].length
					const height = headerHeight + tableHeight

					document.getElementsByClassName('ag-body-horizontal-scroll-viewport')[index].style.display = 'none'
					if (index !== 0) {
						document.getElementsByClassName('ag-header')[index].style.display = 'none'
					}
					return (
						<div key={index}>
							<TableV2
								hei2={height}
								getRow={add_element_field(data[key], ShippingInvoiceFields)}
								getCol={ShippingInvoiceFieldsCols}
							/>
							<ClaimTable>
								<ClaimRow>
									<ClaimTitle style={{ width: '15%' }}>추가비 + 공차비</ClaimTitle>
									<ClaimContent2>
										{data[key][0]?.extraType === '추가' ? '+' : '-'}
										{formatWeight(data[key][0]?.extraCost + data[key][0]?.extraFreightCost)}
									</ClaimContent2>
								</ClaimRow>
							</ClaimTable>
							<TCSubContainer style={{ display: 'none' }}>
								<ShippingInvoiceView customerCode={data[key][0].customerCode} outNumber={data[key][0].outNumber} />
							</TCSubContainer>
						</div>
					)
				})}
			</TableContianer>
			<NewBottomBtnWrap>
				<BlackBtn width={13} height={40} onClick={() => navigate('/shipping/achievement')}>
					돌아가기
				</BlackBtn>
			</NewBottomBtnWrap>
		</FilterContianer>
	)
}

export default NewShipmentInvoice
