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
  ExCheckWrap,
  ExCheckDiv,
} from '../../../modal/External/ExternalFilter';

import {
  RadioMainDiv,
  RadioCircleDiv,
  RadioInnerCircleDiv,
} from '../../../common/Check/RadioImg';

const StartPrice = ({}) => {
  const checkSales = ['전체', '확정 전송', '확정 전송 대기'];

  //checkSales
  const [check1, setCheck1] = useState(
    Array.from({ length: checkSales.length }, () => false)
  );

  //checkShips
  const [checkData1, setCheckData1] = useState(
    Array.from({ length: checkSales.length }, () => '')
  );

  useEffect(() => {
    // true에 해당되면, value를, false면 빈값을 반환
    const updatedCheck = checkSales.map((value, index) => {
      return check1[index] ? value : '';
    });
    // 빈값을 제외한 진짜배기 값이 filteredCheck에 담긴다.
    const filteredCheck = updatedCheck.filter(item => item !== '');
    setCheckData1(filteredCheck);

    // 전송용 input에 담을 때
    // setInput({
    //   ...input,
    //   businessType: updatedCheck.filter(item => item !== ''),
    // });
  }, [check1]);

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
        <div style={{ display: 'flex' }}>
          <h1>경매 시작 단가 관리</h1>
        </div>
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
                  <h6>구분</h6>
                  <PWRight style={{ width: '160px' }}>
                    <MainSelect
                      options={storageOptions}
                      defaultValue={storageOptions[0]}
                    />
                  </PWRight>
                  <PWRight style={{ width: '160px' }}>
                    <MainSelect
                      options={storageOptions}
                      defaultValue={storageOptions[0]}
                    />
                  </PWRight>
                  <PWRight style={{ width: '160px' }}>
                    <MainSelect
                      options={storageOptions}
                      defaultValue={storageOptions[0]}
                    />
                  </PWRight>
                </PartWrap>
              </RowWrap>

              <RowWrap style={{ borderBottom: '0px' }}>
                <PartWrap>
                  <h6>적용 일자</h6>
                  <GridWrap>
                    <DateGrid bgColor={'white'} fontSize={17} />
                    <Tilde>~</Tilde>
                    <DateGrid bgColor={'white'} fontSize={17} />
                  </GridWrap>
                </PartWrap>
                <PartWrap />

                <PartWrap>
                  <h6>유찰 횟수</h6>
                  <ExInputsWrap>
                    <Input /> <Tilde>~</Tilde>
                    <Input />
                  </ExInputsWrap>
                </PartWrap>
                <PartWrap />
              </RowWrap>
            </FilterLeft>
            <FilterRight>
              <DoubleWrap></DoubleWrap>
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

export default StartPrice;
