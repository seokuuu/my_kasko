import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useAtom } from 'jotai'
import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import Hidden from '../../../components/TableInner/Hidden'
import { FilterContianer, FilterHeader, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import {
	StandardConsoliateEdit,
	btnCellUidAtom,
	consolEditModalAtom,
	popupAtom,
	popupObject,
	popupTypeAtom,
	selectedRowsAtom,
} from '../../../store/Layout/Layout'

import { StandardConsolidationFields, StandardConsolidationFieldsCols } from '../../../constants/admin/Standard'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isArray, isEqual } from 'lodash'
import { useParams } from 'react-router-dom'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import useBlockRoute from '../../../hooks/useBlockRoute'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import AlertPopup from '../../../modal/Alert/AlertPopup'
import { popupDummy } from '../../../modal/Alert/PopupDummy'
import ConsolidationModal from '../../../modal/Multi/Consolidation'
import {
	deleteAdminConsolidation,
	editAdminConsolidation,
	getAdminConsolidation,
	postAdminConsolidation,
} from '../../../service/admin/Standard'
import useAlert from '../../../store/Alert/useAlert'
import Table from '../../Table/Table'

const Consolidation = ({}) => {
	const [popupSwitch, setPopupSwitch] = useAtom(popupAtom) // 팝업 스위치
	const [nowPopup, setNowPopup] = useAtom(popupObject) // 팝업 객체
	const [nowPopupType, setNowPopupType] = useAtom(popupTypeAtom) // 팝업 타입
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	const [btnCellModal, setBtnCellModal] = useAtom(StandardConsoliateEdit)
	const [modalMode, setModalMode] = useAtom(consolEditModalAtom)
	const initForm = { title: '', status: true }
	const [observeClick, setObserveClick] = useState(false)
	const [form, setForm] = useState(initForm)
	const { id } = useParams()
	const { simpleAlert } = useAlert()

	const [inputValues, setInputValues] = useState({
		dropValue: '2착',
		input1: '',
		input2: '',
	})

	const convertInputKey = {
		dropValue: 'land',
		input1: 'inAreaPrice',
		input2: 'outAreaPrice',
		uid: 'uid',
	}

	const transformInputValues = (inputValues) => {
		const transformedValues = {}
		for (const key in inputValues) {
			const convertedKey = convertInputKey[key]
			transformedValues[convertedKey] = inputValues[key]
		}
		return transformedValues
	}

	// 합짐비 등록 및 수정 변환 Data (찐)
	const transformedValues = transformInputValues(inputValues)

	// Post
	const postMutation = useMutation(postAdminConsolidation, {
		onSuccess: () => {
			setBtnCellModal(false)
			queryClient.invalidateQueries('destination')
			queryClient.invalidateQueries('getAdminConsolidation')
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '합짐비 등록 중 오류가 발생했습니다.')
		},
	})

	const propsPost = () => {
		postMutation.mutate(transformedValues)
	}

	// Edit
	const editMutation = useMutation(editAdminConsolidation, {
		onSuccess: () => {
			setBtnCellModal(false)
			queryClient.invalidateQueries('destination')
			queryClient.invalidateQueries('getAdminConsolidation')
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '합짐비 수정 중 오류가 발생했습니다.')
		},
	})

	const propsEdit = () => {
		editMutation.mutate(transformedValues)
	}

	const onChangeHandler = useCallback(
		(e) => {
			const { name, value } = e.target
			setInputValues((p) => ({
				...p,
				[name]: value,
			}))
		},
		[inputValues],
	)

	const handleDropValueChange = (newValue) => {
		setInputValues((prevValues) => ({
			...prevValues,
			dropValue: newValue.value,
		}))
	}

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(StandardConsolidationFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}

	// GET
	const [param, setParam] = useState(paramData)
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(
		param,
		'getAdminConsolidation',
		getAdminConsolidation,
	)

	const resData = data?.data?.data?.list
	const [tablePagination, setTablePagination] = useState([])

	const matchingData = resData?.find((data) => data.uid === uidAtom)
	const landValue = matchingData ? matchingData.land : null

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			const { startRow } = data?.data?.data?.pagination
			const newData = getData.map((item, index) => ({ index: startRow + index + 1, ...item }))
			setGetRow(add_element_field(newData, StandardConsolidationFields))
			setTablePagination(data.data.data.pagination)
		}
	}, [isSuccess, resData])

	// DELETE
	const mutation = useMutation(deleteAdminConsolidation, {
		onSuccess: () => {
			queryClient.invalidateQueries('destination')
			refetch()
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '삭제에 실패했습니다. 다시 시도해 주세요.')
		},
	})

	const propsRemove = () => {
		checkedArray.forEach((item) => {
			mutation.mutate(item['합짐비 고유 번호']) //mutation.mutate로 api 인자 전해줌
		})
	}

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
				simpleAlert('삭제할 항목을 선택해 주세요.')
			}
		},
		[checkedArray],
	)

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

	const blockCondition = useMemo(() => !isEqual(initForm, form) && !Boolean(id) && !observeClick, [form, observeClick])
	useBlockRoute(blockCondition)

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<h1>합짐비 관리</h1>
					{/* 토글 쓰기 */}
				</FilterHeader>
			</div>

			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkedArray?.length || 0}</span> / {data?.data?.data?.pagination?.listCount}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 <span>{checkedArray?.length || 0}</span>(개)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />

						<WhiteRedBtn
							onClick={() => {
								firstPopupClick('2-6')
							}}
						>
							합짐비 삭제
						</WhiteRedBtn>
						<SkyBtn
							onClick={() => {
								setBtnCellModal(true)
								setModalMode('등록')
							}}
						>
							합짐비 등록
						</SkyBtn>
					</div>
				</TCSubContainer>
				<Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
			</TableContianer>
			{btnCellModal && (
				<ConsolidationModal
					btnCellModal={btnCellModal}
					setBtnCellModal={setBtnCellModal}
					getRow={getRow}
					uidAtom={uidAtom}
					onChangeHandler={onChangeHandler}
					handleDropValueChange={handleDropValueChange}
					data1={'길이 입력'}
					data2={'폭 입력'}
					data3={'할증'}
					inputValues={inputValues}
					setInputValues={setInputValues}
					title={modalMode === '등록' ? '합짐비 등록' : '합짐비 수정'}
					propsHandler={modalMode === '등록' ? propsPost : propsEdit}
					editTitle={'할증 고유 번호'}
					modalMode={modalMode}
					landValue={landValue}
				/>
			)}
			{popupSwitch && <AlertPopup setPopupSwitch={setPopupSwitch} />}
		</FilterContianer>
	)
}

export default Consolidation
