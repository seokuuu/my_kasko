import React, { useEffect, useMemo, useState } from 'react'
import { BlackBtn, NewBottomBtnWrap, WhiteBlackBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { selectedRowsAtom } from '../../../store/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import { useAtomValue } from 'jotai'
import { shipmentInvoiceListQueryV2, useShipmentListQuery } from '../../../api/shipment'
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
import ShippingInvoiceViewV2 from '../../../components/shipping/ShippingInvoiceViewV2'

const AchievementDetails = () => {
	const { outNumber } = useParams()
	const initData = {
		pageNum: 1,
		pageSize: 50,
		shipmentStatus: '운송 완료',
		outNumber,
	}

	const auth = useAtomValue(authAtom)
	const navigate = useNavigate()
	const { simpleAlert } = useAlert()
	const selectedRows = useAtomValue(selectedRowsAtom)

	const [invoiceData, setInvoiceData] = useState([]) // 거래명세서 데이터
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
		navigate(`/shipping/claim/register`, {
			state: { ...findData, auctionNumber: findData.auctionNumber || findData.saleNumber },
		})
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

	useEffect(() => {
		const get = async () => {
			return await shipmentInvoiceListQueryV2(param)
		}
		const groupedData = (data, getKey) => {
			return data?.reduce((acc, item) => {
				const key = getKey(item)
				if (!acc[key]) {
					acc[key] = []
				}
				acc[key].push(item)
				return acc
			}, {})
		}
		get()
			.then((data) => {
				if (data) {
					setInvoiceData(groupedData(data, (item) => `${item.customerCode}`))
				}
			})
			.catch((e) => console.error(e))
	}, [param])

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
						{invoiceData &&
							Object.keys(invoiceData).map((key, index) => {
								return (
									<div style={{ display: 'none' }} key={index}>
										<ShippingInvoiceViewV2 list={invoiceData[key]} />
									</div>
								)
							})}
						<WhiteSkyBtn
							className={'shipment_invoice'}
							onClick={async () => {
								const buttons = document.querySelectorAll('.shipment_invoice')
								for (const element of buttons) {
									await new Promise((resolve) => {
										element.click()
										setTimeout(resolve, 3000)
									})
								}
							}}
						>
							거래 명세서 출력
						</WhiteSkyBtn>
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
