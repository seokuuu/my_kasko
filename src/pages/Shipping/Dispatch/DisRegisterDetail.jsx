import React, { useEffect, useState } from 'react'
import { BlackBtn, WhiteBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { aucProAddModalAtom, selectedRowsAtom, StandardDispatchDetailAtom } from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import {
	useRemoveDispatchMutation,
	useShipmentDispatchDetailsQuery,
	useShipmentMergeDeleteMutation,
	useShipmentMergeStatusUpdateMutation,
	useShipmentMergeUpdateMutation,
} from '../../../api/shipment'
import { ShippingDispatchDetailsFields, ShippingDispatchDetailsFieldsCols } from '../../../constants/admin/Shipping'
import { GlobalFilterHeader } from '../../../components/Filter'
import DisRegisterDetailHeader from './DisRegisterDetailHeader'
import { useAtom, useAtomValue } from 'jotai/index'
import RequestAddModal from '../Request/RequestAddModal'
import { BlueBarBtnWrap } from '../../../modal/Common/Common.Styled'
import DispatchDetail from '../../../modal/Multi/DispatchDetail'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../../store/Alert/useAlert'
import { authAtom } from '../../../store/Auth/auth'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import { calculateTotal, storageValid } from '../Request/utils'
import Excel from '../../../components/TableInner/Excel'

const DisRegisterDetail = ({ id }) => {
	const navigate = useNavigate()
	const { simpleAlert, simpleConfirm } = useAlert()
	const auth = useAtomValue(authAtom)
	const [isPostModal, setIsPostModal] = useAtom(StandardDispatchDetailAtom)
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)

	const [list, setList] = useState([])
	const [serverData, setServerData] = useState([])
	const [dockStatus, setDockStatus] = useState(null) // 상차도 여부

	const { data, isLoading } = useShipmentDispatchDetailsQuery(id)
	const { mutate: removeDispatch } = useRemoveDispatchMutation() // 배차 취소
	const { mutate: updateMerge } = useShipmentMergeUpdateMutation() // 선별 목록 변경
	const { mutate: deleteMerge } = useShipmentMergeDeleteMutation() // 선별 목록 해제
	const { mutate: statusUpdateMerge } = useShipmentMergeStatusUpdateMutation() //선별 승인 상태 변경

	const { tableRowData } = useTableData({
		tableField: ShippingDispatchDetailsFields,
		serverData: serverData,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	// 목록 추가 모달 오픈
	const addListModalOpen = () => setAddModal(true)
	// 목록 추가 모달 오픈
	const addListModalClose = () => setAddModal(false)

	// 목록 추가
	const onListAdd = (selectedData) => {
		try {
			const newList = [...new Set([...list, ...selectedData])]

			storageValid(newList)
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
		const driverStatus = targetData.driverStatus
		if (driverStatus === 'N') {
			return simpleAlert('취소하기 전 배차를 등록해주세요.')
		}
		simpleConfirm('배차 취소를 하시겠습니까?', () => {
			removeDispatch(id)
			setSelectedRows([]) // 테이블 체크 목록 초기화
		})
	}

	// 배차 등록
	const onSetDispatch = () => setIsPostModal(true)

	// 승인 요청
	const onRequest = () => {
		const body = {
			productOutUid: id,
			status: '요청',
		}
		simpleConfirm('요청하시겠습니까?', () => statusUpdateMerge(body))
	}

	// 요청 승인 반려
	const onRequestReject = () => {
		const body = {
			productOutUid: id,
			status: '반려',
		}
		simpleConfirm('반려하시겠습니까?', () => {
			statusUpdateMerge(body)
			setSelectedRows([]) // 테이블 체크 목록 초기화
		})
	}

	// 요청 승인
	const onRequestApproval = () => {
		const body = {
			productOutUid: id,
			status: '승인',
		}
		simpleConfirm('승인하시겠습니까?', () => {
			statusUpdateMerge(body)
			setSelectedRows([]) // 테이블 체크 목록 초기화
		})
	}

	// 선별 목록 수정
	const onUpdateMerge = () => {
		const productOutUid = id
		const orderUids = data.map((item) => item.orderUid)
		const updateOrderUids = list.map((item) => item.orderUid)
		let isEqual =
			orderUids.every((val) => updateOrderUids.includes(val)) && updateOrderUids.every((val) => orderUids.includes(val))
		const body = {
			productOutUid,
			dockStatus,
			orderUids: updateOrderUids,
		}
		// if (isEqual) {
		// 	return simpleAlert('변경할 목록을 추가하거나 제거해주세요.')
		// }
		if (body.orderUids.length === 0) {
			return simpleAlert('변경할 목록을 추가해주세요.')
		}
		simpleConfirm('변경 하시겠습니까? (창고사 일 경우 자동으로 승인상태가 요청으로 변경됩니다.)', () =>
			updateMerge(body),
		)
	}

	// 선별 취소
	const onDeleteMerge = () => {
		const productOutUid = id
		const outStatus = data[0].outStatus
		if (outStatus === '승인') {
			return simpleAlert('이미 승인된 상태이므로 선별 취소가 불가능합니다.')
		}
		simpleConfirm('선별 취소하시겠습니까?', () => deleteMerge(productOutUid))
	}

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setServerData({ list })
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
						조회 목록 (선택 <span>{selectedCountStr}</span> / {list?.length?.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div>
						<Excel getRow={tableRowData} sheetName={'배차 출고 등록 상세'} />
					</div>
				</TCSubContainer>
				<TCSubContainer bor>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {calculateTotal(list, 'weight')} kg
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div style={{ display: 'flex', gap: '10px' }}>
						{auth.role === '카스코철강' && (
							<>
								{/*<WhiteSkyBtn onClick={onRequest}>선별 변경 요청</WhiteSkyBtn>*/}
								<WhiteRedBtn onClick={onRequestReject}>선별 변경 요청 승인 반려</WhiteRedBtn>
								<WhiteSkyBtn onClick={onRequestApproval}>선별 변경 요청 승인</WhiteSkyBtn>
							</>
						)}
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{['창고', '카스코철강'].includes(auth.role) && (
							<>
								<WhiteRedBtn onClick={onListRemove}>목록 제거</WhiteRedBtn>
								<WhiteSkyBtn onClick={addListModalOpen}>추가 등록</WhiteSkyBtn>
							</>
						)}
						{/*{['운송사', '카스코철강'].includes(auth.role) && (*/}
						{/*	<>*/}
						{/*		<WhiteRedBtn onClick={onRemoveDispatch}>배차 취소</WhiteRedBtn>*/}
						{/*		<WhiteSkyBtn onClick={onSetDispatch}>배차 등록</WhiteSkyBtn>*/}
						{/*	</>*/}
						{/*)}*/}
					</div>
				</TCSubContainer>
				<TableV2 loading={isLoading} getCol={ShippingDispatchDetailsFieldsCols} getRow={tableRowData} />
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{['카스코철강', '창고'].includes(auth.role) && <WhiteRedBtn onClick={onDeleteMerge}>선별 취소</WhiteRedBtn>}
					</div>
				</TCSubContainer>
				<BlueBarBtnWrap style={{ gap: '12px' }}>
					<WhiteBtn fontSize={17} width={10} height={35} onClick={() => navigate(-1)}>
						돌아가기
					</WhiteBtn>
					{['창고', '카스코철강'].includes(auth.role) && (
						<BlackBtn fontSize={17} width={10} height={35} onClick={onUpdateMerge}>
							{['카스코철강'].includes(auth.role) ? '저장' : '승인요청'}
						</BlackBtn>
					)}
				</BlueBarBtnWrap>
			</TableContianer>
			{addModal && <RequestAddModal list={list} onListAdd={onListAdd} />}
			{isPostModal && <DispatchDetail id={id} setIsPostModal={setIsPostModal} />}
		</FilterContianer>
	)
}

export default DisRegisterDetail
