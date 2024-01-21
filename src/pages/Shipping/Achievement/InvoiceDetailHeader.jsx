import React, { useEffect, useState } from 'react'
import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import moment from 'moment'

const InvoiceDetailHeader = ({ data }) => {
	const [headerData, setHeaderData] = useState()

	useEffect(() => {
		if (data) {
			setHeaderData(data[0])
		}
	}, [data])

	return (
		data && (
			<TableWrap style={{ marginTop: '5px' }}>
				<ClaimTable>
					<ClaimRow>
						<ClaimTitle>출고일자</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{moment(headerData?.outDate).format('YYYY-MM-DD') ?? '-'}</p>
							</div>
						</ClaimContent>
						<ClaimTitle>출고번호</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.outNumber ?? '-'}</p>
							</div>
						</ClaimContent>
						<ClaimTitle>고객사</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.customerName ?? '-'}</p>
							</div>
						</ClaimContent>
					</ClaimRow>
					<ClaimRow>
						<ClaimTitle>목적지 명</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.destinationName ?? '-'}</p>
							</div>
						</ClaimContent>
						<ClaimTitle>하차지 주소</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.customerDestinationAddress ?? '-'}</p>
							</div>
						</ClaimContent>

						<ClaimTitle>도착지 연락처</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.customerDestinationPhone ?? '-'}</p>
							</div>
						</ClaimContent>
					</ClaimRow>
					<ClaimRow>
						<ClaimTitle>운전사 명</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.driverName ?? '-'}</p>
							</div>
						</ClaimContent>
						<ClaimTitle>차량번호</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.carNumber ?? '-'}</p>
							</div>
						</ClaimContent>
						<ClaimTitle>기사 연락처</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.driverPhone ?? '-'}</p>
							</div>
						</ClaimContent>
					</ClaimRow>
				</ClaimTable>
			</TableWrap>
		)
	)
}

export default InvoiceDetailHeader
