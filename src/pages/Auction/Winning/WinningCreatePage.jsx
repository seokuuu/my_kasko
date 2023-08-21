import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import WinningCreate from './WinningCreate';

import { useState } from 'react';

const WinningPage = () => {
  const [expanded, setExpanded] = useState('경매 관리');
  const [depth2Color, setDepth2Color] = useState('경매 낙찰 관리');

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
            <WinningCreate />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default WinningPage;
