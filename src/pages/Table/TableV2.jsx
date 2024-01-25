import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
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
	blueModalAtom,
	doubleClickedRowAtom,
	pageSort,
	selectedRows2Switch,
	selectedRowsAtom,
	selectedRowsAtom2,
} from '../../store/Layout/Layout'
import { TABLE_TYPE, tableHiddenColumnAtom, tableResetColumnAtom, tableRestoreColumnAtom, tableShowColumnAtom } from '../../store/Table/Table'
import './TableUi.css'

/**
 * AG-GRID settings 함수
 */
var GRID_FUNC = {
	checkboxSelection: function (params) {
		// we put checkbox on the name if we are not doing grouping
		return params.columnApi.getRowGroupColumns().length === 0
	},
	headerCheckboxSelection: function (params) {
		// we put checkbox on the name if we are not doing grouping
		return params.columnApi.getRowGroupColumns().length === 0
	},
	containerStyle: function(hei2) {
		if (hei2) {
			return { width: '100%', height: `${hei2}px` }
		} else {
			return { width: '100%', height: '500px' }
		}
	}
};

/**
 * AG-GRID settings 상수
 */
var GRID_SETTIGS = {
	initialColumnDefs: [
		{
			field: '고객 코드',
			width: 45,
			checkboxSelection: GRID_FUNC.checkboxSelection,
			headerCheckboxSelection: GRID_FUNC.headerCheckboxSelection
		},
		{
			field: '고객 코드',
			width: 45,
			checkboxSelection: GRID_FUNC.checkboxSelection,
			headerCheckboxSelection: GRID_FUNC.headerCheckboxSelection
		},
	],
	autoGroupColumnDef:  {
		headerName: 'Group',
		minWidth: 170,
		field: 'athlete',
		valueGetter: (params) => {
			if (params.node.group) {
				return params.node.key
			} else {
				return params.data[params.colDef.field]
			}
		},
		headerCheckboxSelection: true,
		cellRenderer: 'agGroupCellRenderer',
		cellRendererParams: {
			checkbox: true,
		},
	},
	defaultColDef:{
		editable: false,
		enableRowGroup: true,
		enablePivot: true,
		enableValue: true,
		sortable: true,
		resizable: true,
		filter: true,
	},
	defaultGridOption: {
		headerHeight: 30,
		animateRows: true, // Enable row animations
		cacheBlockSize: 100, // 캐시에 보관할 블록 사이즈
		maxBlocksInCache: 10, // 캐시에 최대로 보관할 블록 수
	}
}

/**
 * 테이블
 * @param {boolean} props.popupTable 팝업 테이블 여부 
 * @description
 * - TableV2HiddenSection과 함께 사용됩니다.
 * - 팝업 테이블의 경우, TableV2와 TableV2HiddenSection에 popupTable 속성을 추가해야 합니다.
 */
