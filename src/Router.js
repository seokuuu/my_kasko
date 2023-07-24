import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { createContext, useState } from 'react';
import Login from './pages/User/Login/Login';
import SignUp from './pages/User/SignUp/SignUp';
import FindId from './pages/User/FindId/FindId';
import Test from './pages/Test/Test';
import Test2 from './pages/Test/Test2';
import Reissue from './pages/User/ReissuePw/ReissuePw';
import CalendarModal from './modal/Calender/Calendar';
import Test3 from './pages/Test/Test3';
import Test4 from './pages/Test/Test4';
import DateGrid from './pages/Test/DateGrid';
import User from './pages/User/User';
import Destination from './pages/User/Destination';
import CarrierPost from './pages/UserManage/CarrierManage/CarrierPost';
import PrivacyEdit from './pages/UserManage/ProfileEdit/ProfileEdit';
import Operate from './pages/Operate/FAQ/Operate';
import AccordionMenu from './pages/Test/AccordionMenu';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { headerAtom, accordionAtom } from './store/Layout/Layout';
import NotFound from './pages/NotFound';

const Router = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);

  return (
    <BrowserRouter>
      {showHeader && <Header />}
      {showAccordion && <AccordionMenu />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* 다른 페이지들 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
