import { useEffect, useRef, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'

import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { toggleAtom } from '../../../store/Layout/Layout'
import PageDropdown from '../../../components/TableInner/PageDropdown'
import { isEqual } from 'lodash'
import { getDetailProgress } from '../../../api/auction/detailprogress'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionDetailProgressFields, AuctionDetailProgressFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import Table from '../../Table/Table'
import { onSizeChange } from '../../Operate/utils'
import useTableSelection from '../../../hooks/useTableSelection'
import useTableData from '../../../hooks/useTableData'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'
import DetailProgressSearchFields from './DetailProgressSearchFields'
import moment from 'moment/moment'

const DetailProgress = ({}) => {
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

	const [tablePagination, setTablePagination] = useState([])

	const [getRow, setGetRow] = useState('')
	const tableField = useRef(AuctionDetailProgressFieldsCols)
	const getCol = tableField.current

	const currentTime = moment(new Date()) // 현재 시간 가져오기
	const startOfDay = currentTime.startOf('day').format('YYYY-MM-DD HH:mm:ss')
	const endOfDay = currentTime.endOf('day').format('YYYY-MM-DD HH:mm:ss')

	const paramData = {
		pageNum: 1,
		pageSize: 50,
		auctionStartDate: startOfDay,
		auctionEndDate: endOfDay,
	}
	const [param, setParam] = useState(paramData)

	const [liveStatus, setLiveStatus] = useState('LIVEgetDetailProgress')

	// GET
	const { isLoading, data, isSuccess, refetch } = useReactQuery(param, liveStatus, getDetailProgress)
	const resData = data?.data?.data?.list
	const resPagination = data?.data?.data?.pagination

	useEffect(() => {
		let getData = resData
		//타입, 리액트쿼리, 데이터 확인 후 실행
		if (!isSuccess && !resData) return
		if (Array.isArray(getData)) {
			setGetRow(add_element_field(getData, AuctionDetailProgressFields))
			setTablePagination(resPagination)
		}
	}, [isSuccess, resData])

	const onPageChange = (value) => {
		setParam((prevParam) => ({
			...prevParam,
			pageNum: Number(value),
		}))
	}

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
		tableField: AuctionDetailProgressFields,
		serverData: data?.data?.data,
		wish: { display: true, key: ['productNumber', 'packageNumber'] },
		best: { display: true },
	})

	return (
		<FilterContianer>
			<FilterHeader>
				<h1>경매 진행 상세 조회</h1>
				{/* 토글 쓰기 */}
				<HeaderToggle exFilterToggle={exFilterToggle} toggleBtnClick={toggleBtnClick} toggleMsg={toggleMsg} />
			</FilterHeader>

			{exFilterToggle && (
				<>
					<GlobalProductSearch
						param={param}
						setParam={setParam}
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <DetailProgressSearchFields {...props} />}
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
						<PageDropdown handleDropdown={(e) => onSizeChange(e, setParam)} />
						<Excel getRow={getRow} sheetName="경매 진행 상세 조회" />
					</div>
				</TCSubContainer>
				<TCSubContainer>
					<div>
						선택 중량 <span> {selectedWeightStr} </span> (kg) / 총 중량 {totalWeightStr} (kg)
					</div>
				</TCSubContainer>
				<Table
					loading={isLoading}
					getCol={getCol}
					getRow={getRow}
					tablePagination={tablePagination}
					onPageChange={onPageChange}
				/>
			</TableContianer>
		</FilterContianer>
	)
}

export default DetailProgress
