import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../common/Overall/Overall.styled';

import SideBar from '../../components/Left/SideBar';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/Header/SubHeader';
import Order from './Order';

const OrderPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Order />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default OrderPage;
