import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const data = [
  {
    depth1: '재고 관리',
    depth2: [
      { title: '입고 관리', link: 'stock/incoming' },
      { title: '재고 관리', link: 'stock/inventory' },
    ],
  },
  {
    depth1: '판매 제품 관리',
    depth2: [
      { title: '단일 제품 관리', link: 'product/single' },
      { title: '패키지 관리', link: 'product/package' },
      { title: '추천 제품 관리', link: 'product/recommend' },
      { title: 'Pro.no 관리', link: 'product/prono' },
    ],
  },
  {
    depth1: '경매 관리',
    depth2: [
      { title: '경매 회차 관리', link: 'auction/round' },
      { title: '경매 응찰(단일/패키지)', link: 'auction/bidding' },
      { title: '경매 진행 조회', link: 'auction/progress' },
      { title: '경매 진행 상세 조회', link: 'auction/detailprogress' },
      { title: '경매 낙찰 관리', link: 'auction/winning' },
      { title: '경매 시작 단가 관리', link: 'auction/startprice' },
    ],
  },
  {
    depth1: '상시 판매 관리',
    depth2: [
      { title: '단일', link: 'sales/single' },
      { title: '패키지', link: 'sales/package' },
      { title: '상시 판매 주문 확인', link: 'sales/order' },
    ],
  },
  {
    depth1: '주문 관리',
    depth2: [{ title: '주문 관리', link: 'order' }],
  },
  {
    depth1: '출고 관리',
    depth2: [
      { title: '출하 지시 등록', link: 'shipping/register' },
      { title: '출고 요청', link: 'shipping/request' },
      { title: '배차기사 관리', link: 'shipping/dispatch' },
      { title: '배차/출고 등록', link: 'shipping/dispatch/register' },
      { title: '출고 현황', link: 'shipping/status' },
      { title: '출고 실적', link: 'shipping/achievement' },
    ],
  },
  {
    depth1: '기준 관리',
    depth2: [
      { title: '목적지 관리', link: 'standard/destination' },
      { title: '운반비 관리', link: 'standard/transportation' },
      { title: '합짐비 관리', link: 'standard/consolidation' },
    ],
  },
  {
    depth1: '사용자 관리',
    depth2: [
      { title: '고객사 관리', link: 'users/client' },
      { title: '고객사 목적지 관리', link: 'users/clientdestination' },
      { title: '사용자 관리', link: 'users/operate' },
      { title: '개인정보 수정', link: 'users/profile' },
    ],
  },
  {
    depth1: '운영 관리',
    depth2: [
      { title: '운영 관리', link: 'operate/operation' },
      { title: '재고 수불 관리', link: 'operate/inventory' },
      { title: '클레임 관리', link: 'operate/claim' },
      { title: '팝업 관리', link: 'operate/popup' },
      { title: 'FAQ 관리', link: 'operate/faq' },
      { title: '전광판 관리', link: 'operate/notice' },
      { title: '공지사항', link: 'operate/noticeboard' },
      { title: '자료실', link: 'operate/datasheet' },
      { title: '이용 약관', link: 'operate/terms' },
      { title: '푸터 관리', link: 'operate/footer' },
    ],
  },
];

const AccordionMenu = () => {
  return (
    <AccordionWrap>
      <AcTop>
        <AcTopCal>
          <div>경매 캘린더</div>
          <div>
            <img src="/img/calender.png" />
          </div>
        </AcTopCal>
      </AcTop>
      {data.map((item, index) => (
        <StyledAccordion key={index}>
          <StyledAccordionSummary
            expandIcon={<AccSwitch />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <StyledTypography>{item.depth1}</StyledTypography>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <Typography>
              {item.depth2.map((subItem, subIndex) => (
                <TypoContent key={subIndex}>
                  <Link to={`/${subItem.link}`}>
                    <Depth2>{subItem.title}</Depth2>
                  </Link>
                </TypoContent>
              ))}
            </Typography>
          </StyledAccordionDetails>
        </StyledAccordion>
      ))}
    </AccordionWrap>
  );
};

export default AccordionMenu;

const AccordionWrap = styled.div`
  display: block;
  position: relative;
  width: 300px;
  justify-content: center;
  align-items: center;

  //depth1 영역
  > div {
    background-color: #43516b;
    color: white;
    min-height: 60px;
  }

  //depth1 font
  p {
    font-size: 20px;
    letter-spacing: -1px;
  }
`;

const StyledAccordion = styled(Accordion)`
  background-color: #f0f0f0;
  color: #acacac;
`;

// AccordionSummary 컴포넌트를 스타일드 컴포넌트로 꾸미기
const StyledAccordionSummary = styled(AccordionSummary)`
  background-color: #e0e0e0;
`;

// Typography 컴포넌트를 스타일드 컴포넌트로 꾸미기
const StyledTypography = styled(Typography)``;

const AccSwitch = styled(ExpandMoreIcon)`
  color: white;
`;

// AccordionDetails 컴포넌트를 스타일드 컴포넌트로 꾸미기
//depth2 전체 영역
const StyledAccordionDetails = styled(AccordionDetails)`
  background-color: #35425c;
`;

const TypoContent = styled.div`
  margin: 15px 10px;
  a {
    color: #acacac;

    &:hover {
      color: #64b5ff;
    }
  }

  > p {
    font-size: 10px;
  }
`;

const Depth2 = styled.a`
  font-size: 20px;
`;

const AcTop = styled.div`
  width: 300px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AcTopCal = styled.div`
  display: flex;
  justify-content: space-around;
  width: 200px;
  height: 50px;
  align-items: center;
  border-bottom: 2px solid #c8c8c8;
  border-radius: 2px;
  background-color: #1e2533;
`;
