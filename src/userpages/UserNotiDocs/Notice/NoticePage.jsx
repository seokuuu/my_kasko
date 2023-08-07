import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Notice from './Notice';

import { useState } from 'react';

const NoticePage = () => {
  const [expanded, setExpanded] = useState('공지 & 자료실');
  const [depth2Color, setDepth2Color] = useState('공지사항');
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
            <Notice />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default NoticePage;
