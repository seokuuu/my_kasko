import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import Terms from './Terms';
import { useState } from 'react';
const TermsPage = () => {
  const [expanded, setExpanded] = useState('운영 관리');
  const [depth2Color, setDepth2Color] = useState('이용 약관');
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
          <Terms />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default TermsPage;
