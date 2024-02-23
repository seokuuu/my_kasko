import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import Hidden from '../../../components/TableInner/Hidden'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'
import {
	btnCellRenderAtom,
	btnCellUidAtom,
	excelToJsonAtom,
	modalAtom,
	popupAtom,
	popupObject,
	selectedRowsAtom,
	toggleAtom,
} from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import {
	StandardDestinaionFields,
	StandardDestinaionFieldsCols,
	StandardDestinationPost,
} from '../../../constants/admin/Standard'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray, isEqual } from 'lodash'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import { popupDummy } from '../../../modal/Alert/PopupDummy'
import Upload from '../../../modal/Upload/Upload'
import {
	deleteAdminDestination,
	getAdminDestination,
	postAdminDestination,
	postExcelAdminDestination,
} from '../../../service/admin/Standard'
import useAlert from '../../../store/Alert/useAlert'
import DestinationSearchFilter from './DestinationSearchFilter'
import DestinationSinglePost from './DestinationSinglePost'
import { queryClient } from '../../../api/query'
import { useLoading } from '../../../store/Loading/loadingAtom'

// INITIAL PARAM
const initialParamData = {
	pageNum: 1,
	pageSize: 50,
}

const initPostData = {
	isSpecialAddress: false,
	name: null,
	note: null,
}

const Destination = () => {
	// MODAL
	const [modalSwitch, setModalSwitch] = useAtom(modalAtom)
	const { simpleAlert } = useAlert()
	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
	const setNowPopup = useSetAtom(popupObject) // 팝업 객체

	const uidAtom = useAtomValue(btnCellUidAtom)
	const [excelToJson, setExcelToJson] = useAtom(excelToJsonAtom)

	// POST DATA
	const [postData, setPostData] = useState(initPostData)

	// TABLE
	const [getRow, setGetRow] = useState([])
	const tableField = useRef(StandardDestinaionFieldsCols)
	const originEngRowField = StandardDestinaionFields
	const getCol = tableField.current
	const checkedArray = useAtom(selectedRowsAtom)[0]

	// API
	const [param, setParam] = useState(initialParamData)
	const [pagination, setPagination] = useState([])

	// GET LIST
	const { isLoading, data, isSuccess, refetch } = useReactQuery(param, 'getAdminDestination', getAdminDestination)
	// POST NEW DESTINATION
	const postMutation = useMutationQuery('', postAdminDestination)
	// DELETE
	const mutation = useMutation(deleteAdminDestination, {
		onSuccess: () => {
			queryClient.invalidateQueries('destination')
		},
	})

	// DATA
	const resData = data?.data?.data?.list

	const openModal = () => {
		setModalSwitch(true)
		setNowPopup((prev) => ({
			...prev,
			func: propsPost,
		}))
	}

	/* ==================== UPDATE HANDLER start ==================== */
	// propsPost 함수
	const propsPost = () => {
		console.log('postData : ', postData)
		postMutation.mutate(postData, {
			onSuccess: () => {
				simpleAlert('저장 되었습니다.')
				setModalSwitch(false)
				setPostData(initPostData)
				queryClient.invalidateQueries('destination')
			},
			onError: (error) => {
				simpleAlert(error?.data?.message || '목적지 등록에 실패하였습니다. 다시 시도해 주세요.')
			},
		})
	}

	/* ==================== UPDATE HANDLER end ==================== */

	/* ==================== DELETE HANDLER start ==================== */
	// 선택한 것 삭제 요청 (해당 함수 func 인자로 전달)
	const propsRemove = () => {
		checkedArray.forEach((item) => {
			mutation.mutate(item['목적지 고유 번호']) //mutation.mutate로 api 인자 전해줌
		})
	}

	// 팝업 '확인' 버튼 함수 (prop으로 줄 함수 선택)
	const firstPopupClick = useCallback(
		(num) => {
			if (isArray(checkedArray) && checkedArray.length > 0) {
				setPopupSwitch(true)
				const firstPopup = popupDummy.find((popup) => popup.num === num)
				setNowPopup((prevNowPopup) => ({
					...prevNowPopup,
					...firstPopup,
					func: propsRemove,
				}))
			} else {
				simpleAlert('삭제할 목적지를 선택해 주세요.')
			}
		},
		[checkedArray],
	)
	/* ==================== DELETE HANDLER end ==================== */

	/* ==================== SEARCH HANDLER start ==================== */
	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	const onPageSizeChange = (e) => {
		const newSize = e.target.value

		setParam((prevParam) => ({
			...prevParam,
			pageNum: 1,
			pageSize: newSize,
		}))
	}

	const globalProductResetOnClick = () => {
		setParam(initialParamData)
	}

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
	/* ==================== SEARCH HANDLER end ==================== */

	/* ==================== COMMON UI start ==================== */
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
	/* ==================== COMMON UI end ==================== */

	/* ==================== STATE start ==================== */
	// 테이블 데이터 세팅
	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, StandardDestinaionFields))
			setPagination(data?.data?.data?.pagination)
		}
	}, [isSuccess, resData])

	// 테이블 데이터 초기화
	useEffect(() => {
		if (postMutation.isSuccess) refetch()
	}, [postMutation.isSuccess])

	useLoading(postMutation?.isLoading)
	/* ==================== STATE end ==================== */

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>목적지 관리</h1>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{exFilterToggle && (
					<FilterWrap>
						<GlobalProductSearch
							param={param}
							isToggleSeparate={true}
							renderCustomSearchFields={(props) => <DestinationSearchFilter {...props} />} // 만들어야함 -> WinningSearchFields
							globalProductSearchOnClick={globalProductSearchOnClick} // import
							globalProductResetOnClick={globalProductResetOnClick} // import
						/>
					</FilterWrap>
				)}
			</div>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkedArray?.length || 0}</span> / {data?.data?.data?.pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={onPageSizeChange} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 <span>{checkedArray?.length || 0}</span>(개)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn
							onClick={() => {
								firstPopupClick('2-2')
							}}
						>
							목적지 삭제
						</WhiteRedBtn>
						<WhiteSkyBtn
							onClick={() => {
								openModal()
							}}
						>
							목적지 등록
						</WhiteSkyBtn>
					</div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={getRow}
					tablePagination={pagination}
					onPageChange={onPageChange}
					loading={isLoading}
				/>
			</TableContianer>
			{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
			{modalSwitch && (
				// Post
				<Upload
					width={'1200'}
					modalSwitch={modalSwitch}
					setModalSwitch={setModalSwitch}
					title={'목적지 등록'}
					category={'목적지 등록'}
					originEngRowField={originEngRowField}
					excelToJson={excelToJson}
					setExcelToJson={setExcelToJson}
					propsHandler={propsPost}
					modalInTable={StandardDestinationPost}
					getRow={getRow}
					uidAtom={uidAtom}
					excelUploadAPI={postExcelAdminDestination}
					refreshQueryKey={'getAdminDestination'}
					data={postData}
					setData={setPostData}
				/>
			)}
		</FilterContianer>
	)
}

export default Destination
