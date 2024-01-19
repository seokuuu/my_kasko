import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CalendarModal from './modal/Calender/Calendar'
import Test from './pages/Test/Test'
import Test2 from './pages/Test/Test2'
import Test3 from './pages/Test/Test3'
import FindId from './pages/User/FindId/FindId'
import Login from './pages/User/Login/Login'
import ReissuePw from './pages/User/ReissuePw/ReissuePw'
import SignUp from './pages/User/SignUp/SignUp'

import ClaimRegisterPage from './pages/Shipping/Claim/ClaimRegisterPage'
import CarrierEditPage from './pages/UserManage/CarrierManage/CarrierEditPage'
import CarrierPostPage from './pages/UserManage/CarrierManage/CarrierPostPage'

import TransportModal from './modal/Multi/Transport'
import IncomingPage from './pages/Stock/Incoming/IncomingPage'
import InventoryPage from './pages/Stock/Inventory/InventoryPage'

import NotFound from './pages/NotFound'

import MainPage from './pages/Main/MainPage'

import BiddingPage from './pages/Auction/Bidding/BiddingPage'
import DetailProgressPage from './pages/Auction/DetailProgress/DetailProgressPage'
import ProgressPage from './pages/Auction/Progress/ProgressPage'
import RoundPage from './pages/Auction/Round/RoundPage'
import StartPricePage from './pages/Auction/StartPrice/StartPricePage'
import WinningCreatePage from './pages/Auction/Winning/WinningCreatePage'
import WinningPage from './pages/Auction/Winning/WinningPage'

import AdminOrderDetailPage from './pages/Order/AdminOrderDetailPage'
import OrderPage from './pages/Order/OrderPage'

// 출고 관리
import AchievementPage from './pages/Shipping/Achievement/AchievementPage'
import DisRegisterPage from './pages/Shipping/Dispatch/DisRegisterPage'
import DispatchPage from './pages/Shipping/Dispatch/DispatchPage'
import RegisterPage from './pages/Shipping/Register/RegisterPage'
import RequestPage from './pages/Shipping/Request/RequestPage'
import StatusDetailPage from './pages/Shipping/Status/StatusDetailPage'

// 판매 제품 관리
import PackageCreatePage from './pages/Product/PackageManage/PackageCreatePage'
import PackageManagePage from './pages/Product/PackageManage/PackageManagePage'
import PronoPage from './pages/Product/Prono/PronoPage'
import RecommendPackPage from './pages/Product/Recommend/RecommendPackPage'
import RecommendPage from './pages/Product/Recommend/RecommendPage'
import HyundaiPage from './pages/Product/SingleProduct/HyundaiPage'
import SalesProductPage from './pages/Product/SingleProduct/SalesProductPage'
import SingleProductPage from './pages/Product/SingleProduct/SingleProductPage'

// 상시 판매 관리
import PackagePage from './pages/Sales/Package/PackagePage'
import SellOrderDetailPage from './pages/Sales/SellOrder/SellOrderDetailPage'
import SellOrderPage from './pages/Sales/SellOrder/SellOrderPage'
import SinglePage from './pages/Sales/Single/SinglePage'

// 기준 관리
import ConsolidationPage from './pages/Standard/Consolidation/ConsolidationPage'
import DestinationPage from './pages/Standard/Destination/DestinationPage'
import SurchargePage from './pages/Standard/Surcharge/SurchargePage'
import TransportPage from './pages/Standard/Transport/TransportPage'

// 사용자 관리
import CarrierManagePage from './pages/UserManage/CarrierManage/CarrierManagePage'
import ClientPage from './pages/UserManage/Client/ClientPage'
import ClientDestiantionPage from './pages/UserManage/ClientDestination/ClientDestinationPage'
import UserManagePage from './pages/UserManage/UserManage/UserManagePage'

import ProfileEditPage from './pages/UserManage/ProfileEdit/ProfileEditPage'

import DestinationPostPage from './pages/UserManage/ClientDestination/DestinationPostPage'
import UserEditPage from './pages/UserManage/UserManage/UserEditPage'
import UserPostPage from './pages/UserManage/UserManage/UserPostPage'

// 운영 관리
import InventoryOperPage from './pages/Operate/Operation/Inventory/InventoryPage'
import OperationPage from './pages/Operate/Operation/Operation/OperationPage'

