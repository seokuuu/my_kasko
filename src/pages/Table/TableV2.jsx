import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import { tableRestoreColumnAtom, tableHiddenColumnAtom, tableShowColumnAtom, tableResetColumnAtom, TABLE_TYPE } from '../../store/Table/Table'
import './TableUi.css'

/**
 * @constant 테이블 함수
 */
const TABLE_FUNC = {
	checkboxSelection: function (params) {
		// we put checkbox on the name if we are not doing grouping
		return params.columnApi.getRowGroupColumns().length === 0
	},
	headerCheckboxSelection: function (params) {
		// we put checkbox on the name if we are not doing grouping
		return params.columnApi.getRowGroupColumns().length === 0
	}
};

/**
 * @constant 테이블 옵션
 */
const TABLE_OPTION = {
	defaultDataColumnDefs: [
		{
			field: '고객 코드',
			width: 45,
			checkboxSelection: TABLE_FUNC.checkboxSelection,
			headerCheckboxSelection: TABLE_FUNC.headerCheckboxSelection,
		},
		{
			field: '고객 코드',
			width: 45,
			checkboxSelection: TABLE_FUNC.checkboxSelection,
			headerCheckboxSelection: TABLE_FUNC.headerCheckboxSelection,
		},
		{ field: '대표', maxWidth: 80 },
		{ field: '목적지 코드' },
		{ field: '목적지 명', maxWidth: 90 },
		{ field: '담당자 연락처' },
		{ field: '하차지 명' },
		{ field: '도착지 연락처' },
		{ field: '상세 주소' },
		{ field: '비고란' },
	], 
	defaultColDef: {
		editable: false,
		enableRowGroup: true,
		enablePivot: true,
		enableValue: true,
		sortable: true,
		resizable: true,
		filter: true,
	},
	defaultAutoGroupColumnDef: {
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
	defaultGridOptions: {
		headerHeight: 30,
		rowDragManaged: true, // Enable row dragging
		animateRows: true, // Enable row animations
		cacheBlockSize: 100, // 캐시에 보관할 블록 사이즈
		maxBlocksInCache: 10, // 캐시에 최대로 보관할 블록 수
	}
}

/**
 * @constant 프로퍼티 계산 함수
 */
const PROPS_FUNC = {
	getContainerStyle: function(hei2) {
		return({ width: '100%', height: `${hei2 === null? 500 : hei2 }px` })
	}
}

/**
 * 기본 테이블
 * @description 숨긴 항목 기능 추가 테이블
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
	popupTable = undefined // 팝업 테이블 여부
}) => {
	// AG-GRID TABLE
	const gridRef = useRef()
	const [gridApi, setGridApi] = useState(null)
	// FILTER
	const [filterText, setFilterText] = useState('') // 필터 텍스트를 저장하는 상태 변수
	// ROW DATA(TABLE-HEAD)
	const [rowData, setRowData] = useState() // 로우데이터 정의
	// COLUMN DATA(TABLE-BODY)
	const [columnDefs, setColumnDefs] = useState(TABLE_OPTION.defaultDataColumnDefs); // 컬럼정의
	// TABLE FILTER
	const [sortNum] = useAtom(pageSort) // 페이지 사이즈
	// STYLE
	const containerStyle = PROPS_FUNC.getContainerStyle(hei2); // 컨테이너 스타일
	const pinnedTopRowData = useMemo(() => topData, [topData]) // 핀고정 데이터
	// ROUTER
	const location = useLocation();
	// TABLE TYPE
	const tableType = useMemo(() => popupTable? TABLE_TYPE.popupTable : TABLE_TYPE.pageTable, [popupTable]);
	// COMMON STORES
	const rowAtomSwitch = useAtomValue(selectedRows2Switch) // 2th 테이블 체크박스 여부
	const setSelectedRows = useSetAtom(selectedRowsAtom) // 테이블 선택 체크박스 처리
	const setSelectedRows2 = useSetAtom(selectedRowsAtom2) // 2th 테이블 체크박스 처리
	const setDetailRow = useSetAtom(doubleClickedRowAtom) // 상세넘어가기 처리
	const setHiddenColumn = useSetAtom(tableHiddenColumnAtom); // 테이블 칼럼 숨기기 처리
	const showColumnId = useAtomValue(tableShowColumnAtom); // 테이블 노출 칼럼
	const setShowColumnClear = useSetAtom(tableRestoreColumnAtom); // 테이블 노출 칼럼 처리
	const setResetHiddenColumn = useSetAtom(tableResetColumnAtom); // 테이블 숨김항목 초기화 처리
	// DRAG&DROP
	const { onRowDragEnd } = useDragginRow({ setRowData, rowData }) // 컬럼데이터 드래그앤드랍
	//
	const [isModal, setIsModal] = useAtom(blueModalAtom)

	/**
	 * 체크박스 선택 처리 핸들러
	 * @description 체크했을때 jotai 전역상태값 설정
	 */
	const onSelectionChanged = () => {
		if (gridApi) {
			const selectedNodes = gridApi.getSelectedNodes()
			const selectedData = selectedNodes.map((node) => node.data)
			setSelectedRows(selectedData)

			// 이중으로 check 사용시 (한 화면에 두 개의 테이블 렌더링 시 처리)
			if (rowAtomSwitch) {
				setSelectedRows2(selectedData)
			}
		}
	}

	/**
	 * 로우 더블클릭 처리 핸들러
	 * @description 일단 router 이동 등록
	 */
	const onRowDoubleClicked = (event) => {
		setDetailRow(event.data)
		setChoiceComponent(event.data)
	}

	/**
	 * 칼럼 숨기기 처리 핸들러
	 */
	const onColumnVisibleChange = (event) => {
		const isHidden = event.visible === false;
		
		if(!isHidden) {
			return;
		}

		const columnId = event.column.colId;
		console.log(event, columnId);
		setHiddenColumn({ 
			type: tableType, 
			value: columnId 
		});
	}

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
	}

	/* ==================== OTHERS start ==================== */
	/**
	 * @todo 현재 사용하는 함수인지 확인 필요
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
	/* ==================== OTHERS end ==================== */

	/* ==================== STATES start ==================== */
	// 로딩 상태 변경
	useEffect(() => {
		/**
		 * @description
		 * 로딩 중일때와 데이터가 길이가 0일 때를 구분하여 상황에 맞는 UI를 보여줍니다.
		 */
			if (gridRef.current.api) {
				if (!loading && Array.isArray(getRow) && getRow.length === 0) {
					gridRef.current.api.showNoRowsOverlay()
				} else if (loading) {
					gridRef.current.api.showLoadingOverlay()
				}
			}
		}, [loading, getRow])

	// 페이지사이즈 변경
	useEffect(() => {
		if (gridRef?.current?.api?.paginationSetPageSize) {
			gridRef.current.api.paginationSetPageSize(Number(sortNum))
		}
	}, [sortNum])

	// 노출칼럼 변경
	useEffect(() => {
		const showId = showColumnId[tableType];
		onColumnShow(showId);
	}, [showColumnId])
	/* ==================== STATES start ==================== */

	/* ==================== INITIALIZE start ==================== */
	// 테이블로우, 테이블데이터 초기화
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

	// 테이블 선택, 숨김항목 초기화
	useEffect(() => {
		setSelectedRows(null);
		setResetHiddenColumn({ type: tableType});
	}, [location, tableType])
	/* ==================== INITIALIZE end ==================== */

	return (
		<div style={containerStyle}>
			<TestContainer hei={hei}>
				<div 
					style={{ height: '100%', width: '100%' }} 
					className="ag-theme-alpine"
				>
					<AgGridReact
						ref={gridRef}
						// col&row options
						defaultColDef={TABLE_OPTION.defaultColDef}
						autoGroupColumnDef={TABLE_OPTION.defaultAutoGroupColumnDef}
						columnDefs={columnDefs}
						rowData={rowData}
						pinnedTopRowData={pinnedTopRowData}
						// tableOptoins
						gridOptions={TABLE_OPTION.defaultGridOptions}
						rowSelection={'multiple'}
						rowGroupPanelShow={'always'}
						pivotPanelShow={'always'}
						animateRows={true}
						suppressRowClickSelection={true}
						groupSelectsChildren={true}
						// pagination options
						pagination={true}
						paginationPageSize={size}
						isExternalFilterPresent={false}
						// message options
						overlayNoRowsTemplate={noRowsMessage}
						overlayLoadingTemplate="데이터를 불러오는 중..."
						// handler options
						onCellValueChanged={changeFn}
						onSelectionChanged={onSelectionChanged}
						onRowDoubleClicked={onRowDoubleClicked}
						onGridReady={(params) => { setGridApi(params.api) }}
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
								<WhiteCloseBtn onClick={() => { setIsModal(false) }} src="/svg/white_btn_close.svg" />
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
