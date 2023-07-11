import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Find from './pages/Login/Find';
import Test from './pages/Test/Test';
import Test2 from './pages/Test/Test2';
import Test3 from './pages/Test/Test3';
import Reissue from './pages/Reissue/Reissue';
import CalendarModal from './modal/Calender/Calendar';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/reissue" element={<Reissue />} />
        <Route path="/cal" element={<CalendarModal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
