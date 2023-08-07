import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Profile from './Profile';

import { useState } from 'react';

const ProfilePage = () => {
  const [expanded, setExpanded] = useState('마이페이지');
  const [depth2Color, setDepth2Color] = useState('개인정보수정');
  return (
    <>
      <Header />
      <OverAllMain>
        <UserSideBar
          expanded={expanded}
          setExpanded={setExpanded}
          depth2Color={depth2Color}
        />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Profile />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ProfilePage;
