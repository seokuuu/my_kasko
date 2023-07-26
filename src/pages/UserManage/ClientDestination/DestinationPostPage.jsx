import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import AccordionMenu from '../../../components/Left/AccordionMenu';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import DestinationPost from './DestinationPost';

const DestinationPostPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <AccordionMenu />
        <OverAllSub>
          <SubHeader />
          <DestinationPost />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default DestinationPostPage;
