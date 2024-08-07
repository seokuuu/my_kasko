import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Progress from './Progress';

import { useState } from 'react';

const ProgressPage = () => {
  const [expanded, setExpanded] = useState('경매 관리');
  const [depth2Color, setDepth2Color] = useState('경매 진행 조회');
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
            <Progress />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ProgressPage;
