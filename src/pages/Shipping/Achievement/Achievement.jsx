import React, { useEffect, useRef, useState } from 'react'

import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { achievementAddedAtom, selectedRowsAtom } from '../../../store/Layout/Layout'

import { Link, useNavigate } from 'react-router-dom'
import Hidden from '../../../components/TableInner/Hidden'
import {
	FilterContianer,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	RowWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import AchievementModal from '../../../modal/Multi/Achievement'
import { useAtom } from 'jotai'
import { useShipmentListQuery, useShipmentRemoveExtraCostMutation } from '../../../api/shipment'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterContainer, GlobalFilterFooter, GlobalFilterHeader } from '../../../components/Filter'
import {
	CustomerSearch,
	DateSearchSelect,
	DestinationSearch,
	ProductNumberListSearch,
	SpartSelect,
	StorageSelect,
} from '../../../components/Search'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import Table from '../../Table/Table'
import useAlert from '../../../store/Alert/useAlert'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '운송 완료',
	storage: '',
	spart: '',
	customerCode: '',
	customerName: '',
	destinationCode: '',
	destinationName: '',
	orderStartDate: '',
	orderEndDate: '',
	auctionStartDate: '',
	auctionEndDate: '',
	shipmentRequestStartDate: '',
	shipmentRequestEndDate: '',
	shippingStartDate: '',
	shippingEndDate: '',
	shipmentStartDate: '',
	shipmentEndDate: '',
	productNumberList: '',
}

