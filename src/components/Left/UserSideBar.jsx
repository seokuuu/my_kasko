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
      { title: '공지사항', link: 'usernotidocs/notice' },
      { title: '자료실', link: 'usernotidocs/docs' },
    ],
  },
  {
    depth1: '경매',
    depth2: [
      { title: '경매(일반)', link: 'userauction/general' },
      { title: '경매(패키지)', link: 'userauction/package' },
      { title: '경매 진행상황', link: 'userauction/status' },
      { title: '낙찰 확인', link: 'userauction/winning' },
    ],
  },
  {
    depth1: '상시판매',
    depth2: [
      { title: '단일', link: 'usersales/single' },
      { title: '패키지', link: 'usersales/package' },
      { title: '장바구니', link: 'usersales/cart' },
      { title: '주문확인', link: 'usersales/order' },
    ],
  },
  {
    depth1: '출고 실적 조회',
    depth2: [
      { title: '단일', link: 'userorder/single' },
      { title: '패키지', link: 'userorder/package' },
      { title: '장바구니', link: 'userorder/cart' },
      { title: '주문확인', link: 'userorder/orderconfirm' },
    ],
  },
  {
    depth1: '마이페이지',
    depth2: [
      { title: '사용자 관리', link: 'usermypage/usermanage' },
      { title: '개인정보수정', link: 'usermypage/profile' },
      { title: '목적지 관리', link: 'usermypage/destination' },
      { title: '즐겨찾기', link: 'usermypage/bookmark' },
    ],
  },
  {
    depth1: '고객센터',
    depth2: [
      { title: 'FAQ', link: 'usercustomer/faq' },
      { title: '이용약관', link: 'usercustomer/terms' },
    ],
  },
];

const UserSideBar = ({ expanded, setExpanded, depth2Color }) => {
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

export default UserSideBar;

const CalWrap = styled.div`
  position: absolute;
  z-index: 1000;
  border: 1px solid black;
`;
