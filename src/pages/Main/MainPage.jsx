// import {
//   OverAllMain,
//   OverAllSub,
// } from '../../../common/Overall/Overall.styled';

// import AccordionMenu from '../../../components/Left/AccordionMenu';
// import Header from '../../../components/Header/Header';
// import SubHeader from '../../../components/Header/SubHeader';

import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../common/Overall/Overall.styled';

import AccordionMenu from '../../components/Left/AccordionMenu';
import Header from '../../components/Header/Header';
import SubHeader from '../../components/Header/SubHeader';
import Test2 from '../Test/Test2';

const MainPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <AccordionMenu />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <Test2 />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default MainPage;
