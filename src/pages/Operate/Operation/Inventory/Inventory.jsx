/* eslint-disable no-unused-vars */
import { useAtomValue } from 'jotai'
import React, { useEffect, useRef, useState } from 'react'
import { getInventoryLedger } from '../../../../api/operate/inventory'
import GlobalProductSearch from '../../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../../components/TableInner/Excel'
import Hidden from '../../../../components/TableInner/Hidden'
import PageDropdown from '../../../../components/TableInner/PageDropdown'
import { InventoryFieldsCols, InvertoryFields } from '../../../../constants/admin/Inventroy'
import useReactQuery from '../../../../hooks/useReactQuery'
import useTablePaginationPageChange from '../../../../hooks/useTablePaginationPageChange'
import { add_element_field } from '../../../../lib/tableHelpers'
import {
	FilterContianer,
	FilterHeader,
	TCSubContainer,
	TableContianer,
} from '../../../../modal/External/ExternalFilter'
import { selectedRowsAtom, toggleAtom } from '../../../../store/Layout/Layout'
import { KilogramSum } from '../../../../utils/KilogramSum'
import Table from '../../../Table/Table'
import useGlobalSearch from '../../hook/useGlobalSearch'
import InventorySearchFields from './InventorySearchFields'
import TableV2HiddenSection from '../../../Table/TableV2HiddenSection'

const Inventory = () => {
	// checkSelect
	const checkBoxSelect = useAtomValue(selectedRowsAtom)

	// 테이블 데이터
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(InventoryFieldsCols)
	const getCol = tableField.current

	const Param = {
		pageNum: 1, // 현재페이지
		pageSize: 50, // 총 데이터 갯수
		spart: '',
		storage: '',
		destinationCode: '',
		destinationName: '',
		customerCode: '',
		customerName: '',
		saleCategoryList: [], //판매구분
		orderStatusList: [], //주문상태구분
		shipmentStatusList: [], //출하상태구분
	}
	const [param, setParam] = useState(Param)
	// 인벤토리 테이블 리스트 데이터 불러오기
	const { data, isSuccess, refetch } = useReactQuery(param, 'getInventoryLedge', getInventoryLedger)

	const pagination = data?.data?.data?.pagination

	const { onPageChanage } = useTablePaginationPageChange(data, setParam)

	useEffect(() => {
		const getData = data?.data?.data?.list

		if (!isSuccess && !getData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, InvertoryFields))
		}
	}, [isSuccess, data])

	console.log('겟로우 ', data?.data?.data?.list)

	const [isRotated, setIsRotated] = useState(false)

	// 토글 쓰기
	const [exFilterToggle, setExfilterToggle] = useState(toggleAtom)
	const [toggleMsg, setToggleMsg] = useState('On')
	const toggleBtnClick = () => {
		setExfilterToggle((prev) => !prev)
		if (exFilterToggle === true) {
			setToggleMsg('Off')
		} else {
			setToggleMsg('On')
		}
	}

	const { globalProductSearchOnClick, globalProductResetOnClick } = useGlobalSearch({ setSearch: setParam, refetch })

	useEffect(() => {
		refetch()
	}, [param.pageNum, param.pageSize])

	return (
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>재고 수불 관리</h1>
				</div>
			</FilterHeader>
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						setParam={setParam}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <InventorySearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkBoxSelect?.length > 0 ? checkBoxSelect?.length : '0'}</span> /{' '}
						{pagination?.listCount}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown
							handleDropdown={(e) => setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))}
						/>
						<Excel getRow={getRow} sheetName="재고 수불 관리" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div style={{ padding: '8px 0' }}>
						선택 중량<span> {KilogramSum(checkBoxSelect)} </span>kg / 총 중량 {pagination?.totalWeight.toLocaleString()}
						kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>{/* <SwitchBtn>입고 확정</SwitchBtn> */}</div>
				</TCSubContainer>
				<div>
					<Table
						getCol={getCol}
						getRow={getRow}
						tablePagination={pagination}
						onPageChange={onPageChanage}
						setChoiceComponent={() => {}}
					/>
				</div>
			</TableContianer>
		</FilterContianer>
	)
}

export default Inventory
