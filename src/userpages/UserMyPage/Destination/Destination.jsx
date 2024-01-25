import { useCallback, useEffect, useRef, useState } from 'react'

import Excel from '../../../components/TableInner/Excel'

import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { btnCellUidAtom, userPageDestiEditModal } from '../../../store/Layout/Layout'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { deleteDestination } from '../../../api/myPage/userDestination'
import useReactQuery from '../../../hooks/useReactQuery'

import { destinationQueryKey, getDestination } from '../../../api/myPage'
import {
	UserManageCustomerDestinationManageFields,
	UserManageCustomerDestinationManageFieldsCols,
} from '../../../constants/admin/UserManage'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../../pages/Table/Table'
import useAlert from '../../../store/Alert/useAlert'
import DestinationEdit from './DestinationEdit'

const Destination = ({ setChoiceComponent }) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	// 선택된 항목
	const { selectedCount, selectedData } = useTableSelection()

	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	const [switchDestiEdit, setSwtichDestiEdit] = useAtom(userPageDestiEditModal)

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 switchEdit을 재설정하는 정리 함수
		return () => {
			setSwtichDestiEdit(false)
		}
	}, [])

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(UserManageCustomerDestinationManageFieldsCols)
	const getCol = tableField.current

	// 리스트 옵션
	const [request, setRequest] = useState({
		pageNum: 1,
		pageSize: 50,
	})

	// 리스트 API
	const { isLoading, isError, data, isSuccess } = useReactQuery(request, destinationQueryKey.list, getDestination)
	const [pages, setPages] = useState([])
	const resData = data?.data?.data?.list
	const pagination = data?.data?.data?.pagination

	const onPageChange = (value) => {
		setRequest((p) => ({ ...p, pageNum: Number(value) }))
	}

	useEffect(() => {
		let getData = resData
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserManageCustomerDestinationManageFields))
			setPages(pagination)
		}
	}, [isSuccess, resData])

	const openPost = () => {
		setChoiceComponent('등록')
	}

	const queryClient = useQueryClient()
	const mutation = useMutation(deleteDestination, {
		onSuccess: () => {
			queryClient.invalidateQueries('destination')
		},
		onError() {
			simpleAlert('삭제에 실패하였습니다.')
		},
	})

	const handleRemoveBtn = useCallback(() => {
		if (selectedCount === 0) return simpleAlert('항목을 선택해주세요.')

		simpleConfirm('선텍하신 항목을 삭제하시겠습니까?', () =>
			mutation.mutate(selectedData.map((s) => s['목적지 고유 번호'])),
		)
	}, [selectedData])
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
								조회 목록 (선택 <span>{selectedCount}</span> /{request.pageSize}개 )
								<Hidden />
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<PageDropdown
									handleDropdown={(e) => {
										setRequest((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
									}}
								/>
								<Excel getRow={getRow} sheetName="목적지 관리" />
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

						<Table
							getCol={getCol}
							getRow={getRow}
							tablePagination={pages}
							onPageChange={onPageChange}
							isRowClickable={true}
							loading={isLoading}
						/>
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default Destination
