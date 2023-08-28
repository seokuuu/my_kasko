import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Status from './Status';

import { useState } from 'react';

const StatusPage = () => {
  const [expanded, setExpanded] = useState('경매');
  const [depth2Color, setDepth2Color] = useState('경매 진행 조회');
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
            <Status />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default StatusPage;
