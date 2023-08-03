import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import ProfileEdit from './ProfileEdit';
import { useState } from 'react';
const ProfileEditPage = () => {
  const [expanded, setExpanded] = useState('사용자 관리');
  const [depth2Color, setDepth2Color] = useState('개인정보 수정');
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
          <ProfileEdit />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ProfileEditPage;
