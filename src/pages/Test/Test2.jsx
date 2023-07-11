import React from 'react';
import { styled } from 'styled-components';
import { storageOptions } from '../../common/Option/SignUp';
import { DefaultSelect } from '../../common/Option/SignUp';
import Select from 'react-select';

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
        <div>재고관리</div>
        <div>검색 필터 On</div>
      </FilterHeader>
      <FilterSubcontianer>
        <FilterLeft>
          <FilterWrap>
            <SelectWrap>
              창고 구분
              <DefaultSelect
                options={storageOptions}
                defaultValue={storageOptions[0]}
              />
            </SelectWrap>
            <div>
              매입처 <input />
            </div>
            <div>
              규격 약호
              <input />
            </div>
          </FilterWrap>
          <FilterWrap>
            <div>판매 구분</div>
            <div>
              운송 진행 <input />
              <input />
              <input />
            </div>
          </FilterWrap>
          <FilterWrap>
            <div>
              구분 <input />
              <input />
              <input />
              <input />
              <input />
            </div>
          </FilterWrap>
          <FilterWrap>
            <div>
              두께 <input />~<input />
              폭 <input />~<input />
            </div>
          </FilterWrap>
          <FilterWrap>
            <div>
              길이
              <input />~<input />
            </div>
          </FilterWrap>
        </FilterLeft>
        <FilterRight>
          제품 번호 <input />
        </FilterRight>
      </FilterSubcontianer>
      <FilterFooter></FilterFooter>
    </FilterContianer>
  );
};

export default Test2;

// 검색 필터 최상단 div
export const FilterContianer = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid black;
`;

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 검색 필터
export const FilterSubcontianer = styled.div`
  width: 100%;
  height: fit-content;
  border: 1px solid black;
  display: flex;
`;

// 검색 필터 Left
export const FilterLeft = styled.div``;

// 검색 필터 Right
export const FilterRight = styled.div``;

//검색 필터 내 한 줄 div
export const FilterWrap = styled.div`
  display: flex;
  margin: 10px 0px 10px 0px;
  border: 1px solid skyblue;

  // 이건 지워도 됨
  input {
    width: 100px;
    height: 30px;
    border: 1px solid black;
  }
`;

//초기화 , 검색 버튼 div
export const FilterFooter = styled.div`
  border: 1px solid blue;
  height: fit-content;
`;

const SelectWrap = styled.div`
  display: flex;
  border: 1px solid black;
  text-align: center;
  align-items: center;
  line-height: 14.5px;
`;
