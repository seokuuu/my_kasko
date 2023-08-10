import React from 'react';
import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { storageOptions } from '../../../common/Option/SignUp';

import { MainSelect } from '../../../common/Option/Main';
import {
  BlackBtn,
  BtnWrap,
  WhiteRedBtn,
  WhiteSkyBtn,
} from '../../../common/Button/Button';
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
  TCSubContainer,
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
  const titleData = [
    '제품 중량(kg)',
    '제품 공급가액',
    '운반비 공급가액',
    '제품 중량(kg)',
    '제품 공급가액',
    '운반비 공급가액',
    '제품 중량(kg)',
    '제품 공급가액',
    '운반비 공급가액',
  ];
  const contentData = [
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
    '986,742',
  ];
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
        <h1>출고 요청</h1>
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
                  <GreyBtn
                    style={{ width: '70px' }}
                    height={35}
                    margin={10}
                    fontSize={17}
                  >
                    찾기
                  </GreyBtn>
                </PartWrap>

                <PartWrap>
                  <h6>목적지</h6>
                  <Input />
                  <GreyBtn
                    style={{ width: '70px' }}
                    height={35}
                    margin={10}
                    fontSize={17}
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
                <textarea
                  placeholder='복수 조회 진행 &#13;&#10;  제품 번호 "," 혹은 enter로 &#13;&#10;  구분하여 작성해주세요.'
                  style={{ height: '100px' }}
                />
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
      <FilterHeader style={{}}>
        <h1>합짐</h1>
        {/* 토글 쓰기 */}
      </FilterHeader>
      <TableWrap style={{ marginTop: '5px' }}>
        <ClaimTable>
          {[0, 1, 2].map(index => (
            <ClaimRow key={index}>
              {titleData.slice(index * 3, index * 3 + 3).map((title, idx) => (
                <React.Fragment agmentkey={title}>
                  <ClaimTitle>{title}</ClaimTitle>
                  <ClaimContent>{contentData[index * 3 + idx]}</ClaimContent>
                </React.Fragment>
              ))}
            </ClaimRow>
          ))}
        </ClaimTable>
      </TableWrap>

      <TableContianer>
        <TCSubContainer bor>
          <div>
            조회 목록 (선택 <span>2</span> / 50개 )
          </div>
          <div style={{ display: 'flex', gap: '10px' }}></div>
        </TCSubContainer>
        <TCSubContainer>
          <div>
            선택 중량<span> 2 </span>kg / 총 중량 kg
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WhiteRedBtn>목록 제거</WhiteRedBtn>
            <WhiteSkyBtn>합짐 등록</WhiteSkyBtn>
          </div>
        </TCSubContainer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  );
};

export default Request;

const TableWrap = styled.div`
  margin: 30px auto;
`;
