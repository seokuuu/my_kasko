import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Transport from './Transport';
import { useState } from 'react';

const TransportPage = () => {
  const [expanded, setExpanded] = useState('기준 관리');
  const [depth2Color, setDepth2Color] = useState('운반비 관리');
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
            <Transport />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default TransportPage;
