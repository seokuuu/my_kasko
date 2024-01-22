import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { useShipmentMergeListQuery, useShipmentMergeMutation } from '../../../api/shipment'
import { GlobalFilterHeader } from '../../../components/Filter'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { aucProAddModalAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import Table from '../../Table/Table'
import { add_element_field } from '../../../lib/tableHelpers'
import MergeHeader from './MergeHeader'
import { calculateTotal, calculateTowDataTotal, getAddNewDestination } from './utils'
import RequestAddModal from './RequestAddModal'
import useAlert from '../../../store/Alert/useAlert'

const RequestRecom = ({ setChoiceComponent }) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)

	const [list, setList] = useState([]) // useShipmentMergeListQuery + 직접 추가한 목록
	const [rows, setRows] = useState('')
	const [dockStatus, setDockStatus] = useState(false) // 상차도 여부
	const [mergeCost, setMergeCost] = useState(0) // 합짐비
	const [destinations, setDestinations] = useState(new Array(3)) // 목적지

	const { data, isLoading } = useShipmentMergeListQuery()
	const { mutate: onCreateMerge } = useShipmentMergeMutation()

	// 목적지 get
	const getDestinations = () => {
		const destination = data.map((item) => item?.destinationName)
		const duplicationDestination = [...new Set(destination)]
		while (duplicationDestination.length < 3) {
			duplicationDestination.push('-')
		}
		setDestinations(duplicationDestination)
	}

	// 목록 제거
	const onListRemove = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const key = '주문 고유 번호'
		const deleteKeys = selectedRows.map((item) => item[key])
		const newSelectors = list.filter((item) => !deleteKeys.includes(item?.orderUid))
		setList(newSelectors)
		setSelectedRows([]) // 테이블 체크 목록 초기화
	}

	// 목록 추가 모달 오픈
	const addListModalOpen = () => setAddModal(true)

	// 목록 추가 모달 오픈
	const addListModalClose = () => setAddModal(false)

	// 목록 추가
	const onListAdd = (selectedData) => {
		try {
			const newDestination = getAddNewDestination(selectedRows)
			setDestinations(newDestination) // 목적지 등록
			setList((prev) => [...new Set([...prev, ...selectedData])]) // 선별 목록 데이터 등록
			setSelectedRows([]) // 테이블 체크 목록 초기화
			addListModalClose()
		} catch (error) {
			simpleAlert(error.message)
		}
	}

	// 선별 등록
	const onRegister = () => {
		const orderUids = list?.map((item) => item?.orderUid)
		if (orderUids.length === 0) {
			return simpleAlert('선별 목록에 제품을 추가해주세요.')
		}
		simpleConfirm('선별 등록하시겠습니까?', () => onCreateMerge({ dockStatus, orderUids }))
	}

	useEffect(() => {
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, ShippingRegisterFields))
		}
	}, [list])

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setList(data)
			getDestinations()
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader
				title={'선별 추천 목록'}
				enableSearchFilters={false}
				subTitle={<Subtitle2 onClick={() => setChoiceComponent('request')}>출고 요청</Subtitle2>}
			/>
			<MergeHeader
				list={list}
				destinations={destinations}
				mergeCost={mergeCost}
				setMergeCost={setMergeCost}
				dockStatus={dockStatus}
				setDockStatus={setDockStatus}
			/>
			<TableContianer style={{ paddingBottom: '10px' }}>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 {calculateTotal(list, 'width')}중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onListRemove}>목록 제거</WhiteRedBtn>
						<WhiteSkyBtn onClick={onRegister}>선별 등록</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={ShippingRegisterFieldsCols} getRow={rows} isLoading={isLoading} />
				<TCSubContainer style={{ paddingBottom: '0px' }}>
					<div>
						합계 금액(매입/매출 운임비):
						<span>{calculateTowDataTotal(list, 'outboundFreightAmount', 'inboundFreightAmount')}</span>(원)
					</div>
					<div>
						<WhiteBlackBtn onClick={addListModalOpen}>목록 추가</WhiteBlackBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			{addModal && <RequestAddModal list={list} onListAdd={onListAdd} />}
		</FilterContianer>
	)
}

export default RequestRecom

const Subtitle2 = styled.h5`
	margin-left: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	font-size: 18px;
	height: min-content;
	margin-top: 3px;
	color: #4c83d6;
	cursor: pointer;
	&:hover {
		font-weight: 700;
	}
`
