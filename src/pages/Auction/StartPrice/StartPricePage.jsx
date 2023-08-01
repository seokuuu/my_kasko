import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import StartPrice from './StartPrice';

const StartPricePage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <StartPrice />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default StartPricePage;
