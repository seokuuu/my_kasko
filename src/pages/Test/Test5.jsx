import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-enterprise'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { styled } from 'styled-components'
import { ContentBlock } from 'draft-js'
import { useAtom } from 'jotai'
import { blueModalAtom } from '../../store/Layout/Layout'
import {
  NonFadeOverlay,
  ModalContainer,
  BlueBarHeader,
  WhiteCloseBtn,
  BlueSubContainer,
  BlueBarBtnWrap,
} from '../../modal/Common/Common.Styled'
import { GreyBtn, BlackBtn } from '../../common/Button/Button'
import { adminDestinationList } from '../../store/Table/Table'

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

const Test5 = ({ hei, destination }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filterText, setFilterText] = useState('') // 필터 텍스트를 저장하는 상태 변수
  const gridRef = useRef()
  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState()

  console.log('rowData', rowData)

  var checkboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0
  }

  var headerCheckboxSelection = function (params) {
    // we put checkbox on the name if we are not doing grouping
    return params.columnApi.getRowGroupColumns().length === 0
  }

  // ---------------------------------------------------------------------

  // const [columnDefs, setColumnDefs] = useState([
  //   {
  //     field: 'athlete',
  //     minWidth: 180,
  //     checkboxSelection: checkboxSelection,
  //     headerCheckboxSelection: headerCheckboxSelection,
  //   },
  //   { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 80 }, //숫자
  //   { field: 'country' },
  //   { field: 'year', maxWidth: 90 },
  //   {
  //     field: 'date',
  //     filter: 'agDateColumnFilter',
  //     filterParams: dateFilterParams,
  //   },
  //   { field: 'gold', filter: 'agNumberColumnFilter' },
  //   { field: 'silver', filter: 'agNumberColumnFilter' },
  //   { field: 'bronze', filter: 'agNumberColumnFilter' },
  // ])

  //고객코드/대표/목적지 코드/ 목적지 명/ 담당자 연락처/ 하차지 명/ 도착지 연락처/ 상세 주소/ 비고란
  // AgGrid => 1. row, col 데이터 2. filter해주기?

  const initialColumnDefs = Object.keys(adminDestinationList).map((key, index) => {
    let columnDef = {
      field: key,
      // 다른 필요한 속성들을 여기에 추가할 수 있습니다.
    }

    // 첫 번째 필드에 해당하는 경우
    if (index === 0) {
      columnDef = {
        ...columnDef,
        minWidth: 150,
        checkboxSelection: true, // checkboxSelection과 headerCheckboxSelection이 true 여야 함
        headerCheckboxSelection: true,
      }
    }

    return columnDef
  })
  const [columnDefs, setColumnDefs] = useState(initialColumnDefs)

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

  const dummyData = Array(10).fill(dummyD)

  useEffect(() => {
    if (destination && destination.length > 0) {
      setRowData(destination)
    } else {
      setRowData(dummyData)
    }
  }, [destination])

  const onGridReady = useCallback(
    (params) => {
      // 리액트쿼리 활용하여 데이터받기
      // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      //   .then((resp) => resp.json())
      //   .then((data) => {
      //     // document.querySelector('#everyone').checked = true;
      //   })
    },
    [destination],
  )

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

  // const onCountryFilterChange = useCallback(event => {
  //   const newCountryFilter = event.target.value.trim();
  //   countryFilter = newCountryFilter !== '' ? newCountryFilter : null;
  //   gridRef.current.api.onFilterChanged();
  // }, []);

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

  // const doesExternalFilterPass = useCallback(
  //   (node) => {
  //     if (node.data) {
  //       // Apply ageType filter
  //       switch (ageType) {
  //         case 'below25':
  //           if (node.data.age >= 25) return false
  //           break
  //         case 'between25and50':
  //           if (node.data.age < 25 || node.data.age > 50) return false
  //           break
  //         case 'above50':
  //           if (node.data.age <= 50) return false
  //           break
  //         case 'dateAfter2008':
  //           if (asDate(node.data.date) <= new Date(2008, 0, 1)) return false
  //           break
  //         default:
  //           break
  //       }

  //       // Apply minAge and maxAge filters
  //       if (minAge !== null && node.data.age < minAge) return false
  //       if (maxAge !== null && node.data.age > maxAge) return false

  //       if (countryFilter !== null) {
  //         const countryValue = node.data.country.toLowerCase() // Case-insensitive comparison
  //         if (Array.isArray(countryFilter)) {
  //           for (const filter of countryFilter) {
  //             if (countryValue.includes(filter.toLowerCase())) {
  //               return true
  //             }
  //           }
  //           return false
  //         } else {
  //           return countryValue.includes(countryFilter.toLowerCase())
  //         }
  //       }
  //     }

  //     return true
  //   },
  //   [ageType, minAge, maxAge, countryFilter],
  // )

  // filter 된 것을 보여주는
  // const filteredCountries = useMemo(() => {
  //   return sortedCountries.filter((country) => country.toLowerCase().includes(filterText.toLowerCase()))
  // }, [filterText, sortedCountries])

  // const autoGroupColumnDef = useMemo(() => {
  //   return {
  //     headerName: 'Group',
  //     minWidth: 170,
  //     field: 'athlete',
  //     valueGetter: (params) => {
  //       if (params.node.group) {
  //         return params.node.key
  //       } else {
  //         return params.data[params.colDef.field]
  //       }
  //     },
  //     headerCheckboxSelection: true,
  //     cellRenderer: 'agGroupCellRenderer',
  //     cellRendererParams: {
  //       checkbox: true,
  //     },
  //   }
  // }, [])

  const [isModal, setIsModal] = useAtom(blueModalAtom)

  const modalOpen = () => {
    setIsModal(true)
  }

  const modalClose = () => {
    setIsModal(false)
  }

  return (
    <div style={containerStyle}>
      <TestContainer hei={hei}>
        {/* <TestHeader>
          <label>
            <input
              type="radio"
              name="filter"
              id="everyone"
              onChange={() => externalFilterChanged('everyone')}
            />
            Everyone
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="below25"
              onChange={() => externalFilterChanged('below25')}
            />
            Below 25
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="between25and50"
              onChange={() => externalFilterChanged('between25and50')}
            />
            Between 25 and 50
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="above50"
              onChange={() => externalFilterChanged('above50')}
            />
            Above 50
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              id="dateAfter2008"
              onChange={() => externalFilterChanged('dateAfter2008')}
            />
            After 01/01/2008
          </label>
          <label>
            Min Age:
            <input
              type="number"
              min="0"
              max="150"
              onChange={onMinAgeChange}
              style={{ width: '50px', marginLeft: '5px' }}
            />
          </label>
          <label>
            Max Age:
            <input
              type="number"
              min="0"
              max="150"
              onChange={onMaxAgeChange}
              style={{ width: '50px', marginLeft: '5px' }}
            />
          </label>k
          <label>
            Country Filter:
            <textarea
              type="text"
              onChange={onCountryFilterChange}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </TestHeader> */}

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            // autoGroupColumnDef={autoGroupColumnDef}
            defaultColDef={defaultColDef}
            animateRows={true}
            suppressRowClickSelection={true}
            groupSelectsChildren={true}
            rowSelection={'multiple'}
            rowGroupPanelShow={'always'}
            pivotPanelShow={'always'}
            pagination={true}
            onGridReady={onGridReady}
            isExternalFilterPresent={isExternalFilterPresent}
            // doesExternalFilterPass={doesExternalFilterPass}
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

export default Test5
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