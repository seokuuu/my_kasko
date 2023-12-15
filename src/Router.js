import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/User/Login/Login'
import SignUp from './pages/User/SignUp/SignUp'
import FindId from './pages/User/FindId/FindId'
import Test from './pages/Test/Test'
import Test2 from './pages/Test/Test2'
import ReissuePw from './pages/User/ReissuePw/ReissuePw'
import CalendarModal from './modal/Calender/Calendar'
import Test3 from './pages/Test/Test3'
import Test4 from './pages/Test/Test4'

import ClaimRegisterPage from './pages/Shipping/Claim/ClaimRegisterPage'
import CarrierPostPage from './pages/UserManage/CarrierManage/CarrierPostPage'
import CarrierEditPage from './pages/UserManage/CarrierManage/CarrierEditPage'

import IncomingPage from './pages/Stock/Incoming/IncomingPage'
import InventoryPage from './pages/Stock/Inventory/InventoryPage'
import TransportModal from './modal/Multi/Transport'
import InventoryPayPage from './pages/Operate/Operation/Inventory/InventoryPage'

import { headerAtom, accordionAtom, subHeaderAtom } from './store/Layout/Layout'
import NotFound from './pages/NotFound'

import { styled } from 'styled-components'
import MainPage from './pages/Main/MainPage'

import RoundPage from './pages/Auction/Round/RoundPage'
import BiddingPage from './pages/Auction/Bidding/BiddingPage'
import DetailProgressPage from './pages/Auction/DetailProgress/DetailProgressPage'
import ProgressPage from './pages/Auction/Progress/ProgressPage'
import StartPricePage from './pages/Auction/StartPrice/StartPricePage'
import WinningPage from './pages/Auction/Winning/WinningPage'
import WinningCreatePage from './pages/Auction/Winning/WinningCreatePage'

import OrderPage from './pages/Order/OrderPage'
import OrderDetailPage from './pages/Order/OrderDetailPage'

// 출고 관리
import RegisterPage from './pages/Shipping/Register/RegisterPage'
import RequestPage from './pages/Shipping/Request/RequestPage'
import DispatchPage from './pages/Shipping/Dispatch/DispatchPage'
import DisRegisterPage from './pages/Shipping/Dispatch/DisRegisterPage'
import DisRegisterDetailPage from './pages/Shipping/Dispatch/DisRegisterDetailPage'
import StatusPage from './pages/Shipping/Status/StatusPage'
import StatusDetailPage from './pages/Shipping/Status/StatusDetailPage'
import AchievementPage from './pages/Shipping/Achievement/AchievementPage'

// 판매 제품 관리
import SingleProductPage from './pages/Product/SingleProduct/SingleProductPage'
import PackageManagePage from './pages/Product/PackageManage/PackageManagePage'
import RecommendPage from './pages/Product/Recommend/RecommendPage'
import RecommendPackPage from './pages/Product/Recommend/RecommendPackPage'
import PronoPage from './pages/Product/Prono/PronoPage'
import HyundaiPage from './pages/Product/SingleProduct/HyundaiPage'
import SalesProductPage from './pages/Product/SingleProduct/SalesProductPage'
import PackageCreatePage from './pages/Product/PackageManage/PackageCreatePage'

// 상시 판매 관리
import SinglePage from './pages/Sales/Single/SinglePage'
import PackagePage from './pages/Sales/Package/PackagePage'
import SellOrderPage from './pages/Sales/SellOrder/SellOrderPage'
import SellOrderDetailPage from './pages/Sales/SellOrder/SellOrderDetailPage'

// 기준 관리
import DestinationPage from './pages/Standard/Destination/DestinationPage'
import TransportPage from './pages/Standard/Transport/TransportPage'
import SurchargePage from './pages/Standard/Surcharge/SurchargePage'
import ConsolidationPage from './pages/Standard/Consolidation/ConsolidationPage'

// 사용자 관리
import ClientPage from './pages/UserManage/Client/ClientPage'
import ClientDestiantionPage from './pages/UserManage/ClientDestination/ClientDestinationPage'
import UserManagePage from './pages/UserManage/UserManage/UserManagePage'
import CarrierManagePage from './pages/UserManage/CarrierManage/CarrierManagePage'

import ProfileEditPage from './pages/UserManage/ProfileEdit/ProfileEditPage'

