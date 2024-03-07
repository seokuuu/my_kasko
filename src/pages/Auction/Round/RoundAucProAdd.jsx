import { useEffect, useRef, useState } from 'react'
import { BlackBtn } from '../../../common/Button/Button'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import {
	FilterContianer,
	FilterHeader,
	FilterTCTop,
	FilterTopContainer,
	TCSubContainer,
	TableContianer,
} from '../../../modal/External/ExternalFilter'

import { useAtom, useAtomValue } from 'jotai'
import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useQueryClient } from '@tanstack/react-query'
import { isArray, isEqual } from 'lodash'
import { getExtraProductList } from '../../../api/auction/round'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionRoundExtraProductFields, AuctionRoundExtraProductFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import {
	BlueBarHeader,
	BlueSubContainer,
	FadeOverlay,
	ModalContainer,
	WhiteCloseBtn,
} from '../../../modal/Common/Common.Styled'
import useAlert from '../../../store/Alert/useAlert'
import Table from '../../Table/Table'
import RoundAucListEditFields from './RoundAucListEditFields'

// 경매 제품 추가(단일) 메인 컴포넌트
// 경매 제품 추가 (패키지), 경매 목록 상세(종료된 경매)와 호환 가능
const RoundAucProAdd = ({
	setAddModal,
	setAddModalnewResData,
	setNewResData,
	types,
	newResData,
	propsResData,
	list,
	onListAdd,
	auctionNumber,
}) => {
	const [tablePagination, setTablePagination] = useState([])
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const { simpleConfirm, simpleAlert } = useAlert()
	//checkSales
	const selectedRows = useAtomValue(selectedRowsAtom)
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

	const modalClose = () => {
		setAddModal(false)
	}

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionRoundExtraProductFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const [originalRow, setOriginalRow] = useState([]) //원본 row를 저장해서 radio check에러 막기

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		saleType: '경매 대상재',
		registrationStatus: '경매 등록 대기',
		type: types,
	}
	const [param, setParam] = useState(paramData)

	console.log('auctionNumber', auctionNumber)

	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(
		param,
		'getExtraProductList',
		getExtraProductList,
	)

	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination
	console.log('resData', resData)

	useEffect(() => {
		// 이미 추가된 데이터 중복 제거
		const getData = resData?.filter((obj) => !list?.some((item) => obj.uid === item.uid))
		if (getData && Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionRoundExtraProductFields))
			setTablePagination(data?.pagination)
		}
	}, [resData])

	const onAdd = () => {
		const key = '고유 번호'
		const findKey = selectedRows.map((item) => item[key])
		const addData = resData?.filter((item) => findKey.includes(item?.uid))
		console.log('addData', addData)
		if (!isArray(checkedArray) || !checkedArray.length > 0) return simpleAlert('선택해주세요!')
		else {
			simpleConfirm('선택한 항목을 추가하시겠습니까?', () =>
				checkedArray.forEach((item) => {
					console.log('item =>', item)
					setNewResData((prevData) => [...prevData, item])
					setAddModal(false)
					onListAdd(addData)
				}),
			)
		}
	}

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

	const globalProductResetOnClick = () => {
		setParam(paramData)
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

	const blockModalExitHandler = () => {
		simpleConfirm('현재 작업 중인 내용이 저장되지 않았습니다. \n페이지를 나가시겠습니까?', () => {
			setAddModal(false)
		})
	}

	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: AuctionRoundExtraProductFields,
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

	return (
		<>
			<FadeOverlay />
			<ModalContainer style={{ width: '75%', height: '100%' }}>
				<BlueBarHeader style={{ height: '50px' }}>
					{/* <div>{title}</div> */}
					<div>경매 제품 추가({types})</div>
					<div>
						<WhiteCloseBtn onClick={blockModalExitHandler} src="/svg/white_btn_close.svg" />
					</div>
				</BlueBarHeader>
				<BlueSubContainer style={{ padding: '0px 25px', height: '500px' }}>
					<FilterContianer>
						<FilterHeader>
							<div style={{ display: 'flex' }}></div>
							{/* 토글 쓰기 */}
							<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
						</FilterHeader>
						<FilterTopContainer>
							<FilterTCTop style={{ height: '40px' }}>
								<h6>경매 번호</h6>
								<p>2023041050</p>
							</FilterTCTop>
						</FilterTopContainer>
						{exFilterToggle && (
							<>
								<GlobalProductSearch
									param={param}
									isToggleSeparate={true}
									renderCustomSearchFields={(props) => <RoundAucListEditFields {...props} />} // 만들어야함 -> WinningSearchFields
									globalProductSearchOnClick={globalProductSearchOnClick} // import
									globalProductResetOnClick={globalProductResetOnClick} // import
								/>
							</>
						)}
						<TableContianer>
							<TCSubContainer bor>
								<div>
									조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
									<Hidden />
								</div>
								<div style={{ display: 'flex', gap: '10px' }}>
									<PageDropdown handleDropdown={handleTablePageSize} />
									<Excel getRow={getRow} />
								</div>
							</TCSubContainer>
							<TCSubContainer>
								<div>
									선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
								</div>
								<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}></div>
							</TCSubContainer>
							<Table
								hei2={250}
								hei={100}
								getCol={AuctionRoundExtraProductFieldsCols}
								getRow={getRow}
								isLoading={isLoading}
								onPageChange={onPageChange}
							/>
							<TCSubContainer>
								<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
									<BlackBtn width={13} height={40} onClick={onAdd}>
										제품 추가
									</BlackBtn>
								</div>
							</TCSubContainer>
						</TableContianer>
					</FilterContianer>
				</BlueSubContainer>
			</ModalContainer>
		</>
	)
}

export default RoundAucProAdd