const Achievement = () => {
	const navigate = useNavigate()
	const [addedModal, setAddedModal] = useAtom(achievementAddedAtom)
	const { simpleAlert, showAlert, simpleConfirm, showConfirm, redAlert } = useAlert()

	// Table
	const tableField = useRef(ShippingRegisterFieldsCols)
	const getCol = tableField.current
	const [getRow, setGetRow] = useState('')
	const selectedRows = useAtom(selectedRowsAtom)[0]

	// data fetch
	const [param, setParam] = useState(initData)
	const { data, refetch, isLoading } = useShipmentListQuery(param)
	const [selectedData, setSelectedData] = useState(null)
	const { mutate: removeExtarCost } = useShipmentRemoveExtraCostMutation() // 추가비 및 공차비 삭제

	// param change
	const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value, pageNum: 1 }))

	// reset event
	const onReset = async () => {
		await setParam(initData)
		await refetch()
	}

	const openExtarCostModal = () => {
		if (!selectedRows) {
			return simpleAlert('추가할 제품을 선택해주세요.')
		}
		if (selectedRows.length > 1) {
			return simpleAlert('하나의 제품만 선택해주세요.')
		}
		const selectedRow = selectedRows[0]
		const copiedData = data.list
		const findData = copiedData.find((item) => item.orderUid === selectedRow['주문 고유 번호'])
		setSelectedData(findData)
		setAddedModal(true)
	}

	const onRemoveExtraCost = () => {
		if (!selectedRows) {
			return simpleAlert('삭제할 제품을 선택해주세요.')
		}
		if (selectedRows.length > 1) {
			return simpleAlert('하나의 제품만 선택해주세요.')
		}
		const selectedRow = selectedRows[0]
		const copiedData = data.list
		const findData = copiedData.find((item) => item.orderUid === selectedRow['주문 고유 번호'])

		if (!findData.extraCost && !findData.extraFreightCost) {
			return simpleAlert('등록된 추가비 및 공차비가 존재하지 않습니다.')
		}

		redAlert('등록된 추가 및 공차비를 삭제하시겠습니까?', () => removeExtarCost(findData.orderUid))
	}

	const toInvoice = () => {
		if (!selectedRows) {
			return window.alert('삭제할 제품을 선택해주세요.')
		}
		const findNumbers = [...new Set(selectedRows.map((item) => `${item['고객코드']}/${item['출고번호']}`))]

		if (findNumbers.length > 1) {
			return window.alert('거래명세서는 하나의 출고번호와 고객사으로 확인할 수 있습니다.')
		}
		const findData = findNumbers[0].split('/')
		const customerCode = findData[0]
		const outNumber = findData[1]
		navigate(`/shipping/achievement/invoice?customerCode=${customerCode}&outNumber=${outNumber}`)
	}

	const toClaim = () => {
		if (!selectedRows) {
			return window.alert('클레임 등록할 제품을 선택해주세요.')
		}
		if (selectedRows.length > 1) {
			return window.alert('하나의 제품만 선택해주세요.')
		}
		const selectedRow = selectedRows[0]
		const copiedData = data.list
		const findData = copiedData.find((item) => item.orderUid === selectedRow['주문 고유 번호'])
		navigate(`/shipping/claim/register`, { state: findData })
	}

	useEffect(() => {
		const getData = data?.list
		if (getData && Array.isArray(getData)) {
			setGetRow(add_element_field(getData, ShippingRegisterFields))
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [param.pageNum, param.pageSize])

	return (
		<FilterContianer>
			{/* header */}
			<GlobalFilterHeader title={'출고 실적'} />
			<GlobalFilterContainer>
				<FilterSubcontianer>
					<FilterLeft>
						<RowWrap>
							<StorageSelect value={param.storage} onChange={(e) => onChange('storage', e.label)} />
							<SpartSelect value={param.spart} onChange={(e) => onChange('spart', e.label)} />
						</RowWrap>
						<RowWrap>
							<CustomerSearch
								name={param.customerName}
								code={param.customerCode}
								setName={(value) => onChange('customerName', value)}
								setCode={(value) => onChange('customerCode', value)}
							/>
							<DestinationSearch
								name={param.destinationName}
								code={param.destinationCode}
								setName={(value) => onChange('destinationName', value)}
								setCode={(value) => onChange('destinationCode', value)}
							/>
						</RowWrap>
						<RowWrap>
							<DateSearchSelect
								title={'주문 일자'}
								startInitDate={param.orderStartDate}
								endInitDate={param.orderEndDate}
								startDateChange={(value) => onChange('orderStartDate', value)}
								endDateChange={(value) => onChange('orderEndDate', value)}
							/>
							<DateSearchSelect
								title={'출고 일자'}
								startInitDate={param.shipmentStartDate}
								endInitDate={param.shipmentEndDate}
								startDateChange={(value) => onChange('shipmentStartDate', value)}
								endDateChange={(value) => onChange('shipmentEndDate', value)}
							/>
						</RowWrap>
						<RowWrap>
							<DateSearchSelect
								title={'경매 일자'}
								sta자rtInitDate={param.auctionStartDate}
								endInitDate={param.auctionEndDate}
								startDateChange={(value) => onChange('auctionStartDate', value)}
								endDateChange={(value) => onChange('auctionEndDate', value)}
							/>
							<DateSearchSelect
								title={'상시 판매 일자'}
								startInitDate={param.orderStartDate}
								endInitDate={param.orderEndDate}
								startDateChange={(value) => onChange('orderStartDate', value)}
								endDateChange={(value) => onChange('orderEndDate', value)}
							/>
						</RowWrap>
					</FilterLeft>
					<FilterRight>
						<ProductNumberListSearch
							value={param.productNumberList}
							onChange={(e) => onChange('productNumberList', e.target.value)}
						/>
					</FilterRight>
				</FilterSubcontianer>
			</GlobalFilterContainer>
			{/* footer */}
			<GlobalFilterFooter reset={onReset} onSearch={refetch} />
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>2</span> / 50개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown
							handleDropdown={(e) => setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))}
						/>
						<Excel />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onRemoveExtraCost}>추가비 및 공차비 삭제</WhiteRedBtn>
						<WhiteSkyBtn onClick={openExtarCostModal}>추가비 및 공차비 추가</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={getRow}
					loading={isLoading}
					tablePagination={data?.pagination}
					onPageChange={(value) => onChange('pageNum', value)}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteBlackBtn onClick={toClaim}>클레임 등록</WhiteBlackBtn>
						<WhiteSkyBtn onClick={toInvoice}>거래 명세서 보기</WhiteSkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			{addedModal && <AchievementModal setAddedModal={setAddedModal} data={selectedData} />}
		</FilterContianer>
	)
}

export default Achievement
