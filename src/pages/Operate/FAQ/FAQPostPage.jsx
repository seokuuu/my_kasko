import React from 'react';

import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import AccordionMenu from '../../../components/Left/AccordionMenu';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import FAQPost from './FAQPost';

const FAQPostPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <AccordionMenu />
        <OverAllSub>
          <SubHeader />
          <FAQPost />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default FAQPostPage;
