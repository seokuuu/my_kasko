import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useAtom, useAtomValue } from 'jotai'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { BlackBtn, GreyBtn } from '../../common/Button/Button'
import CustomPagination from '../../components/pagination/CustomPagination'
import useDragginRow from '../../hooks/useDragginRow'
import {
	BlueBarBtnWrap,
	BlueBarHeader,
	BlueSubContainer,
	ModalContainer,
	NonFadeOverlay,
	WhiteCloseBtn,
} from '../../modal/Common/Common.Styled'
import {
	anotherTableRowsAtom,
	blueModalAtom,
	doubleClickedRowAtom,
	pageSort,
	selectedRows2Switch,
	selectedRowsAtom,
	selectedRowsAtom2,
} from '../../store/Layout/Layout'
import './TableUi.css'
import { customNumberFormatter } from '../../utils/utils'
import { useSetAtom } from 'jotai/index'
import {
	TABLE_TYPE,
	tableHiddenColumnAtom,
	tableResetColumnAtom,
	tableRestoreColumnAtom,
	tableShowColumnAtom,
} from '../../store/Table/Table'
import { getTableLocalStorageByPageName } from '../../store/Table/tabeleLocalStorage'
import { getOrderTableStore, setOrderTableStore } from '../../store/Table/orderTableStore'
// import TableStyle from './Table.module.css'

// import { get } from 'lodash'
// import BtnCellRenderer from './BtnCellRenderer'

var dateFilterParams = {
	comparator: (filterLocalDateAtMidnight, cellValue) => {
		var cellDate = asDate(cellValue)
		if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
			return 0
		}
		if (cellDate < filterLocalDateAtMidnight) {
			return -1
		}
		if (cellDate > filterLocalDateAtMidnight) {
			return 1
		}
		return 0
	},
}

var ageType = 'everyone'
var minAge = null
var maxAge = null
var countryFilter = null

const asDate = (dateAsString) => {
	var splitFields = dateAsString.split('/')
	return new Date(Number.parseInt(splitFields[2]), Number.parseInt(splitFields[1]) - 1, Number.parseInt(splitFields[0]))
}

