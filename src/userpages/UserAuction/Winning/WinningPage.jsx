import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Winning from './Winning';

import { useState } from 'react';

const SinglePage = () => {
  const [expanded, setExpanded] = useState('경매');
  const [depth2Color, setDepth2Color] = useState('낙찰 확인');
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
            <Winning />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default SinglePage;
