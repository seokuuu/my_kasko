import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteBidding, depositConfirm, getWinning } from '../../../api/auction/winning'
import { SkyBtn, WhiteBlackBtn, WhiteRedBtn } from '../../../common/Button/Button'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import Excel from '../../../components/TableInner/Excel'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { AuctionWinningFields, AuctionWinningFieldsCols } from '../../../constants/admin/Winning'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, FilterHeader, TCSubContainer, TableContianer } from '../../../modal/External/ExternalFilter'
import useAlert from '../../../store/Alert/useAlert'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'
import { onSizeChange } from '../../Operate/utils'
import Table from '../../Table/Table'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import WinningSearchFields from './WinningSearchFields'

// src\pages\Sales\Single\Single.jsx 참고해서 작업 !!!
const Winning = ({}) => {
	const { simpleAlert, showAlert } = useAlert()

	const [tablePagination, setTablePagination] = useState([])

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
	const keysToExtract = ['경매 번호', '창고', '고객사 목적지 고유 번호', '낙찰 상태', '패키지 번호']

	const keyMappings = {
		'경매 번호': 'auctionNumber',
		창고: 'storage',
		'고객사 목적지 고유 번호': 'customerDestinationUid',
		'낙찰 상태': 'biddingStatus',
		'패키지 번호': 'packageNumber',
	}

	// 낙찰 취소에 사용될 array
	const extractedArray = checkedArray?.map((item) =>
		keysToExtract.reduce((obj, key) => {
			obj[keyMappings[key]] = item[key]
			return obj
		}, {}),
	)

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
		onError: (e) => {
			simpleAlert(e?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	const deleteOnClickHandler = () => {
		if (!checkedArray || checkedArray?.length === 0) {
			simpleAlert('제품을 선택해주세요.')
			return
		}
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
					window.location.reload()
				},
			})
		},
		onError: (error) => {
			simpleAlert(error?.data?.message || '오류가 발생했습니다. 다시 시도해주세요.')
		},
	})
	// 부분 입금 확인 버튼 Handler
	const depositOnClickHandler = () => {
		if (!checkedArray || checkedArray?.length === 0) {
			simpleAlert('입금 확인할 제품을 선택해주세요.')
			return
		}
		depositMuation(extractedArray)
	}

	/**
	 * @description
	 * - 페이지 첫 렌더시
	 * - 현재 시간 (00:00:00 ~ 23:59:59) 이 default.
	 */
	const currentTime = moment(new Date()) // 현재 시간 가져오기
	const startOfDay = currentTime.startOf('day').format('YYYY-MM-DD HH:mm:ss')
	const endOfDay = currentTime.endOf('day').format('YYYY-MM-DD HH:mm:ss')

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		orderType: '경매',
		auctionStartDate: startOfDay,
		auctionEndDate: endOfDay,
	}

	const [param, setParam] = useState(paramData)

	useEffect(() => {
		setParam((prev) => ({
			...prev,
		}))
	}, [])

	// GET
	const { isLoading, data, isSuccess, refetch } = useReactQuery(param, 'getDetailProgress', getWinning)

	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		let getData = resData || []
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !getData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionWinningFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}
	// import
	const globalProductResetOnClick = () => {
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

	const { selectedData, selectedWeightStr, selectedWeight, selectedCountStr } = useTableSelection({
		weightKey: '중량',
	})

	const { tableRowData, paginationData, totalWeightStr, totalCountStr, totalCount } = useTableData({
		tableField: AuctionWinningFields,
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

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
						setParam={setParam}
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
						조회 목록 (선택 <span>{selectedCountStr}</span> / {resData?.length}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
						<Excel getRow={getRow} sheetName="경매 낙찰 관리" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<Link to={`/auction/winningcreate`}>
							<WhiteBlackBtn>낙찰 생성</WhiteBlackBtn>
						</Link>
						<WhiteRedBtn onClick={deleteOnClickHandler}>낙찰 취소</WhiteRedBtn>
					</div>
				</TCSubContainer>

				<Table
					loading={isLoading}
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