const Table = ({
	gridOptions: parentGridOptions,
	onSelectionChanged: parentOnSelectionChanged,
	onGridReady: parentOngridReady,
	hei,
	hei2,
	getRow,
	getCol,
	setChoiceComponent,
	size,
	topData,
	isRowClickable,
	handleOnRowClicked,
	tablePagination,
	onPageChange,
	noRowsMessage = '데이터가 존재하지 않습니다.', // 데이터 갯수가 0개일 때, 나타날 메시지입니다.
	loading = false, // 로딩 여부
	dragAndDrop = false,
	changeFn,
	popupTable = false, // 팝업 테이블 여부
	isAnotherTable = false, // 한 페이지에 이중 테이블 여부
}) => {
	const [selectedCountry, setSelectedCountry] = useState(null)
	// const [packageUids, setPackageUids] = useState([])
	const [filterText, setFilterText] = useState('') // 필터 텍스트를 저장하는 상태 변수
	const gridRef = useRef()
	const containerStyle = useMemo(() => {
		if (hei2) {
			return { width: '100%', height: `${hei2}px` }
		} else {
			return { width: '100%', height: '500px' }
		}
	}, [hei2])

	const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
	const [rowData, setRowData] = useState()
	const rowAtomSwitch = useAtomValue(selectedRows2Switch)

	const [gridApi, setGridApi] = useState(null)
	const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
	const [selectedRows2, setSelectedRows2] = useAtom(selectedRowsAtom2)
	const setAnotherTableRows = useSetAtom(anotherTableRowsAtom)
	const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)
	const navigate = useNavigate()

	// ---------------------------------------------------------------------
	const [columnDefs, setColumnDefs] = useState([])

	// 정수형 콤마 표시 filter
	useEffect(() => {
		if (getRow && getRow.length > 0) {
			const formattedRow = getRow.map((item) => {
				const formattedItem = {}
				Object.keys(item).forEach((key) => {
					if (['제품 고유 번호'].includes(key) || key.includes('번호', '연락처')) {
						return (formattedItem[key] = item[key])
					} else {
						formattedItem[key] = customNumberFormatter({ value: item[key] })
					}
				})
				return formattedItem
			})
			setRowData(formattedRow)
		} else {
			setRowData(getRow)
		}
	}, [getRow])

	// TODO : 여기 URL 추가해서 다시 해보기.
	useEffect(() => {
		if (
			[
				'/auction/biddingsingle',

				'/userpage/auctionsingle',

				'/auction/winning/detail',
				'/userpage/auctionwinning/detail',
			].includes(location.pathname)
		) {
			if (gridRef.current.api) {
				const nodesToSelect = []

				gridRef.current.api.forEachNode((node) => {
					const selectedUid = [...new Set(selectedRows && selectedRows?.map((item) => item['제품 번호']?.value))]

					if (node.data && selectedUid.includes(node.data['제품 번호'].value)) {
						nodesToSelect.push(node)
					}
				})
				gridRef.current.api.setNodesSelected({ nodes: nodesToSelect, newValue: true })
			}
		} else if (['/auction/biddingpackage', '/userpage/auctionpackage'].includes(location.pathname)) {
			if (gridRef.current.api) {
				const nodesToSelect = []

				gridRef.current.api.forEachNode((node) => {
					const selectedUid = [...new Set(selectedRows && selectedRows?.map((item) => item['패키지 번호']?.value))]

					if (node.data && selectedUid.includes(node.data['패키지 번호'].value)) {
						nodesToSelect.push(node)
					}
				})
				gridRef.current.api.setNodesSelected({ nodes: nodesToSelect, newValue: true })
			}
		}
	}, [rowData])

	// const tableV2CommonStyles = {
	// 	headerClass: 'custom-header-style',
	// 	flex: 1,
	// 	cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
	// }

	useEffect(() => {
		if (getCol && getCol?.length > 0) {
			// 행 정의
			const newCol =
				getCol &&
				getCol?.map((item) => {
					if (item.checkboxSelection) {
						item.suppressMovable = true
						item.pinned = 'left'
						item.minWidth = 50
						item.maxWidth = 50
						return { ...item }
					}
					if (['고유 번호', '고유번호'].includes(item.field)) {
						item.hide = true
					}
					if (['추천 여부', '추천'].includes(item.field)) {
						item.hide = true
					}
					// 로컬 스토리지 저장된 숨김목록처리
					if (localTableList && tableType) {
						const hiddenIds = localTableList[tableType]?.hiddenIds
						if (hiddenIds.includes(item.field)) {
							item.hide = true
						}
					}
					return { ...item, maxWidth: 999, minWidth: 80, width: 100 }
				})
			setColumnDefs(newCol)
		}
	}, [])

	// ---------------------------------------------------------------------

	const isExternalFilterPresent = useCallback(() => {
		// if ageType is not everyone or either minAge or maxAge is set, then we are filtering
		return ageType !== 'everyone' || minAge !== null || maxAge !== null || countryFilter !== null
	}, [])

	const onFindButtonClick = () => {
		const newCountryFilter = filterText.trim()
		const gridApi = gridRef.current.api

		// 입력한 국가명으로 grid의 Country 필터를 작동
		gridApi.setFilterModel({
			country: {
				type: 'set',
				values: [newCountryFilter],
			},
		})
		gridApi.onFilterChanged()
	}

	const [isModal, setIsModal] = useAtom(blueModalAtom)
	const location = useLocation()

	// 페이지 이동시에 테이블 선택이 겹칠 수 있으므로 초기화
	useEffect(() => {
		// setDetailRow(null)
		setSelectedRows(null)
		setAnotherTableRows(null)
	}, [location])

	const modalOpen = () => {
		setIsModal(true)
	}

	const modalClose = () => {
		setIsModal(false)
	}

	// 일단 router 이동 등록
	const onRowDoubleClicked = (event) => {
		// const path = event.data['고객 코드']
		setDetailRow(event.data)
		setChoiceComponent(event.data)
		// navigate(`/userpage/userdestination/${path}`)
	}

	// Grid api 설정확인
	const onGridReady = (params) => {
		const agGridApi = params.api
		setGridApi(agGridApi)
	}

	const onFirstDataRendered = (params) => {
		const columnApi = params.columnApi
		columnApi.autoSizeAllColumns(false)
	}

	const onHoldCheck = (params) => {
		if (params?.includes(params.data['제품 번호'].value)) {
			params.node.setSelected(true)
		}
	}

	// 체크했을때 jotai 전역상태값 설정
	const onSelectionChanged = () => {
		if (gridApi) {
			const selectedNodes = gridApi.getSelectedNodes()
			const selectedData = selectedNodes.map((node) => node.data)
			if (isAnotherTable) {
				setAnotherTableRows(selectedData)
			} else {
				setSelectedRows(selectedData)
			}

			// 이중으로 check 사용 시
			if (rowAtomSwitch) {
				setSelectedRows2(selectedData)
			}
		}
	}

	const defaultColDef = useMemo(() => {
		return {
			editable: false,
			enableRowGroup: true,
			enablePivot: true,
			enableValue: true,
			sortable: true,
			resizable: true,
			filter: true,
			// flex: 1,
			// minWidth: 100,
		}
	}, [])

	const [sortNum] = useAtom(pageSort)

	const onPageSizeChanged = useCallback(
		(sortNum) => {
			gridRef.current.api.paginationSetPageSize(Number(sortNum))
		},
		[sortNum],
	)

	useEffect(() => {
		if (gridRef?.current?.api?.paginationSetPageSize) {
			gridRef.current.api.paginationSetPageSize(Number(sortNum))
		}
	}, [sortNum])

	//Options
	const gridOptions = {
		suppressScrollOnNewData: true, // 스크롤 유지
		headerHeight: 30,
		animateRows: true, // Enable row animations
		cacheBlockSize: 100, // 캐시에 보관할 블록 사이즈
		maxBlocksInCache: 10, // 캐시에 최대로 보관할 블록 수
		suppressCopyRowsToClipboard: true, // 행 전체 복사 비활성화
		// 서버 측 데이터 요청을 처리하는 함수
	}

	const pinnedTopRowData = useMemo(() => {
		return topData
	}, [topData])

	const onRowClicked = (row) => {
		// Assuming each row has a unique ID or some identifier
		if (handleOnRowClicked) {
			handleOnRowClicked(row)
		}
	}

	const getRowStyle = () => {
		if (isRowClickable) {
			return { cursor: 'pointer' }
		}
		return {} // Default style for non-clickable rows
	}

	/**
	 * @description
	 * 로딩 중일때와 데이터가 길이가 0일 때를 구분하여 상황에 맞는 UI를 보여줍니다.
	 */
	useEffect(() => {
		if (gridRef.current.api) {
			if (!loading && Array.isArray(getRow) && getRow.length === 0) {
				gridRef.current.api.showNoRowsOverlay()
			} else if (loading) {
				gridRef.current.api.showLoadingOverlay()
			}
		}
	}, [loading, getRow])

	// Dragging Row
	const { onRowDragEnd } = useDragginRow({ setRowData, rowData })

	const onRecommendClick = () => {
		if (!gridApi) {
			console.error('Grid API가 초기화되지 않았습니다.')
			return
		}

		const selectedNodes = gridApi.getSelectedNodes()
		if (selectedNodes.length === 0) {
			alert('행을 선택해주세요.')
			return
		}

		selectedNodes.forEach((node) => {
			const currentData = node.data
			let updatedValue
			// '대표' 필드의 현재 값에 '추천'을 추가합니다.
			if (currentData['weight'].includes('★')) {
				// '추천'을 제거합니다.
				updatedValue = currentData['weight'].replace(`★`, '')
			} else {
				// '추천'이 없는 경우에만 추가합니다.
				updatedValue = `${currentData['weight']} ★`
			}
			const updatedData = { ...currentData, weight: updatedValue }
			node.updateData(updatedData)
		})

		gridApi.refreshCells({ force: true })
	}

	useEffect(() => {}, [gridRef])

	const updateSelectedBids = (newValue) => {
		const updatedRows = selectedRows.map((row) => ({ ...row, 응찰가: newValue }))
		gridApi.applyTransaction({ update: updatedRows })
	}

	const effectiveGridOptions = parentGridOptions || gridOptions
	const effectiveOnSelectionChanged = parentOnSelectionChanged || onSelectionChanged
	const effectGridReady = parentOngridReady || onGridReady

	const tableType = useMemo(() => (popupTable ? TABLE_TYPE.popupTable : TABLE_TYPE.pageTable), [popupTable]) // 팝업 테이블 여부
	const setHiddenColumn = useSetAtom(tableHiddenColumnAtom) // 테이블 칼럼 숨기기 처리
	const showColumnId = useAtomValue(tableShowColumnAtom) // 테이블 노출 칼럼
	const setShowColumn = useSetAtom(tableShowColumnAtom)
	const setShowColumnClear = useSetAtom(tableRestoreColumnAtom) // 테이블 노출 칼럼 처리
	const setResetHiddenColumn = useSetAtom(tableResetColumnAtom) // 테이블 숨김항목 초기화 처리

	const localTableList = getTableLocalStorageByPageName()
	const TableColumnsOrder = getOrderTableStore(tableType)

	/**
	 * 테이블 헤더 컬럼 이동 이벤트
	 * @param e
	 */
	const onColumnMoveEvent = useCallback(
		(e) => {
			const source = e.source // 이벤트 여부
			const isFinished = e.finished // 끝남여부

			// 컬럼위치 로컬로 저장
			if (source === 'uiColumnMoved' && isFinished) {
				const cols = gridRef.current.columnApi.getAllGridColumns()
				const data = cols.map((col, index) => ({ index: index, id: col.colId }))
				setOrderTableStore(data, tableType)
			}
		},
		[tableType],
	)

	/**
	 * 칼럼 숨기기 처리 핸들러
	 */
	const onColumnVisibleChange = useCallback(
		(event) => {
			const columnId = event.column.colId
			const isHidden = event.visible === false
			if (!isHidden) {
				setShowColumn({ type: tableType, value: columnId })
				return
			}

			setHiddenColumn({
				type: tableType,
				value: columnId,
			})
		},
		[tableType],
	)

	/**
	 * 칼럼 노출 핸들러
	 */
	const onColumnShow = (showId) => {
		if (!showId) {
			return
		}

		const api = gridRef.current.columnApi
		const savedState = api?.getColumnState()
		if (savedState) {
			const applyState = savedState.reduce((acc, v) => {
				if (v?.colId === showId) v.hide = false
				return [...acc, v]
			}, [])

			api.applyColumnState({ state: applyState })
		}
		setShowColumnClear({ type: tableType })
	}

	// 로컬 스토리지 저장된 숨김목록처리
	useEffect(() => {
		if (!localTableList) {
			return
		}

		if (gridRef.current.columnApi) {
			const columnApi = gridRef.current.columnApi
			if (columnApi) {
				const allColumns = columnApi.getAllColumns()
				if (allColumns) {
					const hiddenIds = localTableList[tableType].hiddenIds

					allColumns.forEach((column) => {
						if (hiddenIds.includes(column.colId)) {
							column.setVisible(false)
						}
					})
				}
			}
		}
	}, [localTableList])

	// 로컬 스토리지 순서 지정
	useEffect(() => {
		if (!TableColumnsOrder) {
			return
		}
		if (gridRef.current.columnApi) {
			const columnApi = gridRef.current.columnApi
			if (columnApi) {
				const orderCols = TableColumnsOrder?.columns
				if (orderCols?.length > 0) {
					orderCols.forEach((col) => {
						columnApi.moveColumns([col?.id], col?.index)
					})
				}
			}
		}
	}, [TableColumnsOrder])

	// 노출칼럼 변경
	useEffect(() => {
		const showId = showColumnId[tableType]
		onColumnShow(showId)
	}, [showColumnId])

	// 테이블 선택, 숨김항목 초기화
	useEffect(() => {
		setResetHiddenColumn({ type: tableType })
	}, [location, tableType])

	return (
		<div style={containerStyle}>
			<TestContainer hei={hei}>
				<div style={gridStyle} className="ag-theme-alpine">
					<AgGridReact
						ref={gridRef}
						// {...gridOptions}
						suppressColumnVirtualisation={true}
						onGridReady={effectGridReady}
						onFirstDataRendered={onFirstDataRendered}
						columnDefs={columnDefs}
						rowData={rowData}
						defaultColDef={defaultColDef}
						gridOptions={effectiveGridOptions}
						onRowDoubleClicked={onRowDoubleClicked}
						animateRows={true}
						suppressRowClickSelection={true}
						groupSelectsChildren={true}
						rowSelection={'multiple'}
						rowGroupPanelShow={'never'}
						pivotPanelShow={'always'}
						// pagination={true}
						// paginationPageSize={size}
						isExternalFilterPresent={isExternalFilterPresent}
						// doesExternalFilterPass={doesExternalFilterPass}
						onSelectionChanged={effectiveOnSelectionChanged}
						pinnedTopRowData={pinnedTopRowData}
						onRowClicked={onRowClicked}
						getRowStyle={getRowStyle}
						// rowHeight={40}
						overlayNoRowsTemplate={noRowsMessage}
						overlayLoadingTemplate="데이터를 불러오는 중..."
						// sideBar={{ toolPanels: ['columns', 'filters'] }}
						onRowDragEnd={dragAndDrop ? onRowDragEnd : () => {}}
						onCellValueChanged={changeFn}
						onColumnVisible={onColumnVisibleChange} // 테이블 숨김처리 저장
						onColumnMoved={onColumnMoveEvent} // 테이블 항목 쿠키 저장
					/>
				</div>
			</TestContainer>

			{isModal && (
				<>
					<NonFadeOverlay />
					<ModalContainer width={550}>
						<BlueBarHeader>
							<div>규격 약호 찾기</div>
							<div>
								<WhiteCloseBtn onClick={modalClose} src="/svg/white_btn_close.svg" />
							</div>
						</BlueBarHeader>
						<BlueSubContainer>
							<FindSpec>
								<FSTitle>
									<div>검색</div>
									<RBInput placeholder="회사 명" value={filterText} onChange={(e) => setFilterText(e.target.value)} />
									<GreyBtn width={15} height={30} fontSize={16} onClick={onFindButtonClick}>
										찾기
									</GreyBtn>
								</FSTitle>
								<FSResult>
									{/* {filteredCountries.map((x, index) => {
                    return (
                      <ResultBlock key={index} onClick={() => handleResultBlockClick(x)}>
                        {x}
                      </ResultBlock>
                    )
                  })} */}
								</FSResult>
							</FindSpec>
						</BlueSubContainer>
						<BlueBarBtnWrap>
							<BlackBtn onClick={modalClose} width={30} height={40}>
								확인
							</BlackBtn>
						</BlueBarBtnWrap>
					</ModalContainer>
				</>
			)}

			{tablePagination && <CustomPagination pagination={tablePagination} onPageChange={onPageChange} />}
		</div>
	)
}

