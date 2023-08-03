import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import StartPrice from './StartPrice';

import { useState } from 'react';

const StartPricePage = () => {
  const [expanded, setExpanded] = useState('경매 관리');
  const [depth2Color, setDepth2Color] = useState('경매 시작 단가 관리');
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
            <StartPrice />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default StartPricePage;
