import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import DisRegister from './DisRegister';

const DisRegisterPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <DisRegister />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default DisRegisterPage;
