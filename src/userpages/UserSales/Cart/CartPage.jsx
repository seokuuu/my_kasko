import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import UserSideBar from '../../../components/Left/UserSideBar';
import Cart from './Cart';

import { useState } from 'react';
import UserSalesWrapper from '../_layouts/UserSalesWrapper';

const CartPage = () => {
  const [expanded, setExpanded] = useState('상시판매');
  const [depth2Color, setDepth2Color] = useState('장바구니');
  return (
    <UserSalesWrapper>
      <Header />
      <OverAllMain>
        <UserSideBar
          expanded={expanded}
          setExpanded={setExpanded}
          depth2Color={depth2Color}
        />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Cart />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </UserSalesWrapper>
  );
};

export default CartPage;
