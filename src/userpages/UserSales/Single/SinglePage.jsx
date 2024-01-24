import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import UserSideBar from '../../../components/Left/UserSideBar';
import Single from './Single';

import { useState } from 'react';

const SinglePage = () => {
  const [expanded, setExpanded] = useState('상시판매');
  const [depth2Color, setDepth2Color] = useState('단일');
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
