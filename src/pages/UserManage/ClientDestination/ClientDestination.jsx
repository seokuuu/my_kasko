import { useAtom } from 'jotai'
import { useCallback, useState } from 'react'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	EditGear,
	FilterContianer,
	FilterHeader,
	FilterHeaderAlert,
	FilterWrap,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import { adminPageDestiEditModal, blueModalAtom, selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray, isEqual } from 'lodash'
import { useEffect, useRef } from 'react'
import { delete_clientDestination, get_clientDestination } from '../../../api/userManage'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import {
	UserManageCustomerDestinationManageFields,
	adminCustomerDestinationManageFieldsCols,
} from '../../../constants/admin/UserManage'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { UsermanageFindModal, btnCellUidAtom } from '../../../store/Layout/Layout'

import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import useTablePaginationPageChange from '../../../hooks/useTablePaginationPageChange'
import Table from '../../Table/Table'
import ClientDestinationSearchFields from './ClientDestinationSearchFields'
import DestinationEdit from './DestinationEdit'
import useAlert from '../../../store/Alert/useAlert'
const ClientDestination = ({ setChoiceComponent }) => {
	const [findModal, setFindModal] = useAtom(UsermanageFindModal)
	const [editModal, setEditModal] = useAtom(adminPageDestiEditModal)
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	// const handleSelectChange = (selectedOption, name) => {
	//   // setInput(prevState => ({
	//   //   ...prevState,
	//   //   [name]: selectedOption.label,
	//   // }));
	// }
	const [isRotated, setIsRotated] = useState(false)
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
	}
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
	const [isModal, setIsModal] = useAtom(blueModalAtom)
	const modalOpen = () => {
		setIsModal(true)
	}

	const [noticeEdit, setnoticeEdit] = useState(false)
	const { simpleConfirm, redAlert, showAlert } = useAlert()
	const noticeEditOnClickHandler = () => {
		setnoticeEdit((prev) => !prev)
	}
	// ---------------------------------------------------------------------------------------------
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(adminCustomerDestinationManageFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]
	console.log('checkedArray', checkedArray)
	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}

	const [param, setParam] = useState(paramData)

	const { data, isSuccess, refetch } = useReactQuery(param, 'clientDestination', get_clientDestination)
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
				}) //mutation.mutate로 api 인자 전해줌
			})
		} else {
			redAlert('삭제에 실패했습니다. 다시 시도 해주세요')
		}
	}, [checkedArray])

	const setPostPage = () => {
		setChoiceComponent('등록')
	}

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
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
						<FilterHeaderAlert>
							<div style={{ display: 'flex' }}>
								<div style={{ marginRight: '20px' }}>
									<img src="/img/notice.png" />
								</div>
								{noticeEdit ? (
									<div style={{ marginTop: '6px' }}>
										<div>
											<input style={{ border: '1px solid' }} />
										</div>
										<div>
											<input style={{ marginTop: '6px', border: '1px solid' }} />
										</div>
									</div>
								) : (
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div>· 하차지 연락처에 핸드폰번호 미입력시 토요일 하차 불가합니다.</div>
									</div>
								)}
							</div>

							{noticeEdit ? (
								<EditGear onClick={noticeEditOnClickHandler}>
									완료
									<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
								</EditGear>
							) : (
								<EditGear onClick={noticeEditOnClickHandler}>
									수정
									<img style={{ marginLeft: '10px' }} src="/img/setting.png" />
								</EditGear>
							)}
						</FilterHeaderAlert>
						{exFilterToggle && (
							<FilterWrap>
								{/* <FilterSubcontianer>
									<FilterLeft>
										<RowWrap>
											<PartWrap>
												<h6>고객사 명/고객사코드</h6>
												<MainSelect />
												<Input />
												<GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen} fontSize={17}>
													찾기
												</GreyBtn>
											</PartWrap>
										</RowWrap>
									</FilterLeft>
								</FilterSubcontianer>
								<FilterFooter>
									<div style={{ display: 'flex' }}>
										<p>초기화</p>
										<ResetImg
											src="/img/reset.png"
											style={{ marginLeft: '10px', marginRight: '20px' }}
											onClick={handleImageClick}
											className={isRotated ? 'rotate' : ''}
										/>
									</div>
									<div style={{ width: '180px' }}>
										<BlackBtn width={100} height={40}>
											검색
										</BlackBtn>
									</div>
								</FilterFooter> */}
								<GlobalProductSearch
									param={param}
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
								<Hidden />
							</div>
							<div style={{ display: 'flex', gap: '10px' }}>
								<PageDropdown
									handleDropdown={(e) =>
										setParam((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
									}
								/>
								<Excel getRow={getRow} />
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
						/>
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default ClientDestination
