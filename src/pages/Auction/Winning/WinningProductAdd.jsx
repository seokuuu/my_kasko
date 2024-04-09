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
import useTableData from '../../../hooks/useTableData'
import { KilogramSum } from '../../../utils/KilogramSum'

// 낙찰 생성 제품 추가(단일) 메인 컴포넌트
const WinningProductAdd = ({
	addModal,
	setAddModal,
	newResData,
	setNewResData,
	setwinningCreateInput,
	dupleUids,
	values,
	setValues,
}) => {
	// const [values, setValues] = useState([]) // 배열 형태로 초기화
	const { simpleConfirm, simpleAlert } = useAlert()
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const [rowAtomSwitch, setRowAtomSwitch] = useAtom(selectedRows2Switch)

	const [tablePagination, setTablePagination] = useState([])
	const paramData = {
		pageNum: 1,
		pageSize: 10000,
		saleType: '경매 대상재',
		registrationStatus: '경매 등록 대기',
	}
	const [param, setParam] = useState(paramData)
	//checkSales

	const [getRow, setGetRow] = useState('')
	console.log('getRow', getRow)
	const tableField = useRef(AuctionWinningCreateFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()

	const [checkedArray, setCheckedArray] = useAtom(selectedRowsAtom)

	const checkUid = checkedArray?.map((x) => x['제품 고유 번호'])

	const [biddingValue, setBiddingValue] = useState('')
	const [confirmValue, setConfirmValue] = useState('')

	console.log('checkUid', checkUid)

	console.log('checkedArray', checkedArray)

	// GET
	const { isLoading, isError, data, isSuccess } = useReactQuery(param, 'getWinningCreate', getWinningCreate)
	const resData = data?.data?.data?.list

	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		const getData = resData?.filter((obj) => !dupleUids.includes(obj.uid))
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

	// 				setNewResData((prevData) => [...prevData, item])
	// 			})
	// 			setAddModal(false)
	// 		}
	// 	} else {
	// 		alert('선택해주세요!')
	// 	}
	// }

	// 제품 추가 시 낙찰가, 확정전송가 없는 object 체크
	const hasNullOrUndefinedInCheckedArray = () => {
		return checkedArray.some(
			(item) =>
				item['낙찰가'] == null ||
				item['확정전송가'] == null ||
				typeof item['낙찰가'] === 'undefined' ||
				typeof item['확정전송가'] === 'undefined',
		)
	}

	const handleAddBtn = () => {
		if (!isArray(checkedArray) || !checkedArray.length > 0) return simpleAlert('추가할 항목을 선택해주세요.')
		if (hasNullOrUndefinedInCheckedArray()) return simpleAlert('추가할 낙찰가 / 확정전송가를 확인해주세요.')
		else {
			// 체크된 항목의 values만 set
			const filteredValues = values.filter((item) => checkUid.includes(item.productUid))

			simpleConfirm('선택한 항목을 추가하시겠습니까?', () =>
				checkedArray.forEach((item) => {
					setNewResData((prevData) => [...prevData, item])
					setAddModal(false)
					setCheckedArray([])
					setValues(filteredValues)
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

	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableData({
		weightKey: '중량',
	})

	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: AuctionWinningCreateFields,
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber'] },
	})

	// const onCellValueChanged = (params) => {
	// 	const p = params.data
	// 	setValues((prevValues) => ({
	// 		...prevValues,
	// 		productUid: p['제품 고유 번호'],
	// 		biddingPrice: p['낙찰가'],
	// 		confirmPrice: p['확정전송가'],
	// 	}))
	// 	// setValueDesti(p['경매 번호'])
	// }

	// 낙찰가 일괄 변경 적용 버튼
	const biddingOnClickHandler = () => {
		if (!isArray(checkedArray) || !checkedArray.length > 0) return simpleAlert('항목을 선택해주세요.')
		const updatedValues = checkUid.map((uid) => {
			const existingItem = values.find((item) => item.productUid === uid)
			if (existingItem) {
				// 이미 해당 productUid의 값이 존재하면 업데이트
				return {
					...existingItem,
					biddingPrice: parseInt(biddingValue, 10) || 0,
				}
			} else {
				// 새로운 object 생성
				return {
					productUid: uid,
					biddingPrice: parseInt(biddingValue, 10) || 0,
					...existingItem, // 기존값 유지
				}
			}
		})

		// 기존 values 배열과 새로운 updatedValues 배열을 합칩니다.
		const mergedValues = [...values.filter((item) => !checkUid.includes(item.productUid)), ...updatedValues]
		setValues(mergedValues)

		const updatedResData = getRow?.map((item) => {
			if (checkUid?.includes(item['제품 고유 번호'])) {
				item['낙찰가'] = biddingValue
			}
			return item
		})

		setGetRow(updatedResData)
		setCheckedArray([])
	}

	// 확정전송가 일괄 변경 적용 버튼
	const confirmOnClickHandler = () => {
		if (!isArray(checkedArray) || !checkedArray.length > 0) return simpleAlert('항목을 선택해주세요.')
		const updatedValues = checkUid.map((uid) => {
			const existingItem = values.find((item) => item.productUid === uid)
			if (existingItem) {
				// 이미 해당 productUid의 값이 존재하면 업데이트
				return {
					...existingItem,
					confirmPrice: parseInt(confirmValue, 10) || 0,
				}
			} else {
				// 새로운 object 생성
				return {
					productUid: uid,
					confirmPrice: parseInt(confirmValue, 10) || 0,
					...existingItem, // 기존값 유지
				}
			}
		})

		// 기존 values 배열과 새로운 updatedValues 배열을 합칩니다.
		const mergedValues = [...values.filter((item) => !checkUid.includes(item.productUid)), ...updatedValues]
		setValues(mergedValues)

		const updatedResData = getRow?.map((item) => {
			console.log('아템 =>', item)
			if (checkUid?.includes(item['제품 고유 번호'])) {
				item['확정전송가'] = confirmValue
			}
			return item
		})

		setGetRow(updatedResData)
		setCheckedArray([])
	}

	/**
	 * @description
	 * Table Cell Input onChange Handler
	 */
	const onCellValueChanged = (params) => {
		const p = params.data

		// productUid를 찾아서 기존 값 갱신 또는 새로운 객체 생성
		const updatedValues = values.map((item) => {
			if (item.productUid === p['제품 고유 번호']) {
				// parseInt를 통해 문자열을 숫자로 변환하고, 기본값은 0으로 설정
				return {
					...item,
					biddingPrice: parseInt(p['낙찰가'], 10) || 0,
					confirmPrice: parseInt(p['확정전송가'], 10) || 0,
				}
			}
			return item
		})

		// 기존 값이 없을 경우 새로운 객체 추가
		if (!updatedValues.find((item) => item.productUid === p['제품 고유 번호'])) {
			updatedValues.push({
				productUid: p['제품 고유 번호'],
				biddingPrice: parseInt(p['낙찰가'], 10) || 0,
				confirmPrice: parseInt(p['확정전송가'], 10) || 0,
			})
		}

		// 업데이트된 값을 상태로 설정
		setValues(updatedValues)
	}

	console.log('values', values)

	// useEffect(() => {
	// 	setWinningCreateData((prev) => ({
	// 		...prev,
	// 		productList: [{ ...values }],
	// 		auctionNumber: auctionNumber,
	// 	}))
	// }, [values])

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
									setParam={setParam}
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
									조회 목록 (선택 <span>{checkedArray?.length || 0}</span> / {totalCountStr}개 ){/* <Hidden /> */}
								</div>
								<div style={{ display: 'flex', gap: '10px' }}>
									<PageDropdown handleDropdown={handleTablePageSize} />
									<Excel getRow={getRow} sheetName="낙찰 생성 제품 추가" />
								</div>
							</TCSubContainer>
							<TCSubContainer>
								<div>
									선택 중량 <span>{KilogramSum(checkedArray)} </span> (kg) / 총 중량 {totalWeightStr} (kg)
								</div>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
									<p>낙찰가 일괄 변경</p>
									<CustomInput
										placeholder="낙찰가 입력"
										width={120}
										height={32}
										onChange={(e) => {
											// setwinningCreateInput((p) => ({
											// 	...p,
											// 	biddingPrice: parseInt(e.target.value) || null,
											// }))
											setBiddingValue(e.target.value)
										}}
									/>
									<TGreyBtn height={30} style={{ minWidth: '50px' }} onClick={biddingOnClickHandler}>
										적용
									</TGreyBtn>
									<BtnBound />
									<p>확정전송가 일괄 변경</p>
									<CustomInput
										placeholder="확정전송가 입력"
										width={120}
										height={32}
										onChange={(e) => {
											// setwinningCreateInput((p) => ({
											// 	...p,
											// 	confirmPrice: parseInt(e.target.value) || null,
											// }))
											setConfirmValue(e.target.value)
										}}
									/>
									<TGreyBtn height={30} style={{ minWidth: '50px' }} onClick={confirmOnClickHandler}>
										적용
									</TGreyBtn>
								</div>
							</TCSubContainer>
							<Table
								getCol={getCol}
								getRow={getRow}
								hei2={exFilterToggle ? 250 : 500}
								tablePagination={tablePagination}
								onPageChange={onPageChange}
								changeFn={onCellValueChanged}
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
