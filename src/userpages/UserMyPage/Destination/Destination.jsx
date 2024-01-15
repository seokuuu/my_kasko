import { useCallback, useEffect, useRef, useState } from 'react'

import Excel from '../../../components/TableInner/Excel'

import { SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { btnCellUidAtom, selectedRowsAtom, toggleAtom, userPageDestiEditModal } from '../../../store/Layout/Layout'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import PageDropdown from '../../../components/TableInner/PageDropdown'
import Hidden from '../../../components/TableInner/Hidden'

import useReactQuery from '../../../hooks/useReactQuery'
import { useAtom } from 'jotai'
import { isArray } from '../../../lib'
import { deleteDestination } from '../../../api/myPage/userDestination'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getDestination } from '../../../api/myPage'
import Table from '../../../pages/Table/Table'
import useTablePagination from '../../../hooks/useTablePagination'
import {
	UserManageCustomerDestinationManageFields,
	UserManageCustomerDestinationManageFieldsCols,
} from '../../../constants/admin/UserManage'
import { add_element_field } from '../../../lib/tableHelpers'
import DestinationEdit from './DestinationEdit'

const Destination = ({ setChoiceComponent }) => {
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	const [switchDestiEdit, setSwtichDestiEdit] = useAtom(userPageDestiEditModal)
	const radioDummy = ['전체', '미진행', '진행중', '종료']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	const [savedRadioValue, setSavedRadioValue] = useState('')
	useEffect(() => {
		const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)
	}, [checkRadio])

	const handleSelectChange = (selectedOption, name) => {
		// setInput(prevState => ({
		//   ...prevState,
		//   [name]: selectedOption.label,
		// }));
	}
	const [isRotated, setIsRotated] = useState(false)

	// Function to handle image click and toggle rotation
	const handleImageClick = () => {
		setIsRotated((prevIsRotated) => !prevIsRotated)
	}

	useEffect(() => {
		// 컴포넌트가 언마운트될 때 switchEdit을 재설정하는 정리 함수
		return () => {
			setSwtichDestiEdit(false)
		}
	}, [])

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

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(UserManageCustomerDestinationManageFieldsCols)
	const getCol = tableField.current
	const checkedArray = useAtom(selectedRowsAtom)[0]

	console.log('checkedArray', checkedArray)

	const [request, setRequest] = useState({
		pageNum: 1,
		pageSize: 5,
	})
	const { isLoading, isError, data, isSuccess } = useReactQuery(request, 'getDestination', getDestination)
	const [pages, setPages] = useState([])
	const resData = data?.data?.data?.list
	const pagination = data?.data?.data?.pagination

	// const { onPageChange } = useTablePagination(data, setRequest)
	const onPageChange = (value) => {
		setRequest((p) => ({ ...p, pageNum: Number(value) }))
	}
	if (isError) console.log('데이터 request ERROR')

	useEffect(() => {
		let getData = resData
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserManageCustomerDestinationManageFields))
			setPages(pagination)
		}
	}, [isSuccess, resData])

	console.log('getRow =>', getRow)
	console.log('switchDestiEdit => ', switchDestiEdit)

	const openPost = () => {
		setChoiceComponent('등록')
	}

	// const openEdit = async () => {
	//   setChoiceComponent('수정')
	// }

	const queryClient = useQueryClient()
	const mutation = useMutation(deleteDestination, {
		onSuccess: () => {
			queryClient.invalidateQueries('destination')
		},
	})

	const handleRemoveBtn = useCallback(() => {
		if (isArray(checkedArray) && checkedArray.length > 0) {
			if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
				checkedArray.forEach((item) => {
					mutation.mutate(item['uid'])
				})
			}
		} else {
			alert('선택해주세요!')
		}
	}, [checkedArray])
	console.log(request.pageSize)
	return (
		<>
			{switchDestiEdit ? (
				<DestinationEdit setSwtichDestiEdit={setSwtichDestiEdit} uidAtom={uidAtom} />
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
								조회 목록 (선택 <span>2</span> / 50개 )
								<Hidden />
							</div>
							<div>
								<PageDropdown
									handleDropdown={(e) => {
										setRequest((prev) => ({ ...prev, pageNum: 1, pageSize: parseInt(e.target.value) }))
									}}
								/>
								<Excel />
							</div>
						</TCSubContainer>
						<TCSubContainer>
							<div>
								선택 <span> 2 </span>개
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
						/>
					</TableContianer>
				</FilterContianer>
			)}
		</>
	)
}

export default Destination
