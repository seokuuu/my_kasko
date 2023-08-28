import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import Terms from './Terms';

import { useState } from 'react';

const TermsPage = () => {
  const [expanded, setExpanded] = useState('고객센터');
  const [depth2Color, setDepth2Color] = useState('이용약관');
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
            <Terms />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default TermsPage;
