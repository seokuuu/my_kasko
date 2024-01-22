import React, { useEffect, useState } from 'react'
import { BlackBtn } from '../../../common/Button/Button'
import { aucProAddModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { useAtomValue } from 'jotai'
import {
	BlueBarBtnWrap,
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import { useShipmentListQuery } from '../../../api/shipment'
import { ShippingRegisterFields, ShippingRegisterFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../Table/Table'
import { useSetAtom } from 'jotai/index'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { isEqual } from 'lodash'
import RequestAddModalSerarchFilter from './RequestAddModalSerarchFilter'

const initData = {
	pageNum: 1,
	pageSize: 10,
	shipmentStatus: '출하 지시',
}

// 합짐 추가 등록 메인 컴포넌트
const RequestAddModal = ({ list, onListAdd }) => {
	const exFilterToggle = useAtomValue(toggleAtom)
	const selectedRows = useAtomValue(selectedRowsAtom)
	const setAddModal = useSetAtom(aucProAddModalAtom)

	const [param, setParam] = useState(initData)
	const [getRow, setGetRow] = useState([])
	const [pagination, setPagination] = useState(null)

	const { data, isLoading, refetch } = useShipmentListQuery(param)

	// 제품 추가
	const onAdd = () => {
		if (!selectedRows || selectedRows.length === 0) {
			return
		}
		const key = '주문 고유 번호'
		const findKey = selectedRows.map((item) => item[key])
		const addData = data?.list?.filter((item) => findKey.includes(item.orderUid))

		onListAdd(addData)
	}

	const modalClose = () => setAddModal(false)

	const resetOnClick = () => setParam(initData)

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
		// 이미 추가된 데이터 중복 제거
		const getData = data?.list?.filter((obj) => !list?.some((item) => obj.orderUid === item.orderUid))
		if (getData && Array.isArray(getData)) {
			setGetRow(add_element_field(getData, ShippingRegisterFields))
			setPagination(data?.pagination)
		}
	}, [data])

	useEffect(() => {
		refetch()
	}, [param.pageNum, param.pageSize])

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '85vh' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					<div>선별 추가 등록</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 30px' }}>
					<FilterContianer style={{ paddingBottom: '0px' }}>
						{exFilterToggle && (
							<GlobalProductSearch
								param={param}
								isToggleSeparate={true}
								globalProductSearchOnClick={searchOnClick}
								globalProductResetOnClick={resetOnClick}
								renderCustomSearchFields={(props) => <RequestAddModalSerarchFilter {...props} />}
							/>
						)}
						<TableContianer>
							<TCSubContainer bor>
								<div style={{ width: '100%', display: 'flex', justifyContent: 'end', gap: '10px' }}>
									<PageDropdown handleDropdown={handleTablePageSize} />
								</div>
							</TCSubContainer>
							<Table
								hei2={250}
								hei={100}
								getCol={ShippingRegisterFieldsCols}
								getRow={getRow}
								isLoading={isLoading}
								tablePagination={pagination}
								onPageChange={onPageChange}
							/>
						</TableContianer>
					</FilterContianer>
				</BlueSubContainer>
				<BlueBarBtnWrap style={{ padding: '10px' }}>
					<BlackBtn fontSize={17} width={10} height={35} onClick={onAdd}>
						선택 추가
					</BlackBtn>
				</BlueBarBtnWrap>
			</ModalContainer>
		</>
	)
}

export default RequestAddModal
