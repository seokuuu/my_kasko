import React, { useEffect, useState } from 'react'
import { WhiteBlackBtn, WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { achievementAddedAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import Hidden from '../../../components/TableInner/Hidden'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import AchievementModal from '../../../modal/Multi/Achievement'
import { useAtom, useAtomValue } from 'jotai'
import { useShipmentListQuery, useShipmentRemoveExtraCostMutation } from '../../../api/shipment'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterHeader } from '../../../components/Filter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import Table from '../../Table/Table'
import useAlert from '../../../store/Alert/useAlert'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import AchievementSearchFilter from './AchievementSearchFilter'
import { isEqual } from 'lodash'
import { formatWeight } from '../../../utils/utils'
import { KilogramSum } from '../../../utils/KilogramSum'

const initData = {
	pageNum: 1,
	pageSize: 50,
	shipmentStatus: '운송 완료',
}

const Achievement = () => {
	const navigate = useNavigate()
	const { simpleAlert, redAlert } = useAlert()
	const [addedModal, setAddedModal] = useAtom(achievementAddedAtom)
	const exFilterToggle = useAtomValue(toggleAtom)
	const selectedRows = useAtomValue(selectedRowsAtom)

	const [getRow, setGetRow] = useState([])
	const [pagination, setPagination] = useState(null)
	const [param, setParam] = useState(initData)

	const { data, refetch, isLoading } = useShipmentListQuery(param)
	const [selectedData, setSelectedData] = useState(null)
	const { mutate: removeExtarCost } = useShipmentRemoveExtraCostMutation() // 추가비 및 공차비 삭제

	const openExtarCostModal = () => {
		if (!selectedRows || selectedRows?.length === 0) {
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
		if (!selectedRows || selectedRows?.length === 0) {
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
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const findNumbers = [...new Set(selectedRows.map((item) => `${item['고객코드']}/${item['출고번호']}`))]

		if (findNumbers.length > 1) {
			return simpleAlert('거래명세서는 하나의 출고번호와 고객사으로 확인할 수 있습니다.')
		}
		const findData = findNumbers[0]?.split('/')
		const customerCode = findData[0]
		const outNumber = findData[1]
		navigate(`/shipping/achievement/invoice?customerCode=${customerCode}&outNumber=${outNumber}`)
	}

	const toClaim = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('클레임 등록할 제품을 선택해주세요.')
		}
		if (selectedRows.length > 1) {
			return simpleAlert('하나의 제품만 선택해주세요.')
		}
		const selectedRow = selectedRows[0]
		const copiedData = data.list
		const findData = copiedData.find((item) => item.orderUid === selectedRow['주문 고유 번호'])
		navigate(`/shipping/claim/register`, { state: findData })
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
			setGetRow(add_element_field(list, ShippingRegisterFields))
			setPagination(data?.pagination)
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출고 실적'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <AchievementSearchFilter {...props} />}
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
						<Excel getRow={getRow} sheetName={'출고실적'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량
						<span> {formatWeight(KilogramSum(selectedRows))} </span>
						kg / 총 중량 {formatWeight(pagination?.totalWeight)} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={onRemoveExtraCost}>추가비 및 공차비 삭제</WhiteRedBtn>
						<WhiteSkyBtn onClick={openExtarCostModal}>추가비 및 공차비 추가</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={ShippingRegisterFieldsCols}
					getRow={getRow}
					loading={isLoading}
					tablePagination={pagination}
					onPageChange={onPageChange}
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
