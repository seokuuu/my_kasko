import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Find from './pages/Login/Find';
import Test from './pages/Test/Test';
import Reissue from './pages/Reissue/Reissue';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/test" element={<Test />} />
        <Route path="/reissue" element={<Reissue />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
