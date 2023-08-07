import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Single from './Single';

import { useState } from 'react';

const SinglePage = () => {
  const [expanded, setExpanded] = useState('경매');
  const [depth2Color, setDepth2Color] = useState('경매(단일)');
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
            <Single />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default SinglePage;
