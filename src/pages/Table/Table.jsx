import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { BlackBtn, GreyBtn } from '../../common/Button/Button'
import CustomPagination from '../../components/pagination/CustomPagination'
import {
  BlueBarBtnWrap,
  BlueBarHeader,
  BlueSubContainer,
  ModalContainer,
  NonFadeOverlay,
  WhiteCloseBtn,
} from '../../modal/Common/Common.Styled'
import { blueModalAtom, doubleClickedRowAtom, pageSort, selectedRowsAtom } from '../../store/Layout/Layout'
import './TableUi.css'
import PropTypes from 'prop-types'
import useDragginRow from '../../hooks/useDragginRow'
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
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [packageUids, setPackageUids] = useState([])
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
  const [selectedRowData, setSelectedRowData] = useState(null)

  var checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0
  }

  var headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0
  }

  // ---------------------------------------------------------------------
  const [columnDefs, setColumnDefs] = useState([
    {
      field: '고객 코드',
      width: 45,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    {
      field: '고객 코드',
      width: 45,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },

    { field: '대표', maxWidth: 80 }, //숫자
    { field: '목적지 코드' },
    { field: '목적지 명', maxWidth: 90 },
    {
      field: '담당자 연락처',
    },
    {
      field: '하차지 명',
    },
    { field: '도착지 연락처' },
    { field: '상세 주소' },
    { field: '비고란' },
  ])

  // const defaultColDef = useMemo(() => {
  //   return {
  //     flex: 1,
  //     minWidth: 120,
  //     filter: true,
  //   }
  // }, [])

  // const dummyD = {
  //   '고객 코드': 'nope',
  //   대표: 'nope',
  //   '목적지 코드': 'nope',
  //   '목적지 명': 'nope',
  //   '담당자 연락처': 'nope',
  //   '하차지 명': 'nope',
  //   '도착지 연락처': 'nope',
  //   '상세 주소': 'nope',
  //   비고란: 'nope',
  // }

  // const dummyData = Array(300).fill(dummyD)

  // console.log(getCol)
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

  // ---------------------------------------------------------------------

  const countries = rowData?.map((item) => item.country)
  const uniqueCountriesSet = new Set(countries)
  const uniqueCountries = Array.from(uniqueCountriesSet)
  const sortedCountries = uniqueCountries.sort()
  // console.log(sortedCountries)

  const externalFilterChanged = useCallback((newValue) => {
    ageType = newValue
    gridRef.current.api.onFilterChanged()
  }, [])
  const isExternalFilterPresent = useCallback(() => {
    // if ageType is not everyone or either minAge or maxAge is set, then we are filtering
    return ageType !== 'everyone' || minAge !== null || maxAge !== null || countryFilter !== null
  }, [])

  const onMinAgeChange = useCallback((event) => {
    minAge = event.target.value !== '' ? parseInt(event.target.value) : null
    gridRef.current.api.onFilterChanged()
  }, [])

  const onMaxAgeChange = useCallback((event) => {
    maxAge = event.target.value !== '' ? parseInt(event.target.value) : null
    gridRef.current.api.onFilterChanged()
  }, [])

  const onCountryFilterChange = useCallback((event) => {
    const newCountryFilter = event.target.value.trim()
    const filters = newCountryFilter.split(/,|\n/).map((filter) => filter.trim()) // 스페이스 요청시 (/,|\n|\s+/) 이걸로 바꾸자.
    countryFilter = filters.length > 0 ? filters : null
    gridRef.current.api.onFilterChanged()
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

  const handleResultBlockClick = useCallback((country) => {
    setSelectedCountry(country)
    setFilterText(country) // 클릭한 국가로 필터 텍스트를 설정합니다
  }, [])

  const [isModal, setIsModal] = useAtom(blueModalAtom)
  const location = useLocation()

  // 페이지 이동시에 테이블 선택이 겹칠 수 있으므로 초기화
  useEffect(() => {
    // setDetailRow(null)
    setSelectedRows(null)
  }, [location])

  const modalOpen = () => {
    setIsModal(true)
  }

  const modalClose = () => {
    setIsModal(false)
  }

  const [gridApi, setGridApi] = useState(null)
  const [selectedRows, setSelectedRows] = useAtom(selectedRowsAtom)
  const [detailRow, setDetailRow] = useAtom(doubleClickedRowAtom)
  const navigate = useNavigate()

  // 일단 router 이동 등록
  const onRowDoubleClicked = (event) => {
    // const path = event.data['고객 코드']
    // console.log(event.data)
    setDetailRow(event.data)
    setChoiceComponent(event.data)
    // navigate(`/userpage/userdestination/${path}`)
    // console.log('Double clicked row UID: ', event.data)
  }

  // Grid api 설정확인
  const onGridReady = (params) => {
    setGridApi(params.api)
  }

  // 체크했을때 jotai 전역상태값 설정
  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map((node) => node.data)
      setSelectedRows(selectedData)
      // console.log(selectedRows)
    }
  }
  const autoGroupColumnDef = useMemo(() => {
    return {
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
    }
  }, [])
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
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
      console.log(sortNum)
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
    // other grid options
    // rowModelType: 'serverSide',
    rowModelType: 'clientSide',
    headerHeight: 30,
    // rowDragManaged: true, // Enable row dragging
    animateRows: true, // Enable row animations
    // onRowDragEnd:
    // animateRows: true,
    // paginationPageSize: size, // 요청할 페이지 사이즈
    cacheBlockSize: 100, // 캐시에 보관할 블록 사이즈
    maxBlocksInCache: 10, // 캐시에 최대로 보관할 블록 수
    // 서버 측 데이터 요청을 처리하는 함수
    serverSideDatasource: {
      getRows: async function (params) {
        // 백엔드로부터 데이터 가져오기
        // const response = await fetch('/inventory-ledger?pageNum=1&pageSize=1')
        // const rowData = await response.json()
        // console.log(rowData)
        // ag-Grid에 데이터 설정
        // params.successCallback(getRow)
      },
    },
    // overlayNoRowsTemplate:
    //   '<div style="padding: 20px; border: 2px solid #666; background: #EEF3FB; fontsize: 20px; ">항목이 존재하지 않습니다.</div>',
  }
  // new agGrid.Grid(document.querySelector('#myGrid'), gridOptions)

  // console.log('gridOptions', gridOptions)
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

  return (
    <div style={containerStyle}>
      <TestContainer hei={hei}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            // {...gridOptions}
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            ref={gridRef}
            onRowDoubleClicked={onRowDoubleClicked}
            autoGroupColumnDef={autoGroupColumnDef}
            animateRows={true}
            suppressRowClickSelection={true}
            groupSelectsChildren={true}
            rowSelection={'multiple'}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            pagination={true}
            paginationPageSize={size}
            isExternalFilterPresent={isExternalFilterPresent}
            // doesExternalFilterPass={doesExternalFilterPass}
            onSelectionChanged={onSelectionChanged}
            pinnedTopRowData={pinnedTopRowData}
            onRowClicked={onRowClicked}
            getRowStyle={getRowStyle}
            // rowHeight={40}
            overlayNoRowsTemplate={noRowsMessage}
            overlayLoadingTemplate="데이터를 불러오는 중..."
            // sideBar={{ toolPanels: ['columns', 'filters'] }}
            onRowDragEnd={dragAndDrop ? onRowDragEnd : () => {}}
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
  dragAndDrop: PropTypes.bool,
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
