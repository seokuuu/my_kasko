import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Bidding from './Bidding';

const RoundPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Bidding />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default RoundPage;
