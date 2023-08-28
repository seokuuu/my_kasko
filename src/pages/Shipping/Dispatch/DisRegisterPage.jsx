import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import DisRegister from './DisRegister';

import { useState } from 'react';

const DisRegisterPage = () => {
  const [expanded, setExpanded] = useState('출고 관리');
  const [depth2Color, setDepth2Color] = useState('배차/출고 등록');
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
            <DisRegister />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default DisRegisterPage;
