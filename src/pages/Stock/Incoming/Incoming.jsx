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

  return (
    <FilterContianer>
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
        </>
      )}
      <TableContianer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  );
};

export default Incoming;

// 검색 필터 최상단 div
export const FilterContianer = styled.div`
  width: 100%;
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 5px;
  height: 65px;
  align-items: center;

  h1 {
    font-weight: bold;
    font-size: 24px;
  }
`;

// 검색 필터
export const FilterSubcontianer = styled.div`
  width: 100%;
  border: 1px solid #c8c8c8;
  display: flex;
  padding: 10px;
  padding-left: 30px;
  background-color: #dbe2f0;
  justify-content: space-around;
  color: ${props => props.theme.colors.TxtAlter};
`;

const TableContianer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid #c8c8c8;
  display: flex;
  padding: 10px;
`;

//초기화 , 검색 버튼 div
export const FilterFooter = styled.div`
  border: 1px solid #c8c8c8;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background-color: #f0f1f6;
`;

// 검색 필터 Left
export const FilterLeft = styled.div``;

// 검색 필터 Right
export const FilterRight = styled.div``;

//검색 필터 내 한 줄 div
export const RowWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
  border-bottom: 1px solid #c8c8c8;
  padding-bottom: 10px;
  // 이건 지워도 됨
`;

const PWRight = styled.div`
  width: 240px;
`;

const PartWrap = styled.div`
  margin-right: 30px;
  display: flex;
  align-items: center;
  line-height: 14.5px;
  height: 50px;
  justify-content: space-around;
  h6 {
    width: 90px;
    display: flex;
    justify-content: start;
  }
`;

const DoubleWrap = styled.div`
  padding: 20px;
  height: 140px;
  display: flex;
  gap: 10px;
`;

const GridWrap = styled.div`
  width: 400px;
  display: flex;
  padding: 15px;
`;

const Input = styled.input`
  width: 100px;
  height: 37px;
  border-radius: 3px;
  border: 1px solid #c8c8c8;
`;

const Tilde = styled.div`
  margin: 10px;
`;

const ResetImg = styled.img`
  transition: transform 1s ease; /* Add a smooth transition effect */
  cursor: pointer;

  &.rotate {
    transform: rotate(540deg);
  }
`;
