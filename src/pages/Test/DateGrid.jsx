import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { styled } from 'styled-components';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DateGrid = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <PickerWrap>
      <label>
        <SDatePicker
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={date => setStartDate(date)}
        />
        <PickerImg src="/svg/Calender.svg" />
      </label>
    </PickerWrap>
  );
};

export default DateGrid;

const PickerWrap = styled.div`
  display: flex;
  width: 250px;
  border: 1px solid magenta;
  border: 1px solid #c8c8c8;
`;

const SDatePicker = styled(DatePicker)`
  width: 150px;
  height: 30px;
  top: 5px;

  position: relative;
  font-size: 18px;
`;

const PickerImg = styled.img`
  position: relative;
`;
