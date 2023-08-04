import { useState } from 'react';
import { Typography } from '@mui/material';

import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { calendarAtom } from '../../store/Layout/Layout';
import CalendarModal from '../../modal/Calender/Calendar';

import {
  SideBarWrap,
  AccordionWrap,
  StyledAccordion,
  StyledAccordionSummary,
  StyledTypography,
  AccSwitch,
  StyledAccordionDetails,
  TypoContent,
  Depth2,
  AcTop,
  AcTopCal,
} from './SideBar.Style';

const data = [
  {
    //Stock
    depth1: '재고 관리',
    depth2: [
      { title: '입고 관리', link: 'stock/incoming' },
      { title: '재고 관리', link: 'stock/inventory' },
    ],
  },
  {
    //Product
    depth1: '판매 제품 관리',
    depth2: [
      { title: '단일 제품 관리', link: 'product/single' },
      { title: '패키지 관리', link: 'product/package' },
      { title: '추천 제품 관리', link: 'product/recommend' },
      { title: 'Pro.no 관리', link: 'product/prono' },
    ],
  },
  {
    //Auction
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
    //Sales
    depth1: '상시 판매 관리',
    depth2: [
      { title: '단일', link: 'sales/single' },
      { title: '패키지', link: 'sales/package' },
      { title: '상시 판매 주문 확인', link: 'sales/order' },
    ],
  },
  {
    //Order
    depth1: '주문 관리',
    depth2: [{ title: '주문 관리', link: 'order' }],
  },
  {
    //Shipping
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
    //Standard
    depth1: '기준 관리',
    depth2: [
      { title: '목적지 관리', link: 'standard/destination' },
      { title: '운반비 관리', link: 'standard/transportation' },
      { title: '합짐비 관리', link: 'standard/consolidation' },
    ],
  },
  {
    //UserManage
    depth1: '사용자 관리',
    depth2: [
      { title: '고객사 관리', link: 'usermanage/client' },
      { title: '고객사 목적지 관리', link: 'usermanage/clientdestination' },
      { title: '사용자 관리', link: 'usermanage/usermanage' },
      { title: '운송사 관리', link: 'usermanage/carriermanage' },
      { title: '개인정보 수정', link: 'usermanage/profileedit' },
    ],
  },
  {
    //Operate
    depth1: '운영 관리',
    depth2: [
      { title: '운영 관리', link: 'operate/operation' },
      { title: '노출 관리', link: 'operate/exposure' },
      { title: '일반 관리', link: 'operate/common' },
      { title: '이용 약관', link: 'operate/terms' },
      { title: '푸터 관리', link: 'operate/footer' },
    ],
  },
];

const SideBar = ({ expanded, setExpanded, depth2Color }) => {
  const [calModal, setCalModal] = useAtom(calendarAtom);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      {/* {calModal && (
        <CalWrap>
          <CalendarModal />
        </CalWrap>
      )} */}
      <SideBarWrap>
        <AccordionWrap>
          <AcTop style={{ backgroundColor: '#2B3344' }}>
            <AcTopCal onClick={() => setCalModal(true)}>
              <div>경매 캘린더</div>
              <div>
                <img src="/img/calender.png" />
              </div>
            </AcTopCal>
          </AcTop>
          {data.map((item, index) => (
            <StyledAccordion
              key={index}
              expanded={expanded === item.depth1}
              onChange={handleChange(item.depth1)}
            >
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
                    <TypoContent
                      key={subIndex}
                      isIncoming={subItem.title === depth2Color}
                    >
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
      </SideBarWrap>
    </>
  );
};

export default SideBar;

const CalWrap = styled.div`
  position: absolute;
  z-index: 1000;
  border: 1px solid black;
`;
