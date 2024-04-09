import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isArray, isEqual } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { delete_clientDestination, get_clientDestination } from '../../../api/userManage'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	adminCustomerDestinationManageFieldsCols,
	UserManageCustomerDestinationManageFields,
} from '../../../constants/admin/UserManage'
import useReactQuery from '../../../hooks/useReactQuery'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import {
	adminPageDestiEditModal,
	btnCellUidAtom,
	selectedRowsAtom,
	toggleAtom,
	UsermanageFindModal,
} from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import ClientDestinationSearchFields from './ClientDestinationSearchFields'
import DestinationEdit from './DestinationEdit'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const ClientDestination = ({ setChoiceComponent }) => {
	const [findModal, setFindModal] = useAtom(UsermanageFindModal)
	const [editModal, setEditModal] = useAtom(adminPageDestiEditModal)
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)

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

	const { redAlert, showAlert } = useAlert()

	// ---------------------------------------------------------------------------------------------
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(adminCustomerDestinationManageFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}

	const [param, setParam] = useState(paramData)

	const { data, isSuccess, refetch, isLoading } = useReactQuery(param, 'clientDestination', get_clientDestination)
	const resData = data?.data?.data?.list
	const pagination = data?.data?.data?.pagination

	const { onPageChanage } = useTablePaginationPageChange(data, setParam)

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserManageCustomerDestinationManageFields))
		}
	}, [isSuccess, resData, findModal])

	// 삭제
	const mutation = useMutation(delete_clientDestination, {
		onSuccess: () => {
			queryClient.invalidateQueries('clientDestination')
		},
	})

	const handleRemoveBtn = useCallback(() => {
		if (isArray(checkedArray) && checkedArray.length > 0) {
			checkedArray.forEach((item) => {
				mutation.mutate(item['목적지 고유 번호'], {
					onSuccess: () => {
						showAlert({
							title: '삭제 되었습니다',
							func: () => {
								window.location.reload()
							},
						})
					},
					onError: (e) => {
						redAlert('삭제에 실패했습니다. 다시 시도 해주세요', () => {
							window.location.reload()
						})
					},
				})
			})
		} else {
			redAlert('삭제에 실패했습니다. 다시 시도 해주세요')
		}
	}, [checkedArray])

	const setPostPage = () => {
		setChoiceComponent('등록')
	}

	const globalProductResetOnClick = () => {
		setParam(paramData)
	}
	// import
	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	return (
		<>
			{editModal ? (
				<DestinationEdit setEditModal={setEditModal} uidAtom={uidAtom} findModal={findModal} />
			) : (
				<FilterContianer>
					<div>
						<FilterHeader>
							<h1>고객사 목적지 관리</h1>
							{/* 토글 쓰기 */}
							<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
						</FilterHeader>
						{/* 주의 사항 */}
						<CautionBox category={CAUTION_CATEGORY.order} />
						{exFilterToggle && (
							<FilterWrap>
								<GlobalProductSearch
									param={param}
									setParam={setParam}
									isToggleSeparate={true}
									renderCustomSearchFields={(props) => <ClientDestinationSearchFields {...props} />}
									globalProductSearchOnClick={globalProductSearchOnClick} //
									globalProductResetOnClick={globalProductResetOnClick} //
								/>
							</FilterWrap>
						)}
					</div>
					<TableContianer>
						<TCSubContainer bor>
							<div>
								조회 목록 (선택 <span>{checkedArray ? checkedArray.length : '0'}</span> / {pagination?.listCount}개 )
								<TableV2HiddenSection />
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<PageDropdown
									handleDropdown={(e) =>
										setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
									}
								/>
								<Excel getRow={getRow} sheetName={'고객사 목적지'} />
							</div>
						</TCSubContainer>
						<TCSubContainer>
							<div>
								선택<span> {checkedArray ? checkedArray.length : '0'} </span>(개)
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<WhiteRedBtn
									onClick={() => {
										redAlert('선택한 목적지를 삭제하시겠습니까', handleRemoveBtn)
									}}
								>
									목적지 삭제
								</WhiteRedBtn>
								<SkyBtn onClick={setPostPage}>목적지 등록</SkyBtn>
							</div>
						</TCSubContainer>
						<Table
							getCol={getCol}
							getRow={getRow}
							setChoiceComponent={setChoiceComponent}
							tablePagination={pagination}
							onPageChange={onPageChanage}
							isRowClickable={true}
							loading={isLoading}
						/>
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default ClientDestination
