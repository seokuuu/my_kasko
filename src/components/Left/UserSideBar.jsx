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
    depth1: '공지 & 자료실',
    depth2: [
      { title: '공지사항', link: 'userpage/notice' },
      { title: '자료실', link: 'userpage/docs' },
    ],
  },
  {
    depth1: '경매',
    depth2: [
      { title: '경매(단일)', link: 'userpage/actionsingle' },
      { title: '경매(패키지)', link: 'userpage/auctionpackage' },
      { title: '경매 진행 조회', link: 'userpage/actionstatus' },
      { title: '낙찰 확인', link: 'userpage/auctionwinning' },
    ],
  },
  {
    depth1: '상시판매',
    depth2: [
      { title: '단일', link: 'userpage/salessingle' },
      { title: '패키지', link: 'userpage/salespackage' },
      { title: '장바구니', link: 'userpage/salescart' },
      { title: '주문확인', link: 'userpage/salesorder' },
    ],
  },
  {
    depth1: '출고 실적 조회',
    depth2: [{ title: '출고 실적 조회', link: 'userpage/performance' }],
  },
  {
    depth1: '마이페이지',
    depth2: [
      { title: '개인정보수정', link: 'userpage/userprofile' },
      { title: '목적지 관리', link: 'userpage/userdestination' },
      { title: '선호 제품 관리', link: 'userpage/userprefer' },
    ],
  },
  {
    depth1: '고객센터',
    depth2: [
      { title: 'FAQ', link: 'userpage/userfaq' },
      { title: '이용약관', link: 'userpage/userterms' },
    ],
  },
];

const UserSideBar = ({ expanded, setExpanded, depth2Color }) => {
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <SideBarWrap>
      <AccordionWrap>
        <Link to={`/userpage/main`}>
          <AcTop style={{ backgroundColor: '#2B3344' }}>
            <AcTopCal style={{ justifyContent: 'center', gap: '15px' }}>
              <div>
                <img src="/img/home.png" />
              </div>
              <div style={{ color: 'white' }}>메인 페이지</div>
            </AcTopCal>
          </AcTop>
        </Link>

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
  );
};

export default UserSideBar;

