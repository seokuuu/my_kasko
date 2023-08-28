import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Docs from './Docs';

import { useState } from 'react';

const DocsPage = () => {
  const [expanded, setExpanded] = useState('공지 & 자료실');
  const [depth2Color, setDepth2Color] = useState('자료실');
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
            <Docs />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default DocsPage;
