import { styled } from 'styled-components'
import Select, { components } from 'react-select'

const CustomDropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <DropImg src="/svg/arrow_drop_fill.svg" />
      </components.DropdownIndicator>
    )
  )
}

const DropImg = styled.img`
  position: absolute;
  right: 6px;
  top: 6px;
`

////Options

//창고 구분
export const storageOptions = [
  { value: 'ask0', label: '창고 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

// 매입처
export const purchaseOptions = [
  { value: 'ask0', label: '매입처 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

/// 구분 행

// 제품군
export const productFamilyOptions = [
  { value: 'ask0', label: '제품군 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]
// 제조사
export const manufactCompanyOptions = [
  { value: 'ask0', label: '제조사 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]
// 재고 상태
export const stockStatusOptions = [
  { value: 'ask0', label: '재고 상태 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

// 등급
export const gradeOptions = [
  { value: 'ask0', label: '등급 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]
// 정척 여부
export const standardOptions = [
  { value: 'ask0', label: '정척여부' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
]

// 사용자 관리 - 고객사 관리 회원상태
export const usermanageClientStatusOptions = [
  { value: '고객사', label: '고객사' },
  { value: '고객 코드', label: '고객 코드' },
  { value: '사업자 번호', label: '사업자 번호' },
]
//----------------------------------------------
//Selects

// export const MainSelect = styled(Select)`
//   width: ${(props) => (props.width ? `${props.width}px` : '160px')};
//   min-height: 1;
//   text-align: center;
//   line-height: 1;
//   margin-right: 5px;
//   font-size: 16px;

//   input {
//     color: black;
//   }
// `

export const CustomStyledSelect = styled(Select)`
  min-width: ${(props) => (props.width ? `${props.width}px` : '160px')};
  min-height: 1px;
  text-align: start;
  line-height: 1;
  margin-right: 5px;
  font-size: 16px;
  display: inline-block;
  justify-content: center;

  input {
    color: black;
  }

  & .react-select__dropdown-indicator {
    display: none;
  }

  & .css-1u9des2-indicatorSeparator {
    display: none; /* 바(선) 감추기 */
  }

  & .css-qbdosj-Input {
    text-align: center;
  }
`

export const CustomStyledSelect2 = styled(Select)`
  width: ${(props) => props.width}px;
  min-height: 20px;
  text-align: center;
  line-height: 26px;
  margin-right: 5px;
  font-size: 16px;

  input {
    color: black;
  }

  & .css-1u9des2-indicatorSeparator {
    display: none; /* 바(선) 감추기 */
  }

  /* & .react-select__dropdown-indicator {
    display: none; 
  } */
`

export const MainSelect = (props) => {
  return <CustomStyledSelect {...props} components={{ DropdownIndicator: CustomDropdownIndicator }} />
}

export const CustomSelect = (props) => {
  return <CustomStyledSelect2 {...props} components={{ DropdownIndicator: CustomDropdownIndicator }} />
}

// export const CustomSelect = styled(Select)`
//   width: ${(props) => props.width}px;

//   min-height: 20px;
//   text-align: center;
//   line-height: 26px;
//   margin-right: 5px;
//   font-size: 16px;
// `

// export const CustomSelect2 = styled(Select)`
//   width: ${(props) => (props.width ? `${props.width}px` : '160px')};
//   min-height: 1;
//   text-align: center;
//   line-height: 1;
//   margin-right: 5px;
//   font-size: 16px;
// `
