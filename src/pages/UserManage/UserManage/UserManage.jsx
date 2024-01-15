import { useState } from 'react'

import { useAtom } from 'jotai'
import { useCallback, useEffect, useRef } from 'react'
import { delete_userManage, get_userManage } from '../../../api/userManage'
import { BlackBtn, GreyBtn, SkyBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import Hidden from '../../../components/TableInner/Hidden'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { UserManageFields, UserManageFieldsCols } from '../../../constants/admin/UserManage'
import useMutationQuery from '../../../hooks/useMutationQuery'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterLeft,
	FilterSubcontianer,
	FilterWrap,
	Input,
	PartWrap,
	ResetImg,
	RowWrap,
	StyledHeading,
	StyledSubHeading,
	SubTitle,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'
import {
	blueModalAtom,
	btnCellUidAtom,
	selectedRowsAtom,
	toggleAtom,
	UsermanageUserPostModal,
} from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
// import { isArray } from 'lodash'
import { isArray } from '../../../lib'
import ClientPostModal from '../Client/ClientPostModal'
import UserPost from './UserPost'
import { UsermanageUserManageEditModal } from '../../../store/Layout/Layout'
import UserEdit from './UserEdit'
import useTablePagination from '../../../hooks/useTablePagination'
const UserManage = ({ setChoiceComponent }) => {
	const [editModal, setEditModal] = useAtom(UsermanageUserManageEditModal)
	const [uidAtom, setUidAtom] = useAtom(btnCellUidAtom)
	console.log('uidAtom', uidAtom)
	const [postModal, setPostModal] = useAtom(UsermanageUserPostModal)
	const [types, setTypes] = useState('카스코철강') //카스코철강, 현대제철 , 운송, 창고
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

	// -----------------------------------------------------------------------------------
	const [getRow, setGetRow] = useState('')
	const tableField = useRef(UserManageFieldsCols)
	const getCol = tableField.current
	let checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		type: types,
	}
	const { isLoading, isError, data, isSuccess } = useReactQuery(paramData, 'userManage', get_userManage)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	const [param, setParam] = useState(paramData)
	const { onPageChanage } = useTablePagination(data, setParam)

	if (isError) console.log('데이터 request ERROR')

	useEffect(() => {
		let getData = resData
		if (!isSuccess && !resData) return

		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, UserManageFields))
		}
	}, [isSuccess, resData])

	// // 삭제
	const mutation = useMutationQuery('userManage', delete_userManage)
	const handleRemoveBtn = useCallback(() => {
		if (!isArray(checkedArray) || checkedArray.length === 0) return alert('선택해주세요!')

		if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
			checkedArray.forEach((item) => {
				mutation.mutate(item['순번']) //mutation.mutate로 api 인자 전해줌
			})
		}
	}, [checkedArray])

	const goPostPage = () => {
		setChoiceComponent('등록')
	}

	useEffect(() => {
		checkedArray = []
	}, [types])

	return (
		<FilterContianer>
			<div>
				<FilterHeader>
					<div style={{ display: 'flex' }}>
						<h1>사용자 관리</h1>
						<SubTitle>
							<StyledHeading isActive={types === '카스코철강'} onClick={() => setTypes('카스코철강')}>
								카스코철강
							</StyledHeading>
							<StyledHeading isActive={types === '현대제철'} onClick={() => setTypes('현대제철')}>
								현대제철
							</StyledHeading>
							<StyledHeading isActive={types === '운송'} onClick={() => setTypes('운송')}>
								운송사
							</StyledHeading>
							<StyledSubHeading isActive={types === '창고'} onClick={() => setTypes('창고')}>
								창고사
							</StyledSubHeading>
						</SubTitle>
					</div>
					{/* 토글 쓰기 */}
					<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
				</FilterHeader>
				{exFilterToggle && (
					<FilterWrap>
						<FilterSubcontianer>
							<FilterLeft>
								<RowWrap>
									<PartWrap>
										<h6 style={{ width: '100px' }}>고객 검색</h6>
										<MainSelect />
										<Input style={{ marginLeft: '10px' }} />
										<GreyBtn style={{ width: '70px' }} height={35} margin={10} onClick={modalOpen}>
											찾기
										</GreyBtn>
									</PartWrap>

									<PartWrap />
									<PartWrap />
									<PartWrap />
									<PartWrap />
									<PartWrap />
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
						</FilterFooter>
					</FilterWrap>
				)}
			</div>
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{checkedArray ? checkedArray.length : '0'}</span> /{' '}
						{resPagination ? resPagination.listCount : '0'}개 )
						<Hidden />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택<span> {checkedArray ? checkedArray.length : '0'} </span>(개)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<WhiteRedBtn onClick={handleRemoveBtn}>사용자 삭제</WhiteRedBtn>
						<SkyBtn
							onClick={() => {
								setPostModal(true)
							}}
						>
							사용자 등록
						</SkyBtn>
					</div>
				</TCSubContainer>
				{postModal && <UserPost setPostModal={setPostModal} />}
				{editModal && <UserEdit setEditModal={setEditModal} uidAtom={uidAtom} />}
				<Table
					setChoiceComponent={setChoiceComponent}
					getCol={getCol}
					getRow={getRow}
					tablePagination={resPagination}
					onPageChange={onPageChanage}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default UserManage
