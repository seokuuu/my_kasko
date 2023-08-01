import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Winning from './Winning';

const WinningPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Winning />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default WinningPage;
