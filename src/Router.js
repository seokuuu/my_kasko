import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { createContext, useState } from 'react';
import Login from './pages/User/Login/Login';
import SignUp from './pages/User/SignUp/SignUp';
import FindId from './pages/User/FindId/FindId';
import Test from './pages/Test/Test';
import Test2 from './pages/Test/Test2';
import ReissuePw from './pages/User/ReissuePw/ReissuePw';
import CalendarModal from './modal/Calender/Calendar';
import Test3 from './pages/Test/Test3';
import Test4 from './pages/Test/Test4';
import DateGrid from './pages/Test/DateGrid';
import UserRegister from './pages/UserManage/Register';
import Destination from './pages/UserManage/Destination';
import CarrierPost from './pages/UserManage/CarrierManage/CarrierPost';

import Operate from './pages/Operate/FAQ/Operate';
import AccordionMenu from './pages/Test/AccordionMenu';
import Header from './components/Header/Header';

import {
  headerAtom,
  accordionAtom,
  subHeaderAtom,
} from './store/Layout/Layout';
import NotFound from './pages/NotFound';

import { styled } from 'styled-components';
import SubHeader from './components/Header/SubHeader';

const Router = () => {
  const [showHeader, setShowHeader] = useAtom(headerAtom);
  const [showAccordion, setShowAccordion] = useAtom(accordionAtom);
  const [showSubHeader, setShowSubHeader] = useAtom(subHeaderAtom);

  return (
    <BrowserRouter>
      {showHeader && <Header />}
      <DefaultMainWrap>
        {showAccordion && <AccordionMenu />}
        <DefaultContentWrap>
          {showSubHeader && <SubHeader />}
          <Routes>
            {/* 테스트 URL */}
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/test4" element={<Test4 />} />

            {/* 로그인, 회원가입, 아이디 찾기, 비밀번호 재발급, 캘린더 */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/findid" element={<FindId />} />
            <Route path="/reissuepw" element={<ReissuePw />} />
            <Route path="/calander" element={<CalendarModal />} />

            {/* 재고 관리 */}
            <Route path="/stock">
              {/* <Route path="/stock/incoming" element={<ComponentA />} />
          <Route path="/stock/inventory" element={<ComponentB />} /> */}
            </Route>

            {/* 판매 제품 관리 */}
            <Route path="/auction/*">
              {/* <Route path="/product/single" element={<ComponentA />} />
          <Route path="/product/package" element={<ComponentB />} />
          <Route path="/product/recommend" element={<ComponentA />} />
          <Route path="/product/prono" element={<ComponentB />} /> */}
            </Route>

            {/* 경매 관리  */}
            <Route path="/auction">
              {/* <Route path="/auction/round" element={<ComponentA />} />
          <Route path="/auction/bidding" element={<ComponentB />} />
          <Route path="/auction/progress" element={<ComponentA />} />
          <Route path="/auction/detailprogress" element={<ComponentB />} />
          <Route path="/auction/winning" element={<ComponentA />} />
          <Route path="/auction/startprice" element={<ComponentB />} /> */}
            </Route>

            {/* 상시 판매 관리 */}
            <Route path="/sales/*">
              {/* <Route path="/sales/single" element={<ComponentA />} />
          <Route path="/sales/package" element={<ComponentB />} />
          <Route path="/sales/order" element={<ComponentB />} /> */}
            </Route>

            {/* 주문 관리 */}
            <Route path="/order/*">
              {/* <Route path="/order" element={<ComponentA />} /> */}
            </Route>

            {/* 출고 관리 */}
            <Route path="/shipping">
              {/* <Route path="/shipping/register" element={<ComponentA />} />
          <Route path="/shipping/request" element={<ComponentB />} />
          <Route path="/shipping/dispatch" element={<ComponentA />} />
          <Route path="/shipping/register" element={<ComponentB />} />
          <Route path="/shipping/status" element={<ComponentA />} />
          <Route path="/shipping/achievement" element={<ComponentB />} /> */}
            </Route>

            {/* 기준 관리 */}
            <Route path="/standard">
              {/* <Route path="/standard/destination" element={<ComponentA />} />
          <Route path="/standard/transportation" element={<ComponentB />} />
          <Route path="/standard/consolidation" element={<ComponentB />} /> */}
            </Route>

            {/* 사용자 관리 */}
            <Route path="/usermanage">
              <Route
                path="/usermanage/register"
                element={<UserRegister />}
              ></Route>
              {/* <Route path="/usermanage/client" element={<ComponentA />} />
          <Route path="/usermanage/clientdestination" element={<ComponentB />} />
          <Route path="/usermanage/operate" element={<ComponentA />} />
          <Route path="/usermanage/profile" element={<ComponentB />} /> */}
            </Route>

            {/* 운영 관리 */}
            <Route path="/operate">
              <Route path="" element={<Operate />}></Route>
              {/* <Route path="/operate/faq" element={<Operate />} /> */}
              {/* <Route path="/operate/operation" element={<ComponentA />} />
          <Route path="/operate/inventory" element={<ComponentB />} />
          <Route path="/operate/claim" element={<ComponentA />} />
          <Route path="/operate/popup" element={<ComponentB />} />

          <Route path="/operate/notice" element={<ComponentB />} />
          <Route path="/operate/noticeboard" element={<ComponentA />} />
          <Route path="/operate/datasheet" element={<ComponentB />} />
          <Route path="/operate/terms" element={<ComponentB />} />
          <Route path="/operate/footer" element={<ComponentB />} /> */}
            </Route>

            <Route path="/*" element={<NotFound />} />
          </Routes>
        </DefaultContentWrap>
      </DefaultMainWrap>
    </BrowserRouter>
  );
};

export default Router;

const DefaultMainWrap = styled.div`
  display: flex;
`;

const DefaultContentWrap = styled.div`
  width: 100%;
`;
