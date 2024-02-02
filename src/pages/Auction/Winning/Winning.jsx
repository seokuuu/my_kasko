import { useEffect, useRef, useState } from 'react'
import { BlackBtn, GreyBtn, SkyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { MainSelect } from '../../../common/Option/Main'
import { storageOptions } from '../../../common/Option/SignUp'
import DateGrid from '../../../components/DateGrid/DateGrid'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Table from '../../Table/Table'

import { CheckBox } from '../../../common/Check/Checkbox'
import { CheckImg2, StyledCheckSubSquDiv } from '../../../common/Check/CheckImg'

import {
	DoubleWrap,
	ExCheckDiv,
	ExCheckWrap,
	ExInputsWrap,
	FilterContianer,
	FilterFooter,
	FilterHeader,
	FilterHeaderAlert,
	FilterLeft,
	FilterRight,
	FilterSubcontianer,
	GridWrap,
	Input,
	PartWrap,
	PWRight,
	ResetImg,
	RowWrap,
	TableContianer,
	TCSubContainer,
	Tilde,
} from '../../../modal/External/ExternalFilter'

import { useAtom } from 'jotai'
import { Link, useNavigate } from 'react-router-dom'
import { winningAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { AuctionWinningFields, AuctionWinningFieldsCols } from '../../../constants/admin/Auction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useReactQuery from '../../../hooks/useReactQuery'
import { getWinning, deleteBidding, depositConfirm } from '../../../api/auction/winning'
import { add_element_field } from '../../../lib/tableHelpers'
import { doubleClickedRowAtom } from '../../../store/Layout/Layout'
import useMutationQuery from '../../../hooks/useMutationQuery'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import SingleProductSearchFields from '../../Sales/Single/SingleProductSearchFields'
import { isEqual } from 'lodash'
import WinningSearchFields from './WinningSearchFields'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import useAlert from '../../../store/Alert/useAlert'

// src\pages\Sales\Single\Single.jsx 참고해서 작업 !!!
const Winning = ({ detailRow }) => {
	const { simpleAlert, simpleConfirm, showAlert } = useAlert()
	const checkSales = ['전체', '확정 전송', '확정 전송 대기']
	const [tablePagination, setTablePagination] = useState([])
	const [winningCreate, setWinningCreate] = useAtom(winningAtom)

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
	const tableField = useRef(AuctionWinningFieldsCols)
	const getCol = tableField.current
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	// 낙찰 취소 관련
	const keysToExtract = ['경매 번호', '창고', '고객사 목적지 고유 번호', '낙찰 상태']

	const keyMappings = {
		'경매 번호': 'auctionNumber',
		창고: 'storage',
		'고객사 목적지 고유 번호': 'customerDestinationUid',
		'낙찰 상태': 'biddingStatus',
	}

	// 낙찰 취소에 사용될 array
	const extractedArray = checkedArray?.map((item) =>
		keysToExtract.reduce((obj, key) => {
			obj[keyMappings[key]] = item[key]
			return obj
		}, {}),
	)

	console.log('extractedArray', extractedArray)

	// 낙찰 취소 버튼 Handler
	const { mutate: deleteMutation } = useMutation(deleteBidding, {
		onSuccess() {
			showAlert({
				title: '낙찰 취소되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('alldelete')
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const deleteOnClickHandler = () => {
		deleteMutation(extractedArray)
	}

	// 부분 입금 확인 POST
	const { mutate: depositMuation } = useMutation(depositConfirm, {
		onSuccess() {
			showAlert({
				title: '입금 확인되었습니다.',
				content: '',
				func: () => {
					refetch()
					queryClient.invalidateQueries('alldeposit')
				},
			})
		},
		onError: () => {
			simpleAlert('오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	// 부분 입금 확인 버튼 Handler
	const depositOnClickHandler = () => {
		depositMuation(extractedArray)
	}

	const paramData = {
		pageNum: 1,
		pageSize: 10,
		orderType: '경매',
	}

	const [param, setParam] = useState(paramData)

	// GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getDetailProgress', getWinning)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination
	console.log('resData', resData)

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionWinningFields))
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

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}
	// import
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
		<FilterContianer>
			<FilterHeader>
				<div style={{ display: 'flex' }}>
					<h1>경매 낙찰 관리</h1>
				</div>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>
			{/* 주의사항 */}
			<CautionBox category={CAUTION_CATEGORY.bid} />
			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <WinningSearchFields {...props} />} // 만들어야함 -> WinningSearchFields
						globalProductSearchOnClick={globalProductSearchOnClick} // import
						globalProductResetOnClick={globalProductResetOnClick} // import
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
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량<span> 2 </span>kg / 총 중량 kg
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<Link to={`/auction/winningcreate`}>
							<WhiteBlackBtn>낙찰 생성</WhiteBlackBtn>
						</Link>
						<WhiteRedBtn onClick={deleteOnClickHandler}>낙찰 취소</WhiteRedBtn>
					</div>
				</TCSubContainer>

				<Table
					getCol={getCol}
					getRow={getRow}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
					setChoiceComponent={() => {}}
				/>
				<TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<SkyBtn onClick={depositOnClickHandler}>입금 확인</SkyBtn>
					</div>
				</TCSubContainer>
			</TableContianer>
		</FilterContianer>
	)
}

export default Winning
