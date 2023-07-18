import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Find from './pages/Login/Find';
import Test from './pages/Test/Test';
import Test2 from './pages/Test/Test2';
import Reissue from './pages/Reissue/Reissue';
import CalendarModal from './modal/Calender/Calendar';
import Test3 from './pages/Test/Test3';
import Test4 from './pages/Test/Test4';
import DateGrid from './pages/Test/DateGrid';
import User from './pages/User/User';
import Destination from './pages/User/Destination';
import CarrierPost from './pages/User/CarrierManage/CarrierPost';
import PrivacyEdit from './pages/User/CarrierManage/PrivacyEdit';
import Operate from './pages/Operate/FAQ/Operate';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/reissue" element={<Reissue />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
        <Route path="/test5" element={<DateGrid />} />
        <Route path="/cal" element={<CalendarModal />} />
        <Route path="/user" element={<User />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/carrierpost" element={<CarrierPost />} />
        <Route path="/privacyedit" element={<PrivacyEdit />} />
        <Route path="/operate" element={<Operate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
