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
  InputStartWrap,
  FilterHeaderAlert,
} from '../../../modal/External/ExternalFilter';

const SellOrder = ({}) => {
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
          <h1>상시 판매 주문 확인</h1>
          {/* 토글 쓰기 */}
          <HeaderToggle
            exFilterToggle={exFilterToggle}
            toggleBtnClick={toggleBtnClick}
            toggleMsg={toggleMsg}
          />
        </FilterHeader>
        <FilterHeaderAlert>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>
              <img src="/img/notice.png" />
            </div>
            <div style={{ marginTop: '6px' }}>
              <div>· 주의사항 영역</div>
              <div style={{ marginTop: '6px' }}>· 주의사항 영역</div>
            </div>
          </div>

          <div>
            수정
            <img style={{ marginLeft: '10px' }} src="/img/setting.png" />
          </div>
        </FilterHeaderAlert>
        {exFilterToggle && (
          <FilterWrap>
            <FilterSubcontianer>
              <FilterLeft>
                <RowWrap>
                  <PartWrap>
                    <h6>창고구분</h6>
                    <MainSelect />
                  </PartWrap>
                  <PartWrap>
                    <h6>고객사</h6>
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
                  <PartWrap>
                    <h6>구분</h6>
                    <MainSelect />
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

export default SellOrder;
