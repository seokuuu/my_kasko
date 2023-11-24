import { useState } from 'react'
import { Typography } from '@mui/material'

import { styled, css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { calendarAtom } from '../../store/Layout/Layout'
import CalendarModal from '../../modal/Calender/Calendar'

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
  AcTopLeft,
  ACTopRight,
} from './SideBar.Style'

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
      { title: '단일 관리', link: 'product/single' },
      { title: '패키지 관리', link: 'product/package' },
      { title: '추천 제품 관리', link: 'product/recommend' },
      // { title: 'Pro.no 관리', link: 'product/prono' },
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
      { title: '주문 확인', link: 'sales/order' },
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
]

const SideBar = ({ expanded, setExpanded, depth2Color }) => {
  const [calModal, setCalModal] = useAtom(calendarAtom)

  const closeModal = () => {
    setCalModal(false)
  }

  const handleModalClick = (event) => {
    event.stopPropagation()
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }
  return (
    <SideBarWrap>
      {calModal && (
        <ModalBg onClick={closeModal}>
          <CalModalWrap onClick={handleModalClick}>
            <CalendarModal />
          </CalModalWrap>
        </ModalBg>
      )}
      <AccordionWrap>
        <AcTop style={{ backgroundColor: '#2B3344' }}>
          <AcTopCal>
            <Link to={`/main`}>
              <AcTopLeft>
                <img src="/img/home.png" />
              </AcTopLeft>
            </Link>
            <ACTopRight onClick={() => setCalModal(true)}>
              <div>경매 캘린더</div>
              <img src="/img/calender.png" />
            </ACTopRight>
          </AcTopCal>
        </AcTop>

        {data.map((item, index) => (
          <StyledAccordion
            style={{ margin: '1px' }}
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
                  <TypoContent key={subIndex} isIncoming={subItem.title === depth2Color}>
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
  )
}

export default SideBar

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 어두운 배경 색상
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // 모달보다 높은 z-index
`

const CalModalWrap = styled.div`
  position: absolute;
  z-index: 1000;
  border: 1px solid black;
`
