import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { styled } from 'styled-components'
import { useAtom } from 'jotai'
import { blueModalAtom, doubleClickedRowAtom, selectedRowsAtom } from '../../store/Layout/Layout'
import {
  NonFadeOverlay,
  ModalContainer,
  BlueBarHeader,
  WhiteCloseBtn,
  BlueSubContainer,
  BlueBarBtnWrap,
} from '../../modal/Common/Common.Styled'
import { GreyBtn, BlackBtn } from '../../common/Button/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { get } from 'lodash'

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

const Table = ({ hei, getRow, getCol }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filterText, setFilterText] = useState('') // 필터 텍스트를 저장하는 상태 변수
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState()

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
      minWidth: 180,
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

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 120,
      filter: true,
    }
  }, [])

  const dummyD = {
    '고객 코드': 'nope',
    대표: 'nope',
    '목적지 코드': 'nope',
    '목적지 명': 'nope',
    '담당자 연락처': 'nope',
    '하차지 명': 'nope',
    '도착지 연락처': 'nope',
    '상세 주소': 'nope',
    비고란: 'nope',
  }

  const dummyData = Array(100).fill(dummyD)

  // console.log(getCol)
  useEffect(() => {
    if (getCol) {
      setColumnDefs(getCol)
    }
    if (getRow && getRow.length > 0) {
      setRowData(getRow)
    } else {
      setRowData(dummyData)
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
    // setDetailRow(event.data)
    // console.log('저장', detailRow)
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
      console.log(selectedRows)
    }
  }

  return (
    <div style={containerStyle}>
      <TestContainer hei={hei}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            onRowDoubleClicked={onRowDoubleClicked}
            // autoGroupColumnDef={autoGroupColumnDef}
            defaultColDef={defaultColDef}
            animateRows={true}
            suppressRowClickSelection={true}
            groupSelectsChildren={true}
            rowSelection={'multiple'}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            pagination={true}
            isExternalFilterPresent={isExternalFilterPresent}
            // doesExternalFilterPass={doesExternalFilterPass}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
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
    </div>
  )
}

export default Table

const TestContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${({ hei }) => (hei ? `${hei}%` : '100%')};
`

const TestHeader = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 5px;
`

const FindSpec = styled.div`
  width: 100%;
  height: 300px;
`

const FSTitle = styled.div`
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

const FSResult = styled.div`
  width: 100%;
  height: 295px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 5px;
  overflow: scroll;
  border: 1px solid #c8c8c8;
`

const ResultBlock = styled.div`
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

const RBInput = styled.input`
  font-size: 16px;
`
