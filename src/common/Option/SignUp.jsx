import { styled } from 'styled-components';
import Select from 'react-select';

export const depositOptions = [
  { value: 'ask0', label: '직함 선택 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];
export const auctionOptions = [
  { value: 'ask0', label: '직함 선택 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];

export const releaseOptions = [
  { value: 'ask0', label: '직함 선택 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];
export const accountOptions = [
  { value: 'ask0', label: '은행 선택 ' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];
export const emailOptions = [
  { value: 'ask0', label: '도메인 선택' },
  { value: 'ask1', label: 'naver.com' },
  { value: 'ask2', label: 'gmail.com' },
  { value: 'ask3', label: 'kakao.com' },
  { value: 'ask4', label: 'nate.com' },
];

// 창고 구분
export const storageOptions = [
  { value: 'ask0', label: '창고' },
  { value: 'ask1', label: '1' },
  { value: 'ask2', label: '2' },
  { value: 'ask3', label: '3' },
  { value: 'ask4', label: '4' },
];

export const DefaultSelect = styled(Select)`
  width: 120px;
  text-align: center;
  line-height: 26px;
  margin-right: 5px;
`;
