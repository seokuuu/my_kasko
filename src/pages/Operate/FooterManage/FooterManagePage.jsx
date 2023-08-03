import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import FooterManage from './FooterManage';
import { useState } from 'react';
const FooterManagePage = () => {
  const [expanded, setExpanded] = useState('운영 관리');
  const [depth2Color, setDepth2Color] = useState('푸터 관리');
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
          <FooterManage />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default FooterManagePage;
