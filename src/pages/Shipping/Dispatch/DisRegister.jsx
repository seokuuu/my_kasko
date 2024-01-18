import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import {
	FilterContianer,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	RowWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import { StandardDispatchDetailAtom } from '../../../store/Layout/Layout'
import { useAtom, useAtomValue } from 'jotai'
import DispatchDetail from '../../../modal/Multi/DispatchDetail'
import { GlobalFilterContainer, GlobalFilterFooter, GlobalFilterHeader } from '../../../components/Filter'
import { ShippingDispatchFields, ShippingDispatchFieldsCols } from '../../../constants/admin/Shipping'
import {
	useRemoveDispatchMutation,
	useShipmentDispatchListQuery,
	useShipmentStatusUpdateMutation,
} from '../../../api/shipment'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	CustomerSearch,
	DateSearchSelect,
	DestinationSearch,
	ProductNumberListSearch,
	RadioSearchButton,
	SpartSelect,
	StorageSelect,
} from '../../../components/Search'
import Table from '../../Table/Table'
import DisRegisterDetail from './DisRegisterDetail'

const initData = {
	pageNum: 1,
	pageSize: 10,
	shipmentStatus: '출고 요청',
	storage: '',
	customerCode: '',
	customerName: '',
	destinationCode: '',
	destinationName: '',
	shipmentRequestStartDate: '',
	shipmentRequestEndDate: '',
	dockStatus: '',
	mergeStatus: '',
	driverStatus: '',
	spart: '',
	productNumberList: '',
}

const DisRegister = ({}) => {
	// 배차 기사 모달
	const [isPostModal, setIsPostModal] = useAtom(StandardDispatchDetailAtom)
	const [id, setId] = useState(null) // 체크 박스 선택한 id 값

	// Table
	const tableField = useRef(ShippingDispatchFieldsCols)
	const getCol = tableField.current
	const [getRow, setGetRow] = useState('')
	const rowChecked = useAtomValue(selectedRowsAtom)

	// data fetch
	const [param, setParam] = useState(initData)
	const { isLoading, data, refetch } = useShipmentDispatchListQuery(param)
	const { mutate: removeDispatch } = useRemoveDispatchMutation() // 배차 취소
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation() // 출고 상태 변경

	// param change
	const onChange = (key, value) => setParam((prev) => ({ ...prev, [key]: value, page: 1 }))

	const onRemoveDispatch = () => {
		if (!rowChecked || rowChecked?.length === 0) {
			return window.alert('배차 취소할 제품을 선택해주세요.')
		}
		const selectItem = rowChecked[0]
		const driverStatus = Boolean(selectItem.driverStatus)

		if (!driverStatus) {
			return window.alert('취소하기 전 배차를 등록해주세요.')
		}
		if (window.confirm('배차 취소를 하시겠습니까?')) {
			removeDispatch(selectItem['출고 고유번호'])
		}
	}

	const onSetDispatch = () => {
		if (!rowChecked || rowChecked?.length === 0) {
			return window.alert('배차 등록할 제품을 선택해주세요.')
		}
		if (!rowChecked || rowChecked?.length > 1) {
			return window.alert('배차 등록은 하나만 가능합니다.')
		}
		const selectItem = rowChecked[0]
		setId(selectItem['출고 고유번호'])
		setIsPostModal(true)
	}

	// 출고 등록
	const onRegister = () => {
		if (!rowChecked || rowChecked?.length === 0) {
			return window.alert('출고 등록할 제품을 선택해주세요.')
		}

		const shipmentStatus = '출고 등록'
		const uids = rowChecked.map((item) => item['출고 고유번호'])
		const outStatusArray = rowChecked.map((item) => item['합짐 승인 상태'])
		const driverStatusArray = rowChecked.map((item) => item['배차 여부'])

		if (!outStatusArray.every((value) => value === '승인')) {
			return window.alert('출고 등록을 하려면 출고 상태가 승인이여야 합니다.')
		}
		if (!driverStatusArray.every((value) => !!value)) {
			return window.alert('출고 등록을 하려면 배차 등록은 필수입니다.')
		}
		if (window.confirm('출고 등록하시겠습니까?')) {
			shipmentStatusUpdate({ shipmentStatus, uids })
		}
	}

	// reset event
	const onReset = async () => {
		await setParam(initData)
		await refetch()
	}

	useEffect(() => {
		const getData = data?.list
		if (getData && Array.isArray(getData)) {
			setGetRow(add_element_field(getData, ShippingDispatchFields))
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [param.pageNum, param.pageSize])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'배차/출고 등록'} />

			<GlobalFilterContainer>
				<FilterSubcontianer>
					<FilterLeft>
						<RowWrap none>
							<StorageSelect value={param.storage} onChange={(e) => onChange('storage', e.label)} />
							<CustomerSearch
								name={param.customerName}
								code={param.customerCode}
								setName={(value) => onChange('customerName', value)}
								setCode={(value) => onChange('customerCode', value)}
							/>
						</RowWrap>
						<RowWrap>
							<DestinationSearch
								name={param.destinationName}
								code={param.destinationCode}
								setName={(value) => onChange('destinationName', value)}
								setCode={(value) => onChange('destinationCode', value)}
							/>
						</RowWrap>
						<RowWrap>
							<DateSearchSelect
								title={'출고 요청 일자'}
								startInitDate={param.shipmentRequestStartDate}
								endInitDate={param.shipmentRequestEndDate}
								startDateChange={(value) => onChange('shipmentRequestStartDate', value)}
								endDateChange={(value) => onChange('shipmentRequestEndDate', value)}
							/>
							<SpartSelect value={param.spart} onChange={(e) => onChange('spart', e.label)} />
						</RowWrap>
						<RowWrap none>
							<RadioSearchButton
								title={'배차출고 여부'}
								options={[
									{ label: '전체', value: '' },
									{ label: 'Y', value: true },
									{ label: 'N', value: false },
								]}
								value={param.driverStatus}
								onChange={(value) => onChange('driverStatus', value)}
							/>
							<RadioSearchButton
								title={'상차도 여부'}
								options={[
									{ label: '전체', value: '' },
									{ label: 'Y', value: true },
									{ label: 'N', value: false },
								]}
								value={param.dockStatus}
								onChange={(value) => onChange('dockStatus', value)}
							/>
							<RadioSearchButton
								title={'합짐 여부'}
								options={[
									{ label: '전체', value: '' },
									{ label: 'Y', value: true },
									{ label: 'N', value: false },
								]}
								value={param.mergeStatus}
								onChange={(value) => onChange('mergeStatus', value)}
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
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onRemoveDispatch}>배차 취소</WhiteRedBtn>
						<WhiteSkyBtn onClick={onSetDispatch}>배차 등록</WhiteSkyBtn>
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
						<WhiteBlackBtn>수취서 출력</WhiteBlackBtn>
						<WhiteBlackBtn onClick={onRegister}>출고 등록</WhiteBlackBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			{isPostModal && <DispatchDetail id={id} setIsPostModal={setIsPostModal} />}
		</FilterContianer>
	)
}

export default DisRegister
