import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/User/Login/Login';
import SignUp from './pages/User/SignUp/SignUp';
import FindId from './pages/User/FindId/FindId';
import Test from './pages/Test/Test';
import Test2 from './pages/Test/Test2';
import ReissuePw from './pages/User/ReissuePw/ReissuePw';
import CalendarModal from './modal/Calender/Calendar';
import Test3 from './pages/Test/Test3';
import Test4 from './pages/Test/Test4';

import ClaimRegisterPage from './pages/Shipping/Claim/ClaimRegisterPage';
import CarrierPostPage from './pages/UserManage/CarrierManage/CarrierPostPage';
import FAQPostPage from './pages/Operate/FAQ/FAQPostPage';

import IncomingPage from './pages/Stock/Incoming/IncomingPage';
import InventoryPage from './pages/Stock/Inventory/InventoryPage';

import {
  headerAtom,
  accordionAtom,
  subHeaderAtom,
} from './store/Layout/Layout';
import NotFound from './pages/NotFound';

import { styled } from 'styled-components';
import MainPage from './pages/Main/MainPage';

import RoundPage from './pages/Auction/Round/RoundPage';
import BiddingPage from './pages/Auction/Bidding/BiddingPage';
import DetailProgressPage from './pages/Auction/DetailProgress/DetailProgressPage';
import ProgressPage from './pages/Auction/Progress/ProgressPage';
import StartPricePage from './pages/Auction/StartPrice/StartPricePage';
import WinningPage from './pages/Auction/Winning/WinningPage';

import OrderPage from './pages/Order/OrderPage';

// 출고 관리
import RegisterPage from './pages/Shipping/Register/RegisterPage';
import RequestPage from './pages/Shipping/Request/RequestPage';
import DispatchPage from './pages/Shipping/Dispatch/DispatchPage';
import DisRegisterPage from './pages/Shipping/Dispatch/DisRegisterPage';
import StatusPage from './pages/Shipping/Status/StatusPage';
import Achievement from './pages/Shipping/Achievement/AchievementPage';

// 판매 제품 관리
import SingleProductPage from './pages/Product/SingleProduct/SingleProductPage';
import PackageManagePage from './pages/Product/PackageManage/PackageManagePage';
import RecommendPage from './pages/Product/Recommend/RecommendPage';
import PronoPage from './pages/Product/Prono/PronoPage';

// 상시 판매 관리
import SinglePage from './pages/Sales/Single/SinglePage';
import PackagePage from './pages/Sales/Package/PackagePage';
import SellOrderPage from './pages/Sales/SellOrder/SellOrderPage';

// 기준 관리
import DestinationPage from './pages/Standard/Destination/DestinationPage';
import TransportPage from './pages/Standard/Transport/TransportPage';
import ConsolidationPage from './pages/Standard/Consolidation/ConsolidationPage';

// 사용자 관리
import ClientPage from './pages/UserManage/Client/ClientPage';
import ClientDestiantionPage from './pages/UserManage/ClientDestination/ClientDestinationPage';
import UserManagePage from './pages/UserManage/UserManage/UserManagePage';
import CarrierManagePage from './pages/UserManage/CarrierManage/CarrierManagePage';

import ProfileEditPage from './pages/UserManage/ProfileEdit/ProfileEditPage';

import DestinationPostPage from './pages/UserManage/ClientDestination/DestinationPostPage';
import UserPostPage from './pages/UserManage/UserManage/UserPostPage';

