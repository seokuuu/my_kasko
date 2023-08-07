import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import UserSideBar from '../../../components/Left/UserSideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import FAQ from './FAQ';

import { useState } from 'react';

const FAQPage = () => {
  const [expanded, setExpanded] = useState('고객센터');
  const [depth2Color, setDepth2Color] = useState('FAQ');
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
            <FAQ />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default FAQPage;
