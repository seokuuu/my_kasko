import React, { useCallback, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { styled } from 'styled-components';

var dateFilterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

var ageType = 'everyone';
var minAge = null;
var maxAge = null;
var countryFilter = null;

const asDate = dateAsString => {
  var splitFields = dateAsString.split('/');
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
};

const Test3 = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(
    () => ({ width: '100%', height: '500px' }),
    []
  );
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 180 },
    { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 80 },
    { field: 'country' },
    { field: 'year', maxWidth: 90 },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      filterParams: dateFilterParams,
    },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 120,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback(params => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(resp => resp.json())
      .then(data => {
        document.querySelector('#everyone').checked = true;
        setRowData(data);
      });
  }, []);

  const externalFilterChanged = useCallback(newValue => {
    ageType = newValue;
    gridRef.current.api.onFilterChanged();
  }, []);
  const isExternalFilterPresent = useCallback(() => {
    // if ageType is not everyone or either minAge or maxAge is set, then we are filtering
    return (
      ageType !== 'everyone' ||
      minAge !== null ||
      maxAge !== null ||
      countryFilter !== null
    );
  }, []);

  const onMinAgeChange = useCallback(event => {
    minAge = event.target.value !== '' ? parseInt(event.target.value) : null;
    gridRef.current.api.onFilterChanged();
  }, []);

  const onMaxAgeChange = useCallback(event => {
    maxAge = event.target.value !== '' ? parseInt(event.target.value) : null;
    gridRef.current.api.onFilterChanged();
  }, []);

  // const onCountryFilterChange = useCallback(event => {
  //   const newCountryFilter = event.target.value.trim();
  //   countryFilter = newCountryFilter !== '' ? newCountryFilter : null;
  //   gridRef.current.api.onFilterChanged();
  // }, []);

  const onCountryFilterChange = useCallback(event => {
    const newCountryFilter = event.target.value.trim();
    const filters = newCountryFilter.split(/,|\n/).map(filter => filter.trim());
    countryFilter = filters.length > 0 ? filters : null;
    gridRef.current.api.onFilterChanged();
  }, []);

  const doesExternalFilterPass = useCallback(
    node => {
      if (node.data) {
        // Apply ageType filter
        switch (ageType) {
          case 'below25':
            if (node.data.age >= 25) return false;
            break;
          case 'between25and50':
            if (node.data.age < 25 || node.data.age > 50) return false;
            break;
          case 'above50':
            if (node.data.age <= 50) return false;
            break;
          case 'dateAfter2008':
            if (asDate(node.data.date) <= new Date(2008, 0, 1)) return false;
            break;
          default:
            break;
        }

        // Apply minAge and maxAge filters
        if (minAge !== null && node.data.age < minAge) return false;
        if (maxAge !== null && node.data.age > maxAge) return false;

        if (countryFilter !== null) {
          const countryValue = node.data.country.toLowerCase(); // Case-insensitive comparison
          if (Array.isArray(countryFilter)) {
            for (const filter of countryFilter) {
              if (countryValue.includes(filter.toLowerCase())) {
                return true;
              }
            }
            return false;
          } else {
            return countryValue.includes(countryFilter.toLowerCase());
          }
        }
      }

      return true;
    },
    [ageType, minAge, maxAge, countryFilter]
  );

  return (
    <div style={containerStyle}>
      <TestContainer>
        <TestHeader>
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
          </label>
          <label>
            Country Filter:
            <textarea
              type="text"
              onChange={onCountryFilterChange}
              style={{ marginLeft: '5px' }}
            />
          </label>
        </TestHeader>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            isExternalFilterPresent={isExternalFilterPresent}
            doesExternalFilterPass={doesExternalFilterPass}
            onGridReady={onGridReady}
          />
        </div>
      </TestContainer>
    </div>
  );
};

export default Test3;

const TestContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TestHeader = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  border: 1px solid grey;
  padding: 10px;
  border-radius: 5px;
`;
