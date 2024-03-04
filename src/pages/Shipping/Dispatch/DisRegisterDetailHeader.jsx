import { ClaimContent, ClaimRow, ClaimTable, ClaimTitle, TableWrap } from '../../../components/MapTable/MapTable'
import React, { useEffect, useState } from 'react'
import { calculateTotal } from '../Request/utils'
import { formatWeight } from '../../../utils/utils'
import { useMergeListQuery } from '../../../api/shipment'
import { RadioSearchButton } from '../../../components/Search'
import { useAtomValue } from 'jotai/index'
import { authAtom } from '../../../store/Auth/auth'

const DisRegisterDetailHeader = ({ data, dockStatus, setDockStatus }) => {
	const auth = useAtomValue(authAtom)
	const { data: mergeCostList } = useMergeListQuery()
	const [mergeCost, setMergeCost] = useState(0)
	const [customerDestinations, setCustomerDestinations] = useState([])
	const [headerData, setHeaderData] = useState()

	const getCustomer = () => {
		const customerDestinationDuplicate = [
			...new Set(data.map((item) => `${item.customerName}/${item.customerCode}/${item.destinationName}`)),
		]

		const newCustomerDestination = customerDestinationDuplicate.map((item) => {
			const data = item?.split('/')
			return { customerName: data[0], customerCode: data[1], destination: data[2] }
		})

		setCustomerDestinations(newCustomerDestination)
	}

	// 합짐비 get
	const getMergeCost = () => {
		// 목적지 개수가 2보다 작을 시 1착으로 지정 1착은 합짐비 포함x
		const destinations = [...new Set(customerDestinations.map((item) => item.destination))]
		const destinationsLength = destinations.length
		const land = destinationsLength + '착'
		if (destinationsLength < 2) {
			return setMergeCost(0)
		}

		// mergeCostList에서 land가 포함되어 있는 합짐비 데이터 추출
		const getLand = mergeCostList?.filter((item) => item.land === land)
		if (getLand.length === 0) {
			setMergeCost(0)
			window.alert('합짐비 데이터가 없습니다. 관리자에게 문의바랍니다.')
			window.location.reload()
			return
		}
		const { inAreaPrice, outAreaPrice } = getLand[0]

		// destinations 배열에서 타사 시군 개수 구하기
		const sameCountArray = []
		destinations.forEach((destination) => {
			const address = destination?.split(' ')
			const key = `${address[0]} ${address[1]}` // 시군구와 동을 조합한 키 생성
			if (!sameCountArray.includes(key)) {
				sameCountArray.push(key)
			}
		})

		// 동일 시군 일 시 inAreaPrice & 타사 시군 일 시 outAreaPrice
		const mergeCost = sameCountArray.length > 1 ? outAreaPrice : inAreaPrice
		setMergeCost(mergeCost)
	}

	useEffect(() => {
		if (customerDestinations?.length > 0 && mergeCostList) {
			getMergeCost()
		}
	}, [customerDestinations])

	useEffect(() => {
		if (data) {
			setHeaderData(data[0])
			setDockStatus(data[0]?.dockStatus)
			getCustomer()
		}
	}, [data])

	return (
		data && (
			<TableWrap style={{ marginTop: '5px' }}>
				<ClaimTable>
					{customerDestinations?.map((item, i) => (
						<ClaimRow key={i}>
							<ClaimTitle>고객사 명 {i + 1}</ClaimTitle>
							<ClaimContent>
								<div style={{ display: 'flex', marginLeft: '5px' }}>
									<p>{item?.customerName ?? '-'}</p>
								</div>
							</ClaimContent>
							<ClaimTitle>고객사 코드 {i + 1}</ClaimTitle>
							<ClaimContent>
								<div style={{ display: 'flex', marginLeft: '5px' }}>
									<p>{item?.customerCode ?? '-'}</p>
								</div>
							</ClaimContent>
							<ClaimTitle>목적지 {i + 1}</ClaimTitle>
							<ClaimContent>
								<div style={{ display: 'flex', marginLeft: '5px' }}>
									<p>{item?.destination ?? '-'}</p>
								</div>
							</ClaimContent>
						</ClaimRow>
					))}
					<ClaimRow>
						<ClaimTitle>출하요청일자</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>{headerData?.shipmentRequestDate ?? '-'}</p>
							</div>
						</ClaimContent>
						<ClaimTitle>출고일자</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<p>-</p>
							</div>
						</ClaimContent>
						<ClaimTitle>상차도 여부</ClaimTitle>
						<ClaimContent>
							<div style={{ display: 'flex', marginLeft: '5px' }}>
								<RadioSearchButton
									title={''}
									options={[
										{ label: 'Y', value: true },
										{ label: 'N', value: false },
									]}
									value={dockStatus}
									onChange={(value) => setDockStatus(value)}
								/>
							</div>
						</ClaimContent>
					</ClaimRow>
					{auth.role === '카스코철강' && (
						<ClaimRow>
							<ClaimTitle>매출운입비</ClaimTitle>
							<ClaimContent>
								<div style={{ display: 'flex', marginLeft: '5px' }}>
									<p>{calculateTotal(data, 'outboundFreightAmount')}</p>
								</div>
							</ClaimContent>
							<ClaimTitle>매입운임비</ClaimTitle>
							<ClaimContent>
								<div style={{ display: 'flex', marginLeft: '5px' }}>
									<p>{calculateTotal(data, 'inboundFreightAmount')}</p>
								</div>
							</ClaimContent>
							<ClaimTitle>합짐비</ClaimTitle>
							<ClaimContent>
								<div style={{ display: 'flex', marginLeft: '5px' }}>
									<p>{formatWeight(mergeCost ?? 0)}</p>
								</div>
							</ClaimContent>
						</ClaimRow>
					)}
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

export default DisRegisterDetailHeader
