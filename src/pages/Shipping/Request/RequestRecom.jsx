import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { WhiteBlackBtn, WhiteBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { useShipmentMergeListQuery, useShipmentMergeMutation } from '../../../api/shipment'
import { GlobalFilterHeader } from '../../../components/Filter'
import { aucProAddModalAtom, selectedRowsAtom } from '../../../store/Layout/Layout'
import { useAtom } from 'jotai'
import MergeHeader from './MergeHeader'
import { calculateTotal, calculateTowDataTotal, storageValid } from './utils'
import RequestAddModal from './RequestAddModal'
import useAlert from '../../../store/Alert/useAlert'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import useTableSelection from '../../../hooks/useTableSelection'
import useTableData from '../../../hooks/useTableData'
import { RegisterFields, RegisterFieldsCols } from '../fields/RegisterFields'
import { useAtomValue } from 'jotai/index'
import { authAtom } from '../../../store/Auth/auth'
import TableV2 from '../../Table/TableV2'
import { useNavigate } from 'react-router-dom'

const RequestRecom = () => {
	const auth = useAtomValue(authAtom)
	const navigate = useNavigate()
	const { simpleAlert, simpleConfirm } = useAlert()
	const [addModal, setAddModal] = useAtom(aucProAddModalAtom)
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)

	const [serverData, setServerData] = useState({ list: [] }) // useShipmentMergeListQuery + 직접 추가한 목록

	const [dockStatus, setDockStatus] = useState(false) // 상차도 여부
	const [mergeCost, setMergeCost] = useState(0) // 합짐비
	const [destinations, setDestinations] = useState(new Array(3)) // 목적지

	const { tableRowData } = useTableData({
		tableField: RegisterFields(auth),
		serverData,
	})

	const { data, isLoading } = useShipmentMergeListQuery()
	const { mutate: onCreateMerge } = useShipmentMergeMutation()

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	// 목적지 get
	const getDestinations = (list) => {
		const destination = list.map((item) => item?.destinationName)
		const duplicationDestination = [...new Set(destination)]
		if (duplicationDestination.length > 3) {
			throw new Error('선별할 시 목적지 3개 이상은 선별 목록에 추가할 수 없습니다.')
		}
		while (duplicationDestination.length < 3) {
			duplicationDestination.push('-')
		}
		setDestinations(duplicationDestination)
	}

	// 목록 추가 모달 오픈
	const addListModalOpen = () => setAddModal(true)

	// 목록 추가 모달 오픈
	const addListModalClose = () => setAddModal(false)

	// 목록 추가
	const onListAdd = (selectedData) => {
		if (!selectedRows || selectedRows.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		try {
			const newList = [...new Set([...serverData.list, ...selectedData])]

			storageValid(newList)
			getDestinations(newList)
			setServerData({ list: newList }) // 선별 목록 데이터 등록
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
		const newSelectors = serverData.list.filter((item) => !deleteKeys.includes(item?.orderUid))
		setServerData({ list: newSelectors })
		setSelectedRows([]) // 테이블 체크 목록 초기화
		getDestinations(newSelectors)
	}

	// 선별 등록
	const onRegister = () => {
		const orderUids = serverData?.list?.map((item) => item?.orderUid)
		if (orderUids.length === 0) {
			return simpleAlert('선별 목록에 제품을 추가해주세요.')
		}
		simpleConfirm(`${auth.role === '카스코철강' ? '출하 지시하시겠습니까?' : '선별 등록 하시겠습니까?'}`, () =>
			onCreateMerge({ dockStatus, orderUids }),
		)
	}

	useEffect(() => {
		if (data && Array.isArray(data)) {
			setServerData({ list: data })
			getDestinations(data)
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader
				title={'선별 추천 목록'}
				enableSearchFilters={false}
				subTitle={<Subtitle2 onClick={() => navigate('/shipping/request')}>출하 지시 등록</Subtitle2>}
			/>
			<MergeHeader
				list={serverData.list}
				destinations={destinations}
				mergeCost={mergeCost}
				setMergeCost={setMergeCost}
				dockStatus={dockStatus}
				setDockStatus={setDockStatus}
			/>
			<TableContianer style={{ paddingBottom: '10px' }}>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {serverData?.list?.length.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {calculateTotal(serverData?.list, 'weight')} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onListRemove}>목록 제거</WhiteRedBtn>
						<WhiteSkyBtn onClick={onRegister}>{auth?.role === '카스코철강' ? '출하 지시' : '선별 등록'}</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TableV2 getRow={tableRowData} loading={isLoading} getCol={RegisterFieldsCols(RegisterFields(auth))} />
				<TCSubContainer style={{ paddingBottom: '0px' }}>
					<div></div>
					<div>
						<WhiteBlackBtn onClick={addListModalOpen}>목록 추가</WhiteBlackBtn>
					</div>
				</TCSubContainer>
				<TCSubContainer style={{ display: 'flex', justifyContent: 'center', padding: '18px 0' }}>
					<WhiteBtn type={'button'} width={20} height={40} onClick={() => navigate('/shipping/request')}>
						돌아가기
					</WhiteBtn>
				</TCSubContainer>
			</TableContianer>
			{addModal && <RequestAddModal list={serverData.list} onListAdd={onListAdd} />}
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
