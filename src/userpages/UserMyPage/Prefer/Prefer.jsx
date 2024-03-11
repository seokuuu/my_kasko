import { useMutation } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import React, { useCallback, useEffect, useState } from 'react'
import { deleteCustomerfavorite, getCustomerfavorite, preferQueryKey } from '../../../api/myPage'
import { queryClient } from '../../../api/query'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { UserPageUserPreferFields, UserPageUserPreferFieldsCols } from '../../../constants/admin/UserManage'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import { btnCellUidAtom, selectedRowsAtom, userpageUserPreferEdit } from '../../../store/Layout/Layout'
import PreferEdit from './PreferEdit'
import useTableData from '../../../hooks/useTableData'
import TableV2 from '../../../pages/Table/TableV2'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import Excel from '../../../components/TableInner/Excel'

const Prefer = ({ setChoiceComponent }) => {
	const { simpleAlert, simpleConfirm } = useAlert()
	const [switchEdit, setSwtichEdit] = useAtom(userpageUserPreferEdit)
	const uidAtom = useAtomValue(btnCellUidAtom)

	// ====================================================================================
	const [getRow, setGetRow] = useState('')
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)
	const { isLoading, data, isSuccess } = useReactQuery(param, preferQueryKey.list, getCustomerfavorite)

	const { tableRowData, paginationData, totalCount } = useTableData({
		tableField: UserPageUserPreferFields,
		serverData: data?.data?.data,
	})

	// 선택 항목
	const { selectedCountStr, selectedCount, selectedData } = useTableSelection({
		weightKey: '중량',
	})

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
		let getData = data?.data?.data?.list
		if (!isSuccess && !getData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserPageUserPreferFields))
		}
	}, [isSuccess, data])

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 switchEdit을 재설정하는 정리 함수
		return () => {
			setSwtichEdit(false)
		}
	}, [])

	return (
		<>
			{switchEdit ? (
				<PreferEdit detailData={data?.data?.data?.list} setSwtichEdit={setSwtichEdit} uidAtom={uidAtom} />
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
							<div>
								조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCount?.toLocaleString()}개 )
								<TableV2HiddenSection />
							</div>
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
								<Excel getRow={getRow} sheetName={'출하_지시_등록'} />
							</div>
						</TCSubContainer>
						<TCSubContainer>
							<div></div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<WhiteRedBtn onClick={handleRemoveBtn}>선택 삭제</WhiteRedBtn>
								<SkyBtn onClick={goPostPage}>등록</SkyBtn>
							</div>
						</TCSubContainer>
						<TableV2
							getRow={tableRowData}
							loading={isLoading}
							getCol={UserPageUserPreferFieldsCols}
							tablePagination={paginationData}
							onPageChange={onPageChange}
						/>
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default Prefer