import DestinationPostPage from './pages/UserManage/ClientDestination/DestinationPostPage'
import UserPostPage from './pages/UserManage/UserManage/UserPostPage'
import UserEditPage from './pages/UserManage/UserManage/UserEditPage'

// 운영 관리
import OperationPage from './pages/Operate/Operation/Operation/OperationPage'
import InventoryOperPage from './pages/Operate/Operation/Inventory/InventoryPage'

//운영 관리 - 노출 관리
import PopupPage from './pages/Operate/Exposure/Popup/PopupPage'
import NoticeBoardPage from './pages/Operate/Exposure/NoticeBoard/NoticeBoardPage'
import PopupPostPage from './pages/Operate/Exposure/Popup/PopupPostPage'

//운영 관리 - 일반 관리
import ClaimPage from './pages/Operate/Common/Claim/ClaimPage'
import FAQPage from './pages/Operate/Common/FAQ/FAQPage'
import FAQPostPage from './pages/Operate/Common/FAQ/FAQPostPage'
import NoticePage from './pages/Operate/Common/Notice/NoticePage'
import DataSheetPage from './pages/Operate/Common/Datasheet/DatasheetPage'

// 이용약관, 푸터
import TermsPage from './pages/Operate/Terms/TermsPage'
import FooterManagePage from './pages/Operate/FooterManage/FooterManagePage'

/// 사용자 페이지
// 공지  & 자료실
import UNotice from './userpages/UserNotiDocs/Notice/NoticePage'
import UDocs from './userpages/UserNotiDocs/Docs/DocsPage'

// 경매
import UAuctionSingle from './userpages/UserAuction/Single/SinglePage'
import UAuctionPackage from './userpages/UserAuction/Package/PackagePage'
import UAuctionStatus from './userpages/UserAuction/Status/StatusPage'
import UAuctionWinning from './userpages/UserAuction/Winning/WinningPage'

// 상시 판매
import USalesSingle from './userpages/UserSales/Single/SinglePage'
import USalesPackage from './userpages/UserSales/Package/PackagePage'
import USalesCart from './userpages/UserSales/Cart/CartPage'
import USalesOrder from './userpages/UserSales/Order/OrderPage'

// 출고 실적 조회
import UPerformance from './userpages/UserPerformance/UserPerformance/UserPerformancePage'

// 마이페이지
// import UUserManage from './userpages/UserMyPage/UserManage/UserManagePage'
import UProfile from './userpages/UserMyPage/Profile/ProfilePage'
import UDestination from './userpages/UserMyPage/Destination/DestinationPage'
import UPrefer from './userpages/UserMyPage/Prefer/PreferPage'

// 고객센터
import UFAQ from './userpages/UserCustomer/FAQ/FAQPage'
import UTerms from './userpages/UserCustomer/Terms/TermsPage'

//사용자 메인페이지
import UserMainPage from './userpages/MainPage'
import ClaimRegister from './pages/Shipping/Claim/ClaimRegister'

// test
import Inventory from './modal/Multi/SalesCategoryChange'
import SalesProduct from './modal/Multi/SalesProduct'
import SalesCategoryChange from './modal/Multi/SalesCategoryChange'
import PackageManage from './modal/Multi/PackageManage'
import AuctionRound from './modal/Multi/AuctionRound'
import SalesPackage from './modal/Multi/SalesPackage'
import DispatchPost from './modal/Multi/DispatchPost'
import DispatchEdit from './modal/Multi/DispatchEdit'
import Hyundai from './modal/Multi/Hyundai'
import AchievementModal from './modal/Multi/Achievement'
import DispatchDetail from './modal/Multi/DispatchDetail'
import Transport from './modal/Multi/Transport'
import Consolidation from './modal/Multi/Consolidation'
import Client from './modal/Multi/Client'
import Countdown from './components/Countdown/Countdown'
import DestinationPost from './userpages/UserMyPage/Destination/DestinationPost'
import DestinationEdit from './userpages/UserMyPage/Destination/DestinationEdit'
import DestinationEditPage from './userpages/UserMyPage/Destination/DestinationEditPage'

import TestPopup from './modal/Common/TestPopup'
import PopupTest from './modal/Alert/PopupTest'

