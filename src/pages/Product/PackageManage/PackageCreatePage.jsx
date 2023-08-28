import {
  OverAllMain,
  OverAllSub,
  OverAllTable,
} from '../../../common/Overall/Overall.styled';
import { useAtom } from 'jotai';
import SideBar from '../../../components/Left/SideBar';
import Header from '../../../components/Header/Header';
import SubHeader from '../../../components/Header/SubHeader';
import PackageCreate from './PackageCreate';
import { useState } from 'react';
import { packageCEAtom } from '../../../store/Layout/Layout';

const PackageCreatePage = () => {
  const [expanded, setExpanded] = useState('판매 제품 관리');
  const [depth2Color, setDepth2Color] = useState('패키지 관리');

  return (
    <>
      <Header />
      <OverAllMain>
        <SideBar
          expanded={expanded}
          setExpanded={setExpanded}
          depth2Color={depth2Color}
        />
        <OverAllSub>
          <SubHeader />
          <OverAllTable>
            <PackageCreate />
          </OverAllTable>
        </OverAllSub>
      </OverAllMain>
    </>
  );
};

export default PackageCreatePage;
