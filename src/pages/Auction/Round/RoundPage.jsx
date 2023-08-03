import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Round from './Round';

import { useState } from 'react';

const RoundPage = () => {
  const [expanded, setExpanded] = useState('경매 관리');
  const [depth2Color, setDepth2Color] = useState('경매 회차 관리');
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
            <Round />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default RoundPage;
