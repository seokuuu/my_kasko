import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import CarrierManage from './CarrierManage';

const CarrierManagePage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <CarrierManage />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default CarrierManagePage;
