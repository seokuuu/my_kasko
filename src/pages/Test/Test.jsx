import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from 'styled-components';
import moment from 'moment/moment';
import { formatDay } from 'react-calendar';

const Test = () => {
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

  console.log(formattedDate);
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
    <div>
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
      </CalBtnWrap>
      <TodayBtnWrap>
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
      </TodayBtnWrap>
    </div>
  );
};

export default Test;

const StyledCalendar = styled(Calendar)`
  /* 캘린더 전체 스타일 */
  border-radius: 6px;
  width: 1000px;
  .react-calendar {
    /* 캘린더 컨테이너 스타일 */
    height: 40rem;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    line-height: 1.125em;
  }

  .react-calendar__month-view__weekdays__weekday {
    border-bottom: 1px solid black;
  }

  .react-calendar__month-view__weekdays__weekday:first-child {
    color: #d10000;
  }

  .react-calendar__month-view__weekdays__weekday:nth-child(7) {
    color: #2875ea;
  }

  .react-calendar__month-view__days__day:not(
      .react-calendar__month-view__days__day--weekend
    )
    + .react-calendar__month-view__days__day--weekend:not(
      .react-calendar__month-view__days__day--neighboringMonth
    ) {
    color: #2875ea !important;
  }

  .react-calendar__navigation {
    position: absolute;
    left: 1050px;
    flex-direction: column;
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: 25px;
    margin-top: 8px;
    position: relative;
  }

  .react-calendar__navigation button:nth-child(4) {
    transform: rotate(-90deg);
    position: relative;
    left: 140px;
    bottom: 65px;
    width: 50px;
  }

  .react-calendar__navigation button:nth-child(2) {
    transform: rotate(-90deg);
    position: relative;
    left: 140px;
    bottom: -70px;
    width: 50px;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 스타일 */

    background-color: #85bbf4;
  }
  .react-calendar__navigation button[disabled] {
    /* 비활성화된 버튼 스타일 */
    background-color: #85bbf4;
  }

  abbr:not(abbr[title]) {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  abbr[title] {
    /* 타이틀이 있는 축약어 스타일 */
    text-decoration: none;
    font-size: 18px;
    font-family: 'SUIT';
    font-weight: lighter;
    position: relative;
    left: -55px;
  }

  .react-calendar__tile {
    position: relative;
    min-height: 160px;
    max-height: 1000px;
    border-bottom: 1px solid gainsboro;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 타일 스타일 */
    background: #85bbf4;
    color: #71a0e6;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    /* 현재 날짜 타일 스타일 */
    background: #91bbff;
    border-radius: 6px;

    color: 91bbff;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    /* 활성화된 상태에서 현재 날짜 타일에 마우스를 호버할 때의 스타일 */
    background: #6f48eb33;
    border-radius: 6px;
    color: #2875ea;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 타일에 활성화된 요소가 있는 경우의 스타일 */
    background: #85bbf4;
  }
  .react-calendar__tile--active {
    /* 활성화된 타일 스타일 */
    background: #85bbf4;
    border-radius: 6px;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 활성화된 타일 스타일 */
    background: #85bbf4;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    /* 범위 선택 모드에서 마우스를 호버할 때의 타일 스타일 */
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    /* 범위 선택 모드에서 선택된 범위의 타일 스타일 ?? 이게 무슨 말 */
    background: #f8f8fa;
    color: #85bbf4;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    /* 범위 선택 모드에서 선택된 범위의 시작 타일 스타일 */
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #2875ea;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    /* 범위 선택 모드에서 선택된 범위의 끝 타일 스타일 */
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;

    background: #91bbff;
    color: white;
  }

  .dot1 {
    position: relative;
    line-height: -30px;
    height: 25px;
    width: 10px;
    background-color: #ffc24d;
  }

  /* .tileContent {
    border: 1px solid black;
  } */
`;

const Dot = styled.div`
  position: relative;
  line-height: -30px;
  height: 25px;
  width: 10px;
  background-color: ${props => props.dotColor};
`;

const DotContainer = styled.div`
  min-height: 0px;
  position: relative;
  left: 0px;
  right: 0px;
`;

const DotWrap = styled.div`
  margin-top: 4px;
  height: 30px;
  display: flex;
  line-height: -10px;

  p {
    width: 100px;
    line-height: -10px;
    margin-left: 3px;
    margin-top: 3px;
  }
`;

const Today = styled.div`
  position: absolute;
  left: 8px;
  top: 10px;
  margin-left: 40px;
  font-weight: 600;
  color: #4c83d6;
`;

const Wrap = styled.div`
  min-height: 30px;
  position: relative;
  left: 0px;
  right: 0px;
`;

const CalBtnWrap = styled.div`
  position: absolute;
  left: 1010px;
  top: 130px;
  border-top: 2px solid black;
  width: 230px;
`;

const CalBtn = styled.button`
  width: 200px;
  height: 45px;
  margin-top: 20px;
  background-color: black;
  color: white;
`;

const TodayBtnWrap = styled.div`
  text-align: left;
  position: relative;
  left: 1000px;
  bottom: 760px;

  width: 250px;
  height: 500px;

  > div {
    margin-left: 20px;
    display: flex;
    width: 100%;

    justify-content: left;
  }

  span {
    margin-left: 10px;
    color: #4c83d6;
    font-size: 20px;
    font-weight: 600;
  }
`;

const TodayWrap = styled.div`
  margin: 10px;
`;

const TodayTxt = styled.p`
  line-height: 17px;
  position: relative;
  left: 15px;
`;
