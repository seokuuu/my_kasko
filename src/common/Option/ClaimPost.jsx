import { styled } from 'styled-components';
import Select from 'react-select';

////Options

//창고 구분
export const claimOngoingStatus = [
  { value: 'ask0', label: '진행중 ' },
  { value: 'ask1', label: '종료' },
  { value: 'ask2', label: '반품' },
  { value: 'ask3', label: '교정' },
  { value: 'ask4', label: '현금 보전' },
  { value: 'ask4', label: '보상' },
];

export const ClaimSelect = styled(Select)`
  display: block;
  position: relative;
  left: -25px;
  width: 230px;
  line-height: 20px;
  text-align: center;
`;
