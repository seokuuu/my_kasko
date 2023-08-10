import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Client from './Client';
import { useState } from 'react';
const ClientPage = () => {
  const [expanded, setExpanded] = useState('사용자 관리');
  const [depth2Color, setDepth2Color] = useState('고객사 관리');
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
            <Client />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ClientPage;