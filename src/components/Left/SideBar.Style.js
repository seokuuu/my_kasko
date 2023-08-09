import { styled } from 'styled-components';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const SideBarWrap = styled.div`
  width: 230px;
`;

export const AccordionWrap = styled.div`
  display: block;
  position: relative;
  width: 100%;
  min-height: 93.5vh;
  height: 100%;
  justify-content: center;
  align-items: center;

  background-color: #2b3344;

  //depth1 영역
  > div {
    background-color: #43516b;
    color: white;
    min-height: 60px;
  }

  //depth1 font
  p {
    font-size: 19px;
    letter-spacing: -1px;
    margin-left: 10px;
    margin-top: 5px;
  }
`;

export const StyledAccordion = styled(Accordion)`
  background-color: #f0f0f0;
  color: #acacac;
`;

// AccordionSummary 컴포넌트를 스타일드 컴포넌트로 꾸미기
export const StyledAccordionSummary = styled(AccordionSummary)`
  background-color: #e0e0e0;
`;

// Typography 컴포넌트를 스타일드 컴포넌트로 꾸미기
export const StyledTypography = styled(Typography)``;

export const AccSwitch = styled(ExpandMoreIcon)`
  color: white;
`;

// AccordionDetails 컴포넌트를 스타일드 컴포넌트로 꾸미기
//depth2 전체 영역
export const StyledAccordionDetails = styled(AccordionDetails)`
  background-color: #35425c;
`;

export const TypoContent = styled.div`
  margin: 15px 10px;
  a {
    color: ${props => (props.isIncoming ? '#64b5ff' : '#acacac')};
    font-size: 18px;

    &:hover {
      color: #64b5ff;
    }
  }

  > p {
    font-size: 10px;
  }
`;

export const Depth2 = styled.a`
  font-size: 20px;
`;

export const AcTop = styled.div`
  width: 180px;
  height: 130px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  background-color: #2b3344;
`;

export const AcTopCal = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
  height: 50px;
  align-items: center;
  border-bottom: 2px solid #c8c8c8;
  border-radius: 2px;
  background-color: #1e2533;
  cursor: pointer;
`;

export const AcTopLeft = styled.div`
  position: relative;
  left: -5px;
  height: 45px;
  width: 45px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.PriHeavy};
  img {
    height: 70%;
  }
`;

export const ACTopRight = styled.div`
  display: flex;
  gap: 15px;
`;
