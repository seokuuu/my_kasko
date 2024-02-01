
export function FieldsSettings(fields, isChecked){
  
var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0
}
  const FieldsCols= [
    { field: '',   headerClass:'custom-header-style',flex:1,
      cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
      minWidth: 50, checkboxSelection, headerCheckboxSelection },
  
    ...Object.keys(fields).map((item) => ({
      headerClass:'custom-header-style',flex:1,
      cellStyle: { borderRight: '1px solid #c8c8c8', textAlign: 'center' },
      field: item,
      editable:false,
      minWidth: 150,
      cellRenderer:(params) => {
        if(typeof params.value === 'boolean'){
          return params.value ? 'Y' : 'No';
        }else{
          return params.value
        }
      }
    })),
  ]
return {FieldsCols}
}

// 메모랑 비고는 수정 기능이 셀안에서 포함되기에 저런식으로 작업했습니다.