import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import CarrierPost from './CarrierPost';

const CarrierPostPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <CarrierPost />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default CarrierPostPage;