import Upload from './modal/Upload/Upload'
import TestExcel from './pages/Test/TestExcel'
import TableModal from './modal/Table/TableModal'
import TableTest from './modal/Table/TableTest'
import SellOrderDetail from './pages/Sales/SellOrder/SellOrderDetail'
import NoticePopup from './modal/Multi/NoticePopup'
import WinningCreate from './pages/Auction/Winning/WinningCreate'
import RoundAucListEdit from './pages/Auction/Round/RoundAucListEdit'
import BlueBar from './modal/BlueBar/BlueBar'
import DefaultBlueBar from './modal/Multi/DefaultBlueBar'

import RoundAucListPackEdit from './pages/Auction/Round/RoundAucListPackEdit'
import TableGrid from './modal/Multi/TableGrid'
import DestinationChange from './modal/Multi/DestinationChange'
import CustomerFind from './modal/Multi/CustomerFind'
import RoundAucProAdd from './pages/Auction/Round/RoundAucProAdd'
import WinningProductAdd from './pages/Auction/Winning/WinningProductAdd'
import Table2 from './pages/Table/Table2'
import WeightSales from './modal/Multi/WeightSales'
import RequestRecom from './pages/Shipping/Request/RequestRecom'
import RequestAddModal from './pages/Shipping/Request/RequestAddModal'
import TransportationCost from './modal/Multi/TransportationCost'
import PackDetail from './pages/Auction/Bidding/PackDetail'
import SalesPackDetail from './pages/Sales/Package/PackDetail'
import WinningDetail from './pages/Auction/Winning/WinningDetail'
import WinDepositForm from './pages/Auction/Winning/WinDepositForm'
import FormTest from './pages/Auction/Winning/FormTest'
import UserPackDetail from './userpages/UserSales/Package/UserPackDetail'
import NoticeDetail from './userpages/UserNotiDocs/Notice/NoticeDetail'
import Agreement from './modal/Common/Agreement'
import InvoiceEdit from './pages/Shipping/Achievement/InvoiceEdit'
import Invoice from './userpages/UserPerformance/UserPerformance/Invoice'
import UserEdit from './pages/UserManage/UserManage/UserEdit'

