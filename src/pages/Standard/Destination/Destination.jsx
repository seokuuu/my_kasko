import { useAtom } from 'jotai'
import { useCallback, useEffect, useRef, useState } from 'react'
import { WhiteRedBtn, WhiteSkyBtn } from '../../../common/Button/Button'
import Hidden from '../../../components/TableInner/Hidden'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import {
	FilterContianer,
	FilterHeader,
	FilterWrap,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import {
	btnCellRenderAtom,
	btnCellUidAtom,
	excelToJsonAtom,
	modalAtom,
	popupAtom,
	popupObject,
	selectedRowsAtom,
	toggleAtom
} from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import {
	StandardDestinaionFields,
	StandardDestinaionFieldsCols,
	StandardDestinationPost,
	StandardTransportationEdit,
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
import TableModal from '../../../modal/Table/TableModal'
import Upload from '../../../modal/Upload/Upload'
import {
	deleteAdminDestination,
	editAdminDestination,
	getAdminDestination,
	postAdminDestination,
	postExcelAdminDestination
} from '../../../service/admin/Standard'
import useAlert from '../../../store/Alert/useAlert'
import DestinationSearchFilter from './DestinationSearchFilter'

// INITIAL PARAM
const initialParamData = {
	pageNum: 1,
	pageSize: 50,
}

// convert key
const convertKey = {
	'목적지 명': 'name',
	비고: 'note',
}

// match object
const DESTINATION_MATCH = {
	"목적지 코드" : "code",
	"목적지 명" : "destination-input",
	"작성자" : "createMember",
	"작성일" : "createDate",
	"수정자" : "updateMember",
	"수정일" : "updateDate",
	"비고" : "destination-input",
}

const Destination = ({}) => {
	// MODAL
	const [modalSwitch, setModalSwitch] = useAtom(modalAtom)
	const { simpleAlert } = useAlert();
	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
	const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
	// adress
	const [address, setAddress] = useState('')
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	const [btnCellModal, setBtnCellModal] = useAtom(btnCellRenderAtom)
	const [excelToJson, setExcelToJson] = useAtom(excelToJsonAtom)
	// TABLE
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(StandardDestinaionFieldsCols)
	const originEngRowField = StandardDestinaionFields
	const getCol = tableField.current
	const checkedArray = useAtom(selectedRowsAtom)[0]
	// API
	const [param, setParam] = useState(initialParamData )
	const [pagination, setPagination] = useState([])
	const queryClient = useQueryClient()
	// GET LIST
	const { isLoading, data, isSuccess, refetch } = useReactQuery(
		param,
		'getAdminDestination',
		getAdminDestination,
	)
	// POST NEW DESTINATION
	const postMutation = useMutationQuery('', postAdminDestination)
	// DELETE
	const mutation = useMutation(deleteAdminDestination, {
		onSuccess: () => {
			queryClient.invalidateQueries('destination')
		},
	})
	// Edit
	const editMutation = useMutationQuery('', editAdminDestination)
	const [editInput, setEditInput] = useState({ name: address, note: '' })
	// DATA
	const resData = data?.data?.data?.list;

	
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
		// console.log(editInput);
		postMutation.mutate(editInput, {
			onSuccess: () => {
				// 성공 시 실행할 코드 작성
				setModalSwitch(false)
				// 추가로 필요한 작업 수행
			},
			onError: (error) => {
				simpleAlert(error?.data?.message || '목적지 등록에 실패하였습니다. 다시 시도해 주세요.')
			}
		})
	}

	const propsEdit = () => {
		alert('기능 삭제 | 최종 수정 예정');
		// const editParams = {...editInput};
		// if(!editParams.name) delete editParams.name;
		// if(!editParams.note) delete editParams.note;

		// if(editParams.name || editParams.note) {
		// 	editMutation.mutate(editParams);
		// }
	}

	// 여기에 목적지 관련한 것도 추가로 넣기
	const onEditHandler = useCallback(
		(e) => {
			const { name, value } = e.target
			setEditInput({
				...editInput,
				uid: uidAtom,
				[name]: value,
			})
		},
		[editInput],
	)
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
		const newSize = e.target.value;

		setParam((prevParam) => ({
			...prevParam,
			pageNum: 1,
			pageSize: newSize
		}))
	} 

	const globalProductResetOnClick = () => {
		setParam(initialParamData )
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
	}, [isSuccess, resData]);

	// 테이블 데이터 초기화
	useEffect(() => {
		if (postMutation.isSuccess) refetch()
	}, [postMutation.isSuccess])

	useEffect(() => {
		setEditInput({
			name: address,
		})
	}, [address])
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
						<PageDropdown handleDropdown={onPageSizeChange}  />
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
				<Table getCol={getCol} getRow={getRow} tablePagination={pagination} onPageChange={onPageChange} loading={isLoading} />
				{btnCellModal && (
					// Edit
					<TableModal
						btnCellModal={btnCellModal} // Modal Atom Switch
						setBtnCellModal={setBtnCellModal} // 수정 버튼에 대한 ag-grid event
						// modalInTable={StandardTransportationEdit} // Modal 안에 들어갈 Table 매칭 디렉토리 ex)
						modalInTable={DESTINATION_MATCH} // Modal 안에 들어갈 Table 매칭 디렉토리 ex)
						title={'목적지 수정'}
						getRow={getRow} // 해당 컴포넌트 Table 자체 Object (한글)
						uidAtom={uidAtom} // 수정버튼 누른 해당 object의 고유 id (btnCellRender에서 추출된 uid)
						onEditHandler={onEditHandler} // edit 버튼의 함수를 스프레드 func를 전달
						propsHandler={propsEdit} // 실질 patch 역할하는 함수
						editTitle={'목적지 고유 번호'}
						convertKey={convertKey}
					/>
				)}
			</TableContianer>
			{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
			{modalSwitch && (
				// Post
				<Upload
					modalSwitch={modalSwitch}
					setModalSwitch={setModalSwitch}
					title={'목적지 등록'}
					originEngRowField={originEngRowField}
					excelToJson={excelToJson}
					setExcelToJson={setExcelToJson}
					propsHandler={propsPost}
					modalInTable={StandardDestinationPost}
					getRow={getRow}
					uidAtom={uidAtom}
					onEditHandler={onEditHandler}
					address={address}
					setAddress={setAddress}
					excelUploadAPI={postExcelAdminDestination}
					refreshQueryKey={'getAdminDestination'}
				/>
			)}
		</FilterContianer>
	)
}

export default Destination
