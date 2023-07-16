import React from 'react';
import { styled } from 'styled-components';
import { storageOptions } from '../../common/Option/SignUp';
import { DefaultSelect } from '../../common/Option/SignUp';
import Select from 'react-select';
import { MainSelect } from '../../common/Option/Main';

const Test2 = () => {
  const handleSelectChange = (selectedOption, name) => {
    // setInput(prevState => ({
    //   ...prevState,
    //   [name]: selectedOption.label,
    // }));
  };
  return (
    <FilterContianer>
      <FilterHeader>
        <div>입고 관리</div>
        <div>검색 필터 On</div>
      </FilterHeader>
      <FilterSubcontianer>
        <FilterLeft>
          <RowWrap>
            <PartWrap>
              <h6>창고 구분</h6>
              <MainSelect
                options={storageOptions}
                defaultValue={storageOptions[0]}
              />
            </PartWrap>
            <PartWrap>
              <h6>매입처</h6>
              <MainSelect />
            </PartWrap>
            <PartWrap>
              <h6>규격 약호</h6>
              <input />
              <button>찾기</button>
            </PartWrap>
          </RowWrap>
          <RowWrap>
            <PartWrap>
              <h6> 입고일자 (date)</h6>
              <input /> ~
              <input />
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
              <input />
              <input />
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
              <input />
              <input />
            </PartWrap>
          </RowWrap>
        </FilterLeft>
        <FilterRight>
          제품 번호 <input />
        </FilterRight>
      </FilterSubcontianer>
      <FilterFooter>
        <div>초기화</div>
        <div>
          <button>검색</button>
        </div>
      </FilterFooter>
    </FilterContianer>
  );
};

export default Test2;

// 검색 필터 최상단 div
export const FilterContianer = styled.div`
  width: 100%;

  border: 1px solid black;
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 검색 필터
export const FilterSubcontianer = styled.div`
  width: 100%;
  border: 1px solid black;
  display: flex;
`;

//초기화 , 검색 버튼 div
export const FilterFooter = styled.div`
  border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: center;
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
  border: 1px solid skyblue;

  // 이건 지워도 됨
  input {
    width: 100px;
    height: 25px;
    border: 1px solid black;
  }
`;

const PartWrap = styled.div`
  margin-right: 30px;
  display: flex;
  border: 1px solid black;
  text-align: center;
  align-items: center;
  line-height: 14.5px;
  height: 50px;
`;