import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import ClaimRegister from './ClaimRegister';
import { useState } from 'react';

const ClaimRegisterPage = () => {
  const [expanded, setExpanded] = useState('출고 관리');
  const [depth2Color, setDepth2Color] = useState('출고 실적');
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
          <ClaimRegister />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ClaimRegisterPage;
