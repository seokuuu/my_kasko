import { Route, Routes, createBrowserRouter } from 'react-router-dom'

import CalendarModal from './modal/Calender/Calendar'

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
import UAuctionWinningDetail from './userpages/UserAuction/Winning/WinningDetailPage'
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
import DestinationEditPage from './userpages/UserMyPage/Destination/DestinationEditPage'

import TestPopup from './modal/Common/TestPopup'

import ClaimProductPage from './pages/Operate/Common/Claim/ClaimProductPage'
import OperateClaimRegisterPage from './pages/Operate/Common/Claim/OperateClaimRegisterPage'
import TestExcel from './pages/Test/TestExcel'

import NoticeDetailsPage from './pages/Operate/Common/Notice/NoticeDetailsPage'
import NoticeBoardDetailsPage from './pages/Operate/Exposure/NoticeBoard/NoticeBoardDetailsPage'
import ShipmentInvoicePage from './pages/Shipping/Achievement/ShipmentInvoicePage'
import DisRegisterDetailPage from './pages/Shipping/Dispatch/DisRegisterDetailPage'
import AchievementDetailsPage from './pages/Shipping/Achievement/AchievementDetailsPage'
import StatusPage from './pages/Shipping/Status/StatusPage'
// import StatusPage from './pages/Shipping/Status/StatusPage'
// import ShipmentInvoicePage from './pages/Shipping/Achievement/ShipmentInvoicePage'
// RoundAucProAdd
import { useAtomValue } from 'jotai'
import PrintType from './modal/Multi/PrintType'
import BiddingPackagePage from './pages/Auction/Bidding/BiddingPackagePage'
import WinningDetailPage from './pages/Auction/Winning/WinningDetailPage'
import DuplicateLogin from './pages/DuplicateLogin'
import Forbidden from './pages/Forbidden'
import NotAuth from './pages/NotAuth'
import PopupComponent from './pages/Operate/Exposure/Popup/PopupComponent'
import RequestRecomPage from './pages/Shipping/Request/RequestRecomPage'
import Timeout from './pages/Timeout'
import { authAtom } from './store/Auth/auth'
import NewShipmentInvoicePage from './pages/Shipping/Achievement/NewShipmentInvoicePage'
import UserPerformanceDetailsPage from './userpages/UserPerformance/UserPerformance/UserPerformanceDetailsPage'
import UserInvoicePage from './userpages/UserPerformance/UserPerformance/UserInvoicePage'

const Router = () => {
	const auth = useAtomValue(authAtom)
	return (
		<Routes>
			{/* 테스트 URL */}
			<Route path="/popup2" element={<PopupComponent />} />
			<Route path="/ppap" element={<PrintType />} />

			<Route path="/TransportModal" element={<TransportModal />} />
			<Route path="/popup" element={<TestPopup />} />
			<Route path="/excel" element={<TestExcel />} />
			<Route path="/*" element={<NotFound />} />
			<Route path="/forbidden" element={<Forbidden />} />
			<Route path="/not-auth" element={<NotAuth />} />
			<Route path="/duplicate-login" element={<DuplicateLogin />} />
			<Route path="/time-out" element={<Timeout />} />
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
				<Route path="/auction/biddingsingle" element={<BiddingPage />}></Route>
				<Route path="/auction/biddingpackage" element={<BiddingPackagePage />}></Route>
				<Route path="/auction/progress" element={<ProgressPage />}></Route>
				<Route path="/auction/detailprogress" element={<DetailProgressPage />}></Route>
				<Route path="/auction/winning" element={<WinningPage />}></Route>
				<Route path="/auction/winning/detail" element={<WinningDetailPage />} />
				<Route path="/auction/winningcreate" element={<WinningCreatePage />}></Route>
				<Route path="/auction/startprice" element={<StartPricePage />}></Route>
			</Route>
			{/* 상시 판매 관리 */}
			<Route path="/sales">
				<Route path="/sales/single" element={<SinglePage />}></Route>
				<Route path="/sales/package" element={<PackagePage />}></Route>
				<Route path="/sales/order" element={<SellOrderPage />}></Route>
				<Route path="/sales/order/:id/:status/:packageNumber" element={<SellOrderDetailPage />} />
			</Route>
			{/* 주문 관리 */}
			<Route path="/order" element={<OrderPage />}></Route>
			<Route path="/admin/order/detail" element={<AdminOrderDetailPage />}></Route>
			{/* 출고 관리 */}
			<Route path="/shipping">
				<Route path="/shipping/register" element={<RegisterPage />} />
				<Route path="/shipping/request" element={<RequestPage />} />
				<Route path="/shipping/request/recom" element={<RequestRecomPage />} />
				<Route path="/shipping/dispatch" element={<DispatchPage />} />
				<Route path="/shipping/dispatch/register" element={<DisRegisterPage />} />
				<Route path="/shipping/dispatch/register/:id" element={<DisRegisterDetailPage />} />
				<Route path="/shipping/status" element={<StatusPage />} />
				<Route path="/shipping/status/:id" element={<StatusDetailPage />} />
				<Route path="/shipping/achievement" element={<AchievementPage />} />
				<Route path="/shipping/achievement/:outNumber" element={<AchievementDetailsPage />} />
				{/*<Route path="/shipping/achievement/invoice" element={<ShipmentInvoicePage />} />*/}
				<Route path="/shipping/achievement/invoice" element={<NewShipmentInvoicePage />} />
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
				<Route path="/operate/notice/register" element={<NoticeDetailsPage title={'공지'} isRegister={true} />}></Route>
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

			<Route path="/window">
				<Route path="/window/windowpopup/:id" element={<PopupComponent />} />
			</Route>

			{/* 사용자 페이지 */}
			{/* 공지 & 자료실 */}
			<Route path="/userpage">
				<Route path="/userpage/main" element={<UserMainPage />}></Route>
				<Route path="/userpage/notice" element={<UNotice />}></Route>
				<Route path="/userpage/docs" element={<UDocs />}></Route>
				<Route path="/userpage/docs/:uid" element={<UDocsDetail />}></Route>
				<Route path="/userpage/notice/:uid" element={<UNoticeDetail />}></Route>

				{/* 경매 */}
				<Route path="/userpage/auctionsingle" element={<UAuctionSingle />}></Route>
				<Route path="/userpage/auctionpackage" element={<UAuctionPackage />}></Route>
				<Route path="/userpage/actionstatus" element={<UAuctionStatus />}></Route>
				<Route path="/userpage/auctionwinning" element={<UAuctionWinning />}></Route>
				<Route path="/userpage/auctionwinning/detail" element={<UAuctionWinningDetail />} />

				{/* 상시 판매 */}
				<Route path="/userpage/salessingle" element={<USalesSingle />}></Route>
				<Route path="/userpage/salespackage" element={<USalesPackage />}></Route>
				<Route path="/userpage/salescart/:product?" element={<USalesCart />}></Route>
				<Route path="/userpage/salesorder" element={<USalesOrder />}></Route>
				<Route path="/userpage/salesorder/:salesNumber/:status/:packageNumber" element={<USalesOrder />}></Route>

				{/* 출고 실적 조회 */}
				<Route path="/userpage/performance" element={<UPerformance />}></Route>
				<Route path="/userpage/performance/:outNumber" element={<UserPerformanceDetailsPage />} />
				<Route path="/userpage/performance/invoice" element={<UserInvoicePage />} />

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
	)
}
export const router = createBrowserRouter([{ path: '*', Component: Router }])

export default Router
