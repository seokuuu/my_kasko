import { styled } from 'styled-components';
import Select from 'react-select';

////Options

//창고 구분
export const storageOptions = [
  { value: 'ask0', label: '창고 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];

// 매입처
export const purchaseOptions = [
  { value: 'ask0', label: '매입처 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];

/// 구분 행

// 제품군
export const productFamilyOptions = [
  { value: 'ask0', label: '제품군 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];
// 제조사
export const manufactCompanyOptions = [
  { value: 'ask0', label: '제조사 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];
// 재고 상태
export const stockStatusOptions = [
  { value: 'ask0', label: '재고 상태 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];

// 등급
export const gradeOptions = [
  { value: 'ask0', label: '등급 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];
// 정척 여부
export const standardOptions = [
  { value: 'ask0', label: '정척여부' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];

//----------------------------------------------

//Selects

export const MainSelect = styled(Select)`
  margin-left: 15px;
  width: 150px;
  line-height: 20px;
  font-size: 17px;

  input {
    color: black;
  }
`;

export const CustomSelect = styled(Select)`
  width: ${props => props.width}px;
  text-align: center;
  line-height: 26px;
  margin-right: 5px;
  font-size: 16px;
`;
