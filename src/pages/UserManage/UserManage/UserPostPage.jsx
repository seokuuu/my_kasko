import React from 'react';
import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import UserPost from './UserPost';
const UserPostPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <UserPost />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default UserPostPage;
