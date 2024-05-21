import React, { useEffect, useMemo, useState } from 'react'
import { BlackBtn, NewBottomBtnWrap, WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { useAtom, useAtomValue } from 'jotai'
import { useShipmentListQuery } from '../../../api/shipment'
import { ShippingRegisterFields } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { GlobalFilterHeader } from '../../../components/Filter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import Excel from '../../../components/TableInner/Excel'
import useAlert from '../../../store/Alert/useAlert'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { AchievementFields, AchievementFieldsCols } from '../fields/AchievementFields'
import { authAtom } from '../../../store/Auth/auth'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import ShippingExtraCostBtn from './ShippingExtraCostBtn'
import InvoiceDetailHeader from './InvoiceDetailHeader'

const AchievementDetails = () => {
	const { outNumber, customerDestinationUid } = useParams()
	const initData = {
		pageNum: 1,
		pageSize: 50,
		shipmentStatus: '운송 완료',
		outNumber,
		customerDestinationUid,
	}

	const auth = useAtomValue(authAtom)
	const navigate = useNavigate()
	const { simpleAlert } = useAlert()
	const selectedRows = useAtomValue(selectedRowsAtom)

	const [getRow, setGetRow] = useState([])
	const [param, setParam] = useState(initData)
	const getCols = useMemo(() => AchievementFieldsCols(AchievementFields(auth)), [auth])

	const { data, refetch, isLoading } = useShipmentListQuery(param)

	const { tableRowData, paginationData, totalWeight, totalCount } = useTableData({
		tableField: AchievementFields(auth),
		serverData: data,
	})

	// 선택 항목
	const { selectedWeightStr, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const toInvoice = () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('제품을 선택해주세요.')
		}
		const findNumbers = [...new Set(selectedRows.map((item) => `${item['고객코드']}/${item['출고 번호']}`))]

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

	useEffect(() => {
		refetch()
	}, [param])

	useEffect(() => {
		const list = data?.list
		if (list && Array.isArray(list)) {
			setGetRow(add_element_field(list, ShippingRegisterFields))
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'출고 실적 상세'} enableSearchFilters={false} />
			<InvoiceDetailHeader data={data?.list} />
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount?.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} sheetName={'출고실적'} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택중량 <span> {selectedWeightStr} </span> kg / 총 중량 {totalWeight?.toLocaleString()} kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{auth?.role === '카스코철강' && <ShippingExtraCostBtn data={data} />}
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={getCols}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						{auth?.role === '카스코철강' && <WhiteBlackBtn onClick={toClaim}>클레임 등록</WhiteBlackBtn>}
						<WhiteSkyBtn onClick={toInvoice}>거래 명세서 보기</WhiteSkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
			<NewBottomBtnWrap>
				<BlackBtn
					width={13}
					height={40}
					onClick={() => {
						navigate('/shipping/achievement')
					}}
				>
					돌아가기
				</BlackBtn>
			</NewBottomBtnWrap>
		</FilterContianer>
	)
}

export default AchievementDetails
