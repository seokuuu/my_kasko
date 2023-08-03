import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Prono from './Prono';

import { useState } from 'react';

const PronoPage = () => {
  const [expanded, setExpanded] = useState('판매 제품 관리');
  const [depth2Color, setDepth2Color] = useState('Pro.no 관리');
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar
          expanded={expanded}
          setExpanded={setExpanded}
          depth2Color={depth2Color}
        />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Prono />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default PronoPage;
