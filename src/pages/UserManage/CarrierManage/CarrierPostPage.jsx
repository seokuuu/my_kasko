import {
  OverAllMain,
  OverAllSub,
} from '../../../common/Overall/Overall.styled';

import AccordionMenu from '../../../components/Left/AccordionMenu';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';

import CarrierPost from './CarrierPost';

const CarrierPostPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <AccordionMenu />
        <OverAllSub>
          <SubHeader />
          <CarrierPost />
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default CarrierPostPage;