// RoundAucProAdd
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 테스트 URL */}
        <Route path="/ppapp" element={<UserEditPage />} />
        <Route path="/ppap" element={<DefaultBlueBar />} />
        <Route path="/TableTest" element={<TableTest />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/TransportModal" element={<TransportModal />} />
        <Route path="/test4" element={<Countdown />} />
        <Route path="/popup" element={<TestPopup />} />
        <Route path="/excel" element={<TestExcel />} />
        <Route path="/common" element={<SellOrderDetailPage />} />
        <Route path="/*" element={<NotFound />} />
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
          <Route path="/product/hyundai" element={<HyundaiPage />}></Route>
          <Route path="/product/salesproduct" element={<SalesProductPage />}></Route>
          <Route path="/product/package" element={<PackageManagePage />}></Route>
          <Route path="/product/packagecreate" element={<PackageCreatePage />}></Route>
          <Route path="/product/packageedit" element={<PackageCreatePage />}></Route>
          <Route path="/product/recommend" element={<RecommendPage />}></Route>
          <Route path="/product/recommendpkg" element={<RecommendPackPage />}></Route>
          <Route path="/product/prono" element={<PronoPage />}></Route>
        </Route>
        {/* 경매 관리  */}
        <Route path="/auction">
          <Route path="/auction/round" element={<RoundPage />}></Route>
          <Route path="/auction/bidding" element={<BiddingPage />}></Route>
          <Route path="/auction/progress" element={<ProgressPage />}></Route>
          <Route path="/auction/detailprogress" element={<DetailProgressPage />}></Route>
          <Route path="/auction/winning" element={<WinningPage />}></Route>
          <Route path="/auction/winningcreate" element={<WinningCreatePage />}></Route>
          <Route path="/auction/startprice" element={<StartPricePage />}></Route>
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
          <Route path="/shipping/dispatch/register" element={<DisRegisterPage />} />
          <Route path="/shipping/status" element={<StatusDetailPage />} />
          <Route path="/shipping/achievement" element={<AchievementPage />} />
          <Route path="/shipping/claim/register" element={<ClaimRegisterPage />} />
        </Route>
        {/* 기준 관리 */}
        <Route path="/standard">
          <Route path="/standard/destination" element={<DestinationPage />} />
          <Route path="/standard/transportation" element={<TransportPage />} />
          <Route path="/standard/surcharge" element={<SurchargePage />} />
          <Route path="/standard/consolidation" element={<ConsolidationPage />} />
        </Route>
        {/* 사용자 관리 */}
        <Route path="/usermanage">
          {/* 사용자 관리 - 사용자 등록 버튼 - 사용자 등록 */}
          <Route path="/usermanage/usermanage/userpost" element={<UserPostPage />}></Route>
          <Route path="/usermanage/usermanage/useredit" element={<UserEditPage />}></Route>

          {/* 고객사 목적지 관리 - 버튼 - 고객사 목적지 등록 */}
          <Route path="/usermanage/clientdestination/destinationpost" element={<DestinationPostPage />}></Route>
          {/* 운송사 관리 - 운송사 등록 */}
          <Route path="/usermanage/carrierpost" element={<CarrierPostPage />}></Route>
          <Route path="/usermanage/carrieredit" element={<CarrierEditPage />}></Route>
          <Route path="/usermanage/client" element={<ClientPage />}></Route>
          <Route path="/usermanage/clientdestination" element={<ClientDestiantionPage />}></Route>
          <Route path="/usermanage/usermanage" element={<UserManagePage />}></Route>
          <Route path="/usermanage/carriermanage" element={<CarrierManagePage />}></Route>

          {/* 개인정보 수정 완 */}
          <Route path="/usermanage/profileedit" element={<ProfileEditPage />}></Route>
        </Route>
        {/* 운영 관리 */}
        <Route path="/operate">
          <Route path="/operate/operation" element={<OperationPage />}></Route>
          <Route path="/operate/inventory" element={<InventoryOperPage />}></Route>
          <Route path="/operate/common" element={<ClaimPage />}></Route>
          <Route path="/operate/exposure" element={<PopupPage />}></Route>
          <Route path="/operate/popuppost" element={<PopupPostPage />}></Route>
          <Route path="/operate/faq" element={<FAQPage />}></Route>
          <Route path="/operate/noticeboard" element={<NoticeBoardPage />}></Route>
          <Route path="/operate/notice" element={<NoticePage />}></Route>
          <Route path="/operate/datasheet" element={<DataSheetPage />}></Route>
          <Route path="/operate/terms" element={<TermsPage />}></Route>
          <Route path="/operate/footer" element={<FooterManagePage />}></Route>

          <Route path="/operate/faq/faqpost" element={<FAQPostPage />}></Route>
        </Route>
        {/* 사용자 페이지 */}
        {/* 사용자 페이지는 관리자 페이지와 다르게 /userpage/* 로 단일 구성된다 */}
        <Route path="/userpage/main" element={<UserMainPage />}></Route>
        {/* 공지 & 자료실 */}
        <Route path="/userpage">
          <Route path="/userpage/notice" element={<UNotice />}></Route>
          <Route path="/userpage/docs" element={<UDocs />}></Route>

          {/* 경매 */}
          <Route path="/userpage/actionsingle" element={<UAuctionSingle />}></Route>
          <Route path="/userpage/auctionpackage" element={<UAuctionPackage />}></Route>
          <Route path="/userpage/actionstatus" element={<UAuctionStatus />}></Route>
          <Route path="/userpage/auctionwinning" element={<UAuctionWinning />}></Route>

          {/* 상시 판매 */}
          <Route path="/userpage/salessingle" element={<USalesSingle />}></Route>
          <Route path="/userpage/salespackage" element={<USalesPackage />}></Route>
          <Route path="/userpage/salescart" element={<USalesCart />}></Route>
          <Route path="/userpage/salesorder" element={<USalesOrder />}></Route>

          {/* 출고 실적 조회 */}
          <Route path="/userpage/performance" element={<UPerformance />}></Route>

          {/* 마이 페이지 */}
          {/* <Route path="/userpage/usermanage" element={<UUserManage />}></Route> */}
          <Route path="/userpage/userprofile" element={<UProfile />}></Route>
          <Route path="/userpage/userdestination" element={<UDestination />}></Route>
          <Route path="/userpage/userdestination/:id" element={<DestinationEditPage />} />
          <Route path="/userpage/userprefer" element={<UPrefer />}></Route>

          {/* 고객 센터 */}
          <Route path="/userpage/userfaq" element={<UFAQ />}></Route>
          <Route path="/userpage/userterms" element={<UTerms />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
