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
import UserRegister from './pages/UserManage/UserManage/UserPost';
import Destination from './pages/UserManage/ClientDestination/DestinationPost';

import AccordionMenu from './pages/Test/AccordionMenu';
import Header from './components/Header/Header';
import ClaimRegisterPage from './pages/Shipping/Claim/ClaimRegisterPage';

import CarrierPostPage from './pages/UserManage/CarrierManage/CarrierPostPage';

import FAQPostPage from './pages/Operate/FAQ/FAQPostPage';

import DestinationPostPage from './pages/UserManage/ClientDestination/DestinationPostPage';

import UserPostPage from './pages/UserManage/UserManage/UserPostPage';

import ProfileEditPage from './pages/UserManage/ProfileEdit/ProfileEditPage';

import {
  headerAtom,
  accordionAtom,
  subHeaderAtom,
} from './store/Layout/Layout';
import NotFound from './pages/NotFound';

import { styled } from 'styled-components';
import MainPage from './pages/Main/MainPage';

const Router = () => {
  return (
    <BrowserRouter>
      <DefaultMainWrap>
        <DefaultContentWrap>
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
            <Route path="/main" element={<MainPage />} />
            {/* 재고 관리 */}
            <Route path="/stock/*"></Route>
            {/* 판매 제품 관리 */}
            <Route path="/auction/*"></Route>
            {/* 경매 관리  */}
            <Route path="/auction"></Route>
            {/* 상시 판매 관리 */}
            <Route path="/sales/*"></Route>
            {/* 주문 관리 */}
            <Route path="/order/*"></Route>
            {/* 출고 관리 */}
            <Route path="/shipping">
              <Route
                path="/shipping/register"
                element={<ClaimRegisterPage />}
              />
            </Route>
            {/* 기준 관리 */}
            <Route path="/standard"></Route>
            {/* 사용자 관리 */}
            <Route path="/usermanage">
              <Route
                path="/usermanage/register"
                element={<UserRegister />}
              ></Route>
              <Route
                path="/usermanage/usermanage/userpost"
                element={<UserPostPage />}
              ></Route>
              <Route
                path="/usermanage/carriermanage/carrierpost"
                element={<CarrierPostPage />}
              ></Route>
              <Route
                path="/usermanage/clientdestination/destinationpost"
                element={<DestinationPostPage />}
              ></Route>
              <Route
                path="/usermanage/profileedit"
                element={<ProfileEditPage />}
              ></Route>
            </Route>
            {/* 운영 관리 */}
            <Route path="/operate">
              <Route
                path="/operate/faq/faqpost"
                element={<FAQPostPage />}
              ></Route>
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
