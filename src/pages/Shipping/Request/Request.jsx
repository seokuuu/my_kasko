import React from 'react';
import { useState, useEffect } from 'react';
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

import { CheckBox } from '../../../common/Check/Checkbox';
import {
  StyledCheckMainDiv,
  StyledCheckSubSquDiv,
  CheckImg2,
} from '../../../common/Check/CheckImg';

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
  ExRadioWrap,
  SubTitle,
  FilterHeaderAlert,
  FHALeft,
  ExInputsWrap,
} from '../../../modal/External/ExternalFilter';

import {
  ClaimTable,
  ClaimRow,
  ClaimTitle,
  ClaimContent,
} from '../Claim/ClaimRegister';

const Request = ({}) => {
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

  return (
    <FilterContianer>
      <FilterHeader>
        <h1>출하지시 등록</h1>
        {/* 토글 쓰기 */}
        <HeaderToggle
          exFilterToggle={exFilterToggle}
          toggleBtnClick={toggleBtnClick}
          toggleMsg={toggleMsg}
        />
      </FilterHeader>

      {exFilterToggle && (
        <>
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
                  <h6>고객사</h6>
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10}>
                    찾기
                  </GreyBtn>
                </PartWrap>

                <PartWrap>
                  <h6>목적지</h6>
                  <Input />
                  <GreyBtn style={{ width: '70px' }} height={35} margin={10}>
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
                  <h6 style={{ width: '120px' }}>출하 지시 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
              </RowWrap>
              <RowWrap style={{ border: '0px' }}>
                <PartWrap>
                  <h6>구분</h6>
                  <PWRight>
                    <MainSelect
                      options={storageOptions}
                      defaultValue={storageOptions[0]}
                    />
                  </PWRight>
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
        </>
      )}

      <TableContianer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  );
};

export default Request;

const TableWrap = styled.div`
  margin: 30px auto;
`;
