import React, { useCallback, useEffect, useState } from 'react'

import Excel from '../../../components/TableInner/Excel'

import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { btnCellUidAtom, userPageDestiEditModal } from '../../../store/Layout/Layout'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { deleteDestination } from '../../../api/myPage/userDestination'
import useReactQuery from '../../../hooks/useReactQuery'

import { destinationQueryKey, getDestination } from '../../../api/myPage'
import {
	UserManageCustomerDestinationManageFields,
	UserManageCustomerDestinationManageFieldsCols,
} from '../../../constants/admin/UserManage'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import useAlert from '../../../store/Alert/useAlert'
import DestinationEdit from './DestinationEdit'
import useTableData from '../../../hooks/useTableData'
import TableV2 from '../../../pages/Table/TableV2'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'

const initData = {
	pageNum: 1,
	pageSize: 50,
}

const Destination = ({ setChoiceComponent }) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	// 선택된 항목
	const { selectedCount, selectedData } = useTableSelection()

	const uidAtom = useAtomValue(btnCellUidAtom)
	const [switchDestiEdit, setSwtichDestiEdit] = useAtom(userPageDestiEditModal)

	useEffect(() => {
		return () => {
			setSwtichDestiEdit(false)
		}
	}, [])

	const [rows, setRows] = useState([])
	const [param, setParam] = useState(initData)
	const { isLoading, data, refetch } = useReactQuery(param, destinationQueryKey.list, getDestination)
	const [newData, setNewData] = useState([])

	useEffect(() => {
		const list = data?.list
		if (list && Array.isArray(list)) {
			setRows(add_element_field(list, UserManageCustomerDestinationManageFields))

			setNewData({
				...data,
				list: data.list?.map((item) => ({
					...item,
					represent: item.represent ? '대표' : '-',
				})),
			})
		}
	}, [data])

	const { tableRowData, paginationData, totalCount } = useTableData({
		tableField: UserManageCustomerDestinationManageFields,
		serverData: newData,
	})

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	const openPost = () => {
		setChoiceComponent('등록')
	}

	const queryClient = useQueryClient()
	const mutation = useMutation(deleteDestination, {
		onSuccess: () => {
			queryClient.invalidateQueries('destination')
		},
		onError(e) {
			simpleAlert(e?.data?.message || '삭제에 실패하였습니다.')
		},
	})

	const handleRemoveBtn = useCallback(() => {
		if (selectedCount === 0) return simpleAlert('항목을 선택해주세요.')

		simpleConfirm('선텍하신 항목을 삭제하시겠습니까?', () =>
			mutation.mutate(selectedData.map((s) => s['목적지 고유 번호'])),
		)
	}, [selectedData])

	useEffect(() => {
		refetch()
	}, [param])

	return (
		<>
			{switchDestiEdit ? (
				<DestinationEdit
					setSwtichDestiEdit={setSwtichDestiEdit}
					uidAtom={uidAtom}
					setChoiceComponent={setChoiceComponent}
				/>
			) : (
				<FilterContianer>
					<div>
						<FilterHeader>
							<div style={{ display: 'flex' }}>
								<h1>목적지 관리</h1>
							</div>
						</FilterHeader>
					</div>
					<TableContianer>
						<TCSubContainer bor>
							<div>
								조회 목록 (선택 <span>{selectedCount}</span> /{totalCount?.toLocaleString()}개 )
								<TableV2HiddenSection />
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<PageDropdown handleDropdown={handleTablePageSize} />
								<Excel getRow={rows} sheetName="목적지 관리" />
							</div>
						</TCSubContainer>
						<TCSubContainer>
							<div>
								선택 <span> {selectedCount} </span>개
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<WhiteRedBtn onClick={handleRemoveBtn}>목적지 삭제</WhiteRedBtn>
								<SkyBtn onClick={openPost}>목적지 등록</SkyBtn>
							</div>
						</TCSubContainer>

						<TableV2
							getRow={tableRowData}
							loading={isLoading}
							getCol={UserManageCustomerDestinationManageFieldsCols}
							tablePagination={paginationData}
							onPageChange={onPageChange}
						/>
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default Destination
