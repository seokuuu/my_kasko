import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Consolidation from './Consolidation';
import { useState } from 'react';

const ConsolidationPage = () => {
  const [expanded, setExpanded] = useState('기준 관리');
  const [depth2Color, setDepth2Color] = useState('합짐비 관리');
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
            <Consolidation />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ConsolidationPage;
