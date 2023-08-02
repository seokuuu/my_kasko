import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';

import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import PackageManage from './PackageManage';

const PackageManagePage = () => {
  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <PackageManage />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default PackageManagePage;