//운영 관리 - 노출 관리
import NoticeBoardPage from './pages/Operate/Exposure/NoticeBoard/NoticeBoardPage'
import PopupPage from './pages/Operate/Exposure/Popup/PopupPage'
import PopupPostPage from './pages/Operate/Exposure/Popup/PopupPostPage'

//운영 관리 - 일반 관리
import ClaimPage from './pages/Operate/Common/Claim/ClaimPage'
import FAQPage from './pages/Operate/Common/FAQ/FAQPage'
import FAQPostPage from './pages/Operate/Common/FAQ/FAQPostPage'
import NoticePage from './pages/Operate/Common/Notice/NoticePage'

// 이용약관, 푸터
import FooterManagePage from './pages/Operate/FooterManage/FooterManagePage'
import TermsPage from './pages/Operate/Terms/TermsPage'

/// 사용자 페이지
// 공지  & 자료실
import UDocsDetail from './userpages/UserNotiDocs/Docs/DocsDetail'
import UDocs from './userpages/UserNotiDocs/Docs/DocsPage'
import UNoticeDetail from './userpages/UserNotiDocs/Notice/NoticeDetail'
import UNotice from './userpages/UserNotiDocs/Notice/NoticePage'

// 경매
import UAuctionPackage from './userpages/UserAuction/Package/PackagePage'
import UAuctionSingle from './userpages/UserAuction/Single/SinglePage'
import UAuctionStatus from './userpages/UserAuction/Status/StatusPage'
import UAuctionWinning from './userpages/UserAuction/Winning/WinningPage'

// 상시 판매
import USalesCart from './userpages/UserSales/Cart/CartPage'
import USalesOrder from './userpages/UserSales/Order/OrderPage'
import USalesPackage from './userpages/UserSales/Package/PackagePage'
import USalesSingle from './userpages/UserSales/Single/SinglePage'

// 출고 실적 조회
import UPerformance from './userpages/UserPerformance/UserPerformance/UserPerformancePage'

// 마이페이지
// import UUserManage from './userpages/UserMyPage/UserManage/UserManagePage'
import UDestination from './userpages/UserMyPage/Destination/DestinationPage'
import UPrefer from './userpages/UserMyPage/Prefer/PreferPage'
import UProfile from './userpages/UserMyPage/Profile/ProfilePage'

// 고객센터
import UFAQDetail from './userpages/UserCustomer/FAQ/FAQDetail'
import UFAQ from './userpages/UserCustomer/FAQ/FAQPage'
import UTerms from './userpages/UserCustomer/Terms/TermsPage'

//사용자 메인페이지
import UserMainPage from './userpages/MainPage'

// test
import Countdown from './components/Countdown/Countdown'
import DestinationEditPage from './userpages/UserMyPage/Destination/DestinationEditPage'

import TestPopup from './modal/Common/TestPopup'

import DefaultBlueBar from './modal/Multi/DefaultBlueBar'

import TableTest from './modal/Table/TableTest'
import ClaimProductPage from './pages/Operate/Common/Claim/ClaimProductPage'
import OperateClaimRegisterPage from './pages/Operate/Common/Claim/OperateClaimRegisterPage'
import TestExcel from './pages/Test/TestExcel'

