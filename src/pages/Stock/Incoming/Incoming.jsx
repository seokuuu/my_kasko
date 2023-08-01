import { useState } from 'react';
import { styled } from 'styled-components';
import { storageOptions } from '../../../common/Option/SignUp';

import { MainSelect } from '../../../common/Option/Main';
import { BlackBtn, BtnWrap } from '../../../common/Button/Button';
import DateGrid from '../../../components/DateGrid/DateGrid';
import { ToggleBtn, Circle, Wrapper } from '../../../common/Toggle/Toggle';
import { GreyBtn } from '../../../common/Button/Button';
import Test3 from '../../Test/Test3';
import HeaderToggle from '../../../components/Toggle/HeaderToggle';
import { toggleAtom } from '../../../store/Layout/Layout';
import BlueBar from '../../../modal/BlueBar/BlueBar';
import { blueModalAtom } from '../../../store/Layout/Layout';
import { useAtom } from 'jotai';
import { FilterWrap } from '../../../modal/External/ExternalFilter';
import {
  FilterContianer,
  FilterHeader,
  FilterFooter,
  FilterSubcontianer,
  FilterLeft,
  FilterRight,
  RowWrap,
  PartWrap,
  PWRight,
  Input,
  GridWrap,
  Tilde,
  DoubleWrap,
  ResetImg,
  TableContianer,
} from '../../../modal/External/ExternalFilter';

const Incoming = ({}) => {
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  };
  const [isRotated, setIsRotated] = useState(false);

  // Function to handle image click and toggle rotation
  const handleImageClick = () => {
    setIsRotated(prevIsRotated => !prevIsRotated);
  };

  // 토글 쓰기
  const [exFilterToggle, setExfilterToggle] = useState(toggleAtom);
  const [toggleMsg, setToggleMsg] = useState('On');
  const toggleBtnClick = () => {
    setExfilterToggle(prev => !prev);
    if (exFilterToggle === true) {
      setToggleMsg('Off');
    } else {
      setToggleMsg('On');
    }
  };

  const [isModal, setIsModal] = useAtom(blueModalAtom);

  console.log('isModal =>', isModal);

  const modalOpen = () => {
    setIsModal(true);
  };

  return (
    <FilterContianer>
      <div>
        <FilterHeader>
          <h1>입고 관리</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle
            exFilterToggle={exFilterToggle}
            toggleBtnClick={toggleBtnClick}
            toggleMsg={toggleMsg}
          />
        </FilterHeader>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>창고 구분</h6>
                    <PWRight>
                      <MainSelect
                        options={storageOptions}
                        defaultValue={storageOptions[0]}
                      />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>매입처</h6>
                    <PWRight>
                      <MainSelect
                        options={storageOptions}
                        defaultValue={storageOptions[0]}
                      />
                    </PWRight>
                  </PartWrap>
                  <PartWrap>
                    <h6>규격 약호</h6>
                    <Input />
                    <GreyBtn
                      style={{ width: '70px' }}
                      height={35}
                      margin={10}
                      onClick={modalOpen}
                    >
                      찾기
                    </GreyBtn>
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap>
                    <h6>입고일자</h6>
                    <GridWrap>
                      <DateGrid bgColor={'white'} fontSize={17} />
                      <Tilde>~</Tilde>
                      <DateGrid bgColor={'white'} fontSize={17} />
                    </GridWrap>
                  </PartWrap>

                  <PartWrap>
                    <h6>구분</h6>
                    <MainSelect />
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap>
                    <h6>구분2</h6>
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                  <PartWrap>
                    <h6>두께(CM)</h6>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </PartWrap>
                </RowWrap>
                <RowWrap>
                  <PartWrap>
                    <h6>길이(CM)</h6>
                    <MainSelect />
                    <MainSelect />
                  </PartWrap>
                  <PartWrap>
                    <h6>폭(CM)</h6>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </PartWrap>
                </RowWrap>
              </FilterLeft>
              <FilterRight>
                <DoubleWrap>
                  <p>제품 번호 </p>
                  <textarea style={{ height: '100px' }} />
                </DoubleWrap>
              </FilterRight>
            </FilterSubcontianer>
            <FilterFooter>
              <div style={{ display: 'flex' }}>
                <p>초기화</p>
                <ResetImg
                  src="/img/reset.png"
                  style={{ marginLeft: '10px', marginRight: '20px' }}
                  onClick={handleImageClick}
                  className={isRotated ? 'rotate' : ''}
                />
              </div>
              <div style={{ width: '180px' }}>
                <BlackBtn width={100} height={40}>
                  검색
                </BlackBtn>
              </div>
            </FilterFooter>
          </FilterWrap>
        )}
      </div>

      <TableContianer>
        <Test3 title={'규격 약호 찾기'} />
      </TableContianer>
    </FilterContianer>
  );
};

export default Incoming;