Table.propTypes = {
	// Type definitions for each prop:
	hei: PropTypes.number,
	hei2: PropTypes.number,
	getRow: PropTypes.array,
	getCol: PropTypes.array,
	setChoiceComponent: PropTypes.func,
	size: PropTypes.number,
	topData: PropTypes.array,
	isRowClickable: PropTypes.bool,
	handleOnRowClicked: PropTypes.func,
	tablePagination: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // Note: tablePagination type is object.
	onPageChange: PropTypes.func,
	noRowsMessage: PropTypes.string,
	loading: PropTypes.bool,
}

// Default props (optional but recommended for optional props):
Table.defaultProps = {
	hei: null, // Default value if not provided
	hei2: null, // Default value if not provided
	getRow: [], // Default to an empty array
	getCol: [], // Default to an empty array
	setChoiceComponent: () => {}, // Default to a no-op function
	size: null, // Default value if not provided
	topData: [], // Default to an empty array
	isRowClickable: false, // Default to false
	handleOnRowClicked: () => {}, // Default to a no-op function
	tablePagination: {}, // Default value if not provided
	onPageChange: () => {}, // Default to a no-op function
	noRowsMessage: '데이터가 존재하지 않습니다.', // Default message
	loading: false, // Default to false
}

export default Table

const TestContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: ${({ hei }) => (hei ? `${hei}%` : '100%')};

	.ag-paging-panel {
		justify-content: center !important;
	}
`

export const TestHeader = styled.div`
	font-size: 13px;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-around;
	border: 1px solid grey;
	padding: 10px;
	border-radius: 5px;
`

export const FindSpec = styled.div`
	width: 100%;
	height: 300px;
`

export const FSTitle = styled.div`
	width: 100%;
	height: 50px;
	border: 1px solid #c8c8c8;
	display: flex;
	align-items: center;
	justify-content: space-around;

	input {
		border: 1px solid #c8c8c8;
		height: 30px;
		width: 300px;
	}
`

export const FSResult = styled.div`
	width: 100%;
	height: 295px;
	display: flex;
	flex-wrap: wrap;
	gap: 5px;
	padding: 5px;
	overflow: scroll;
	border: 1px solid #c8c8c8;
`

export const ResultBlock = styled.div`
	width: 24%;
	height: 50px;
	border: 1px solid black;
	cursor: pointer;
	font-size: 16px;
	justify-content: center;
	align-items: center;
	text-align: center;
	display: flex;

	&:hover {
		background-color: #eee;
	}
`

export const RBInput = styled.input`
	font-size: 16px;
`

export const Pagination = styled.ul``
