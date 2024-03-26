import { useEffect, useRef, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'
import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'

import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { getWinning } from '../../../api/auction/winning'
import { CAUTION_CATEGORY, CautionBox } from '../../../components/CautionBox'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { AuctionWinningFields, UserAuctionWinningFieldsCols } from '../../../constants/admin/Winning'
import useReactQuery from '../../../hooks/useReactQuery'
import useTableData from '../../../hooks/useTableData'
import useTableSelection from '../../../hooks/useTableSelection'
import { add_element_field } from '../../../lib/tableHelpers'
import Table from '../../../pages/Table/Table'
import TableV2HiddenSection from '../../../pages/Table/TableV2HiddenSection'
import UserWinningSearchFields from './UserWinningSearchFields'
import moment from 'moment'

const Winning = ({}) => {
	const [tablePagination, setTablePagination] = useState([])

	//checkSales
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

	/**
	 * @description
	 * - 페이지 첫 렌더시
	 * - 현재 시간 (00:00:00 ~ 23:59:59)이 default.
	 */
	const currentTime = moment() // 현재 시간 가져오기
	const startOfDay = currentTime.startOf('day')
	const endOfDay = currentTime.endOf('day')

	const paramData = {
		pageNum: 1,
		pageSize: 10,
		orderType: '경매',
		auctionStartDate: null,
		auctionEndDate: null,
	}

	const [param, setParam] = useState(paramData)

	useEffect(() => {
		setParam((prev) => ({
			...prev,
			auctionStartDate: startOfDay.format('YYYY-MM-DD 00:00:00'),
			auctionEndDate: endOfDay.format('YYYY-MM-DD 23:59:59'),
		}))
	}, [])

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(UserAuctionWinningFieldsCols)
	const getCol = tableField.current

	// GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, 'getDetailProgress', getWinning)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

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
					<h1>낙찰 확인</h1>
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
						renderCustomSearchFields={(props) => <UserWinningSearchFields {...props} />}
						globalProductSearchOnClick={globalProductSearchOnClick}
						globalProductResetOnClick={globalProductResetOnClick}
					/>
				</>
			)}
			<TableContianer>
				<TCSubContainer bor>
					<div>
						조회 목록 (선택 <span>{selectedCountStr}</span> / {totalCountStr}개 )
						<TableV2HiddenSection />
					</div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<PageDropdown handleDropdown={handleTablePageSize} />
						<Excel getRow={getRow} sheetName="낙찰 확인" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
					<div style={{ display: 'flex', gap: '10px' }}></div>
				</TCSubContainer>
				<Table
					getCol={getCol}
					getRow={getRow}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
					setChoiceComponent={() => {}}
				/>
				{/* <TCSubContainer>
					<div></div>
					<div style={{ display: 'flex', gap: '10px' }}>
						<SkyBtn>입금확인</SkyBtn>
					</div>
				</TCSubContainer> */}
			</TableContianer>
		</FilterContianer>
	)
}

export default Winning
