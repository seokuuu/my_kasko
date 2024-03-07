import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { useAtom } from 'jotai/index'
import { isEqual } from 'lodash'
import { styled } from 'styled-components'
import { useShipmentListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { GlobalFilterHeader } from '../../../components/Filter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import RequestSearchFilter from './RequestSearchFilter'
import RequestSelector from './RequestSelector'
import { getAddNewDestination, storageValid } from './utils'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { authAtom } from '../../../store/Auth/auth'
import { ShippingRequestFields, ShippingRequestFieldsCols } from '../fields/ShippingRequestFields'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출하 지시',
}

const Request = ({ setChoiceComponent }) => {
	const auth = useAtomValue(authAtom)
	const { simpleAlert, simpleConfirm } = useAlert()

	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)

	const [param, setParam] = useState(initData)
	const [rows, setRows] = useState([])

	const { data, isLoading, refetch } = useShipmentListQuery(param)
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation()

	const [serverData, setServerData] = useState([]) // 원본 데이터

	const [selectorList, setSelectorList] = useState([]) // 선별 목록
	const [destinations, setDestinations] = useState(new Array(3)) // 목적지

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: ShippingRequestFields(auth),
		serverData,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	// 원본 테이블 항목 업데이트
	const tableFieldUpdate = (newSelectList) => {
		const selectKey = '주문 고유 번호'
		const selectIds = newSelectList.map((item) => item[selectKey])
		const newData = data?.list?.filter((item) => !selectIds.includes(item.orderUid))
		setServerData({ ...data, list: newData }) // 원본 데이터 변경
	}

	// 목적지 업데이트
	const destinationUpdate = (list) => {
		const newDestination = getAddNewDestination(list)
		setDestinations(newDestination) // 목적지 등록
	}

	// 선별 목록 추가
	const addSelectorList = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		try {
			const newSelectList = [...new Set([...selectorList, ...selectedRows])]

			destinationUpdate(newSelectList)
			storageValid(newSelectList)
			tableFieldUpdate(newSelectList)

			setSelectorList(newSelectList) // 선별 목록 데이터 등록
			setSelectedRows([]) // 테이블 체크 목록 초기화
			window.scrollTo({
				top: document.documentElement.scrollHeight,
				behavior: 'smooth',
			})
		} catch (error) {
			simpleAlert(error.message)
		}
	}

	// 선별 목록 제거
	const removeSelector = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const key = '주문 고유 번호'
		const deleteKeys = selectedRows.map((item) => item[key])
		const newSelectList = selectorList.filter((item) => !deleteKeys.includes(item[key]))

		setSelectorList(newSelectList)
		setSelectedRows([]) // 테이블 체크 목록 초기화

		if (newSelectList.length === 0) {
			setDestinations(new Array(3))
		} else {
			destinationUpdate(newSelectList)
		}
		tableFieldUpdate(newSelectList)
	}

	// 출하 취소
	const onRegisterCancel = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const uids = selectedRows.map((item) => item['주문 고유 번호'])
		const shipmentStatus = '출하 대기'

		simpleConfirm('출하 취소하시겠습니까?', () => shipmentStatusUpdate({ shipmentStatus, uids }))
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const resetOnClick = () => setParam(initData)

	const searchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
				pageNum: 1,
			}
		})
	}

	useEffect(() => {
		refetch()
	}, [param])

	useEffect(() => {
		const list = serverData?.list
		if (list && Array.isArray(list)) {
			setRows(add_element_field(serverData?.list, ShippingRequestFields(auth)))
		}
	}, [serverData])

	useEffect(() => {
		if (data) {
			setServerData(data)
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader
				title={'출고 요청'}
				subTitle={<Subtitle2 onClick={() => setChoiceComponent('requestRecom')}>선별 추천</Subtitle2>}
			/>
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <RequestSearchFilter {...props} />}
				/>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName={'출하요청'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight.toLocaleString()} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onRegisterCancel}>출하 취소</WhiteRedBtn>
						<WhiteSkyBtn onClick={addSelectorList}>선별 목록 추가</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={ShippingRequestFieldsCols(ShippingRequestFields(auth))}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
			</TableContianer>
			{/* 선별 등록 */}
			<RequestSelector list={selectorList} destinations={destinations} removeSelector={removeSelector} />
		</FilterContianer>
	)
}

export default Request

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
