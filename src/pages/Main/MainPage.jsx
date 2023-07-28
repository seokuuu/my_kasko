// import {
//   OverAllMain,
//   OverAllSub,
// } from '../../../common/Overall/Overall.styled';

// import SideBar from '../../../components/Left/SideBar';
// import Header from '../../../components/Header/Header';
// import SubHeader from '../../../components/Header/SubHeader';

import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../common/Overall/Overall.styled';

import SideBar from '../../components/Left/SideBar';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/Header/SubHeader';

const MainPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <div>메인 페이지입니다</div>
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default MainPage;
