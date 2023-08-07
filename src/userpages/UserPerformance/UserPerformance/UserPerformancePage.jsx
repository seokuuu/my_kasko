import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import UserPerformance from './UserPerformance';

import { useState } from 'react';

const SinglePage = () => {
  const [expanded, setExpanded] = useState('출고 실적 조회');
  const [depth2Color, setDepth2Color] = useState('출고 실적 조회');
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
            <UserPerformance />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default SinglePage;
