import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import ClientDestination from './ClientDestination';

const ClientDestinationPage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <ClientDestination />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default ClientDestinationPage;
