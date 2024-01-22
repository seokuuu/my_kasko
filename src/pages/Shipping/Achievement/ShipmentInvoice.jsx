import React, { useEffect, useState } from 'react'
import { ClaimContent2, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import { FilterContianer, TableContianer } from '../../../modal/External/ExternalFilter'
import { GlobalFilterHeader } from '../../../components/Filter'
import InvoiceDetailHeader from './InvoiceDetailHeader'
import { useShipmentInvoiceListQuery } from '../../../api/shipment'
import { useSearchParams } from 'react-router-dom'
import Table from '../../Table/Table'
import { add_element_field } from '../../../lib/tableHelpers'
import { ShippingInvoiceFields, ShippingInvoiceFieldsCols } from '../../../constants/admin/Shipping'
import { formatWeight } from '../../../utils/utils'

const ShipmentInvoice = () => {
	const [getRow, setGetRow] = useState('')

	const [searchParams] = useSearchParams()
	const customerCode = searchParams.get('customerCode')
	const outNumber = searchParams.get('outNumber')

	const { data, isLoading } = useShipmentInvoiceListQuery({ customerCode, outNumber })
	const [details, setDetails] = useState()

	const calculatePrice = () => {
		const productCost = data?.map((item) => item.orderPrice + item.orderPriceVat).reduce((acc, cur) => acc + cur, 0)
		const freightCost = data?.map((item) => item.freightCost + item.freightCostVat).reduce((acc, cur) => acc + cur, 0)
		return productCost + freightCost
	}

	const calculateTotalPrice = () => {
		const totalPrice = calculatePrice()
		const extraCost = details?.extraCost
		const extraFreightCost = details?.extraFreightCost
		return totalPrice + extraCost + extraFreightCost
	}

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setGetRow(add_element_field(data, ShippingInvoiceFields))
			setDetails(data[0])
		}
	}, [data])

	return (
		<FilterContianer>
			{/* header */}
			<GlobalFilterHeader title={'거래명세서'} enableSearchFilters={false} />
			{/* invoice header */}
			<InvoiceDetailHeader data={data} />
			{/* table */}
			<TableContianer>
				<Table getCol={ShippingInvoiceFieldsCols} getRow={getRow} loading={isLoading} />
			</TableContianer>
			{/* invoice footer */}
			<TableWrap style={{ marginTop: '10px' }}>
				<ClaimTable>
					<ClaimRow>
						<ClaimTitle style={{ width: '15%' }}>총 합계</ClaimTitle>
						<ClaimContent2>{formatWeight(calculatePrice())}</ClaimContent2>
					</ClaimRow>
					<ClaimRow>
						<ClaimTitle style={{ width: '100%' }}>추가비 및 공차비</ClaimTitle>
					</ClaimRow>
					<ClaimRow>
						<ClaimTitle style={{ width: '15%' }}>추가비</ClaimTitle>
						<ClaimContent2>
							{details?.extraType === '추가' ? '+' : '-'}
							{formatWeight(details?.extraCost)}
						</ClaimContent2>
					</ClaimRow>
					<ClaimRow>
						<ClaimTitle style={{ width: '15%' }}>공차비</ClaimTitle>
						<ClaimContent2>{formatWeight(details?.extraFreightCost)}</ClaimContent2>
					</ClaimRow>
					<ClaimRow>
						<ClaimTitle style={{ width: '15%' }}>총 합계</ClaimTitle>
						<ClaimContent2>{formatWeight(calculateTotalPrice())}</ClaimContent2>
					</ClaimRow>
				</ClaimTable>
			</TableWrap>
		</FilterContianer>
	)
}

export default ShipmentInvoice
