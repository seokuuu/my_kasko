import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import ClaimRegister from './ClaimRegister';

const ClaimRegisterPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <ClaimRegister />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ClaimRegisterPage;
