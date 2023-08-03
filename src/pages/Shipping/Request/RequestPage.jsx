import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Request from './Request';

import { useState } from 'react';

const RequestPage = () => {
  const [expanded, setExpanded] = useState('출고 관리');
  const [depth2Color, setDepth2Color] = useState('출고 요청');
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
          <OverAllTable>
            <Request />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default RequestPage;
