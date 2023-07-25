import React, { useState } from 'react';
import moment from 'moment/moment';
import {
  StyledCalendar,
  Dot,
  DotContainer,
  DotWrap,
  Today,
  Wrap,
  CalBtnWrap,
  CalBtn,
  TodayBtnWrap,
  TodayWrap,
  TodayTxt,
  CalWrap,
} from './Calendar.Styled';

import { styled } from 'styled-components';

const CalendarModal = () => {
  const [mark, setMark] = useState(['2023-07-04', '2023-07-05', '2023-07-06']);
  const [value, onChange] = useState(new Date());

  const locale = 'ko';
  const weekStartsOn = 0; // 0은 일요일을 나타냅니다.
  const tileClassName = ({ date, view }) => {
    if (view === 'month' && date.getDay() === 6) {
      return 'saturday';
    }
    return null;
  };
  const dotAm = '#ffc24d';
  const dotPm = '#2b74b8';
  const dotPlus = '#eda8ff';
  const dotMinus = '#b02525';

  const date = new Date();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  const formattedDate = `${month}/${day}(${dayOfWeek})`;

  function CustomFormatDay(locale, date) {
    return date.getDate().toString();
  }

  function customTileContent({ date, view }) {
    if (view === 'month' && date.toDateString() === new Date().toDateString()) {
      return (
        <>
          {mark.find(x => x === moment(date).format('YYYY-MM-DD')) ? (
            <>
              <Wrap></Wrap>
              <Today>today</Today>
              <DotContainer>
                <DotWrap>
                  <Dot dotColor={dotAm}>
                    <p>오전 경매</p>
                  </Dot>
                </DotWrap>
                <DotWrap>
                  <Dot dotColor={dotPm}>
                    <p>오후 경매</p>
                  </Dot>
                </DotWrap>
                <DotWrap>
                  <Dot dotColor={dotPlus}>
                    <p>추가 경매</p>
                  </Dot>
                </DotWrap>
              </DotContainer>
            </>
          ) : null}
        </>
      );
    }

    // 기존의 커스텀 콘텐츠 반환
    if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
      return (
        <>
          <Wrap></Wrap>
          <DotContainer>
            <DotWrap>
              <Dot dotColor={dotAm}>
                <p>오전 경매</p>
              </Dot>
            </DotWrap>
            <DotWrap>
              <Dot dotColor={dotPm}>
                <p>오후 경매</p>
              </Dot>
            </DotWrap>
            <DotWrap>
              <Dot dotColor={dotPlus}>
                <p>추가 경매</p>
              </Dot>
            </DotWrap>
          </DotContainer>
        </>
      );
    }

    return null;
  }

  return (
    <CalWrap>
      <StyledCalendar
        calendarType="US"
        locale={'ko'}
        weekStartsOn={weekStartsOn}
        onChange={onChange}
        value={value}
        prevLabel="<"
        nextLabel=">"
        prev2Label={false}
        next2Label={false}
        tileClassName={tileClassName}
        tileContent={customTileContent}
        formatDay={CustomFormatDay}
      />
      <CalBtnWrap>
        <CalBtn type="button">일정 등록</CalBtn>
        <TodayWrap>
          <span>today</span> <span>{formattedDate}</span>
        </TodayWrap>
        <DotWrap>
          <Dot dotColor={dotPlus}>
            <TodayTxt>추가 경매</TodayTxt>
          </Dot>
        </DotWrap>
        <DotWrap>
          <Dot dotColor={dotAm}>
            <TodayTxt>추가 경매</TodayTxt>
          </Dot>
        </DotWrap>
      </CalBtnWrap>
    </CalWrap>
  );
};

export default CalendarModal;