// 운영 관리
import OperationPage from './pages/Operate/Operation/OperationPage';
import InventoryOperPage from './pages/Operate/Inventory/InventoryPage';
import ClaimPage from './pages/Operate/Claim/ClaimPage';
import PopupPage from './pages/Operate/Popup/PopupPage';
import FAQPage from './pages/Operate/FAQ/FAQPage';
import NoticeBoardPage from './pages/Operate/NoticeBoard/NoticeBoardPage';
import NoticePage from './pages/Operate/Notice/NoticePage';
import DataSheetPage from './pages/Operate/Datasheet/DatasheetPage';
import TermsPage from './pages/Operate/Terms/TermsPage';
import FooterManagePage from './pages/Operate/FooterManage/FooterManagePage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 테스트 URL */}
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
        {/* 로그인, 회원가입, 아이디 찾기, 비밀번호 재발급, 캘린더, 메인 */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/reissuepw" element={<ReissuePw />} />
        <Route path="/calander" element={<CalendarModal />} />
        <Route path="/main" element={<MainPage />} />
        {/* 재고 관리 */}
        <Route path="/stock">
          <Route path="/stock/incoming" element={<IncomingPage />} />
          <Route path="/stock/inventory" element={<InventoryPage />} />
        </Route>
        {/* 판매 제품 관리 */}
        <Route path="/product/">
          <Route path="/product/single" element={<SingleProductPage />}></Route>
          <Route
            path="/product/package"
            element={<PackageManagePage />}
          ></Route>
          <Route path="/product/recommend" element={<RecommendPage />}></Route>
          <Route path="/product/prono" element={<PronoPage />}></Route>
        </Route>
        {/* 경매 관리  */}
        <Route path="/auction">
          <Route path="/auction/round" element={<RoundPage />}></Route>
          <Route path="/auction/bidding" element={<BiddingPage />}></Route>
          <Route path="/auction/progress" element={<ProgressPage />}></Route>
          <Route
            path="/auction/detailprogress"
            element={<DetailProgressPage />}
          ></Route>
          <Route path="/auction/winning" element={<WinningPage />}></Route>
          <Route
            path="/auction/startprice"
            element={<StartPricePage />}
          ></Route>
        </Route>
        {/* 상시 판매 관리 */}
        <Route path="/sales">
          <Route path="/sales/single" element={<SinglePage />}></Route>
          <Route path="/sales/package" element={<PackagePage />}></Route>
          <Route path="/sales/order" element={<SellOrderPage />}></Route>
        </Route>
        {/* 주문 관리 */}
        <Route path="/order" element={<OrderPage />}></Route>
        {/* 출고 관리 */}
        <Route path="/shipping">
          <Route path="/shipping/register" element={<RegisterPage />} />
          <Route path="/shipping/request" element={<RequestPage />} />
          <Route path="/shipping/dispatch" element={<DispatchPage />} />
          <Route
            path="/shipping/dispatch/register"
            element={<DisRegisterPage />}
          />
          <Route path="/shipping/status" element={<StatusPage />} />
          <Route path="/shipping/achievement" element={<Achievement />} />
          <Route
            path="/shipping/claim/register"
            element={<ClaimRegisterPage />}
          />
        </Route>
        {/* 기준 관리 */}
        <Route path="/standard">
          <Route path="/standard/destination" element={<DestinationPage />} />
          <Route path="/standard/transportation" element={<TransportPage />} />
          <Route
            path="/standard/consolidation"
            element={<ConsolidationPage />}
          />
        </Route>
        {/* 사용자 관리 */}
        <Route path="/usermanage">
          {/* 사용자 관리 - 사용자 등록 버튼 - 사용자 등록 */}
          <Route
            path="/usermanage/usermanage/userpost"
            element={<UserPostPage />}
          ></Route>
          {/* 고객사 목적지 관리 - 버튼 - 고객사 목적지 등록 */}
          <Route
            path="/usermanage/clientdestination/destinationpost"
            element={<DestinationPostPage />}
          ></Route>
          {/* 운송사 관리 - 운송사 등록 */}
          <Route
            path="/usermanage/carrierpost"
            element={<CarrierPostPage />}
          ></Route>
          <Route path="/usermanage/client" element={<ClientPage />}></Route>
          <Route
            path="/usermanage/clientdestination"
            element={<ClientDestiantionPage />}
          ></Route>
          <Route
            path="/usermanage/usermanage"
            element={<UserManagePage />}
          ></Route>
          <Route
            path="/usermanage/carriermanage"
            element={<CarrierManagePage />}
          ></Route>

          {/* 개인정보 수정 완 */}
          <Route
            path="/usermanage/profileedit"
            element={<ProfileEditPage />}
          ></Route>
        </Route>
        {/* 운영 관리 */}
        <Route path="/operate">
          <Route path="/operate/operation" element={<OperationPage />}></Route>
          <Route
            path="/operate/inventory"
            element={<InventoryOperPage />}
          ></Route>
          <Route path="/operate/claim" element={<ClaimPage />}></Route>
          <Route path="/operate/popup" element={<PopupPage />}></Route>
          <Route path="/operate/faq" element={<FAQPage />}></Route>
          <Route
            path="/operate/noticeboard"
            element={<NoticeBoardPage />}
          ></Route>
          <Route path="/operate/notice" element={<NoticePage />}></Route>
          <Route path="/operate/datasheet" element={<DataSheetPage />}></Route>
          <Route path="/operate/terms" element={<TermsPage />}></Route>
          <Route path="/operate/footer" element={<FooterManagePage />}></Route>

          <Route path="/operate/faq/faqpost" element={<FAQPostPage />}></Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
