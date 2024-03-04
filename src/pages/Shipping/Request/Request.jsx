import { useAtomValue } from 'jotai'
import { useAtom } from 'jotai/index'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { useShipmentListQuery, useShipmentStatusUpdateMutation } from '../../../api/shipment'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { GlobalFilterHeader } from '../../../components/Filter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { KilogramSum } from '../../../utils/KilogramSum'
import { formatWeight } from '../../../utils/utils'
import Table from '../../Table/Table'
import RequestSearchFilter from './RequestSearchFilter'
import RequestSelector from './RequestSelector'
import { getAddNewDestination } from './utils'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '출하 지시',
}

const Request = ({ setChoiceComponent }) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)

	const [param, setParam] = useState(initData)
	const [rows, setRows] = useState([])
	const [pagination, setPagination] = useState(null)

	const { data, isLoading, refetch } = useShipmentListQuery(param)
	const { mutate: shipmentStatusUpdate } = useShipmentStatusUpdateMutation()

	const [selectorList, setSelectorList] = useState([]) // 선별 목록
	const [destinations, setDestinations] = useState(new Array(3)) // 목적지

	// 선별 목록 추가
	const addSelectorList = () => {
		try {
			const newDestination = getAddNewDestination(selectedRows)
			const newSelectList = [...new Set([...selectorList, ...selectedRows])]
			const newRows = rows?.filter((item) => !newSelectList.includes(item))

			setDestinations(newDestination) // 목적지 등록
			setSelectorList(newSelectList) // 선별 목록 데이터 등록
			setSelectedRows([]) // 테이블 체크 목록 초기화
			setRows(newRows)
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
		const newSelectors = selectorList.filter((item) => !deleteKeys.includes(item[key]))
		const newRows = [...rows, ...selectedRows]

		setSelectorList(newSelectors)
		setSelectedRows([]) // 테이블 체크 목록 초기화
		setRows(newRows) // 제거된 항목 테이블항목에 다시 등록
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
		const list = data?.list
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, ShippingRegisterFields))
			setPagination(data?.pagination)
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
						조회 목록 (선택 <span>{selectedRows?.length > 0 ? selectedRows?.length : '0'}</span> /{' '}
						{pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName={'출하요청'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(selectedRows))} </span>
						kg / 총 중량 {formatWeight(pagination?.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onRegisterCancel}>출하 취소</WhiteRedBtn>
						<WhiteSkyBtn onClick={addSelectorList}>선별 목록 추가</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getRow={rows}
					loading={isLoading}
					getCol={ShippingRegisterFieldsCols}
					tablePagination={pagination}
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
