import { useEffect, useRef, useState } from 'react'
import Excel from '../../../components/TableInner/Excel'

import HeaderToggle from '../../../components/Toggle/HeaderToggle'
import { selectedRowsAtom, toggleAtom } from '../../../store/Layout/Layout'

import Hidden from '../../../components/TableInner/Hidden'
import PageDropdown from '../../../components/TableInner/PageDropdown'

import { useQueryClient } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { isEqual } from 'lodash'
import { getDetailProgress } from '../../../api/auction/detailprogress'
import GlobalProductSearch from '../../../components/GlobalProductSearch/GlobalProductSearch'
import { AuctionDetailProgressFields, AuctionDetailProgressFieldsCols } from '../../../constants/admin/Auction'
import useReactQuery from '../../../hooks/useReactQuery'
import { add_element_field } from '../../../lib/tableHelpers'
import { FilterContianer, FilterHeader, TableContianer, TCSubContainer } from '../../../modal/External/ExternalFilter'
import Table from '../../Table/Table'
import ProgressSearchFields from '../Progress/ProgressSearchFields'
import { onSizeChange } from '../../Operate/utils'
import useTableSelection from '../../../hooks/useTableSelection'
import useTableData from '../../../hooks/useTableData'
import TableV2HiddenSection from '../../Table/TableV2HiddenSection'

const DetailProgress = ({}) => {
	const radioDummy = ['전체', '미진행', '진행중', '종료']
	const [checkRadio, setCheckRadio] = useState(Array.from({ length: radioDummy.length }, (_, index) => index === 0))

	const [savedRadioValue, setSavedRadioValue] = useState('')
	useEffect(() => {
		const checkedIndex = checkRadio.findIndex((isChecked, index) => isChecked && index < radioDummy.length)

		// 찾지 못하면 -1을 반환하므로, -1이 아닌 경우(찾은 경우)
		// if (checkedIndex !== -1) {
		//   const selectedValue = radioDummy[checkedIndex];
		//   setSavedRadioValue(selectedValue); //내 state에 반환
		//   setInput({ ...input, type: selectedValue }); //서버 전송용 input에 반환
		// }
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
	const queryClient = useQueryClient()
	const checkedArray = useAtom(selectedRowsAtom)[0]

	const paramData = {
		pageNum: 1,
		pageSize: 50,
	}
	const [param, setParam] = useState(paramData)

	const [liveStatus, setLiveStatus] = useState('LIVEgetDetailProgress')

	// GET
	const { isLoading, isError, data, isSuccess, refetch } = useReactQuery(param, liveStatus, getDetailProgress)
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
						isToggleSeparate={true}
						renderCustomSearchFields={(props) => <ProgressSearchFields {...props} />}
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
				<Table getCol={getCol} getRow={getRow} tablePagination={tablePagination} onPageChange={onPageChange} />
			</TableContianer>
		</FilterContianer>
	)
}

export default DetailProgress
