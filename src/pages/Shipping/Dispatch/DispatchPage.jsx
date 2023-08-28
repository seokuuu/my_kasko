import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Dispatch from './Dispatch';
import { useState } from 'react';
const DispatchPage = () => {
  const [expanded, setExpanded] = useState('출고 관리');
  const [depth2Color, setDepth2Color] = useState('배차기사 관리');
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
            <Dispatch />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default DispatchPage;