const TableV2 = ({
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
}) => {
	// GRID
	const gridRef = useRef()
	const [gridApi, setGridApi] = useState(null)
	// DATA
	const [columnDefs, setColumnDefs] = useState(GRID_SETTIGS.initialColumnDefs); // 테이블 칼럼 데이터
	const [rowData, setRowData] = useState() // 테이블 데이터
	const pinnedTopRowData = useMemo(() => topData, [topData]) // 핀 고정 데이터
	// OPTIONS
	const [filterText, setFilterText] = useState('') // 필터 텍스트 저장
	const [sortNum] = useAtom(pageSort) // 페이지 정렬
	// TABLE TYPE
	const tableType = useMemo(() => popupTable? TABLE_TYPE.popupTable : TABLE_TYPE.pageTable, [popupTable]); // 팝업 테이블 여부
	// 규격 약호 찾기 모달
	const [isModal, setIsModal] = useAtom(blueModalAtom)
	const location = useLocation()
	// UI
	const containerStyle = GRID_FUNC.containerStyle(hei2);
	// DRAG
	const { onRowDragEnd } = useDragginRow({ setRowData, rowData })
	// STORES
	const rowAtomSwitch = useAtomValue(selectedRows2Switch) // 이중테이블 여부
	const setSelectedRows = useSetAtom(selectedRowsAtom) // 테이블1 선택데이터
	const setSelectedRows2 = useSetAtom(selectedRowsAtom2) // 테이블2 선택데이터
	const setDetailRow= useSetAtom(doubleClickedRowAtom) // 상세데이터 정보
	const setHiddenColumn = useSetAtom(tableHiddenColumnAtom); // 테이블 칼럼 숨기기 처리
	const showColumnId = useAtomValue(tableShowColumnAtom); // 테이블 노출 칼럼
	const setShowColumnClear = useSetAtom(tableRestoreColumnAtom); // 테이블 노출 칼럼 처리
	const setResetHiddenColumn = useSetAtom(tableResetColumnAtom); // 테이블 숨김항목 초기화 처리

	/**
	 * 그리드 옵션
	 * 주의: GridOptios은 컴포넌트 내에서 선언해 주세요.
	 */
	const gridOptions = {
		...GRID_SETTIGS.defaultGridOption,
		serverSideDatasource: {
			getRows: async function (params) {},
		},
	}

	/**
	 * @todo 현재 사용하고 있는지 확인
	 */
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

	/**
	 * row double click 핸들러
	 * @description 일단 router 이동 등록
	 */
	const onRowDoubleClicked = (event) => {
		setDetailRow(event.data)
		setChoiceComponent(event.data)
	}

	/**
	 * 셀렉트 핸들러
	 * @description 체크했을때 jotai 전역상태값 설정
	 */
	const onSelectionChanged = () => {
		if (gridApi) {
			const selectedNodes = gridApi.getSelectedNodes()
			const selectedData = selectedNodes.map((node) => node.data)
			setSelectedRows(selectedData)

			// 이중으로 check 사용 시
			if (rowAtomSwitch) {
				setSelectedRows2(selectedData)
			}
		}
	}

	/**
	 * 칼럼 숨기기 처리 핸들러
	 */
		const onColumnVisibleChange = useCallback((event) => {
			const isHidden = event.visible === false;
			if(!isHidden) {
				return;
			}
	
			const columnId = event.column.colId;
			setHiddenColumn({ 
				type: tableType,
				value: columnId 
			});
		}, [tableType]);

	/**
	 * 칼럼 노출 핸들러
	 */
	const onColumnShow = (showId) => {
		if(!showId) {
			return;
		}

		const api = gridRef.current.columnApi;
		const savedState = api.getColumnState();
		const applyState = savedState.reduce((acc, v) => {
			if(v?.colId === showId) v.hide = false
			return [...acc, v];
		}, [])

		api.applyColumnState({ state: applyState});
		setShowColumnClear({ type: tableType });
	};

	/* ==================== INITIALIZE start ==================== */
	// 테이블 칼럼, 로우 데이터 초기화
	useEffect(() => {
		if (getCol) {
			setColumnDefs(getCol)
		}
		if (getRow && getRow.length > 0) {
			setRowData(getRow)
		} else {
			setRowData(null)
		}
	}, [getRow, getCol])

	// 페이지 이동시에 테이블 선택이 겹칠 수 있으므로 초기화
	useEffect(() => {
		setSelectedRows(null)
	}, [location])

	// 테이블 선택, 숨김항목 초기화
	useEffect(() => {
		setResetHiddenColumn({ type: tableType });
	}, [location, tableType])
	/* ==================== INITIALIZE end ==================== */

	/* ==================== STATE start ==================== */
	// 페이지네이션 변경
	useEffect(() => {
		if (gridRef?.current?.api?.paginationSetPageSize) {
			gridRef.current.api.paginationSetPageSize(Number(sortNum))
		}
	}, [sortNum])

	// 로딩 중일때와 데이터가 길이가 0일 때를 구분하여 상황에 맞는 UI를 보여줍니다.
	useEffect(() => {
		if (gridRef.current.api) {
			if (!loading && Array.isArray(getRow) && getRow.length === 0) {
				gridRef.current.api.showNoRowsOverlay()
			} else if (loading) {
				gridRef.current.api.showLoadingOverlay()
			}
		}
	}, [loading, getRow])

	// 노출칼럼 변경
	useEffect(() => {
		const showId = showColumnId[tableType];
		onColumnShow(showId);
	}, [showColumnId])
	/* ==================== STATE end ==================== */

	return (
		<div style={containerStyle}>
			<TestContainer hei={hei}>
				<div style={{ height: '100%', width: '100%' }} className="ag-theme-alpine">
					<AgGridReact
						onGridReady={params => { setGridApi(params.api) }}
						columnDefs={columnDefs}
						rowData={rowData}
						defaultColDef={GRID_SETTIGS.defaultColDef}
						gridOptions={gridOptions}
						ref={gridRef}
						onRowDoubleClicked={onRowDoubleClicked}
						autoGroupColumnDef={GRID_SETTIGS.autoGroupColumnDef}
						animateRows={true}
						suppressRowClickSelection={true}
						groupSelectsChildren={true}
						rowSelection={'multiple'}
						rowGroupPanelShow={'never'}
						pivotPanelShow={'always'}
						pagination={true}
						paginationPageSize={size}
						isExternalFilterPresent={false}
						onSelectionChanged={onSelectionChanged}
						pinnedTopRowData={pinnedTopRowData}
						overlayNoRowsTemplate={noRowsMessage}
						overlayLoadingTemplate="데이터를 불러오는 중..."
						onCellValueChanged={changeFn}
						onColumnVisible={onColumnVisibleChange}
						{...dragAndDrop && { onRowDragEnd: onRowDragEnd }}
						{...isRowClickable && { getRowStyle: () => ({ cursor: 'pointer' }) }}
						{...handleOnRowClicked && { onRowClicked: (row) => { handleOnRowClicked(row) } }}
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
								<WhiteCloseBtn onClick={() => {setIsModal(false)}} src="/svg/white_btn_close.svg" />
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
							<BlackBtn onClick={() => { setIsModal(false) }} width={30} height={40}>
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

TableV2.propTypes = {
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
	popupTable: PropTypes.bool
}

// Default props (optional but recommended for optional props):
TableV2.defaultProps = {
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
	popupTable: false
}

export default TableV2

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
