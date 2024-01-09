import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import 'ag-grid-enterprise'
import { AgGridReact } from 'ag-grid-react'
import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BlackBtn, GreyBtn } from '../../common/Button/Button'
import {
  BlueBarBtnWrap,
  BlueBarHeader,
  BlueSubContainer,
  ModalContainer,
  NonFadeOverlay,
  WhiteCloseBtn,
} from '../../modal/Common/Common.Styled'
import { blueModalAtom, doubleClickedRowAtom, selectedRowsAtom } from '../../store/Layout/Layout'
import { FSResult, FSTitle, FindSpec, Pagination, RBInput, TestContainer } from './tableStyle'
import { columnDefs } from './tableColVariable'
import './TableUi.css'

var ageType = 'everyone'
var minAge = null
var maxAge = null
var countryFilter = null

const Table = ({
  hei,
  hei2,
  rowData,
  getRow,
  getCol,
  setChoiceComponent,
  size,
  topData,
  isRowClickable,
  handleOnRowClicked,
}) => {
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
    setDetailRow(null)
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

  // 일단 router 이동 등록 :: 이게 어떤 기능인지
  const onRowDoubleClicked = (event) => {
    setDetailRow(event.data)
    setChoiceComponent(event.data)
  }

  // Grid api 설정확인: 사용하는 부모에서 선언
  const onGridReady = (params) => {
    setGridApi(params.api)
    params.api.sizeColumnsToFit()
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

  // 분리 필요
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    }
  }, [])

  /* 
    부모에서 사용할 수 있게 변경. - 여기서는 getRows을 사용해서 데이터 가져오는데, 단순히 부모 컴포넌트에서 useEffect+axios로 데이터 가져와도 상관없음. 
  */
  const gridOptions = {
    cacheBlockSize: 100, // 캐시에 보관할 블록 사이즈
    maxBlocksInCache: 10, // 캐시에 최대로 보관할 블록 수
    serverSideDatasource: {
      getRows: async function (params) {
        // 데이터 가져와야 하는 부분.
      },
    },
    pagination: true,
    paginNationPageSize: size,
    /*     
    rowModelType: 'serverSide',
    overlayNoRowsTemplate:
      '<div style="padding: 20px; border: 2px solid #666; background: #EEF3FB; fontsize: 20px; ">항목이 존재하지 않습니다.</div>', 
    */
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

  return (
    <div style={containerStyle}>
      <TestContainer hei={hei}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            onGridReady={onGridReady}
            columnDefs={columnDefs}
            rowData={rowData}
            onRowClicked={onRowClicked}
            // defaultColDef={defaultColDef}
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
            onSelectionChanged={onSelectionChanged}
            pinnedTopRowData={pinnedTopRowData}
            getRowStyle={getRowStyle}
            // {...gridOptions}
            // doesExternalFilterPass={doesExternalFilterPass}
            // sideBar={{ toolPanels: ['columns', 'filters'] }}
          />
        </div>
      </TestContainer>

      {/* 모달 처리하는 부분 */}
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
          <Pagination></Pagination>
        </>
      )}
    </div>
  )
}

export default Table

/**
 * @description function+variable assigned but never used
 */

/*
  
  const [selectedCountry, setSelectedCountry] = useState(null)
  
  const handleResultBlockClick = useCallback((country) => {
    setSelectedCountry(country)
    setFilterText(country) // 클릭한 국가로 필터 텍스트를 설정합니다
  }, []) 
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
  const asDate = (dateAsString) => {
    var splitFields = dateAsString.split('/')
    return new Date(Number.parseInt(splitFields[2]), Number.parseInt(splitFields[1]) - 1, Number.parseInt(splitFields[0]))
  }

  const sortedCountries = uniqueCountries.sort()

  const externalFilterChanged = useCallback((newValue) => {
    ageType = newValue
    gridRef.current.api.onFilterChanged()
  }, [])

  const uniqueCountries = Array.from(uniqueCountriesSet)
*/
/* 
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
*/
