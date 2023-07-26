import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import AccordionMenu from '../../../components/Left/AccordionMenu';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import ClaimRegister from './ClaimRegister';

const ClaimRegisterPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <AccordionMenu />
        <OverAllSub>
          <SubHeader />
          <ClaimRegister />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ClaimRegisterPage;
