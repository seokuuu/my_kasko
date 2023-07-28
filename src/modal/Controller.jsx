import React from 'react';

import { useAtom, useSetAtom } from 'jotai';

import { calendarAtom } from '../store/Layout/Layout';
import CalendarModal from './Calender/Calendar';

//calendar

const Controller = () => {
  const [calModalOpen, setCalModalOpen] = useAtom(calendarAtom);
  return <div>{calModalOpen && <CalendarModal />}</div>;
};

export default Controller;
