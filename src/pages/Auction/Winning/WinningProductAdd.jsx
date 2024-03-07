import { useEffect, useRef, useState } from 'react'
import { BlackBtn, BtnBound, TGreyBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	CustomInput,
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	FilterTopContainer,
	TableContianer,
	TCSubContainer,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useQueryClient } from '@tanstack/react-query'
import { isArray, isEqual } from 'lodash'
import { getWinningCreate } from '../../../api/auction/winning'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionWinningCreateFields, AuctionWinningCreateFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import useAlert from '../../../store/Alert/useAlert'
import { selectedRows2Switch } from '../../../store/Layout/Layout'
import Table from '../../Table/Table'
import WinningCreateSearchFields from './WinningCreateSearchFields'

// 낙찰 생성 제품 추가(단일) 메인 컴포넌트
const WinningProductAdd = ({ addModal, setAddModal, newResData, setNewResData, setwinningCreateInput }) => {
	const { simpleConfirm, simpleAlert } = useAlert()
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const [rowAtomSwitch, setRowAtomSwitch] = useAtom(selectedRows2Switch)

	const [tablePagination, setTablePagination] = useState([])
	const paramData = {
		pageNum: 1,
		pageSize: 50,
		saleType: '경매 대상재',
		registrationStatus: '경매 등록 대기',
	}
	const [param, setParam] = useState(paramData)
	//checkSales
	const [check1, setCheck1] = useState(Array.from({ length: checkSales.length }, () => false))

	//checkShips
	const [checkData1, setCheckData1] = useState(Array.from({ length: checkSales.length }, () => ''))

	useEffect(() => {
		// true에 해당되면, value를, false면 빈값을 반환
		const updatedCheck = checkSales.map((value, index) => {
			return check1[index] ? value : ''
		})
		// 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
		const filteredCheck = updatedCheck.filter((item) => item !== '')
		setCheckData1(filteredCheck)

		// 전송용 input에 담을 때
		// setInput({
		//   ...input,
		//   businessType: updatedCheck.filter(item => item !== ''),
		// });
	}, [check1])

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

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionWinningCreateFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	// GET
	const { isLoading, isError, data, isSuccess } = useReactQuery(param, 'getWinningCreate', getWinningCreate)
	const resData = data?.data?.data?.list
	console.log('resData Modal ', resData)
	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionWinningCreateFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	const handleTablePageSize = (event) => {
		setParam((prevParam) => ({
			...prevParam,
			pageSize: Number(event.target.value),
			pageNum: 1,
		}))
	}

	// const handleAddBtn = () => {
	// 	if (isArray(checkedArray) && checkedArray.length > 0) {
	// 		if (window.confirm('선택한 항목을 추가하시겠습니까?')) {
	// 			checkedArray.forEach((item) => {
	// 				console.log('item =>', item)
	// 				setNewResData((prevData) => [...prevData, item])
	// 			})
	// 			setAddModal(false)
	// 		}
	// 	} else {
	// 		alert('선택해주세요!')
	// 	}
	// }

	const handleAddBtn = () => {
		if (!isArray(checkedArray) || !checkedArray.length > 0) return simpleAlert('추가할 항목을 선택해주세요.')
		else {
			simpleConfirm('선택한 항목을 추가하시겠습니까?', () =>
				checkedArray.forEach((item) => {
					console.log('item =>', item)
					setNewResData((prevData) => [...prevData, item])
					setAddModal(false)
				}),
			)
		}
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

	const modalClose = () => {
		setAddModal(false)
	}
	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

	// 마운트시 switch false, 언마운트시 true (table onSelectionChanged 관련)
	useEffect(() => {
		if (addModal) {
			setRowAtomSwitch(false)
		}
		return () => {
			setRowAtomSwitch(true)
		}
	}, [addModal])

	const globalProductResetOnClick = () => {
		// if resetting the search field shouldn't rerender table
		// then we need to create paramData object to reset the search fields.
		setParam(paramData)
	}
	// import
	const globalProductSearchOnClick = (userSearchParam) => {
		setParam((prevParam) => {
			if (isEqual(prevParam, { ...prevParam, ...userSearchParam })) {
				// refetch()
				return prevParam
			}
			return {
				...prevParam,
				...userSearchParam,
			}
		})
	}

	const confirmOnClickHandler = () => {
		simpleAlert('적용 되었습니다.')
	}

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '100%' }}>
				<BlueBarHeader style={{ height: '60px' }}>
					{/* <div>{title}</div> */}
					<div>낙찰 생성 제품 추가</div>
					<div>
						<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 30px' }}>
					<FilterContianer>
						<FilterHeader>
							<div style={{ display: 'flex' }}></div>
							{/* 토글 쓰기 */}
							<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
						</FilterHeader>
						<FilterTopContainer>
							<FilterTCTop>
								<h6>경매 번호</h6>
								<p>2023041050</p>
							</FilterTCTop>
						</FilterTopContainer>
						{exFilterToggle && (
							<>
								<GlobalProductSearch
									param={param}
									isToggleSeparate={true}
									renderCustomSearchFields={(props) => <WinningCreateSearchFields {...props} />}
									globalProductSearchOnClick={globalProductSearchOnClick}
									globalProductResetOnClick={globalProductResetOnClick}
								/>
							</>
						)}
						<TableContianer>
							<TCSubContainer bor>
								<div>
									조회 목록 (선택 <span>2</span> / 50개 )
									<Hidden />
								</div>
								<div style={{ display: 'flex', gap: '10px' }}>
									<PageDropdown />
									<Excel getRow={getRow} />
								</div>
							</TCSubContainer>
							<TCSubContainer>
								<div>
									선택 중량<span> 2 </span>kg / 총 중량 kg
								</div>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
									<p>낙찰가 일괄 변경</p>
									<CustomInput
										placeholder="낙찰가 입력"
										width={120}
										height={32}
										onChange={(e) => {
											setwinningCreateInput((p) => ({
												...p,
												biddingPrice: parseInt(e.target.value) || null,
											}))
										}}
									/>
									<TGreyBtn height={30} style={{ width: '50px' }} onClick={confirmOnClickHandler}>
										적용
									</TGreyBtn>
									<BtnBound />
									<p>확정전송가 일괄 변경</p>
									<CustomInput
										placeholder="확정전송가 입력"
										width={120}
										height={32}
										onChange={(e) => {
											setwinningCreateInput((p) => ({
												...p,
												confirmPrice: parseInt(e.target.value) || null,
											}))
										}}
									/>
									<TGreyBtn height={30} style={{ width: '50px' }} onClick={confirmOnClickHandler}>
										적용
									</TGreyBtn>
								</div>
							</TCSubContainer>
							<Table
								getCol={getCol}
								getRow={getRow}
								hei2={250}
								tablePagination={tablePagination}
								onPageChange={onPageChange}
							/>
							<TCSubContainer style={{ padding: '0px', position: 'relative', top: '40px' }}>
								<div></div>
								<div>
									<BlackBtn style={{ width: '150px', height: '35px' }} onClick={handleAddBtn}>
										제품 추가
									</BlackBtn>
								</div>
								<div></div>
							</TCSubContainer>
						</TableContianer>
					</FilterContianer>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default WinningProductAdd