import WinningCreate from './pages/Auction/Winning/WinningCreate'
import NoticeDetailsPage from './pages/Operate/Common/Notice/NoticeDetailsPage'
import NoticeBoardDetailsPage from './pages/Operate/Exposure/NoticeBoard/NoticeBoardDetailsPage'
import StatusPage from './pages/Shipping/Status/StatusPage'
import ShipmentInvoicePage from './pages/Shipping/Achievement/ShipmentInvoicePage'
// RoundAucProAdd
const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* 테스트 URL */}
				<Route path="/ppapp" element={<WinningCreate />} />
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
					<Route path="/product/packageedit/:id" element={<PackageCreatePage />}></Route>
					<Route path="/product/recommend" element={<RecommendPage />}></Route>
					<Route path="/product/recommendpkg" element={<RecommendPackPage />}></Route>
					<Route path="/product/prono" element={<PronoPage />}></Route>
					{/* <Route path="/product/packageUpdate/:id" element={<PronoPage />}></Route> */}
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
				<Route path="/admin/order/detail" element={<AdminOrderDetailPage />}></Route>
				{/* 출고 관리 */}
				<Route path="/shipping">
					<Route path="/shipping/register" element={<RegisterPage />} />
					<Route path="/shipping/request" element={<RequestPage />} />
					<Route path="/shipping/dispatch" element={<DispatchPage />} />
					<Route path="/shipping/dispatch/register" element={<DisRegisterPage />} />
					<Route path="/shipping/status" element={<StatusPage />} />
					<Route path="/shipping/status/:id" element={<StatusDetailPage />} />
					<Route path="/shipping/achievement" element={<AchievementPage />} />
					<Route path="/shipping/achievement/invoice" element={<ShipmentInvoicePage />} />
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
					<Route path="/operate/common/product" element={<ClaimProductPage />}></Route>
					<Route
						path="/operate/common/product/register"
						element={<OperateClaimRegisterPage pageType="register" />}
					></Route>
					<Route path="/operate/common/product/:id" element={<OperateClaimRegisterPage pageType="detail" />}></Route>

					<Route path="/operate/exposure" element={<PopupPage />}></Route>
					<Route path="/operate/exposure/register" element={<PopupPostPage isRegister={true} />}></Route>
					<Route path="/operate/exposure/:id" element={<PopupPostPage isRegister={false} />}></Route>

					<Route path="/operate/popuppost" element={<PopupPostPage />}></Route>
					<Route path="/operate/faq" element={<FAQPage />}></Route>
					<Route path="/operate/noticeboard" element={<NoticeBoardPage />}></Route>
					<Route path="/operate/noticeboard/register" element={<NoticeBoardDetailsPage />}></Route>
					<Route path="/operate/noticeboard/:id" element={<NoticeBoardDetailsPage />}></Route>

					<Route path="/operate/notice" element={<NoticePage title={'공지사항'} detailsUrl={'notice'} />}></Route>
					<Route
						path="/operate/notice/register"
						element={<NoticeDetailsPage title={'공지'} isRegister={true} />}
					></Route>
					<Route path="/operate/notice/:id" element={<NoticeDetailsPage title={'공지'} isRegister={false} />}></Route>

					<Route path="/operate/datasheet" element={<NoticePage title={'자료실'} detailsUrl={'datasheet'} />}></Route>
					<Route
						path="/operate/datasheet/register"
						element={<NoticeDetailsPage title={'자료실'} isRegister={true} />}
					></Route>
					<Route
						path="/operate/datasheet/:id"
						element={<NoticeDetailsPage title={'자료실'} isRegister={false} />}
					></Route>
					<Route path="/operate/terms" element={<TermsPage />}></Route>
					<Route path="/operate/footer" element={<FooterManagePage />}></Route>

					<Route path="/operate/faq/faqpost" element={<FAQPostPage />}></Route>
					<Route path="/operate/faq/:id" element={<FAQPostPage />}></Route>
				</Route>
				{/* 사용자 페이지 */}
				{/* 사용자 페이지는 관리자 페이지와 다르게 /userpage/* 로 단일 구성된다 */}
				<Route path="/userpage/main" element={<UserMainPage />}></Route>
				{/* 공지 & 자료실 */}
				<Route path="/userpage">
					<Route path="/userpage/notice" element={<UNotice />}></Route>
					<Route path="/userpage/docs" element={<UDocs />}></Route>
					<Route path="/userpage/docs/:uid" element={<UDocsDetail />}></Route>
					<Route path="/userpage/notice/:uid" element={<UNoticeDetail />}></Route>

					{/* 경매 */}
					<Route path="/userpage/actionsingle" element={<UAuctionSingle />}></Route>
					<Route path="/userpage/auctionpackage" element={<UAuctionPackage />}></Route>
					<Route path="/userpage/actionstatus" element={<UAuctionStatus />}></Route>
					<Route path="/userpage/auctionwinning" element={<UAuctionWinning />}></Route>

					{/* 상시 판매 */}
					<Route path="/userpage/salessingle" element={<USalesSingle />}></Route>
					<Route path="/userpage/salespackage" element={<USalesPackage />}></Route>
					<Route path="/userpage/salescart" element={<USalesCart />}></Route>
					<Route path="/userpage/salesorder/:salesNumber?" element={<USalesOrder />}></Route>

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
					<Route path="/userpage/userfaq/:faqUid" element={<UFAQDetail />}></Route>
					<Route path="/userpage/userterms" element={<UTerms />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Router
