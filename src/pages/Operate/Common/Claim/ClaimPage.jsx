import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../../common/Overall/Overall.styled';

import SideBar from '../../../../components/Left/SideBar';
import Header from '../../../../components/Header/Header';
import SubHeader from '../../../../components/Header/SubHeader';
import Claim from './Claim';

import { useState } from 'react';

const ClaimPage = () => {
  const [expanded, setExpanded] = useState('운영 관리');
  const [depth2Color, setDepth2Color] = useState('일반 관리');
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
            <Claim />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ClaimPage;
