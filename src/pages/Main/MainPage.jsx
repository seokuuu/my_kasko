// import {
//   OverAllMain,
//   OverAllSub,
// } from '../../../common/Overall/Overall.styled';

// import SideBar from '../../../components/Left/SideBar';
// import Header from '../../../components/Header/Header';
// import SubHeader from '../../../components/Header/SubHeader';

import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../common/Overall/Overall.styled';

import SideBar from '../../components/Left/SideBar';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/Header/SubHeader';

import { useState } from 'react';

const MainPage = () => {
  const [expanded, setExpanded] = useState('');
  const [depth2Color, setDepth2Color] = useState('');
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
            <div>메인 페이지입니다</div>
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default MainPage;
