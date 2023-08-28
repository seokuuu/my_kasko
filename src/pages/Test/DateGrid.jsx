import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateGrid = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <label>
        <PickerWrap>
          <SDatePicker
            dateFormat="yyyy년 MM월 dd일"
            selected={startDate}
            onChange={date => setStartDate(date)}
          />
          <PickerImg
            onChange={date => setStartDate(date)}
            src="/svg/Calender.svg"
          />
        </PickerWrap>
      </label>
    </>
  );
};

export default DateGrid;

const PickerWrap = styled.div`
  display: flex;
  position: relative;
  left: -35px;
  max-width: 200px;
  min-width: 180px;
  height: 40px;
  border: 1px solid #c8c8c8;
`;

const SDatePicker = styled(DatePicker)`
  width: 160px;
  height: 30px;
  top: 5px;

  position: relative;
  font-size: 16px;

  .react-datapicker-wrapper {
    display: flex;
  }
`;

const PickerImg = styled.img`
  position: relative;
  right: 5px;
  width: 20px;

  cursor: pointer;
`;
