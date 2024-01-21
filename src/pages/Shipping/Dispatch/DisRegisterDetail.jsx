import React, { useEffect, useState } from 'react'
import { BlackBtn, WhiteBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { aucProAddModalAtom, selectedRowsAtom, StandardDispatchDetailAtom } from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import Hidden from '../../../components/TableInner/Hidden'
import {
	useRemoveDispatchMutation,
	useShipmentDispatchDetailsQuery,
	useShipmentMergeDeleteMutation,
	useShipmentMergeStatusUpdateMutation,
	useShipmentMergeUpdateMutation,
} from '../../../api/shipment'
import { ShippingDispatchDetailsFields, ShippingDispatchDetailsFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterHeader } from '../../../components/Filter'
import Table from '../../Table/Table'
import DisRegisterDetailHeader from './DisRegisterDetailHeader'
import { useAtom } from 'jotai/index'
import RequestAddModal from '../Request/RequestAddModal'
import { BlueBarBtnWrap } from '../../../modal/Common/Common.Styled'
import DispatchDetail from '../../../modal/Multi/DispatchDetail'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../../store/Alert/useAlert'

const DisRegisterDetail = ({ id }) => {
	const navigate = useNavigate()
	const { simpleAlert, simpleConfirm } = useAlert()
	const [isPostModal, setIsPostModal] = useAtom(StandardDispatchDetailAtom)
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)

	const [rows, setRows] = useState('')
	const [list, setList] = useState([])
	const [selectedId, setSelectedId] = useState(null) // 체크 박스 선택한 id 값
	const [dockStatus, setDockStatus] = useState(null) // 상차도 여부

	const { data, isLoading } = useShipmentDispatchDetailsQuery(id)
	const { mutate: removeDispatch } = useRemoveDispatchMutation() // 배차 취소
	const { mutate: updateMerge } = useShipmentMergeUpdateMutation() // 선별 목록 변경
	const { mutate: deleteMerge } = useShipmentMergeDeleteMutation() // 선별 목록 해제
	const { mutate: statusUpdateMerge } = useShipmentMergeStatusUpdateMutation() //선별 승인 상태 변경

	// 목록 추가 모달 오픈
	const addListModalOpen = () => setAddModal(true)
	// 목록 추가 모달 오픈
	const addListModalClose = () => setAddModal(false)

	// 목록 추가
	const onListAdd = (selectedData) => {
		try {
			const newList = [...new Set([...list, ...selectedData])]
			const destinations = [...new Set(newList.map((item) => item.destinationName))]
			if (destinations.length > 3) {
				throw new Error('목적지가 3개 이상입니다.')
			}
			setList(newList) // 선별 목록 데이터 등록
			setSelectedRows([]) // 테이블 체크 목록 초기화
			addListModalClose()
		} catch (error) {
			simpleAlert(error.message)
		}
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

	// 배차 취소
	const onRemoveDispatch = () => {
		const targetData = data[0]
		const driverStatus = Boolean(targetData.driverStatus)
		if (!driverStatus) {
			return simpleAlert('취소하기 전 배차를 등록해주세요.')
		}
		simpleConfirm('배차 취소를 하시겠습니까?', () => removeDispatch(targetData.outUid))
	}

	// 배차 등록
	const onSetDispatch = () => {
		const outUid = data[0].outUid
		setSelectedId(outUid)
		setIsPostModal(true)
	}

	// 승인 요청
	const onRequest = () => {
		const body = {
			productOutUid: data[0].outUid,
			status: '요청',
		}
		simpleConfirm('요청하시겠습니까?', () => statusUpdateMerge(body))
	}

	// 요청 승인 반려
	const onRequestReject = () => {
		const body = {
			productOutUid: data[0].outUid,
			status: '반려',
		}
		simpleConfirm('반려하시겠습니까?', () => statusUpdateMerge(body))
	}

	// 요청 승인
	const onRequestApproval = () => {
		const body = {
			productOutUid: data[0].outUid,
			status: '승인',
		}
		simpleConfirm('승인하시겠습니까?', () => statusUpdateMerge(body))
	}

	// 선별 목록 수정
	const onUpdateMerge = () => {
		const productOutUid = data[0].outUid
		const orderUids = data.map((item) => item.orderUid)
		const updateOrderUids = list.map((item) => item.orderUid)
		let isEqual =
			orderUids.every((val) => updateOrderUids.includes(val)) && updateOrderUids.every((val) => orderUids.includes(val))
		const body = {
			productOutUid,
			dockStatus,
			orderUids: updateOrderUids,
		}
		if (isEqual) {
			return simpleAlert('변경할 목록을 추가하거나 제거해주세요.')
		}
		if (body.orderUids.length === 0) {
			return simpleAlert('변경할 목록을 추가해주세요.')
		}
		simpleConfirm('변경 하시겠습니까? (창고사 일 경우 자동으로 승인상태가 요청으로 변경됩니다.)', () =>
			updateMerge(body),
		)
	}

	// 선별 취소
	const onDeleteMerge = () => {
		if (data[0].outStatus === '승인') {
			return simpleAlert('이미 승인된 상태이므로 선별 취소가 불가능합니다.')
		}
		simpleConfirm('선별 취소하시겠습니까?', () => deleteMerge(data[0].outUid))
	}

	useEffect(() => {
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, ShippingDispatchDetailsFields))
		}
	}, [list])

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setList(data)
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'배차/출고 등록 상세'} enableSearchFilters={false} />
			<DisRegisterDetailHeader data={list} dockStatus={dockStatus} setDockStatus={setDockStatus} />
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (<span>{data?.length}개</span>)
						<Hidden />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div style={{ display: 'flex', gap: '10px' }}>
						{/*<WhiteSkyBtn onClick={onRequest}>선별 변경 요청</WhiteSkyBtn>*/}
						<WhiteRedBtn onClick={onRequestReject}>선별 변경 요청 승인 반려</WhiteRedBtn>
						<WhiteSkyBtn onClick={onRequestApproval}>선별 변경 요청 승인</WhiteSkyBtn>
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onListRemove}>목록 제거</WhiteRedBtn>
						<WhiteSkyBtn onClick={addListModalOpen}>추가 등록</WhiteSkyBtn>
						<WhiteRedBtn onClick={onRemoveDispatch}>배차 취소</WhiteRedBtn>
						<WhiteSkyBtn onClick={onSetDispatch}>배차 등록</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={ShippingDispatchDetailsFieldsCols} getRow={rows} loading={isLoading} />
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onDeleteMerge}>선별 취소</WhiteRedBtn>
					</div>
				</TCSubContainer>
				<BlueBarBtnWrap style={{ gap: '12px' }}>
					<WhiteBtn fontSize={17} width={10} height={35} onClick={() => navigate(-1)}>
						돌아가기
					</WhiteBtn>
					<BlackBtn fontSize={17} width={10} height={35} onClick={onUpdateMerge}>
						저장
					</BlackBtn>
				</BlueBarBtnWrap>
			</TableContianer>
			{addModal && <RequestAddModal list={list} onListAdd={onListAdd} />}
			{isPostModal && <DispatchDetail id={selectedId} setIsPostModal={setIsPostModal} />}
		</FilterContianer>
	)
}

export default DisRegisterDetail
