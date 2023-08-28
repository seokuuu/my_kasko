import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Package from './Package';

import { useState } from 'react';

const SinglePage = () => {
  const [expanded, setExpanded] = useState('상시판매');
  const [depth2Color, setDepth2Color] = useState('패키지');
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
            <Package />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default SinglePage;
