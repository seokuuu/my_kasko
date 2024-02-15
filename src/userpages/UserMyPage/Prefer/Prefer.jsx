import { useMutation } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteCustomerfavorite, getCustomerfavorite, preferQueryKey } from '../../../api/myPage'
import { queryClient } from '../../../api/query'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { UserPageUserPreferFields, UserPageUserPreferFieldsCols } from '../../../constants/admin/UserManage'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, FilterHeader, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import Table from '../../../pages/Table/Table'
import useAlert from '../../../store/Alert/useAlert'
import { btnCellUidAtom, selectedRowsAtom, userpageUserPreferEdit } from '../../../store/Layout/Layout'
import PreferEdit from './PreferEdit'

const Prefer = ({ setChoiceComponent }) => {
	// 선택된 항목
	const { selectedCount, selectedData } = useTableSelection()
	console.log('selectedData :', selectedData)

	const { simpleAlert, simpleConfirm } = useAlert()

	const [switchEdit, setSwtichEdit] = useAtom(userpageUserPreferEdit)
	const uidAtom = useAtomValue(btnCellUidAtom)
	// const [filterData, setFilterData] = useAtom(userpageUserPreferEditObject)
	// const radioDummy = ['전체', '미진행', '진행중', '종료']

	// ====================================================================================
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(UserPageUserPreferFieldsCols)
	const getCol = tableField.current
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)
	const { isLoading, isError, data, isSuccess } = useReactQuery(param, preferQueryKey.list, getCustomerfavorite)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination
	const [tablePagination, setTablePagination] = useState([])
	const detailData = data?.data?.data?.list

	if (isError) console.log('데이터 request ERROR')

	useEffect(() => {
		let getData = resData
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserPageUserPreferFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, data])
	// 삭제
	const { mutate: remove } = useMutation(deleteCustomerfavorite, {
		onSuccess() {
			queryClient.invalidateQueries('getCustomerfavorite')
		},
		onError() {
			simpleAlert('삭제에 실패하였습니다.')
		},
	})
	const handleRemoveBtn = useCallback(() => {
		if (selectedCount === 0) return simpleAlert('항목을 선택해주세요.')
		simpleConfirm('선택한 항목을 삭제하시겠습니까?', () => remove(selectedData.map((select) => select['uid'])))
	}, [checkedArray])

	const goPostPage = () => {
		setChoiceComponent('등록')
	}

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 switchEdit을 재설정하는 정리 함수
		return () => {
			setSwtichEdit(false)
		}
	}, [])

	return (
		<>
			{switchEdit ? (
				<PreferEdit detailData={detailData} setSwtichEdit={setSwtichEdit} uidAtom={uidAtom} />
			) : (
				<FilterContianer>
					<FilterHeader>
						<div style={{ display: 'flex' }}>
							<h1>선호 제품 관리</h1>
						</div>
						{/* 토글 쓰기 */}
					</FilterHeader>

					<TableContianer>
						<TCSubContainer bor>
							<div></div>
							<div
								style={{
									display: 'flex',
									gap: '10px',
									alignItems: 'center',
								}}
							>
								<PageDropdown
									handleDropdown={(e) =>
										setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
									}
								/>
								<WhiteRedBtn onClick={handleRemoveBtn}>선택 삭제</WhiteRedBtn>
								<SkyBtn onClick={goPostPage}>등록</SkyBtn>
							</div>
						</TCSubContainer>
						<Table
							getCol={getCol}
							getRow={getRow}
							setChoiceComponent={setChoiceComponent}
							tablePagination={tablePagination}
							onPageChange={onPageChange}
						/>
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default Prefer
