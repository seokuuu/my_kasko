import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import styled from 'styled-components';
import moment from 'moment/moment';

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
        tileContent={({ date, view }) => {
          if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
            return (
              <>
                <DotWrap>
                  <div className="dot1">
                    <p>오전 경매</p>
                  </div>
                </DotWrap>
                <DotWrap>
                  <div className="dot2">
                    <p>오후 경매</p>
                  </div>
                </DotWrap>
              </>
            );
          }
        }}
      />
    </div>
  );
};

export default Test;

const StyledCalendar = styled(Calendar)`
  /* 캘린더 전체 스타일 */
  border-radius: 6px;
  width: 55%;

  .react-calendar {
    /* 캘린더 컨테이너 스타일 */
    height: 40rem;
    max-width: 50%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    line-height: 1.125em;
  }

  .react-calendar__month-view__days__day:not(
      .react-calendar__month-view__days__day--weekend
    )
    + .react-calendar__month-view__days__day--weekend:not(
      .react-calendar__month-view__days__day--neighboringMonth
    ) {
    color: #2875ea !important;
  }

  .react-calendar__navigation button {
    /* 캘린더의 네비게이션 버튼 스타일 */
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 25px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 스타일 */
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    /* 비활성화된 버튼 스타일 */
    background-color: #f0f0f0;
  }

  abbr[title] {
    /* 타이틀이 있는 축약어 스타일 */
    text-decoration: none;
  }

  .react-calendar__tile {
    height: 150px;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 타일 스타일 */
    background: #f8f8fa;
    color: #2875ea;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    /* 현재 날짜 타일 스타일 */
    background: #eef3fb;
    border-radius: 6px;
    font-weight: bold;
    color: #4c83d6;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    /* 활성화된 상태에서 현재 날짜 타일에 마우스를 호버할 때의 스타일 */
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #2875ea;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 타일에 활성화된 요소가 있는 경우의 스타일 */
    background: #2875ea;
  }
  .react-calendar__tile--active {
    /* 활성화된 타일 스타일 */
    background: #2875ea;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    /* 활성화된 상태에서 마우스를 호버할 때의 활성화된 타일 스타일 */
    background: #2875ea;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    /* 범위 선택 모드에서 마우스를 호버할 때의 타일 스타일 */
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    /* 범위 선택 모드에서 선택된 범위의 타일 스타일 ?? 이게 무슨 말 */
    background: #f8f8fa;
    color: #2875ea;
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
    background: #2875ea;
    color: white;
  }

  .dot1 {
    position: absolute;
    height: 8px;
    width: 8px;
    background-color: #f87171;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;

    margin-top: 10px;
  }

  .tileContent {
    border: 1px solid black;
  }

  .dot2 {
    position: absolute;
    height: 8px;
    width: 8px;
    background-color: #4b1de1;
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 33px;
  }
`;

const DotWrap = styled.div`
  display: flex;
  line-height: 10px;

  p {
    width: 100px;
  }
`;
