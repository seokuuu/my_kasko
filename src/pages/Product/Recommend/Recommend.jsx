import React from 'react';
import { useState, useEffect } from 'react';

import Test3 from '../../Test/Test3';
import HeaderToggle from '../../../components/Toggle/HeaderToggle';
import { toggleAtom } from '../../../store/Layout/Layout';

import {
  FilterContianer,
  FilterHeader,
  TableContianer,
  SubTitle,
} from '../../../modal/External/ExternalFilter';

const Recommend = ({}) => {
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
          <h1>카스코 추천 제품 관리</h1>
          <SubTitle>
            <h5>단일</h5>
            <h6>패키지</h6>
          </SubTitle>
        </div>
      </FilterHeader>

      <TableContianer>
        <Test3 />
      </TableContianer>
    </FilterContianer>
  );
};

export default Recommend;
