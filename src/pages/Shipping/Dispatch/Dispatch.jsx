import { useAtom, useAtomValue } from 'jotai'
import { isEqual } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDriverListQuery, useDriverRemoveMutation } from '../../../api/driver'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import { GlobalFilterHeader } from '../../../components/Filter'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { DispatchFields, DispatchFieldsCols } from '../../../constants/admin/Shipping'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import DispatchPost from '../../../modal/Multi/DispatchPost'
import useAlert from '../../../store/Alert/useAlert'
import {
	btnCellUidAtom,
	selectedRowsAtom,
	StandardDispatchEditAtom,
	StandardDispatchPostAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import DispatchSearchFilter from './DispatchSearchFilter'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import TableV2 from '../../Table/TableV2'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const initData = {
	pageNum: 1,
	pageSize: 50,
}

const Dispatch = () => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const uidAtom = useAtomValue(btnCellUidAtom)
	const selectedRows = useAtomValue(selectedRowsAtom)
	const exFilterToggle = useAtomValue(toggleAtom)
	const [isModalPost, setIsModalPost] = useAtom(StandardDispatchPostAtom)
	const [isModalEdit, setIsModalEdit] = useAtom(StandardDispatchEditAtom)

	const [rows, setRows] = useState([])
	const [param, setParam] = useState(initData)

	const { refetch, data, isLoading } = useDriverListQuery(param)
	const { mutate: onDelete } = useDriverRemoveMutation()

	const { tableRowData, paginationData, totalCount } = useTableData({
		tableField: DispatchFields,
		serverData: data,
	})

	// 선택 항목
	const { selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const handleDeleteEvent = async () => {
		if (!selectedRows || selectedRows?.length === 0) {
			return simpleAlert('삭제할 배차기사를 선택해주세요.')
		}
		const deleteUIds = selectedRows.map((item) => item['고유 번호'])
		simpleConfirm('삭제하시겠습니까?', () => onDelete(deleteUIds))
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

	const resetOnClick = () => {
		setParam(initData)
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
		refetch()
	}, [param])

	useEffect(() => {
		const list = data?.list
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, DispatchFields))
		}
	}, [data])

	return (
		<FilterContianer>
			<GlobalFilterHeader title={'배차기사 관리'} />
			{exFilterToggle && (
				<GlobalProductSearch
					param={param}
					isToggleSeparate={true}
					globalProductSearchOnClick={searchOnClick}
					globalProductResetOnClick={resetOnClick}
					renderCustomSearchFields={(props) => <DispatchSearchFilter {...props} />}
				/>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount?.toLocaleString()}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={rows} sheetName="배차기사 관리" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={handleDeleteEvent}>선택 삭제</WhiteRedBtn>
						<WhiteSkyBtn onClick={() => setIsModalPost(true)}>추가 등록</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<TableV2
					getRow={tableRowData}
					loading={isLoading}
					getCol={DispatchFieldsCols}
					tablePagination={paginationData}
					onPageChange={onPageChange}
				/>
			</TableContianer>
			{isModalPost && <DispatchPost setIsModalPost={setIsModalPost} id={null} />}
			{isModalEdit && <DispatchPost setIsModalPost={setIsModalEdit} id={uidAtom} />}
		</FilterContianer>
	)
}

export default Dispatch
