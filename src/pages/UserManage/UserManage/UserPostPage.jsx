import React from 'react';
import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import AccordionMenu from '../../../components/Left/AccordionMenu';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import UserPost from './UserPost';
const UserPostPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <AccordionMenu />
        <OverAllSub>
          <SubHeader />
          <UserPost />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default UserPostPage;
